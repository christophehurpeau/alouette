---
name: alouette-setup
description: >
  Wire alouette into an Expo / React Native app: withAlouetteConfig metro
  plugin, import alouette/global.css with @source globs, AlouetteProvider
  (themeVariables is a required prop — pass the map from
  alouette/defaultThemeVariables), SafeAreaProvider, and loading Sora / Chivo
  Mono font weights. Load when bootstrapping a project, when alouette classes
  render unstyled, or when fonts/bold weights look wrong. Covers ios, android
  and web.
type: lifecycle
library: alouette
library_version: "21.0.0"
sources:
  - "christophehurpeau/alouette:packages/storybook-native-app/metro.config.cjs"
  - "christophehurpeau/alouette:packages/storybook-native-app/postcss.config.mjs"
  - "christophehurpeau/alouette:packages/storybook-native-app/src/global.css"
  - "christophehurpeau/alouette:packages/storybook-native-app/src/App.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/core/AlouetteProvider.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/core/AlouetteProvider.web.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/core/NativeThemeVariablesContext.ts"
  - "christophehurpeau/alouette:packages/alouette/metro.cjs"
---

# alouette — Setup

alouette is styled with NativeWind v5 / Tailwind CSS v4. An app needs five
things wired before any component renders correctly: the metro plugin, the
PostCSS config, the CSS entry with source globs, the provider, and the fonts.
Everything targets ios/android/web from the same code.

## Setup

`metro.config.cjs`:

```js
const { withAlouetteConfig } = require("alouette/metro.cjs");
const { getDefaultConfig } = require("expo/metro-config.js");

const config = getDefaultConfig(__dirname);

module.exports = withAlouetteConfig(config);
```

`postcss.config.mjs` at the **app package root** — this is what actually runs
Tailwind. `@tailwindcss/postcss` ships as a dependency of `alouette`, so apps do
not install it; they only add this config file:

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

Use the `.mjs` extension so it loads as ESM regardless of the package's `"type"`
field.

`src/global.css` (imported once, at the app entry). Add an `@source` for
**alouette's source** and one for **your own app source** — both are scanned
independently of the JS bundle, and anything not covered is purged:

```css
@import "alouette/global.css";

@source "./**/*.{ts,tsx}"; /* the app's own className / tv() literals */
@source "../node_modules/alouette/src/**/*.{ts,tsx,js}"; /* alouette source */
```

`alouette/global.css` is an aggregator of `alouette/core.css` (structural,
color-free) + `alouette/default-palette.css` (the default palette, sRGB hex).
Wide-gamut color is opt-in — add `@import "alouette/default-palette-oklch.css";`
after it to give web the display-p3 ramp. To ship a custom palette instead of the
default, import `core.css` + your own generated palette CSS and pass the generated
`themeVariables` to `AlouetteProvider` — see alouette-theming/SKILL.md. The
`@source` lines are unchanged.

In a monorepo where alouette is hoisted to the **repo root** `node_modules`
(Yarn `node-modules` linker, pnpm hoisted, etc.), the path resolves from the
repo root, not the app — adjust the depth accordingly:

```css
@source "../../../node_modules/alouette/src/**/*.{ts,tsx,js}";
```

A wrong glob matches zero files and fails **silently** (no error) — utilities
are simply purged and components render unstyled.

App entry — load fonts (native), then wrap the tree in `AlouetteProvider`:

```tsx
import "./global.css";
import {
  Sora_400Regular as SoraRegular,
  Sora_700Bold as SoraBold,
  Sora_800ExtraBold as SoraExtraBold,
  useFonts,
} from "@expo-google-fonts/sora";
import { AlouetteProvider } from "alouette";
import { themeVariables } from "alouette/defaultThemeVariables";

export function App() {
  // Native font loading. On web, load the same fonts via a Google Fonts
  // <link> instead (see "Web: load fonts from Google Fonts" below).
  const [fontsLoaded] = useFonts({ SoraRegular, SoraBold, SoraExtraBold });
  if (!fontsLoaded) return null;

  return (
    <AlouetteProvider themeVariables={themeVariables}>
      <Screen />
    </AlouetteProvider>
  );
}
```

`AlouetteProvider` reads the OS color scheme (`useColorScheme`) and applies
`light` or `dark` as the root theme, so base tokens resolve app-wide.

`themeVariables` is **required** by the prop type on every platform, but it is
consumed **only on native**, where it is the mirror of the palette CSS for the
props that can't take a className (`placeholderTextColor`, native `Switch`
colors, gradient stops, SVG tint). The web build of `AlouetteProvider` ignores
it: web theming is a className the palette CSS resolves. Pass the map that
matches the palette CSS the app imports:

