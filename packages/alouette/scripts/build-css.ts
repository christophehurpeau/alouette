// Generates packages/alouette/src/global.css from defaultColorScales.
// Run via `yarn workspace alouette build:css` (wired in package.json).
//
// Translation from the old Tamagui ColorTheme:
//  - Token names use kebab-case so they fit Tailwind's CSS-variable convention
//    (`--color-x` becomes `bg-x`, `text-x`, `border-x`, etc.).
//  - Tamagui's ":press" suffix becomes "-active" (NativeWind/CSS uses :active).
//  - 12 themes: `light` (default in @theme), `dark` (@variant), and 5 colored
//    themes × 2 modes (e.g. `light_brand`, `dark_brand`).
//
// To add or change a theme, edit `defaultColorScales.ts` and re-run.

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultColorScales } from "../src/config/defaultColorScales.ts";

type Mode = "dark" | "light";
type AccentName =
  | "brand"
  | "danger"
  | "grayscale"
  | "info"
  | "success"
  | "warning";
type ScaleNum = 1 | 10 | 11 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const accentNames: AccentName[] = [
  "grayscale", //equivalent to default
  "brand",
  "info",
  "success",
  "warning",
  "danger",
];

// Suffixes shared by every accent (grayscale = the unprefixed base tokens).
// Used to build light_{accent}/dark_{accent} sub-theme classes that remap base tokens
// to hardcoded accent+mode values — no var() indirection, safe for native.
const accentTokenSuffixes = [
  "screen",
  "surface",
  "highlight",
  "highlight-accent",
  "lowered",
  "screen-gradient-start",
  "screen-gradient-middle",
  "screen-gradient-end",
  "border-muted",
  "border-sharp",
  "interactive-contained-pressable",
  "interactive-contained-hover",
  "interactive-contained-focus",
  "interactive-contained-active",
  "interactive-outlined-pressable",
  "interactive-outlined-hover",
  "interactive-outlined-focus",
  "interactive-outlined-active",
  "interactive-outlined-outline-focus",
  "interactive-active",
  "interactive-pressable",
  "interactive-hover",
  "sharp",
  "accent",
  "accent-muted",
  "on-accent",
  "on-accent-muted",
  "selection",
  // legacy tokens (kept until components are updated)
  "interactive-accent-contained-bg",
  "interactive-accent-contained-bg-hover",
  "interactive-accent-contained-bg-focus",
  "interactive-accent-contained-bg-active",
] as const;

const TRANSLUCENT_DARK = "#1f1e1e55";
const TRANSLUCENT_LIGHT = "#ffffff66";

// Dark and light scales are inverted, so many tokens need different scale numbers per mode.
function color(
  mode: Mode,
  accentName: AccentName,
  scaleDark: ScaleNum,
  scaleLight: ScaleNum = scaleDark,
): string {
  return defaultColorScales[`${accentName}.${mode}`][
    mode === "dark" ? scaleDark : scaleLight
  ];
}

function grayForMode(
  mode: Mode,
  scaleDark: ScaleNum,
  scaleLight: ScaleNum,
): string {
  return color(mode, "grayscale", scaleDark, scaleLight);
}

