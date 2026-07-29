---
name: alouette-theming
description: >
  Re-theme a subtree with accents (brand, danger, info, success, warning) and
  light/dark modes. Use the accent prop, AccentScope, or ScopedTheme; children
  always consume base tokens (bg-surface, text-accent, text-sharp, text-muted,
  border-muted). Read token values in JS with useThemeToken; read the current
  mode with useCurrentMode. For an accent that toggles at runtime (e.g. on
  hover) without remounting the subtree, use StableAccentScope instead of
  AccentScope. Load when applying colors, accents, dark mode, or reading a
  theme color for a non-className prop.
type: core
library: alouette
library_version: "20.8.0"
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/AccentScope.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/StableAccentScope.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/ScopedTheme.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/core/AlouetteConfig.ts"
  - "christophehurpeau/alouette:packages/alouette/src/core/useThemeToken.ts"
  - "christophehurpeau/alouette:packages/alouette/src/theme-generator/generateTheme.ts"
  - "christophehurpeau/alouette:packages/alouette/src/theme-generator/writeTheme.ts"
  - "christophehurpeau/alouette:CLAUDE.md"
---

# alouette — Theming with modes and accents

alouette colors come from theme tokens, not the raw Tailwind palette. A theme is
a light/dark mode optionally combined with an accent. Tokens cascade down the
tree: components use **base tokens** (`bg-surface`, `text-accent`, `text-sharp`,
`text-muted`, `border-muted`) and inherit the resolved value from the nearest
scope. Setting an accent re-themes a whole subtree.

`Accent` = `"brand" | "danger" | "info" | "success" | "warning"`.

## Setup

Most alouette components — `Text`, `Surface`, `Box`, `Button`, `Message`, … —
take an `accent` prop that re-themes their subtree. Prefer the prop:

```tsx
import { Surface, Text } from "alouette";

<Surface accent="danger">
  <Text className="text-accent">Something went wrong</Text>
</Surface>

<Text accent="brand" className="text-accent">Brand-accented text</Text>;
```

Use `AccentScope` only to re-theme a group of children at once, or children that
don't accept an `accent` prop:

```tsx
import { AccentScope } from "alouette";

<AccentScope accent="brand">
  <Header />
  <Body />
</AccentScope>;
```

## Core Patterns

### Read a token value in JS for a non-className prop

```tsx
import { useThemeToken } from "alouette";

const accentColor = useThemeToken("--color-accent");
const [surface, sharp] = useThemeToken(["--color-surface", "--color-sharp"]);
```

Use this only for props that cannot take a className (gradient stops,
`placeholderTextColor`, native `Switch` colors, SVG tint). Everything else uses
a className token.

### Force a mode on a subtree

```tsx
import { AccentScope } from "alouette";

<AccentScope mode="dark" accent="brand">
  {children}
</AccentScope>;
```

### Read the active mode / theme

```tsx
import { useCurrentMode, useCurrentTheme } from "alouette";

const mode = useCurrentMode();   // "light" | "dark"
const theme = useCurrentTheme(); // e.g. "dark_brand"
```

### Toggle an accent without remounting the subtree

```tsx
import { StableAccentScope } from "alouette";

const [pendingRemoval, setPendingRemoval] = useState(false);

<StableAccentScope accent={pendingRemoval ? "danger" : undefined}>
  <IconButton
    onHoverIn={() => setPendingRemoval(true)}
    onHoverOut={() => setPendingRemoval(false)}
    onPress={onRemove}
  />
</StableAccentScope>;
```

### Ship a custom palette for the existing accents

An app can re-color the existing accents (`brand`, `danger`, `info`, `success`,
`warning`, plus `grayscale`) on alouette's OKLCH ramp and ship only its own
palette — no default CSS. A theme has two coupled outputs: the palette **CSS**
and the runtime **`themeVariables`** map. The app generates them the way alouette
generates its own default palette — a build script calling
`alouette/theme-generator`. `writeTheme` writes both files; override only the
accents you want to change (the rest inherit the defaults):

```ts
// scripts/build-theme.ts — run via a package.json script:
// "build:theme": "node --experimental-strip-types scripts/build-theme.ts"
import { writeTheme } from "alouette/theme-generator";

writeTheme({
  outDir: "src",
  overrides: { brand: { type: "accent", hue: 300 } },
});
```

That writes `src/palette.css` + `src/themeVariables.ts` (names configurable via
`cssFileName` / `themeVariablesFileName`), headed `DO NOT EDIT` and already
formatter-stable — commit them and re-run the script when the params change.
`generateTheme(overrides)` returns the same `{ css, themeVariables }` in memory
for an app that writes the files itself. Both are node-only build-time APIs:
never import `alouette/theme-generator` from app code.

Then import `alouette/core.css` + the generated palette (instead of
`alouette/global.css`) and pass the map to `AlouetteProvider` so JS token reads
(`useThemeToken`, gradients, native `Switch`) match the palette CSS:

```css
/* global.css */
@import "alouette/core.css";
@import "./palette.css";
```

```tsx
import { AlouetteProvider } from "alouette";
import { themeVariables } from "./themeVariables";

<AlouetteProvider themeVariables={themeVariables}>{/* app */}</AlouetteProvider>;
```

