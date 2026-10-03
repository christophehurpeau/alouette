// Migrates the deprecated layout components to their class-first equivalents:
//
//   <HStack className="gap-m">   → <View className="flex-row gap-m">
//   <VStack className="gap-m">   → <View className="gap-m">
//   <Stack>                      → <View className="flex-row flex-wrap">
//   <Surface size="sm" variant="lowered" className="gap-m">
//                                → <Box className="surface surface-sm lowered gap-m">
//   <EditableSurface>            → <EditableSection className="surface">
//   <FormEditableSurface>        → <FormEditableSection className="surface">
//
// Imports from "alouette" are rewritten in place; imports of the library's own
// modules by relative path (inside alouette itself) are pointed at
// ui/primitives/View and ui/containers/Box. The rewrite is text edits at node
// positions, so the file keeps its formatting — run the project's formatter and
// linter afterwards to reorder imports.

import { dirname, relative, resolve, sep } from "node:path";

const COMPONENTS = {
  HStack: { group: "stacks", target: "View", classes: ["flex-row"] },
  VStack: { group: "stacks", target: "View", classes: [] },
  Stack: {
    group: "stacks",
    target: "View",
    classes: ["flex-row", "flex-wrap"],
  },
  Surface: { group: "surface", target: "Box", classes: ["surface"] },
  EditableSurface: {
    group: "editable",
    target: "EditableSection",
    classes: ["surface"],
  },
  FormEditableSurface: {
    group: "editable",
    target: "FormEditableSection",
    classes: ["surface"],
  },
};

const TYPES = {
  HStackProps: { group: "stacks", target: "ViewProps" },
  VStackProps: { group: "stacks", target: "ViewProps" },
  StackProps: { group: "stacks", target: "ViewProps" },
  SurfaceProps: { group: "surface", target: "BoxProps" },
  EditableSurfaceProps: { group: "editable", target: "EditableSectionProps" },
  FormEditableSurfaceProps: {
    group: "editable",
    target: "FormEditableSectionProps",
  },
};

export const GROUPS = ["stacks", "surface", "editable"];

const TARGET_MODULES = {
  View: "primitives/View",
  ViewProps: "primitives/View",
  Box: "containers/Box",
  BoxProps: "containers/Box",
  EditableSection: "containers/EditableSection",
  EditableSectionProps: "containers/EditableSection",
  FormEditableSection: "forms/FormEditableSection",
  FormEditableSectionProps: "forms/FormEditableSection",
};

// The library's own modules, for imports by relative path inside alouette.
const INTERNAL_MODULES = [
  ["/ui/stacks/stacks", "stacks"],
  ["/ui/containers/Surface", "surface"],
  ["/ui/containers/EditableSurface", "editable"],
  ["/ui/forms/FormEditableSurface", "editable"],
];

// Surface props, in the order their classes are written.
const SURFACE_PROP_CLASSES = {
  size: {
    xxs: "surface-xxs",
    xs: "surface-xs",
    sm: "surface-sm",
    md: "surface-md",
    lg: "surface-lg",
  },
  variant: {
    surface: "",
    highlight: "bg-highlight",
    "highlight-accent": "bg-highlight-accent",
    lowered: "lowered",
    translucent: "bg-translucent",
  },
  shadow: {
    none: "shadow-none",
    s: "shadow-s",
    m: "shadow-m",
    l: "shadow-l",
    lowered: "shadow-lowered",
  },
};

// View does not merge classes, so a direction the caller already wrote replaces
// the one a stack implied instead of being written next to it.
const SAME_PROPERTY = {
  "flex-row": /^(?:flex-row|flex-col|flex-row-reverse|flex-col-reverse)$/,
  "flex-wrap":
    /^(?:flex-wrap|flex-nowrap|flex-wrap-reverse|flex-wrap-balance)$/,
};

const MAYBE_AFFECTED =
  /\b(?:[HV]?Stack|Surface|EditableSurface|FormEditableSurface)(?:Props)?\b/;

function toPosix(path) {
  return path.split(sep).join("/");
}