function buildThemeVars(
  mode: Mode,
  accentName: AccentName,
): Record<string, string> {
  const scale = (scaleDark: ScaleNum, scaleLight: ScaleNum = scaleDark) =>
    color(mode, accentName, scaleDark, scaleLight);

  const grayScale = (scaleDark: ScaleNum, scaleLight: ScaleNum = scaleDark) =>
    grayForMode(mode, scaleDark, scaleLight);
  const name = (name: string) => name; // if we later need to suffix for accents, we can do it here

  const isGrayscale = accentName === "grayscale";

  const bgScreen = scale(2, 3); // bottom dark = 6% light = 92/86%
  const bgSurface = scale(3, 2); // middle dark = 12% light = 96/92%
  const bgHighlight = scale(4, 1); // top or raised dark = 16% light = 100/96%

  return {
    ...(isGrayscale
      ? {
          translucent: mode === "dark" ? TRANSLUCENT_DARK : TRANSLUCENT_LIGHT,
          "disabled-sharp": grayScale(9, 9),
          "disabled-muted": grayScale(9, 7),
          "disabled-interactive": grayScale(7, 6),
          "disabled-interactive-muted": grayScale(4, 4),
          ["muted"]: grayScale(10, 10), // rest dark = 68% light = 30%

          "form-border-disabled": grayScale(7, 6),
          "form-placeholder": grayScale(9, 9),
          "form-disabled-text": grayScale(10, 10),

          "interactive-contained-disabled": grayScale(5, 5),
          "interactive-outlined-disabled": grayScale(6, 6),
          "interactive-accent-contained-bg-disabled": grayScale(5, 3),
          "interactive-accent-outlined-disabled": grayScale(6, 6),
        }
      : {}),

    /* backgrounds */
    [name("screen")]: bgScreen,
    [name("surface")]: bgSurface,
    [name("highlight")]: bgHighlight,
    [name("enabled")]: scale(7, 5),
    [name("highlight-accent")]: scale(4),
    [name("lowered")]: scale(1, 4), // deep, combine with deep shadow dark = 0% light = 82%
    [name("screen-gradient-start")]: scale(3, 4),
    [name("screen-gradient-middle")]: scale(2, 5),
    [name("screen-gradient-end")]: scale(1, 6),

    /* borders */

    [name("border-muted")]: scale(7),
    [name("border-sharp")]: scale(9),

    /* interactive */

    [name("interactive-contained-pressable")]: scale(6, isGrayscale ? 1 : 9),
    [name("interactive-contained-hover")]: scale(7, isGrayscale ? 2 : 8),
    [name("interactive-contained-focus")]: scale(7, isGrayscale ? 2 : 8),
    [name("interactive-contained-active")]: scale(7, isGrayscale ? 3 : 7),

    [name("interactive-outlined-pressable")]: scale(7, 9),
    [name("interactive-outlined-hover")]: scale(9, 7),
    [name("interactive-outlined-focus")]: scale(9, 7),
    [name("interactive-outlined-active")]: scale(9, 7),
    [name("interactive-outlined-outline-focus")]: scale(7),

    [name("interactive-active")]: scale(9),
    [name("interactive-pressable")]: scale(10),
    [name("interactive-hover")]: scale(11),

    /* texts */
    [name("sharp")]: scale(11), // headings, buttons, and important text dark = 96% light = 5%
    [name("accent")]: isGrayscale ? scale(11) : scale(10), // same as sharp in default theme, same as muted in colored themes
    [name("accent-muted")]: scale(10, 9),
    [name("on-accent")]: isGrayscale ? scale(11) : grayScale(11, 1),
    [name("on-accent-muted")]: isGrayscale ? scale(10, 9) : scale(10, 4),

    /* specials */
    [name("selection")]: scale(10) + "40",

    /* LEGACY TO REMOVE */

    /* interactive */

    [name("interactive-accent-contained-bg")]: scale(6, 3),
    [name("interactive-accent-contained-bg-hover")]: scale(7, 2),
    [name("interactive-accent-contained-bg-focus")]: scale(7, 2),
    [name("interactive-accent-contained-bg-active")]: scale(7, 2),
  };
}

function emit(vars: Record<string, string>, indent: string): string {
  return Object.entries(vars)
    .map(([key, value]) => `${indent}--color-${key}: ${value};`)
    .join("\n");
}

const allThemes: [string, Record<string, string>][] = [
  ["light", buildThemeVars("light", "grayscale")],
  ["dark", buildThemeVars("dark", "grayscale")],
];

const [, lightVars] = allThemes.find(([name]) => name === "light")!;

// Duration (ms) of each generic motion. The single source of truth for both the
// CSS @keyframes/--animate-* tokens and the JS `animationDurationsMs` export
// (Presence's `exitDurationMs` must match the exit animation here). Exposed from
// the framework so consumers reference it instead of hardcoding the number — if
// a duration changes, only this value moves.
const animationDurationsMs = {
  slide: 600,
  collapse: 800,
} as const;

