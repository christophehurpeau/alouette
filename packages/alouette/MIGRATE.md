# NativeWind 5.0.0-rc.0

Alouette's `nativewind` peer moves from `5.0.0-preview.4` to `5.0.0-rc.0`. Bump
it in your app, and bump `react-native-css` with it:

| Package            | Before            | After        |
| ------------------ | ----------------- | ------------ |
| `nativewind`       | `5.0.0-preview.4` | `5.0.0-rc.0` |
| `react-native-css` | `3.0.7`           | `3.1.0-rc.0` |

`react-native-css` is not optional to pin. The preview accepted any `^3.0.1`;
the rc declares it as the exact version `3.1.0-rc.0`, so any other version is an
unmet peer.

Nothing else changes. The rc alters none of the API surface Alouette builds on
(`styled`, `VariableContextProvider`, `useUnstableNativeVariable`), and the
generated CSS is byte-identical, so the Metro, PostCSS, Babel and Tailwind setup
in the README stays as it is and no regenerated theme is needed.

## Keep the lightningcss pin

If you pin `lightningcss` to `1.30.x` (react-native-css breaks at runtime on
`>=1.31` with `failed to deserialize Specifier`), keep that pin — this upgrade
does not lift it. The pin has to be a direct dependency of the app so the copy
react-native-css resolves is the pinned one; a bundler elsewhere in the tree
(Vite wants `^1.33.0`) keeps its own newer copy, which is fine.

# Deprecated: Surface, HStack, VStack, Stack, EditableSurface, FormEditableSurface

`Surface` and the stacks are aliases of classes and will be removed in the next
major: a class takes a breakpoint prefix, a prop does not. `EditableSurface` and
`FormEditableSurface` are renamed, since a surface is now a class rather than a
component, and the renamed ones apply no material of their own (pass
`className="surface"`); the old names stay as deprecated aliases, still a
surface, until then.

| Before                                               | After                                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------------------ |
| `<VStack className="gap-m">`                         | `<View className="gap-m">` (a View is already a column)                  |
| `<HStack className="gap-m">`                         | `<View className="flex-row gap-m">`                                      |
| `<Stack>`                                            | `<View className="flex-row flex-wrap">`                                  |
| `<Surface>`                                          | `<Box className="surface">`                                              |
| `<Surface size="sm" variant="lowered" shadow="m">`   | `<Box className="surface surface-sm lowered shadow-m">`                  |
| `HStackProps` / `VStackProps` / `StackProps`         | `ViewProps`                                                              |
| `SurfaceProps`                                       | `BoxProps`                                                               |
| `<EditableSurface>` / `EditableSurfaceProps`         | `<EditableSection className="surface">` / `EditableSectionProps`         |
| `<FormEditableSurface>` / `FormEditableSurfaceProps` | `<FormEditableSection className="surface">` / `FormEditableSectionProps` |

`size`: `xxs` · `xs` · `sm` · `md` · `lg` → `surface-xxs` … `surface-lg`.
`variant`: `highlight` → `bg-highlight`, `highlight-accent` →
`bg-highlight-accent`, `lowered` → `lowered` (ground and inset shadow),
`translucent` → `bg-translucent`, `surface` → nothing.
`shadow`: `none` · `s` · `m` · `l` · `lowered` → `shadow-none` … `shadow-lowered`.

## Codemod

Run from the app, with `typescript` installed (it is only used to parse):

```sh
npx alouette-codemod surface-and-stacks src
# preview first, or migrate one part at a time:
npx alouette-codemod surface-and-stacks --dry-run src
npx alouette-codemod surface-and-stacks --only=stacks src
npx alouette-codemod surface-and-stacks --only=surface src
npx alouette-codemod surface-and-stacks --only=editable src
```

Then run your formatter and linter: added imports are appended to the existing
`alouette` import and may need reordering.

The codemod prints a `file:line` warning where it cannot finish the job:

- **A `Surface` with a dynamic `size` / `variant` / `shadow`** (`size={size}`) is
  left as is; map the value to a class yourself.
- **Props spread onto a `Surface`** may carry those props; check them.
- **A dynamic `className` on a stack** becomes `` `flex-row ${expression ?? ""}` ``.
  `View` does not merge classes, so if the expression can set its own direction
  or wrap, move `flex-row` into it instead.
- **A re-export** (`export { HStack }`) is kept; migrate it by hand.

# To 19.0.0

## Spacing

$0.25 -> xxs
$0.5 -> xs
$1.0 -> m
$1.5 -> l
$2.0 -> xl
$3.0 -> 3xl
$4.0 -> 4xl

## Texts

### Heading

size="$xs" → "text-lg"
size="$sm" → "text-xl"
size="$md" → "text-2xl"
size="$lg" → "text-3xl"
size="$xl" → "text-4xl"
size="$xxl" → "text-5xl"
size="$xxxl" → "text-6xl"

## Weight

weight="$extraBold" → font-body-extrabold or font-heading-extrabold