function resolveSource(specifier, filePath) {
  if (specifier === "alouette") return { kind: "package" };
  if (!specifier.startsWith(".")) return undefined;
  const absolute = toPosix(resolve(dirname(filePath), specifier));
  for (const [suffix, group] of INTERNAL_MODULES) {
    if (!absolute.endsWith(suffix)) continue;
    const uiRoot = `${absolute.slice(0, -suffix.length)}/ui`;
    return {
      kind: "internal",
      group,
      importPathFor(target) {
        const path = toPosix(
          relative(dirname(filePath), `${uiRoot}/${TARGET_MODULES[target]}`),
        );
        return path.startsWith(".") ? path : `./${path}`;
      },
    };
  }
  return undefined;
}

function scriptKindFor(ts, filePath) {
  if (/\.(?:ts|mts|cts)$/.test(filePath)) return ts.ScriptKind.TS;
  if (filePath.endsWith(".tsx")) return ts.ScriptKind.TSX;
  return ts.ScriptKind.JSX;
}

/**
 * @param {string} text source of the file
 * @param {string} filePath absolute or cwd-relative path, used to resolve
 *   relative imports and to pick the parser
 * @param {typeof import("typescript")} ts
 * @param {{ groups?: Array<"stacks" | "surface" | "editable"> }} [options]
 * @returns {{ output: string, changed: boolean, warnings: Array<{ line: number, message: string }> }}
 */