| Palette              | CSS                                             | `themeVariables`                                       |
| -------------------- | ----------------------------------------------- | ------------------------------------------------------ |
| default              | `alouette/global.css`                           | `themeVariables` from `alouette/defaultThemeVariables`  |
| default + wide gamut | \+ `alouette/default-palette-oklch.css`         | unchanged — the overlay is CSS-only                     |
| the app's own        | `alouette/core.css` + its generated palette CSS | its generated `themeVariables` module                   |

The default map lives at the `alouette/defaultThemeVariables` subpath — it is not
re-exported from the `alouette` root entry. It is sRGB hex on every platform,
which is the only format React Native can parse; the wide-gamut ramp is purely a
web stylesheet and needs no matching map.

An app that ships its own palette does not generate it at runtime: a build script
calls `writeTheme` from `alouette/theme-generator`, which writes **both** halves
to disk — the palette CSS (plus an optional OKLCH overlay, `palette-oklch.css`)
and a `themeVariables` module in hex — the way alouette's own
`scripts/build-css.ts` writes the default palette. The app imports the generated
files:

```ts
// scripts/build-theme.ts
import { writeTheme } from "alouette/theme-generator";

writeTheme({ outDir: "src", overrides: { brand: { type: "accent", hue: 300 } } });
```

```css
/* src/global.css — core.css + the generated palette, not alouette/global.css */
@import "alouette/core.css";
@import "./palette.css"; /* writeTheme output */
@import "./palette-oklch.css"; /* optional wide-gamut half */
```

```tsx
import { AlouetteProvider } from "alouette";
import { themeVariables } from "./themeVariables"; // writeTheme output

<AlouetteProvider themeVariables={themeVariables}>
  <Screen />
</AlouetteProvider>;
```

The generated `themeVariables` module is hex on every platform and has no OKLCH
counterpart — the web provider ignores `themeVariables` entirely, so only the hex
map matters. Pass `srgbOnly: true` to skip the OKLCH CSS.

Those two imports are the only wiring difference — everything else on this page
(metro, postcss, `@source` globs, fonts) is identical. See
alouette-theming/SKILL.md for the palette params `writeTheme` takes.

Sora (body + heading) is the only required font. Add Chivo Mono **only if** the
app uses `font-mono` utilities:

```tsx
import {
  ChivoMono_400Regular as ChivoMonoRegular,
  ChivoMono_700Bold as ChivoMonoBold,
  ChivoMono_800ExtraBold as ChivoMonoExtraBold,
} from "@expo-google-fonts/chivo-mono";

useFonts({
  SoraRegular, SoraBold, SoraExtraBold,
  ChivoMonoRegular, ChivoMonoBold, ChivoMonoExtraBold,
});
```

### SafeAreaProvider (only if needed)

Don't add `SafeAreaProvider` preemptively — many setups (e.g. expo-router)
already provide one. Add it only if a component throws a safe-area context error:

```tsx
import { SafeAreaProvider } from "alouette";

<SafeAreaProvider>
  <AlouetteProvider themeVariables={themeVariables}>
    <Screen />
  </AlouetteProvider>
</SafeAreaProvider>;
```

### Web: load fonts from Google Fonts

On web, prefer a Google Fonts stylesheet over `useFonts`. With Expo Router, add
`app/+html.tsx`:

```tsx
import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;700;800&display=swap"
        />
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

Append `&family=Chivo+Mono:wght@400;700;800` to the URL if you use `font-mono`.

## Common Mistakes

### CRITICAL Missing postcss.config — Tailwind never runs

Symptom: components render unstyled (only alouette's hotpink `body` fallback
shows), and the build logs spam `Warning: Unknown at rule: @utility` /
`@source` / `@theme`. Those warnings are the diagnostic signature — Tailwind
directives are reaching lightningcss un-expanded because Tailwind never ran.

Mechanism: `withAlouetteConfig` → `withNativewind` delegates CSS compilation to
Expo's Metro transform worker, which runs Tailwind **only if it finds a
`postcss.config` file at the project root**. Absent → CSS passes straight to
lightningcss verbatim and zero utilities are emitted.

Fix — add `postcss.config.mjs` at the app package root:

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

`@tailwindcss/postcss` is a dependency of `alouette`, so no install is needed.

Source: packages/storybook-native-app/postcss.config.mjs

### CRITICAL global.css missing @source, or wrong path in a monorepo

Wrong (no `@source`, or a path that resolves to nothing):

```css
@import "alouette/global.css";
```

Correct:

```css
@import "alouette/global.css";

