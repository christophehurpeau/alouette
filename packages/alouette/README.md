<h1 align="center">
  alouette
</h1>

<p align="center">
  A modern, customizable design system built on top of NativeWind v5 with configurable defaults
</p>

<p align="center">
  <a href="https://npmjs.org/package/alouette"><img src="https://img.shields.io/npm/v/alouette.svg?style=flat-square" alt="npm version"></a>
  <a href="https://npmjs.org/package/alouette"><img src="https://img.shields.io/npm/dw/alouette.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://npmjs.org/package/alouette"><img src="https://img.shields.io/node/v/alouette.svg?style=flat-square" alt="node version"></a>
  <a href="https://npmjs.org/package/alouette"><img src="https://img.shields.io/npm/types/alouette.svg?style=flat-square" alt="types"></a>
</p>

## Introduction

Alouette provides a comprehensive set of universal components that render on both
web and React Native, styled entirely through Tailwind `className` via
[NativeWind v5](https://www.nativewind.dev/). Themes, accents, and design tokens
ship as CSS custom properties that cascade through the tree, so components stay
declarative and consistent across platforms.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.18.0 (includes Corepack for package management)
- A React Native / Expo app using Metro, or a web app using NativeWind v5

### Installation

```bash
npm install alouette
# or with yarn
yarn add alouette
```

`alouette-icons` is installed automatically as a dependency.

Install the peer dependencies if your app does not already provide them:

```bash
npm install nativewind@5.0.0-preview.4 tailwindcss@^4 \
  react-native-reanimated react-native-svg
```

`expo-web-browser`, `react-dom`, and `react-native-reanimated` are optional peers
— add them only if your target needs them (`react-dom` for web, `react-native-reanimated`
for native animations, `expo-web-browser` for `ExternalLink`).

### Configuration

Alouette relies on NativeWind v5's Metro + PostCSS pipeline. NativeWind discovers
themes and utilities from the imported `global.css` and scans your sources via
`@source` directives — there is no JS config to maintain.

1. **Metro** — wrap your config with the Alouette helper:

```js
// metro.config.cjs
const { withAlouetteConfig } = require("alouette/metro.cjs");
const { getDefaultConfig } = require("expo/metro-config.js");

module.exports = withAlouetteConfig(getDefaultConfig(__dirname));
```

`withAlouetteConfig` currently wraps `withNativewind` and forwards your options
unchanged; use it anyway, so alouette can add required metro wiring later without
a breaking change on your side.

2. **CSS entry** — create a `global.css` that re-exports Alouette's tokens and
   points `@source` at the directories NativeWind should scan for class names:

```css
/* global.css */
@import "alouette/global.css";

@source './src'; /* your own className / tv() literals */
@source '../node_modules/alouette/src'; /* alouette's source — required */
```

Tailwind only emits classes it finds while scanning `@source` paths, so both
your app's source **and** alouette's source must be covered or the matching
utilities are silently purged. In a monorepo where alouette is hoisted to the
repo root `node_modules`, adjust the depth (e.g.
`@source '../../../node_modules/alouette/src'`); a path that resolves to nothing
fails silently with no error.

`alouette/global.css` is a convenience aggregator of `alouette/core.css`
(structural, color-free) + `alouette/default-palette.css` (the default palette in
sRGB hex). Wide-gamut color is opt-in — add
`alouette/default-palette-oklch.css` after it to give web the display-p3 ramp
(see [Color format](#color-format-hex-everywhere-oklch-as-a-web-opt-in)):

```css
@import "alouette/global.css";
@import "alouette/default-palette-oklch.css"; /* optional */
```

To ship your own palette instead of the default, import `core.css` + your own
generated palette CSS — see [Custom palette](#custom-palette-bring-your-own). The
`@source` lines stay the same in every case.

Import it once at your app's entry point:

```ts
import "./global.css";
```

3. **PostCSS** — NativeWind compiles Tailwind through PostCSS on both web and
   native. `@tailwindcss/postcss` ships as a dependency of `alouette`, so you
   only add the config file (use `.mjs` so it loads as ESM regardless of your
   package's `"type"`):

```js
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

4. **Babel** — use the Expo preset and the Reanimated/worklets plugin:

```js
// babel.config.js
export default function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { reanimated: false }]],
    plugins: ["react-native-worklets/plugin"],
  };
}
```

5. **Provider** — wrap your app in `AlouetteProvider`. It applies the OS
   light/dark scheme as the root theme so base tokens resolve app-wide:

```tsx
import { AlouetteProvider } from "alouette";

export function App() {
  return <AlouetteProvider>{/* your app */}</AlouetteProvider>;
}
```

6. **Fonts** — Alouette's typography uses Sora (body/heading) and Chivo Mono
   (mono). On native, load the weight-specific font files (the standalone
   `font-weight` utility has no effect because each weight is a distinct file):

```tsx
import {
  Sora_400Regular as SoraRegular,
  Sora_700Bold as SoraBold,
  Sora_800ExtraBold as SoraExtraBold,
  useFonts,
} from "@expo-google-fonts/sora";
import {
  ChivoMono_400Regular as ChivoMonoRegular,
  ChivoMono_700Bold as ChivoMonoBold,
  ChivoMono_800ExtraBold as ChivoMonoExtraBold,
} from "@expo-google-fonts/chivo-mono";

const [fontsLoaded] = useFonts({
  SoraRegular,
  SoraBold,
  SoraExtraBold,
  ChivoMonoRegular,
  ChivoMonoBold,
  ChivoMonoExtraBold,
});
```

## 🎨 Core Features

### Components

Alouette ships a universal component set styled through `className`:

- **Actions** — `Button`, `ExternalLinkButton`, `InternalLinkButton`, `IconButton`
- **Containers** — `Box`, `InteractiveBox`, `SafeAreaBox`, `Surface`, `ScopedTheme`, `AccentScope`, `PresenceOne`, `PresenceList`
- **Inputs** — `InputText`, `TextArea`, `Switch`
- **Feedback** — `Message`, `InfoMessage`, `ConfirmationMessage`, `WarningMessage`
- **Data** — `PressableBox`, `PressableListItem`
- **Layout** — `GradientBackground`, `GradientScrollView`
- **Primitives** — `View`, `Text`, `Paragraph`, `Icon`, `ScrollView`, `Stack`, `HStack`, `VStack`, `Separator`
- **Responsive** — `SwitchBreakpointsUsingDisplayNone`, `SwitchBreakpointsUsingNull`, `useCurrentBreakpointName`

For detailed examples and API documentation, visit our [Storybook](https://www.chromatic.com/library?appId=679f9e8df3edc5f07975b64a).

### Text styling

`<Text>` has no variant props — style it entirely via `className`. Family and
weight are combined into a single utility (`font-body`, `font-body-bold`,
`font-heading-extrabold`, `font-mono`, …); size uses standard Tailwind
`text-*`; color uses tokens like `text-sharp`, `text-muted`, `text-accent`.

```tsx
import { Text } from "alouette";

<Text className="text-base">Body</Text>;
<Text className="font-heading-extrabold text-4xl">Title</Text>;
<Text className="font-mono text-xs text-muted">Code</Text>;
```

### Theming and accents

Themes are sets of CSS variables (`light`, `dark`, `light_brand`, `dark_info`, …)
applied by `ScopedTheme`. Child components use **base tokens** (`bg-surface`,
`text-accent`, `border-muted`, …) and inherit the correct values from the nearest
theme scope. Components that introduce an accent wrap their children in
`AccentScope`:

```tsx
import { AccentScope, Surface } from "alouette";

<AccentScope accent="info">
  <Surface>{/* children use base tokens */}</Surface>
</AccentScope>;
```

The two platforms resolve a theme differently, and only one of them uses CSS:
web renders the theme name as a className the palette CSS resolves, while native
pushes the theme's variables through NativeWind's `VariableContextProvider`, from
the `themeVariables` map you give `AlouetteProvider`. The `.<theme>` blocks are
therefore emitted inside `@supports (display: contents)`, which the native
compiler drops — native compiles the `@theme` defaults and nothing else, and gets
every themed value from the map.

That also means colors are the one part of alouette you cannot read from JS:
there is no exported token hook, so style every color with a token className.

### Custom palette (bring your own)

An app can generate its own coherent palette for the existing accents (`brand`,
`danger`, `info`, `success`, `warning`, plus `grayscale`) while staying on
alouette's OKLCH ramp — and ship **only** that palette, no default CSS.
A theme has two coupled outputs: the palette **CSS** (what web resolves, and the
source of every `className` token) and the runtime **`themeVariables`** map (what
native resolves through `VariableContextProvider`).
`alouette/theme-generator` produces both from per-accent hue params — the same
module alouette's own `scripts/build-css.ts` uses for the default palette.

The app generates its palette the same way: a build script calls `writeTheme`,
which writes both files to disk. Override only the accents you want to re-color
(the rest inherit alouette's defaults; omit `overrides` entirely to reproduce the
default palette):

```ts
// scripts/build-theme.ts
import { writeTheme } from "alouette/theme-generator";

writeTheme({
  outDir: "src",
  overrides: { brand: { type: "accent", hue: 300 } },
});
```

```json
// package.json
"scripts": {
  "build:theme": "node --experimental-strip-types scripts/build-theme.ts"
}
```

That writes three files, all marked `DO NOT EDIT` and already formatter-stable:
`src/palette.css` + `src/themeVariables.ts` in sRGB hex (complete on their own),
and `src/palette-oklch.css`, the OKLCH / display-p3 overlay. Re-run it whenever
the palette params change, and commit the output. Pass `srgbOnly: true` to skip
the OKLCH file entirely. `generateTheme` returns the same content in memory
(`{ css, oklchCss, themeVariables, oklchThemeVariables }`) if the app would
rather write the files itself.

The OKLCH file is how the palette gets wide-gamut colors on web while staying
renderable on native (see [Color format](#color-format-hex-everywhere-oklch-as-a-web-opt-in)).
Opting in is a CSS import: add `./palette-oklch.css` after `./palette.css`.
There is no OKLCH counterpart to `themeVariables.ts` — the web build of
`AlouetteProvider` ignores `themeVariables` entirely, so the hex map native
consumes is the only one.

Import `alouette/core.css` + your generated palette (instead of
`alouette/global.css`), and pass the generated map to `AlouetteProvider` so
native token reads match your palette CSS:

```css
/* global.css */
@import "alouette/core.css";
@import "./palette.css";

@source './src';
@source '../node_modules/alouette/src';
```

```tsx
import { AlouetteProvider } from "alouette";
import { themeVariables } from "./themeVariables";

export function App() {
  return (
    <AlouetteProvider themeVariables={themeVariables}>
      {/* your app */}
    </AlouetteProvider>
  );
}
```

`PaletteSpec` params per accent: `type` (`"accent"` | `"brightAccent"` |
`"grayscale"`), `hue` (0–360), optional `hueHi` / `hueLo` (hue ramp across the
lightness range) and `intensity` (chroma multiplier). The accent set is fixed —
`generateTheme` re-colors the existing accents, it does not add new ones.

### Color format: hex everywhere, OKLCH as a web opt-in

Every palette is computed in OKLCH and emitted twice:

- **sRGB hex** — the baseline, on every platform. React Native's color parser
  accepts hex / rgb / hsl / hwb only, so `oklch()` must never reach it.
- **OKLCH with display-p3 chroma headroom** — web only. Same lightness and hue
  ramp, more chroma, so accents are visibly more vivid on wide-gamut screens.

A theme has two halves — the palette CSS and the `themeVariables` map — but only
the CSS half has an OKLCH variant in play. Opting in is one extra import, not a
platform check:

|                | palette CSS                               | `themeVariables` map                         |
| -------------- | ----------------------------------------- | -------------------------------------------- |
| hex (default)  | `alouette/default-palette.css`            | `alouette/defaultThemeVariables` (= `…Srgb`) |
| + OKLCH on web | also `alouette/default-palette-oklch.css` | unchanged — the overlay is CSS-only          |

The OKLCH CSS re-declares the same variables inside `@supports (color: oklch(0 0 0))`,
so it is additive: browsers apply the override, and the native compiler drops the
feature query and keeps the hex even if the file ends up in a shared CSS entry.
The map stays on hex in every case — it is read only on native, where `oklch()`
cannot be parsed at all.

Because the map is unambiguously hex, code that _parses_ a token value (a test
reading hex channels, say) can read `alouette/defaultThemeVariables` directly.

### Icons

Icons come from the integrated `alouette-icons` package:

```tsx
import { ArrowLeftRegularIcon } from "alouette-icons/phosphor-icons/ArrowLeftRegularIcon";

function MyComponent() {
  return <ArrowLeftRegularIcon />;
}
```

## 🎯 Examples

### Basic Button

```tsx
import { Button } from "alouette";

function MyComponent() {
  return (
    <Button
      accent="brand"
      text="Click me"
      onPress={() => console.log("Clicked!")}
    />
  );
}
```

### Button with Icon

```tsx
import { Button } from "alouette";
import { ArrowLeftRegularIcon } from "alouette-icons/phosphor-icons/ArrowLeftRegularIcon";

function MyComponent() {
  return (
    <Button accent="brand" icon={<ArrowLeftRegularIcon />} text="Go Back" />
  );
}
```

## 🤖 Using an AI agent?

Alouette ships [skills](https://www.npmjs.com/package/@tanstack/intent) that teach
AI coding agents how to use the design system correctly:

```bash
npx @tanstack/intent@latest install
```

## 🏗️ Architecture

- **Universal Design** — components render across web and native from one API
- **NativeWind v5 styling** — Tailwind `className`; animations are CSS
  `@keyframes` + `--animate-*` tokens, run on native via Reanimated
- **Token-based theming** — CSS custom properties cascade through `ScopedTheme`;
  light/dark + accent scopes
- **Accessibility** — proper ARIA / accessibility attributes
- **Type Safety** — built with TypeScript

## 📚 Documentation

- [Component Documentation](https://www.chromatic.com/library?appId=679f9e8df3edc5f07975b64a)
- [GitHub Repository](https://github.com/christophehurpeau/alouette)

## 📄 License

ISC © [Christophe Hurpeau](https://christophe.hurpeau.com)