// NB: no @custom-variant for dark/themes. Theming is applied via ScopedTheme
// (NativeWind's VariableContextProvider) using the generated themeVariables map,
// not via `dark:`/theme utility variants — so the variants are unused, and
// emitting @custom-variant only triggers "unknown at-rule" warnings downstream.
const css = `/* Generated by scripts/build-css.ts. DO NOT EDIT. */
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/preflight.css' layer(base);
@import 'tailwindcss/utilities.css';
@import 'nativewind/theme';

@theme {
  /* unified alouette type scale — standard Tailwind names, exact pixel values preserved.
     The paired --text-*--line-height modifier is what makes the text-* utility carry a
     default line-height (Tailwind v4 convention). Without it, line-height stays unset.
     Ratios are unitless: web treats them as font-size-relative; on native NativeWind
     multiplies any unitless lineHeight by fontSize, so they behave identically on both platforms.
     Body default is 1.4 (matches the old Tamagui body font); the heading-only display
     sizes (32/40/64px) use the old heading ratios. For headings at shared sizes
     (text-lg/text-xl), add an explicit leading-* class to tighten. */
  --text-xs: 0.75rem;    /* 12px */
  --text-xs--line-height: 1.4;
  --text-sm: 0.875rem;   /* 14px */
  --text-sm--line-height: 1.4;
  --text-base: 1rem;     /* 16px */
  --text-base--line-height: 1.4;
  --text-lg: 1.125rem;   /* 18px */
  --text-lg--line-height: 1.4;
  --text-xl: 1.5rem;     /* 24px */
  --text-xl--line-height: 1.4;
  --text-2xl: 2rem;      /* 32px */
  --text-2xl--line-height: 1.2;
  --text-3xl: 2.5rem;    /* 40px */
  --text-3xl--line-height: 1.1;
  --text-4xl: 3rem;      /* 48px */
  --text-4xl--line-height: 1.1;
  --text-5xl: 4rem;      /* 64px */
  --text-5xl--line-height: 1.1;
  --text-6xl: 5rem;      /* 80px */
  --text-6xl--line-height: 1.1;

  /* radius — alouette scale (16px base) */
  --radius-xs: 0.5rem;
  --radius-sm: 1rem;
  --radius-md: 2rem;
  --radius-lg: 3rem;

  /* box-shadows — multi-layer with inset highlight, matches original
     containers/variants.ts. Names map to Tailwind's shadow-{name} utilities. */
  --shadow-s: inset 0 1px 2px #ffffff40, 0 1px 2px #00000040, 0 2px 4px #00000025;
  --shadow-m: inset 0 1px 2px #ffffff40, 0 2px 4px #00000040, 0 4px 8px #00000025;
  --shadow-l: inset 0 1px 2px #ffffff40, 0 4px 6px #00000040, 0 6px 10px #00000025;
  --shadow-lowered: inset 0 1px 2px #00000040, inset 0 -2px 2px #ffffff15;

  /* spacing — named scale matching the old $N.N token names */
  --spacing-xxs: 4px;
  --spacing-xs: 8px; /* previous $0.5 */
  --spacing-sm: 12px;
  --spacing-m: 16px; /* previous $1.0 */
  --spacing-l: 24px;
  --spacing-xl: 32px; /* previous $2.0 */
  --spacing-xxl: 48px;
  --spacing-3xl: 64px; /* previous $3.0 */
  --spacing-4xl: 128px;

  /* breakpoints — match Breakpoints.ts */
  --breakpoint-sm: 480px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;

  /* animations — Tailwind v4 names the utility after the --animate-* key
     (animate-slide-in) and NativeWind runs the @keyframes on native via
     Reanimated. Names are generic motions, not component-specific. CSS
     animations are enter-only on their own; pair the exit animation with
     <Presence> (keeps the outgoing child mounted) for an AnimatePresence-style
     swap without an animation library. */
  --animate-slide-in: slide-in ${animationDurationsMs.slide}ms cubic-bezier(0.16, 1, 0.3, 1);
  --animate-slide-out: slide-out ${animationDurationsMs.slide}ms cubic-bezier(0.16, 1, 0.3, 1);
  --animate-collapse-in: collapse-in ${animationDurationsMs.collapse}ms ease-out;
  --animate-collapse-out: collapse-out ${animationDurationsMs.collapse}ms ease-out;

  /* color tokens — light theme as defaults, enabling bg-*, text-*, border-* utilities.
     Other themes override via :root { @variant <theme> { ... } } below. */
${emit(lightVars, "  ")}
}

@layer theme {
  /* font-family tokens — consumers can override these in their own @layer theme :root to swap fonts.
     The base holds WEB values as a fallback list, because the two web targets load different
     families:
       - Expo web (react-native-web): expo-font registers weight-specific families
         ('SoraRegular'/'SoraBold'/'SoraExtraBold', 'ChivoMono*') — 'Sora' is NOT available.
       - Vite Storybook: Google Fonts loads the single 'Sora'/'Chivo Mono' families, weight via
         font-weight.
     Leading with the weight-specific name (matched on Expo web) and falling back to 'Sora'/'ChivoMono'
     (matched on Vite) makes both work from one declaration. Native uses single names (RN has no
     fallbacks) under @variant native (NativeWind's native: variant, from nativewind/theme).

     NB: the base holds the web values and the @variant native block overrides them on native only —
     the native: variant is dropped on web and applied by NativeWind's runtime on native, so the
     platform font split lives there. */
  :root {
    --font-body: 'SoraRegular', 'Sora', ui-sans-serif, system-ui, sans-serif;
    --font-body-bold: 'SoraBold', 'Sora', ui-sans-serif, system-ui, sans-serif;
    --font-body-extrabold: 'SoraExtraBold', 'Sora', ui-sans-serif, system-ui, sans-serif;
    --font-heading: 'SoraRegular', 'Sora', ui-sans-serif, system-ui, sans-serif;
    --font-heading-bold: 'SoraBold', 'Sora', ui-sans-serif, system-ui, sans-serif;
    --font-heading-extrabold: 'SoraExtraBold', 'Sora', ui-sans-serif, system-ui, sans-serif;
    --font-mono: 'ChivoMonoRegular', 'ChivoMono', 'Chivo Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    --font-mono-bold: 'ChivoMonoBold', 'ChivoMono', 'Chivo Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    --font-mono-extrabold: 'ChivoMonoExtraBold', 'ChivoMono', 'Chivo Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

    @variant native {
      --font-body: 'SoraRegular';
      --font-body-bold: 'SoraBold';
      --font-body-extrabold: 'SoraExtraBold';
      --font-heading: 'SoraRegular';
      --font-heading-bold: 'SoraBold';
      --font-heading-extrabold: 'SoraExtraBold';
      --font-mono: 'ChivoMonoRegular';
      --font-mono-bold: 'ChivoMonoBold';
      --font-mono-extrabold: 'ChivoMonoExtraBold';
    }
  }

${allThemes
  .map(
    ([name, vars]) => `  :where(.${name}, .${name} *) {
${emit(vars, "    ")}
  }`,
  )
  .join("\n\n")}

${(["light", "dark"] as const)
  .flatMap((mode) => {
    const modeVars = allThemes.find(([name]) => name === mode)![1];
    return accentNames
      .filter((name) => name !== "grayscale")
      .map((accentName) => {
        const vars = buildThemeVars(mode, accentName);
        return `  :where(.${mode}_${accentName}, .${mode}_${accentName} *) {\n${emit(vars, "    ")}\n  }`;
      });
  })
  .join("\n\n")}
}

@layer base {
  /* hotpink default catches any text missing Text component use */
  body { color: hotpink; }

  /* let height/width keyframes interpolate to/from auto (collapse-in/out) on web */
  :root { interpolate-size: allow-keywords; }

  body, #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
}

/* keyframes referenced by the --animate-* theme tokens above. */
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-100%) rotateY(-90deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) rotateY(0deg);
  }
}

@keyframes slide-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

@keyframes collapse-in {
  from {
    opacity: 0;
    height: 0;
  }
  to {
    opacity: 1;
    height: auto;
  }
}

@keyframes collapse-out {
  from {
    opacity: 1;
    height: auto;
  }
  to {
    opacity: 0;
    height: 0;
  }
}


/* font-family + weight utilities — family×weight combinations; use with standard text-* size utilities.
   font-synthesis: none — on Expo web the weight-specific family ('SoraBold') is a single registered
   face, so the font-weight below must NOT trigger algorithmic (faux) bolding of already-bold glyphs.
   On Vite web 'Sora' is a real variable font, so the font-weight selects the genuine weight. */
@utility font-body            { font-family: var(--font-body);            font-weight: 400; font-synthesis: none; }
@utility font-body-bold       { font-family: var(--font-body-bold);       font-weight: 700; font-synthesis: none; }
@utility font-body-extrabold  { font-family: var(--font-body-extrabold);  font-weight: 800; font-synthesis: none; }
@utility font-heading           { font-family: var(--font-heading);           font-weight: 400; font-synthesis: none; }
@utility font-heading-bold      { font-family: var(--font-heading-bold);      font-weight: 700; font-synthesis: none; }
@utility font-heading-extrabold { font-family: var(--font-heading-extrabold); font-weight: 800; font-synthesis: none; }
@utility font-mono            { font-family: var(--font-mono);            font-weight: 400; font-synthesis: none; }
@utility font-mono-bold       { font-family: var(--font-mono-bold);       font-weight: 700; font-synthesis: none; }
@utility font-mono-extrabold  { font-family: var(--font-mono-extrabold);  font-weight: 800; font-synthesis: none; }

/* tripwire — standalone Tailwind font-weight utilities are NOT valid here: weight
   must be baked into the font-* family utility (font-body-bold, etc.) so it works on
   native. Override them to weight 100 + crunched letter-spacing so any accidental use
   renders visibly thin and cramped on web and is easy to spot. (native ignores both
   font-weight and letterSpacing here, so this only affects web.) */
@utility font-thin       { font-weight: 100; letter-spacing: -0.1em; }
@utility font-extralight { font-weight: 100; letter-spacing: -0.1em; }
@utility font-light      { font-weight: 100; letter-spacing: -0.1em; }
@utility font-normal     { font-weight: 100; letter-spacing: -0.1em; }
@utility font-medium     { font-weight: 100; letter-spacing: -0.1em; }
@utility font-semibold   { font-weight: 100; letter-spacing: -0.1em; }
@utility font-bold       { font-weight: 100; letter-spacing: -0.1em; }
@utility font-extrabold  { font-weight: 100; letter-spacing: -0.1em; }
@utility font-black      { font-weight: 100; letter-spacing: -0.1em; }

/* flex-center — center children on both axes. Replaces the old Box \`center\`
   variant. Named flex-center (not \`center\`) to avoid clashing with any future
   text-align / place-* shorthand. */
@utility flex-center {
  align-items: center;
  justify-content: center;
}
`;

const outputPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../src/global.css",
);
writeFileSync(outputPath, css);
console.log(`Wrote ${outputPath}`);

// --- themeVariables.ts -------------------------------------------------------
// NativeWind v5 styles every component through CSS variables, but it has no
// stable cross-platform API to read a variable in JS (useUnstableNativeVariable
// throws on web). We therefore emit the same theme data as a JS map, used both
// to feed VariableContextProvider (ScopedTheme) and to read tokens in JS
// (useThemeToken). It is the single source of truth shared with global.css, so
// the two can never drift.
//
// Maps are *resolved* (base mode tokens + accent overrides merged) so a theme can
// be applied at any depth and still carry every --color-* token.
function prefixVars(vars: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(vars).map(([key, value]) => [`--color-${key}`, value]),
  );
}

const resolvedThemes: Record<string, Record<string, string>> = {
  light: prefixVars(buildThemeVars("light", "grayscale")),
  dark: prefixVars(buildThemeVars("dark", "grayscale")),
};
for (const mode of ["light", "dark"] as const) {
  const base = buildThemeVars(mode, "grayscale");
  for (const accent of accentNames.filter((name) => name !== "grayscale")) {
    resolvedThemes[`${mode}_${accent}`] = prefixVars({
      ...base,
      ...buildThemeVars(mode, accent),
    });
  }
}