@source "./**/*.{ts,tsx}"; /* the app's own classes */
@source "../node_modules/alouette/src/**/*.{ts,tsx,js}"; /* alouette source */
```

Tailwind v4 only emits classes it finds in scanned files. Two failure modes,
both producing the same silent unstyled result with **no error**:

1. No `@source` for alouette's source → every alouette utility is purged.
2. No `@source` for the app's own source → the app's own classes (e.g.
   arbitrary values like `from-[#f39c12]`, `bg-linear-to-t`) are purged while
   alouette's still work — easy to misdiagnose.
3. In a monorepo where alouette is hoisted to the **repo root**
   `node_modules`, `../node_modules/alouette/src` resolves to nothing. Use the
   correct depth, e.g. `@source "../../../node_modules/alouette/src/**/*.{ts,tsx,js}"`.

Note: `@source` is a text-scan of alouette's shipped `src/*.tsx` (the verbatim
`className` / `tv()` string literals) — independent of the JS bundle, which
Metro resolves to the compiled `dist`. The two pipelines are decoupled, which is
why the scan targets `src` and not the build output.

Source: packages/storybook-native-app/src/global.css

### CRITICAL Metro config omits withAlouetteConfig

Wrong:

```js
const { getDefaultConfig } = require("expo/metro-config.js");
module.exports = getDefaultConfig(__dirname);
```

Correct:

```js
const { withAlouetteConfig } = require("alouette/metro.cjs");
const { getDefaultConfig } = require("expo/metro-config.js");
module.exports = withAlouetteConfig(getDefaultConfig(__dirname));
```

`withAlouetteConfig` enables the NativeWind / react-native-css transform; without
it, `className` styles never compile on native.

Source: packages/storybook-native-app/metro.config.cjs, packages/alouette/metro.cjs

### CRITICAL App tree not wrapped in AlouetteProvider

Wrong:

```tsx
export function App() {
  return <Screen />;
}
```

Correct:

```tsx
import { AlouetteProvider } from "alouette";
import { themeVariables } from "alouette/defaultThemeVariables";

export function App() {
  return (
    <AlouetteProvider themeVariables={themeVariables}>
      <Screen />
    </AlouetteProvider>
  );
}
```

`AlouetteProvider` applies the OS light/dark scheme as the root `ScopedTheme`.
Without it, base tokens (`bg-surface`, `text-sharp`, `text-accent`) have no
resolved values and components render with missing colors.

Source: packages/alouette/src/core/AlouetteProvider.tsx

### CRITICAL AlouetteProvider without themeVariables

Wrong:

```tsx
<AlouetteProvider>
  <Screen />
</AlouetteProvider>
```

Correct:

```tsx
import { themeVariables } from "alouette/defaultThemeVariables";

<AlouetteProvider themeVariables={themeVariables}>
  <Screen />
</AlouetteProvider>;
```

`themeVariables` has no default: the provider feeds it straight into
`NativeThemeVariablesContext`, whose context default is unset. Omitting it is a
type error, and on native `ScopedTheme` then indexes into an undefined map and
throws (web survives it — the web provider never reads the prop, which is
exactly how this ships broken to device after testing fine in a browser). Pass
the map matching the palette CSS the app imports — the
default palette's map from `alouette/defaultThemeVariables` (not exported from
the `alouette` root entry), or, for a custom palette, the `themeVariables` module
`writeTheme` generated alongside the palette CSS. Don't call into
`alouette/theme-generator` here: it is a node-only build-time API, not a runtime
call.

Source: packages/alouette/src/core/AlouetteProvider.tsx, src/core/NativeThemeVariablesContext.ts

### HIGH Bold / extrabold fonts not loaded

Wrong:

```tsx
useFonts({ SoraRegular: Sora_400Regular });
```

Correct:

```tsx
useFonts({
  SoraRegular: Sora_400Regular,
  SoraBold: Sora_700Bold,
  SoraExtraBold: Sora_800ExtraBold,
});
```

On native, bold and extrabold are distinct font files. If only the regular
weight is loaded, `font-body-bold` / `font-heading-extrabold` silently fall back
to regular. (Load the matching Chivo Mono weights too, but only if the app uses
`font-mono`.)

Source: packages/storybook-native-app/src/App.tsx

See also: alouette-theming/SKILL.md — once setup is done, the token/accent model
is what you style with.
