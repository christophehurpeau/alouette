---
name: alouette-theming
description: >
  Re-theme a subtree with accents (brand, danger, info, success, warning) and
  light/dark modes. Use the accent prop, AccentScope, or ScopedTheme; children
  always consume base tokens (bg-surface, text-accent, text-sharp, text-muted,
  border-muted). Tokens are className-only: alouette exports no JS token-read
  hook. Read the current mode with useCurrentMode. For an accent that toggles at
  runtime (e.g. on hover) without remounting the subtree, use StableAccentScope
  instead of AccentScope; inside a portal (a modal or any other overlay), where
  the scope escapes the themed subtree, use PortalAccentScope. Load when applying
  colors, accents or dark mode, or when shipping a custom palette.
type: core
library: alouette
library_version: "22.6.0"
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/AccentScope.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/StableAccentScope.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/PortalAccentScope.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/PortalAccentScope.web.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/ScopedTheme.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/ScopedTheme.web.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/core/AlouetteConfig.ts"
  - "christophehurpeau/alouette:packages/alouette/src/core/AlouetteProvider.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/core/NativeThemeVariablesContext.ts"
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

### Tokens are className-only

alouette exports **no** hook to read a token value in JS. Apply every color
through a className (`bg-surface`, `text-accent`, `border-muted`) — that is the
only path that works on both platforms, because the two resolve a theme
differently:

- **web** — `ScopedTheme` renders a `display: contents` element carrying the
  theme name as a className; the palette CSS resolves the variables. The
  `themeVariables` map is not consulted at all.
- **native** — `ScopedTheme` pushes the theme's variables through NativeWind's
  `VariableContextProvider`, from the `themeVariables` map given to
  `AlouetteProvider`.

The handful of props that cannot take a className (native `Switch` colors,
`placeholderTextColor`, SVG tint, the Expo browser chrome) are handled inside
alouette itself, on native only; web styles them with CSS.

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

### Theme a portalled subtree

A portal renders outside the themed DOM subtree, so on web the theme className of
its ancestors no longer applies and the accent has to be rebuilt from the base
mode. `PortalAccentScope` does that — it is what `Modal` uses internally, so
`Modal`'s own `accent` prop already works. Reach for it directly only when you
portal something yourself:

```tsx
import { PortalAccentScope } from "alouette";

<RNModal transparent visible={visible}>
  <PortalAccentScope accent="danger">{overlay}</PortalAccentScope>
</RNModal>;
```

Web nests two scopes — the outer one re-declares the full `light`/`dark` token
set the portal escaped, the inner one layers the accent on top — and both stay
mounted, so toggling `accent` never remounts the subtree. Native has no portal
problem (`ScopedTheme` pushes merged variables through React context, which
crosses wherever the host renders the tree), so there it is a single
`StableAccentScope`.

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

That writes `src/palette.css` + `src/themeVariables.ts` (sRGB hex, complete on
their own) and `src/palette-oklch.css` (the OKLCH / display-p3 overlay) — names
configurable via `cssFileName` / `themeVariablesFileName`, headed `DO NOT EDIT`
and already formatter-stable. Commit them and re-run the script when the params
change. `srgbOnly: true` skips the OKLCH file. `generateTheme(overrides)` returns
the same content in memory
(`{ css, oklchCss, themeVariables, oklchThemeVariables }`) for an app that writes
the files itself. Both are node-only build-time APIs: never import
`alouette/theme-generator` from app code.

The OKLCH half is opt-in, web-only and CSS-only: `@import "./palette-oklch.css"`
after `./palette.css` enables it. The `themeVariables` map has no OKLCH
counterpart — web resolves every token from the CSS, and only native reads the
map. See "Color format" below.

Then import `alouette/core.css` + the generated palette (instead of
`alouette/global.css`) and pass the map to `AlouetteProvider` so native token
reads (gradients, `Switch`, `placeholderTextColor`, SVG tint) match the palette
CSS:

