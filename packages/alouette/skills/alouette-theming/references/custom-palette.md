# Custom palette — re-coloring the existing accents

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
map. See "Color format" in SKILL.md.

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

<AlouetteProvider themeVariables={themeVariables}>
  {/* app */}
</AlouetteProvider>;
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

Source: packages/alouette/src/theme-generator/writeTheme.ts; theme-generator/generateTheme.ts