export function transformSurfaceAndStacks(
  text,
  filePath,
  ts,
  { groups = GROUPS } = {},
) {
  const unchanged = { output: text, changed: false, warnings: [] };
  if (!MAYBE_AFFECTED.test(text)) return unchanged;

  const sourceFile = ts.createSourceFile(
    filePath,
    text,
    ts.ScriptTarget.Latest,
    true,
    scriptKindFor(ts, filePath),
  );
  const edits = [];
  const warnings = [];

  function warn(node, message) {
    const { line } = sourceFile.getLineAndCharacterOfPosition(
      node.getStart(sourceFile),
    );
    warnings.push({ line: line + 1, message });
  }

  function replace(node, replacement) {
    edits.push({
      start: node.getStart(sourceFile),
      end: node.end,
      text: replacement,
    });
  }

  // --- bindings -------------------------------------------------------------
  const bindings = new Map();
  const boundNames = new Set();
  const importDeclarations = [];

  for (const statement of sourceFile.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      !statement.importClause
    ) {
      continue;
    }
    importDeclarations.push(statement);
    const clause = statement.importClause;
    if (clause.name) boundNames.add(clause.name.text);
    const namedBindings = clause.namedBindings;
    if (!namedBindings) continue;
    if (!ts.isNamedImports(namedBindings)) {
      boundNames.add(namedBindings.name.text);
      continue;
    }
    const source = resolveSource(statement.moduleSpecifier.text, filePath);
    for (const element of namedBindings.elements) {
      boundNames.add(element.name.text);
      if (!source) continue;
      const imported = (element.propertyName ?? element.name).text;
      const migration = COMPONENTS[imported] ?? TYPES[imported];
      if (!migration || !groups.includes(migration.group)) continue;
      if (source.kind === "internal" && source.group !== migration.group) {
        continue;
      }
      bindings.set(element.name.text, {
        imported,
        migration,
        declaration: statement,
        element,
        source,
        kept: false,
      });
    }
  }
  if (bindings.size === 0) return unchanged;

  // --- JSX elements ---------------------------------------------------------
  const renamedTags = new Set();
  const keptTags = new Set();

  function staticString(initializer) {
    if (!initializer) return undefined;
    if (ts.isStringLiteral(initializer)) return initializer.text;
    if (
      ts.isJsxExpression(initializer) &&
      initializer.expression &&
      (ts.isStringLiteral(initializer.expression) ||
        ts.isNoSubstitutionTemplateLiteral(initializer.expression))
    ) {
      return initializer.expression.text;
    }
    return undefined;
  }

  function migrateElement(opening) {
    const binding = bindings.get(opening.tagName.text);
    if (!COMPONENTS[binding.imported]) return;
    const { migration } = binding;
    const closing = ts.isJsxOpeningElement(opening)
      ? opening.parent.closingElement
      : undefined;
    const tags = closing
      ? [opening.tagName, closing.tagName]
      : [opening.tagName];

    let classNameAttribute;
    const surfaceClasses = {};
    const removedAttributes = [];
    for (const attribute of opening.attributes.properties) {
      if (ts.isJsxSpreadAttribute(attribute)) {
        if (binding.imported === "Surface") {
          warn(
            attribute,
            "props spread onto Surface: a size, variant or shadow inside them is not migrated",
          );
        }
        continue;
      }
      const name = attribute.name.getText(sourceFile);
      if (name === "className") {
        classNameAttribute = attribute;
        continue;
      }
      if (binding.imported !== "Surface" || !(name in SURFACE_PROP_CLASSES)) {
        continue;
      }
      const value = staticString(attribute.initializer);
      const mapped =
        value === undefined ? undefined : SURFACE_PROP_CLASSES[name][value];
      if (mapped === undefined) {
        warn(
          attribute,
          `Surface ${name} is not a static, known value: this Surface is left as is`,
        );
        binding.kept = true;
        for (const tag of tags) keptTags.add(tag);
        return;
      }
      surfaceClasses[name] = mapped;
      removedAttributes.push(attribute);
    }

    const classes = [
      ...migration.classes,
      ...Object.keys(SURFACE_PROP_CLASSES)
        .map((name) => surfaceClasses[name])
        .filter(Boolean),
    ];

    for (const tag of tags) {
      renamedTags.add(tag);
      replace(tag, migration.target);
    }
    for (const attribute of removedAttributes) {
      edits.push({ start: attribute.pos, end: attribute.end, text: "" });
    }

    if (!classNameAttribute) {
      if (classes.length > 0) {
        edits.push({
          start: opening.attributes.pos,
          end: opening.attributes.pos,
          text: ` className="${classes.join(" ")}"`,
        });
      }
      return;
    }

    const { initializer } = classNameAttribute;
    const value = staticString(initializer);
    if (value !== undefined) {
      const written = value.split(/\s+/).filter(Boolean);
      const added = classes.filter(
        (cls) =>
          !SAME_PROPERTY[cls] ||
          !written.some((token) => SAME_PROPERTY[cls].test(token)),
      );
      if (added.length > 0) {
        replace(initializer, JSON.stringify([...added, ...written].join(" ")));
      }
      return;
    }
    if (
      classes.length > 0 &&
      initializer &&
      ts.isJsxExpression(initializer) &&
      initializer.expression
    ) {
      const expression = initializer.expression.getText(sourceFile);
      replace(
        initializer,
        `{\`${classes.join(" ")} \${${expression} ?? ""}\`}`,
      );
      if (migration.target === "View") {
        warn(
          classNameAttribute,
          `dynamic className on ${binding.imported}: "${classes.join(" ")}" is prepended and View does not merge classes — check the expression sets no flex direction or wrap of its own`,
        );
      }
    }
  }

  function visitElements(node) {
    if (
      (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
      ts.isIdentifier(node.tagName) &&
      bindings.has(node.tagName.text)
    ) {
      migrateElement(node);
    }
    ts.forEachChild(node, visitElements);
  }

  // --- other references (typeof Stack, HStackProps, component: Surface) -----
  function isRenamedReference(node) {
    const { parent } = node;
    if (renamedTags.has(node) || keptTags.has(node)) return false;
    if (
      (ts.isPropertyAccessExpression(parent) || ts.isQualifiedName(parent)) &&
      parent.name === node
    ) {
      return false;
    }
    if (ts.isQualifiedName(parent) && parent.right === node) return false;
    if (
      (ts.isPropertyAssignment(parent) ||
        ts.isPropertySignature(parent) ||
        ts.isPropertyDeclaration(parent) ||
        ts.isMethodDeclaration(parent) ||
        ts.isJsxAttribute(parent) ||
        ts.isBindingElement(parent)) &&
      (parent.name === node || parent.propertyName === node)
    ) {
      return false;
    }
    return true;
  }

  function visitReferences(node) {
    if (
      ts.isIdentifier(node) &&
      bindings.has(node.text) &&
      isRenamedReference(node)
    ) {
      const binding = bindings.get(node.text);
      if (ts.isExportSpecifier(node.parent)) {
        warn(node, `${node.text} is re-exported: migrate the export by hand`);
        binding.kept = true;
      } else if (ts.isShorthandPropertyAssignment(node.parent)) {
        replace(node, `${node.text}: ${binding.migration.target}`);
      } else {
        replace(node, binding.migration.target);
      }
    }
    ts.forEachChild(node, visitReferences);
  }

  for (const statement of sourceFile.statements) {
    if (ts.isImportDeclaration(statement)) continue;
    visitElements(statement);
  }
  for (const statement of sourceFile.statements) {
    if (ts.isImportDeclaration(statement)) continue;
    visitReferences(statement);
  }

  // --- imports --------------------------------------------------------------
  const declarationChanges = new Map();
  function changesOf(declaration) {
    if (!declarationChanges.has(declaration)) {
      declarationChanges.set(declaration, {
        remove: new Set(),
        add: new Map(),
        newImports: new Map(),
      });
    }
    return declarationChanges.get(declaration);
  }

  function importResolvingTo(path) {
    const absolute = resolve(dirname(filePath), path);
    return importDeclarations.find(
      (declaration) =>
        declaration.moduleSpecifier.text.startsWith(".") &&
        resolve(dirname(filePath), declaration.moduleSpecifier.text) ===
          absolute,
    );
  }

  for (const binding of bindings.values()) {
    const { declaration, element, source, migration } = binding;
    const changes = changesOf(declaration);
    if (!binding.kept) changes.remove.add(element);
    const { target } = migration;
    if (boundNames.has(target)) continue;
    boundNames.add(target);
    const isType =
      target.endsWith("Props") ||
      element.isTypeOnly ||
      declaration.importClause.isTypeOnly;
    if (source.kind === "package") {
      changes.add.set(target, isType);
      continue;
    }
    const path = source.importPathFor(target);
    const existing = importResolvingTo(path);
    if (
      existing?.importClause.namedBindings &&
      ts.isNamedImports(existing.importClause.namedBindings)
    ) {
      changesOf(existing).add.set(target, isType);
      continue;
    }
    if (!changes.newImports.has(path)) changes.newImports.set(path, new Map());
    changes.newImports.get(path).set(target, isType);
  }

  for (const [declaration, changes] of declarationChanges) {
    const clause = declaration.importClause;
    const namedBindings = clause.namedBindings;
    const specifiers = namedBindings.elements
      .filter((element) => !changes.remove.has(element))
      .map((element) => element.getText(sourceFile));
    for (const [name, isType] of changes.add) {
      specifiers.push(isType && !clause.isTypeOnly ? `type ${name}` : name);
    }
    const newImports = [...changes.newImports].map(([path, names]) => {
      const allTypes = [...names.values()].every(Boolean);
      const list = [...names]
        .map(([name, isType]) => (isType && !allTypes ? `type ${name}` : name))
        .join(", ");
      return `import ${allTypes ? "type " : ""}{ ${list} } from "${path}";`;
    });

    if (specifiers.length === 0 && !clause.name) {
      const end =
        text[declaration.end] === "\n" ? declaration.end + 1 : declaration.end;
      edits.push({
        start: declaration.getStart(sourceFile),
        end,
        text: newImports.map((line) => `${line}\n`).join(""),
      });
      continue;
    }
    if (
      specifiers.length !== namedBindings.elements.length ||
      changes.add.size > 0 ||
      changes.remove.size > 0
    ) {
      replace(namedBindings, `{ ${specifiers.join(", ")} }`);
    }
    if (newImports.length > 0) {
      edits.push({
        start: declaration.end,
        end: declaration.end,
        text: newImports.map((line) => `\n${line}`).join(""),
      });
    }
  }

  // Right to left; at one position the removal runs before the insertion, so
  // an attribute removed at a tag's end does not swallow a className inserted
  // there.
  edits.sort((a, b) => b.start - a.start || b.end - a.end);
  let output = text;
  for (const edit of edits) {
    output = output.slice(0, edit.start) + edit.text + output.slice(edit.end);
  }
  return { output, changed: output !== text, warnings };
}
