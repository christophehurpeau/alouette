/* eslint-disable import-x/extensions */
// Dev tool: renders every default palette as terminal swatches and audits the
// WCAG contrast of the real composed token pairs the design system uses. Color
// generation is NOT defined here — it is imported from the shipped, exported
// `alouette/theme-generator` module (createColorScale) so the audit can never
// drift from what apps and build-css.ts actually emit.
//
//   node --experimental-strip-types scripts/generate-palette.ts         # failures only
//   node --experimental-strip-types scripts/generate-palette.ts --all   # every pair

import convert from "color-convert";
import Color from "colorjs.io";
import type { ColorScale } from "../packages/alouette/src/theme-generator/createColorScale.ts";
import {
  createColorScale,
  maxSrgbChroma,
} from "../packages/alouette/src/theme-generator/createColorScale.ts";
import { defaultPaletteSpecs } from "../packages/alouette/src/theme-generator/paletteSpecs.ts";
import type {
  AccentName,
  ResolvedToken,
} from "../packages/alouette/src/theme-generator/tokenScaleMap.ts";
import { resolveTokenEffective } from "../packages/alouette/src/theme-generator/tokenScaleMap.ts";

const palettes: Record<string, ColorScale> = {};
for (const [name, spec] of Object.entries(defaultPaletteSpecs)) {
  palettes[`${name}.light`] = createColorScale(spec, "light");
  palettes[`${name}.dark`] = createColorScale(spec, "dark");
}

// ANSI color codes for terminal display
const ansiColors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
};

const getAnsiColor = (hex: string) => {
  const [r, g, b] = convert.hex.rgb(hex.slice(1));
  return `\x1b[38;2;${r};${g};${b}m`;
};

const displayColorSwatch = (color: string, text: string) => {
  const ansiColor = getAnsiColor(color);
  return `${ansiColor}${text}${ansiColors.reset}`;
};

const hexToRgb = (hex: string) => {
  const [r, g, b] = convert.hex.rgb(hex);
  return [r / 255, g / 255, b / 255];
};

