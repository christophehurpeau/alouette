// Generates packages/alouette/src/global.css from defaultColorScales.
// Run via `yarn workspace alouette build:css` (wired in package.json).
//
// Translation from the old Tamagui ColorTheme:
//  - Token names use kebab-case so they fit Tailwind's CSS-variable convention
//    (`--color-x` becomes `bg-x`, `text-x`, `border-x`, etc.).
//  - Tamagui's ":press" suffix becomes "-active" (Uniwind/CSS uses :active).
//  - 12 themes: `light` (default in @theme), `dark` (@variant), and 5 colored
//    themes × 2 modes (e.g. `light_brand`, `dark_brand`).
//
// To add or change a theme, edit `defaultColorScales.ts` and re-run.

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultColorScales } from "../src/config/defaultColorScales.ts";

type Mode = "dark" | "light";
type SemanticRoleName =
  | "brand"
  | "danger"
  | "grayscale"
  | "info"
  | "success"
  | "warning";
type ScaleNum = 1 | 10 | 11 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const semanticNames: SemanticRoleName[] = [
  "grayscale", //equivalent to default
  "brand",
  "info",
  "success",
  "warning",
  "danger",
];

// Suffixes shared by every semantic role (grayscale = the unprefixed base tokens).
// Used to build light_{role}/dark_{role} sub-theme classes that remap base tokens
// to hardcoded role+mode values — no var() indirection, safe for native.
const semanticTokenSuffixes = [
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
  semanticName: SemanticRoleName,
  scaleDark: ScaleNum,
  scaleLight: ScaleNum = scaleDark,
): string {
  return defaultColorScales[`${semanticName}.${mode}`][
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
  semanticName: SemanticRoleName,
): Record<string, string> {
  const scale = (scaleDark: ScaleNum, scaleLight: ScaleNum = scaleDark) =>
    color(mode, semanticName, scaleDark, scaleLight);
  const name = (name: string) => name; // if we later need to suffix for semantic roles, we can do it here

  const isGrayscale = semanticName === "grayscale";

  const bgScreen = scale(2, 3); // bottom dark = 6% light = 92/86%
  const bgSurface = scale(3, 2); // middle dark = 12% light = 96/92%
  const bgHighlight = scale(4, 1); // top or raised dark = 16% light = 100/96%

  return {
    ...(isGrayscale
      ? {
          translucent: mode === "dark" ? TRANSLUCENT_DARK : TRANSLUCENT_LIGHT,
          "disabled-sharp": grayForMode(mode, 8, 8),
          "disabled-muted": grayForMode(mode, 8, 7),
          "disabled-interactive": grayForMode(mode, 9, 9),
          ["muted"]: grayForMode(mode, 9, 9), // rest dark = 68% light = 30%

          "form-bg": grayForMode(mode, 3, 1),
          "form-bg-hover": grayForMode(mode, 3, 1),
          "form-bg-focus": grayForMode(mode, 3, 1),
          "form-bg-active": grayForMode(mode, 3, 1),
          "form-bg-disabled": grayForMode(mode, 4, 4),
          "form-border-disabled": grayForMode(mode, 7, 6),
          "form-placeholder": grayForMode(mode, 8, 8),
          "form-disabled-text": grayForMode(mode, 9, 9),

          "interactive-contained-disabled": grayForMode(mode, 5, 5),
          "interactive-outlined-disabled": grayForMode(mode, 6, 6),
          "interactive-accent-contained-bg-disabled": grayForMode(mode, 5, 3),
          "interactive-accent-outlined-disabled": grayForMode(mode, 6, 6),
        }
      : {}),

    /* backgrounds */
    [name("screen")]: bgScreen,
    [name("surface")]: bgSurface,
    [name("highlight")]: bgHighlight,
    [name("highlight-accent")]: scale(4),
    [name("lowered")]: scale(1, 4), // deep, combine with deep shadow dark = 0% light = 82%
    [name("screen-gradient-start")]: scale(3, 4),
    [name("screen-gradient-middle")]: scale(2, 5),
    [name("screen-gradient-end")]: scale(1, 6),

    /* borders */

    [name("border-muted")]: scale(7),
    [name("border-sharp")]: scale(8),

    /* interactive */

    [name("interactive-contained-pressable")]: scale(4, 1),
    [name("interactive-contained-hover")]: scale(6, 4),
    [name("interactive-contained-focus")]: scale(6, 4),
    [name("interactive-contained-active")]: scale(6, 5),

    [name("interactive-outlined-pressable")]: scale(7),
    [name("interactive-outlined-hover")]: scale(8),
    [name("interactive-outlined-focus")]: scale(8),
    [name("interactive-outlined-active")]: scale(8),
    [name("interactive-outlined-outline-focus")]: scale(7),

    [name("interactive-active")]: scale(8),
    [name("interactive-pressable")]: scale(9),
    [name("interactive-hover")]: scale(10),

    /* texts */
    [name("sharp")]: scale(11), // headings, buttons, and important text dark = 96% light = 5%
    [name("accent")]: isGrayscale ? scale(11) : scale(9), // same as sharp in default theme, same as muted in colored themes
    [name("accent-muted")]: scale(9, 8),
    [name("on-accent")]: isGrayscale ? scale(11) : scale(11, 9),
    [name("on-accent-muted")]: isGrayscale ? scale(9, 8) : scale(9, 6),

    /* specials */
    [name("selection")]: scale(9) + "40",

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

// All themes except light — need @custom-variant declarations and :root overrides.
const nonLightThemes = allThemes.filter(([name]) => name !== "light");
const [, lightVars] = allThemes.find(([name]) => name === "light")!;

const css = `/* Generated by scripts/build-css.ts. DO NOT EDIT. */
@import 'tailwindcss';
@import 'uniwind';

${nonLightThemes
  .map(([name]) => `@custom-variant ${name} (&.${name});`)
  .join("\n")}

@theme {
  /* fonts — defaults match createAlouetteFonts (Sora). Consumers override
     these tokens in their own @theme to swap font families. */
  --font-body: 'Sora', ui-sans-serif, system-ui, sans-serif;
  --font-heading: 'Sora', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'ChivoMono', ui-monospace, SFMono-Regular, Menlo, monospace;

  /* disable all Tailwind default text-size tokens — alouette defines its own */
  --text-xs: initial;
  --text-sm: initial;
  --text-base: initial;
  --text-lg: initial;
  --text-xl: initial;
  --text-2xl: initial;
  --text-3xl: initial;
  --text-4xl: initial;
  --text-5xl: initial;
  --text-6xl: initial;
  --text-7xl: initial;
  --text-8xl: initial;
  --text-9xl: initial;

  /* body font sizes — matching original Tamagui body scale */
  --text-body-xs: 0.75rem;   /* 12px */
  --text-body-sm: 0.875rem;  /* 14px */
  --text-body-md: 1rem;      /* 16px */
  --text-body-lg: 1.125rem;  /* 18px */
  --text-body-xl: 1.5rem;    /* 24px */
  --text-body-xxl: 2rem;     /* 32px */
  --text-body-3xl: 3rem;     /* 48px */

  /* heading font sizes — matching original Tamagui heading scale */
  --text-heading-xs: 1.125rem;  /* 18px */
  --text-heading-sm: 1.5rem;    /* 24px */
  --text-heading-md: 2rem;      /* 32px */
  --text-heading-lg: 2.5rem;    /* 40px */
  --text-heading-xl: 3rem;      /* 48px */
  --text-heading-xxl: 4rem;     /* 64px */
  --text-heading-3xl: 5rem;     /* 80px */
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
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-m: 16px;
  --spacing-l: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  --spacing-3xl: 64px;
  --spacing-4xl: 128px;

  /* breakpoints — match Breakpoints.ts */
  --breakpoint-sm: 480px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;

  /* color tokens — light theme as defaults, enabling bg-*, text-*, border-* utilities.
     Other themes override via :root { @variant <theme> { ... } } below. */
${emit(lightVars, "  ")}
}

@layer theme {
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
    return semanticNames
      .filter((name) => name !== "grayscale")
      .map((semanticName) => {
        const vars = buildThemeVars(mode, semanticName);
        return `  :where(.${mode}_${semanticName}, .${mode}_${semanticName} *) {\n${emit(vars, "    ")}\n  }`;
      });
  })
  .join("\n\n")}
}

@layer base {
  /* hotpink default catches any text missing Text component use */
  body { color: hotpink; }
}


/* coupled font-family + font-size utilities — one class sets both */
@utility body-xs    { font-family: var(--font-body); font-size: var(--text-body-xs); }
@utility body-sm    { font-family: var(--font-body); font-size: var(--text-body-sm); }
@utility body-md    { font-family: var(--font-body); font-size: var(--text-body-md); }
@utility body-lg    { font-family: var(--font-body); font-size: var(--text-body-lg); }
@utility body-xl    { font-family: var(--font-body); font-size: var(--text-body-xl); }
@utility body-xxl   { font-family: var(--font-body); font-size: var(--text-body-xxl); }
@utility body-3xl   { font-family: var(--font-body); font-size: var(--text-body-3xl); }

@utility heading-xs  { font-family: var(--font-heading); font-size: var(--text-heading-xs); }
@utility heading-sm  { font-family: var(--font-heading); font-size: var(--text-heading-sm); }
@utility heading-md  { font-family: var(--font-heading); font-size: var(--text-heading-md); }
@utility heading-lg  { font-family: var(--font-heading); font-size: var(--text-heading-lg); }
@utility heading-xl  { font-family: var(--font-heading); font-size: var(--text-heading-xl); }
@utility heading-xxl { font-family: var(--font-heading); font-size: var(--text-heading-xxl); }
@utility heading-3xl { font-family: var(--font-heading); font-size: var(--text-heading-3xl); }

@utility mono-xs    { font-family: var(--font-mono); font-size: var(--text-body-xs); }
@utility mono-sm    { font-family: var(--font-mono); font-size: var(--text-body-sm); }
@utility mono-md    { font-family: var(--font-mono); font-size: var(--text-body-md); }
@utility mono-lg    { font-family: var(--font-mono); font-size: var(--text-body-lg); }
@utility mono-xl    { font-family: var(--font-mono); font-size: var(--text-body-xl); }
@utility mono-xxl   { font-family: var(--font-mono); font-size: var(--text-body-xxl); }
@utility mono-3xl   { font-family: var(--font-mono); font-size: var(--text-body-3xl); }
`;

const outputPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../src/global.css",
);
writeFileSync(outputPath, css);
console.log(`Wrote ${outputPath}`);