`PaletteSpec` per accent: `type` (`"accent"` | `"brightAccent"` | `"grayscale"`),
`hue` (0–360), optional `hueHi` / `hueLo` (hue ramp across lightness) and
`intensity` (chroma multiplier). The accent set is fixed — this re-colors the
existing accents, it does not add new ones. The palette CSS and the map are two
halves of one theme: `themeVariables` is a required `AlouetteProvider` prop, so
shipping custom CSS while still passing `alouette/defaultThemeVariables` type-
checks but leaves every JS token read on the default colors.

## Common Mistakes

### HIGH Hardcoding raw Tailwind colors instead of tokens

Wrong:

```tsx
<View className="bg-blue-500">
  <Text className="text-gray-600">Hi</Text>
</View>
```

Correct:

```tsx
<Surface accent="brand">
  <Text className="text-accent">Hi</Text>
</Surface>
```

Raw palette classes (`bg-blue-500`, `text-gray-600`) ignore the alouette theme,
so they do not adapt to mode or accent and break dark mode.

Source: CLAUDE.md (Theming and semantic roles); src/ui/containers/AccentScope.tsx

### MEDIUM Setting color manually instead of an accent

Wrong:

```tsx
<Box>
  <Text style={{ color: "#c00" }}>Error</Text>
</Box>
```

Correct:

```tsx
<Box accent="danger">
  <Text className="text-accent">Error</Text>
</Box>
```

Setting `accent` re-themes the subtree so children resolve base tokens against
the accent + current mode; a hardcoded color duplicates theme logic and skips
mode adaptation.

Source: packages/alouette/src/ui/containers/Box.tsx, AccentScope.tsx

### MEDIUM Wrapping an accent-capable component in AccentScope

Wrong:

```tsx
<AccentScope accent="brand">
  <Text className="text-accent">Title</Text>
</AccentScope>
```

Correct:

```tsx
<Text accent="brand" className="text-accent">Title</Text>
```

`Text`, `Surface`, `Box`, `Button`, `Message` and others accept `accent`
directly. Reserve `AccentScope` for grouping several children or wrapping ones
that don't take the prop.

Source: packages/alouette/src/ui/primitives/Text.tsx, ui/containers/AccentScope.tsx

### MEDIUM Using nativewind useUnstableNativeVariable for token values

Wrong:

```tsx
import { useUnstableNativeVariable } from "nativewind";
const color = useUnstableNativeVariable("--color-accent");
```

Correct:

```tsx
import { useThemeToken } from "alouette";
const color = useThemeToken("--color-accent");
```

`useThemeToken` reads alouette's generated theme map keyed by the active theme;
it works on web and native and is stable, unlike nativewind's unstable hook.

Source: packages/alouette/src/core/useThemeToken.ts

### MEDIUM Custom palette CSS paired with the default themeVariables

Wrong — importing a generated palette CSS but leaving `AlouetteProvider` on the
default map:

```tsx
// global.css imports core.css + ./palette.css, but:
import { themeVariables } from "alouette/defaultThemeVariables";
<AlouetteProvider themeVariables={themeVariables}>{/* app */}</AlouetteProvider>;
```

Correct:

```tsx
import { themeVariables } from "./themeVariables"; // writeTheme output
<AlouetteProvider themeVariables={themeVariables}>{/* app */}</AlouetteProvider>;
```

A theme has two coupled outputs: the palette CSS (className tokens) and the
`themeVariables` map (JS token reads — gradients, native `Switch`,
`placeholderTextColor`, SVG tint). The prop is required, so this fails silently
rather than loudly: the default map type-checks fine, and every JS read resolves
to the default colors while classNames use the custom palette — gradients and
native controls mismatch the rest of the UI. Both must come from the same
`writeTheme` call — that is why it writes the pair.

Source: packages/alouette/src/core/ThemeVariablesContext.ts, theme-generator/writeTheme.ts

### MEDIUM Expecting var() chains to resolve on native

Wrong:

```css
--color-accent: var(--color-brand);
```

Correct:

```css
--color-accent: #2563eb;
```

On native, NativeWind resolves CSS variables from a lookup table and cannot
follow a `var()` that points at another `var()`. alouette sub-themes use
concrete hex values per mode+accent for this reason.

Source: CLAUDE.md (Native constraint: no CSS variable chains)

### MEDIUM Using AccentScope for an accent that toggles at runtime

Wrong:

```tsx
<AccentScope accent={hovered ? "danger" : undefined}>
  <RowContent />
</AccentScope>
```

Correct:

```tsx
<StableAccentScope accent={hovered ? "danger" : undefined}>
  <RowContent />
</StableAccentScope>
```

`AccentScope` only renders its `ScopedTheme` wrapper when `accent` is set —
it returns `children` unwrapped otherwise. Toggling `accent` therefore mounts
or unmounts that wrapper in either direction, remounting the subtree and
dropping focus from any input inside. `StableAccentScope` always keeps
`ScopedTheme` mounted, falling back to the inherited theme when `accent` is
unset, so toggling only changes the theme prop. Prefer `AccentScope`
when the accent is fixed; reach for `StableAccentScope` only when it toggles.

Source: packages/alouette/src/ui/containers/StableAccentScope.tsx

## References

- [Token catalog](references/tokens.md) — color, spacing, radius and shadow token names.

See also: alouette-typography/SKILL.md — color tokens are applied through Text.