const getLuminance = (hex: string) => {
  const [r, g, b] = hexToRgb(hex);
  const [rs, gs, bs] = [r, g, b].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const getContrastRatio = (color1: string, color2: string) => {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

// WCAG contrast ratio requirements
const WCAG_AA_NORMAL = 4.5; // Normal text
const WCAG_AAA_NORMAL = 7.0; // Enhanced contrast

const getContrastGrade = (ratio: number) => {
  if (ratio >= WCAG_AAA_NORMAL) return "✅ AAA";
  if (ratio >= WCAG_AA_NORMAL) return "⚠️ AA";
  return "❌ FAIL";
};

// Measured OKLCH lightness and relative chroma (fraction of the max
// in-gamut chroma at that lightness/hue) — the tuning axes of the generator.
const oklchDescription = (hex: string): string => {
  const [rawLightness, rawChroma, rawHue] = new Color(hex).to("oklch").coords;
  const lightness = rawLightness ?? 0;
  const chroma = rawChroma ?? 0;
  const hue = rawHue == null || Number.isNaN(rawHue) ? 0 : rawHue;
  const max = maxSrgbChroma(lightness, hue);
  const relative = max === 0 ? 0 : chroma / max;
  return `L=${lightness.toFixed(2)} relC=${relative.toFixed(2)}`;
};

// Per-step readout is a tuning aid only (swatch + hex + the OKLCH axes the
// generator controls). Contrast is NOT graded per step: a single step serves
// several roles at once (step 9 light is a button fill, a border, and text),
// so no step-number threshold can pick "the" thing it contrasts against.
// Contrast is audited below on real composed token pairs instead.
const displayPalette = (name: string, palette: ColorScale) => {
  console.log(`\n${ansiColors.bright}${name}:${ansiColors.reset}`);
  Object.entries(palette).forEach(([step, color]) => {
    console.log(
      [
        `  ${step.padStart(2, " ")}:`,
        displayColorSwatch(color, "██"),
        color,
        oklchDescription(color),
      ].join(" "),
    );
  });
};

Object.entries(palettes).forEach(([name, palette]) => {
  displayPalette(name, palette);
});

// Real composed token pairs, not step-vs-proxy checks: each pair names an
// actual fg-on-bg combination the design system renders. The scale steps and
// source palette come from the shared tokenScaleMap (same table build-css.ts
// emits from), so these can never drift from the tokens. Badge/body text is
// normal text, so AA needs 4.5:1.
const at = (palette: ColorScale, step: number) =>
  palette[step as keyof ColorScale];

const tokenPairs: { label: string; fg: string; bg: string }[] = [
  {
    label: "sharp on highlight-accent",
    fg: "sharp",
    bg: "highlight-accent",
  },
  {
    label: "on-accent on enabled",
    fg: "on-accent",
    bg: "enabled",
  },
  {
    label: "Badge outlined       (accent / surface)",
    fg: "accent",
    bg: "surface",
  },
  { label: "sharp on surface", fg: "sharp", bg: "surface" },
  { label: "sharp on screen", fg: "sharp", bg: "screen" },
  { label: "sharp on highlight", fg: "sharp", bg: "highlight" },
  { label: "muted on surface", fg: "muted", bg: "surface" },
  { label: "muted on screen", fg: "muted", bg: "screen" },
  { label: "muted on highlight", fg: "muted", bg: "highlight" },
  { label: "accent on screen", fg: "accent", bg: "screen" },
  { label: "accent on surface", fg: "accent", bg: "surface" },
  { label: "accent on highlight", fg: "accent", bg: "highlight" },
  {
    label: "on-accent on contained",
    fg: "on-accent",
    bg: "interactive-contained-pressable",
  },
  {
    label: "on-accent on contained:hover",
    fg: "on-accent",
    bg: "interactive-contained-hover",
  },
  // ok if this fails.
  // {
  //   label: "on-accent on contained:active",
  //   fg: "on-accent",
  //   bg: "interactive-contained-active",
  // },
];

const grouped: Record<string, Partial<Record<"light" | "dark", ColorScale>>> =
  {};
Object.entries(palettes).forEach(([rawName, palette]) => {
  const [accent, mode] = rawName.split(".") as [string, "light" | "dark"];
  (grouped[accent] ??= {})[mode] = palette;
});

const tokenColor = (
  resolved: ResolvedToken,
  accent: string,
  mode: "light" | "dark",
) => {
  if ("literal" in resolved) return resolved.literal;
  const source = resolved.source === "grayscale" ? "grayscale" : accent;
  const hex = at(grouped[source]![mode]!, resolved.step);
  return resolved.alpha ? hex + resolved.alpha : hex;
};

const stepDesc = (resolved: ResolvedToken) =>
  "literal" in resolved
    ? "lit"
    : `${resolved.source === "grayscale" ? "g" : ""}${resolved.step}`;

// Only failing pairs (< AA 4.5) are shown by default; pass --all to list every
// pair including the passing ones.
const showAllPairs = process.argv.includes("--all");

const displayTokenPairs = (accent: AccentName, mode: "light" | "dark") => {
  const isGrayscale = accent === "grayscale";
  const ctx = { mode, isGrayscale, accent };
  const rows = tokenPairs
    .map(({ label, fg, bg }) => {
      const fgResolved = resolveTokenEffective(fg, ctx);
      const bgResolved = resolveTokenEffective(bg, ctx);
      const fgHex = tokenColor(fgResolved, accent, mode);
      const bgHex = tokenColor(bgResolved, accent, mode);
      return {
        label,
        fgResolved,
        bgResolved,
        fgHex,
        bgHex,
        ratio: getContrastRatio(fgHex, bgHex),
      };
    })
    .filter((row) => showAllPairs || row.ratio < WCAG_AA_NORMAL);

  if (rows.length === 0) return;

  console.log(
    `\n${ansiColors.bright}${accent}.${mode} — token pairs:${ansiColors.reset}`,
  );
  rows.forEach(({ label, fgResolved, bgResolved, fgHex, bgHex, ratio }) => {
    console.log(
      [
        ` ${getContrastGrade(ratio)}`,
        ratio.toFixed(2).padStart(6),
        displayColorSwatch(fgHex, "██"),
        "on",
        displayColorSwatch(bgHex, "██"),
        `: ${label} (${stepDesc(fgResolved)}/${stepDesc(bgResolved)})`,
      ].join(" "),
    );
  });
};

console.log(
  `\n${ansiColors.bright}=== Composed token pairs (normal text: AA 4.5, AAA 7)${
    showAllPairs ? "" : " — failures only, --all for every pair"
  } ===${ansiColors.reset}`,
);
Object.entries(grouped).forEach(([accent, modes]) => {
  if (modes.light) displayTokenPairs(accent as AccentName, "light");
  if (modes.dark) displayTokenPairs(accent as AccentName, "dark");
});