const themeVariablesTs = `/* Generated by scripts/build-css.ts. DO NOT EDIT. */
import type { AlouetteTheme } from "./core/AlouetteConfig";

/**
 * Resolved CSS-variable maps for every theme, shared with global.css. Feeds
 * \`ScopedTheme\` (NativeWind's \`VariableContextProvider\`) and \`useThemeToken\`.
 */
export const themeVariables: Record<
  AlouetteTheme,
  Record<\`--\${string}\`, string>
> = ${JSON.stringify(resolvedThemes, null, 2)};
`;

const themeVariablesPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../src/themeVariables.ts",
);
writeFileSync(themeVariablesPath, themeVariablesTs);
console.log(`Wrote ${themeVariablesPath}`);

// --- animationDurationsMs.ts -------------------------------------------------
// JS mirror of the --animate-* token durations above, so consumers (e.g.
// Presence's `exitDurationMs`) reference the framework value instead of
// hardcoding it. Same single-source-of-truth pattern as themeVariables.ts.
const animationDurationsTs = `/* Generated by scripts/build-css.ts. DO NOT EDIT. */

/**
 * Duration (in ms) of each generic motion, mirroring the \`--animate-*\` CSS
 * tokens. Pass the matching value as \`exitDurationMs\` to {@link PresenceOne} /
 * {@link PresenceList} so the exit timer matches the CSS animation.
 */
export const animationDurationsMs = ${JSON.stringify(animationDurationsMs, null, 2)} as const;
`;

const animationDurationsPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../src/animationDurationsMs.ts",
);
writeFileSync(animationDurationsPath, animationDurationsTs);
console.log(`Wrote ${animationDurationsPath}`);

// /* mimic the native viewport full width/height + flex */
// body,
// #root {
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
//   min-width: calc(100vw - (100vw - 100%)); /* reserve space for scrollbar */
//   margin: 0;
// }
