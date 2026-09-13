/* eslint-disable import-x/no-extraneous-dependencies, no-template-curly-in-string */
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { transformSurfaceAndStacks } from "./surface-and-stacks.mjs";

function run(text, { filePath = "/app/src/Screen.tsx", groups } = {}) {
  return transformSurfaceAndStacks(text, filePath, ts, { groups });
}

describe("stacks", () => {
  it("turns HStack into a flex-row View and VStack into a View", () => {
    const { output } = run(`import { HStack, Text, VStack } from "alouette";

export function Screen() {
  return (
    <VStack className="gap-m">
      <HStack className="items-center">
        <Text>Hi</Text>
      </HStack>
      <HStack />
    </VStack>
  );
}
`);
    expect(output).toBe(`import { Text, View } from "alouette";

export function Screen() {
  return (
    <View className="gap-m">
      <View className="flex-row items-center">
        <Text>Hi</Text>
      </View>
      <View className="flex-row" />
    </View>
  );
}
`);
  });

  it("keeps a direction the caller already wrote instead of adding flex-row", () => {
    const { output } = run(`import { HStack, Stack } from "alouette";
<HStack className="flex-col md:flex-row" />;
<Stack className="flex-nowrap" />;
`);
    expect(output).toBe(`import { View } from "alouette";
<View className="flex-col md:flex-row" />;
<View className="flex-row flex-nowrap" />;
`);
  });

  it("prepends to a dynamic className and warns", () => {
    const { output, warnings } = run(`import { HStack } from "alouette";
<HStack className={styles.row()} />;
`);
    expect(output).toContain('className={`flex-row ${styles.row() ?? ""}`}');
    expect(warnings).toHaveLength(1);
    expect(warnings[0].line).toBe(2);
  });

  it("reuses a View that is already imported", () => {
    const { output } = run(`import { View } from "react-native";
import { VStack } from "alouette";
<VStack><View /></VStack>;
`);
    expect(output).toBe(`import { View } from "react-native";
<View><View /></View>;
`);
  });

  it("renames the props types and non-JSX references", () => {
    const { output } = run(`import { HStack, type HStackProps } from "alouette";
type Meta = { component: typeof HStack };
function Row(props: HStackProps) {}
`);
    expect(output).toBe(`import { View, type ViewProps } from "alouette";
type Meta = { component: typeof View };
function Row(props: ViewProps) {}
`);
  });

  it("points an internal relative import at primitives/View", () => {
    const { output } = run(
      `import { Text } from "../primitives/Text";
import { HStack, VStack } from "../stacks/stacks";
<VStack><HStack /></VStack>;
`,
      { filePath: "/repo/packages/alouette/src/ui/data/Card.tsx" },
    );
    expect(output).toBe(`import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
<View><View className="flex-row" /></View>;
`);
  });
});

describe("surface", () => {
  it("maps the props to utilities in size, variant, shadow order", () => {
    const { output } = run(`import { Surface } from "alouette";
<Surface shadow="l" variant="lowered" size="sm" className="gap-m" accent="info">
  x
</Surface>;
<Surface />;
<Surface variant="surface" />;
`);
    expect(output).toBe(`import { Box } from "alouette";
<Box className="surface surface-sm lowered shadow-l gap-m" accent="info">
  x
</Box>;
<Box className="surface" />;
<Box className="surface" />;
`);
  });

  it("leaves a Surface with a dynamic prop untouched and keeps its import", () => {
    const { output, warnings } = run(`import { Surface } from "alouette";
<Surface size={size} />;
<Surface size="xs" />;
`);
    expect(output).toBe(`import { Surface, Box } from "alouette";
<Surface size={size} />;
<Box className="surface surface-xs" />;
`);
    expect(warnings).toEqual([
      {
        line: 2,
        message:
          "Surface size is not a static, known value: this Surface is left as is",
      },
    ]);
  });

  it("points an internal relative import at containers/Box", () => {
    const { output } = run(
      `import { Surface } from "./Surface";
<Surface size="lg" />;
`,
      { filePath: "/repo/packages/alouette/src/ui/containers/Card.tsx" },
    );
    expect(output).toBe(`import { Box } from "./Box";
<Box className="surface surface-lg" />;
`);
  });

  it("runs one group only", () => {
    const { output } = run(
      `import { HStack, Surface } from "alouette";
<Surface><HStack /></Surface>;
`,
      { groups: ["surface"] },
    );
    expect(output).toBe(`import { HStack, Box } from "alouette";
<Box className="surface"><HStack /></Box>;
`);
  });

  it("renames the editable sections, generic tag and props types included", () => {
    const { output } = run(`import {
  EditableSurface,
  FormEditableSurface,
  type FormEditableSurfaceProps,
} from "alouette";
type Props = FormEditableSurfaceProps<Values>;
<EditableSurface title="t" className="lowered" />;
<FormEditableSurface<Values> title="t">x</FormEditableSurface>;
`);
    expect(output)
      .toBe(`import { EditableSection, FormEditableSection, type FormEditableSectionProps } from "alouette";
type Props = FormEditableSectionProps<Values>;
<EditableSection title="t" className="surface lowered" />;
<FormEditableSection<Values> className="surface" title="t">x</FormEditableSection>;
`);
  });

  it("points internal editable imports at the renamed modules", () => {
    const { output } = run(
      `import { EditableSurface, type EditableSurfaceProps } from "../containers/EditableSurface";
<EditableSurface />;
`,
      { filePath: "/repo/packages/alouette/src/ui/forms/FormCard.tsx" },
    );
    expect(output)
      .toBe(`import { EditableSection, type EditableSectionProps } from "../containers/EditableSection";
<EditableSection className="surface" />;
`);
  });

  it("leaves a file without the components as is", () => {
    const text = 'import { Box } from "alouette";\n<Box />;\n';
    expect(run(text)).toEqual({ output: text, changed: false, warnings: [] });
  });
});