```css
/* global.css */
@import "alouette/core.css";
@import "./palette.css";
@import "./palette-oklch.css"; /* optional wide-gamut half */
```

```tsx
import { AlouetteProvider, type ThemeVariablesMap } from "alouette";
import { themeVariables } from "./themeVariables";

<AlouetteProvider themeVariables={themeVariables}>{/* app */}</AlouetteProvider>;
```

`ThemeVariablesMap` is exported for code that passes the map around (a theme
switcher, a test helper). The `themeVariables.ts` that `writeTheme` emits already
imports it from `alouette` and annotates the map with it.

`PaletteSpec` per accent: `type` (`"accent"` | `"brightAccent"` | `"grayscale"`),
`hue` (0–360), optional `hueHi` / `hueLo` (hue ramp across lightness) and
`intensity` (chroma multiplier). The accent set is fixed — this re-colors the
existing accents, it does not add new ones. The palette CSS and the map are two
halves of one theme: `themeVariables` is a required `AlouetteProvider` prop, so
shipping custom CSS while still passing `alouette/defaultThemeVariables`
type-checks but leaves every **native** token read on the default colors (web is
unaffected — it never reads the map).

### Color format: OKLCH on web, hex on native

Every palette is computed in OKLCH and emitted twice — sRGB hex (what native
renders; React Native's color parser takes hex/rgb/hsl/hwb only) and OKLCH with
display-p3 chroma headroom (what web renders: same lightness and hue ramp, more
vivid accents on wide-gamut screens). Hex is the baseline; OKLCH is a separate
opt-in stylesheet, imported after the hex palette:

| | palette CSS | `themeVariables` map |
| --- | --- | --- |
| web | `palette-oklch.css` / `alouette/default-palette-oklch.css`, if imported | not read — web theming is CSS only |
| native | `palette.css` (plain hex) | `themeVariables.ts` (hex) |

The OKLCH CSS is additive — it re-declares the same variables behind
`@supports (color: oklch(0 0 0))`, and the native compiler drops the feature query
and keeps the hex. The palette CSS uses the same trick for the twelve `.<theme>`
blocks, which are a web-only mechanism (native themes through
`VariableContextProvider`, not classNames): they sit behind
`@supports (display: contents)` and never reach the native bundle — which is why
native needs the `themeVariables` map at all.

The map has no OKLCH variant: the web build of `AlouetteProvider` ignores
`themeVariables` entirely, so `writeTheme` emits the hex map only — the one
native consumes. The default is `alouette/defaultThemeVariables` (hex, every
platform).

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

### HIGH Reading a token value in JS instead of applying a className

Wrong:

```tsx
import { useUnstableNativeVariable } from "nativewind";
const color = useUnstableNativeVariable("--color-accent");
<Text style={{ color }}>Hi</Text>;
```

Correct:

```tsx
<Text className="text-accent">Hi</Text>
```

alouette exports no token-read hook (`useThemeToken` was removed in 21.0.0).
Reaching into NativeWind's variable context directly is a native-only path: on
web the theme is a className resolved by the palette CSS and nothing populates
that context, so the read comes back `undefined` and the text falls back to an
unthemed color. Style with the token className on both platforms.

Source: packages/alouette/src/ui/containers/ScopedTheme.web.tsx, core/AlouetteProvider.web.tsx

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

A theme has two coupled outputs: the palette CSS (className tokens, the only
thing web uses) and the `themeVariables` map (native token reads — gradients,
`Switch`, `placeholderTextColor`, SVG tint). The prop is required, so this fails
silently rather than loudly, and **only on device**: the default map type-checks
fine, classNames use the custom palette, and the few native reads resolve to the
default colors — so native gradients and controls mismatch the rest of the UI
while web looks correct. Both must come from the same `writeTheme` call — that is
why it writes the pair.

Source: packages/alouette/src/core/NativeThemeVariablesContext.ts, theme-generator/writeTheme.ts

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
