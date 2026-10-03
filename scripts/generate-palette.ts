/* eslint-disable import-x/extensions */
// Dev tool: renders every default palette as terminal swatches and audits the
// WCAG contrast of the real composed token pairs the design system uses. Color
// generation is NOT defined here — it is imported from the shipped, exported
// `alouette/theme-generator` module (createColorScale) so the audit can never
// drift from what apps and build-css.ts actually emit.
//
//   node scripts/generate-palette.ts             # failures only
//   node scripts/generate-palette.ts --all       # every pair
//   node scripts/generate-palette.ts --gamut=p3  # the web palette

import Color from "colorjs.io";
import type {
  ColorScale,
  Gamut,
} from "../packages/alouette/src/theme-generator/createColorScale.ts";
import {
  createOklchScale,
  maxChroma,
  toHex,
} from "../packages/alouette/src/theme-generator/createColorScale.ts";
import { defaultPaletteSpecs } from "../packages/alouette/src/theme-generator/paletteSpecs.ts";
import type {
  AccentName,
  ResolvedToken,
} from "../packages/alouette/src/theme-generator/tokenScaleMap.ts";
import { resolveTokenEffective } from "../packages/alouette/src/theme-generator/tokenScaleMap.ts";

// sRGB hex is what native renders; --gamut=p3 audits the wide-gamut palette web
// gets, whose steps hold the same lightness with more chroma.
const gamut: Gamut = process.argv.includes("--gamut=p3") ? "p3" : "srgb";

const formatColor = (color: {
  lightness: number;
  chroma: number;
  hue: number;
}): string =>
  gamut === "p3"
    ? `oklch(${color.lightness} ${color.chroma} ${color.hue})`
    : toHex(color);

const palettes: Record<string, ColorScale> = {};
for (const [name, spec] of Object.entries(defaultPaletteSpecs)) {
  for (const mode of ["light", "dark"] as const) {
    const scale = createOklchScale(spec, mode, gamut);
    palettes[`${name}.${mode}`] = Object.fromEntries(
      Object.entries(scale).map(([step, color]) => [step, formatColor(color)]),
    ) as unknown as ColorScale;
  }
}

// ANSI color codes for terminal display
const ansiColors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
};

const getAnsiColor = (color: string) => {
  const [r, g, b] = new Color(color)
    .to("srgb")
    .toGamut({ method: "css" })
    .coords.map((channel) => Math.round(channel! * 255));
  return `\x1b[38;2;${r};${g};${b}m`;
};

const displayColorSwatch = (color: string, text: string) => {
  const ansiColor = getAnsiColor(color);
  return `${ansiColor}${text}${ansiColors.reset}`;
};

// WCAG relative luminance is the Y of XYZ-D65, which colorjs computes for any
// color space — so a p3 color is graded as it actually displays, not as its
// sRGB fallback.
const getLuminance = (color: string) => new Color(color).luminance;

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
const WCAG_AA_NON_TEXT = 3.0; // 1.4.11: a focus indicator against its adjacent colors

const getContrastGrade = (ratio: number, minRatio: number) => {
  if (minRatio === WCAG_AA_NON_TEXT) {
    return ratio >= WCAG_AA_NON_TEXT ? "✅ 3:1" : "❌ FAIL";
  }
  if (ratio >= WCAG_AAA_NORMAL) return "✅ AAA";
  if (ratio >= WCAG_AA_NORMAL) return "⚠️ AA";
  return "❌ FAIL";
};

// Measured OKLCH lightness and relative chroma (fraction of the max
// in-gamut chroma at that lightness/hue) — the tuning axes of the generator.
const oklchDescription = (color: string): string => {
  const [rawLightness, rawChroma, rawHue] = new Color(color).to("oklch").coords;
  const lightness = rawLightness ?? 0;
  const chroma = rawChroma ?? 0;
  const hue = rawHue == null || Number.isNaN(rawHue) ? 0 : rawHue;
  const max = maxChroma({ lightness, hue, gamut });
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

// A pair is normal text (AA 4.5) unless it names the non-text threshold.
const tokenPairs: {
  label: string;
  fg: string;
  bg: string;
  minRatio?: number;
}[] = [
  {
    label: "sharp on highlight-accent",
    fg: "sharp",
    bg: "highlight-accent",
  },
  {
    label: "on-accent on enabled",
    fg: "sharp",
    bg: "enabled",
  },
  {
    label: "Badge outlined       (accent / surface)",
    fg: "sharp",
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
    label: "on-accent on filled",
    fg: "sharp",
    bg: "interactive-filled-pressable",
  },
  {
    label: "on-accent on filled:hover",
    fg: "sharp",
    bg: "interactive-filled-hover",
  },
  // A `filled` PressableListItem's caret.
  {
    label: "on-accent-muted on filled",
    fg: "sharp",
    bg: "interactive-filled-pressable",
  },
  // A SegmentedBar's selected chip and ConnectionState's bar: `emphasis` keeps a
  // light chip in the neutral theme, so its ink flips with the accent.
  { label: "on-emphasis on emphasis", fg: "on-emphasis", bg: "emphasis" },
  // PressableBox's `tonal` variant keeps the ambient ink over a tone of the
  // theme, so a row's own copy is measured with `sharp`, not with
  // `on-emphasis`. Its label, icon and caret are `on-tonal`, the ink that
  // carries the accent in light mode and stays sharp on the dark accented
  // ground; `muted` is too dim for that ground, so secondary `text-muted` copy
  // belongs on a neutral one only.
  {
    label: "sharp on tonal:pressable",
    fg: "sharp",
    bg: "interactive-tonal-pressable",
  },
  {
    label: "on-tonal on tonal:pressable",
    fg: "sharp",
    bg: "interactive-tonal-pressable",
  },
  {
    label: "on-tonal on tonal:hover",
    fg: "sharp",
    bg: "interactive-tonal-hover",
  },
  {
    label: "sharp on tonal:hover",
    fg: "sharp",
    bg: "interactive-tonal-hover",
  },
  // The soft variant keeps the label's own color over its fill.
  { label: "sharp on soft:hover", fg: "sharp", bg: "interactive-soft-hover" },
  { label: "accent on soft:hover", fg: "accent", bg: "interactive-soft-hover" },
  // The `focus-ring` utility draws the keyboard focus in `accent` (the scope's
  // ink; the sharp ink when neutral). An outer ring is adjacent to the page
  // only (the 2px gap shows it on both sides), an inset one to the control's
  // own ground. A border or ground token fails here: in dark mode their steps
  // meet the tonal ground.
  ...(
    [
      ["screen", "outer ring"],
      ["surface", "outer ring"],
      ["highlight", "outer ring"],
      ["lowered", "outer ring"],
      ["interactive-tonal-pressable", "inset ring"],
      ["highlight-accent", "inset ring (Message dismiss)"],
    ] as const
  ).map(([bg, label]) => ({
    label: `focus-ring: accent on ${bg} (${label})`,
    fg: "accent",
    bg,
    minRatio: WCAG_AA_NON_TEXT,
  })),
];

const grouped: Record<
  string,
  Partial<Record<"light" | "dark", ColorScale>>
> = {};
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
    .map(({ label, fg, bg, minRatio = WCAG_AA_NORMAL }) => {
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
        minRatio,
        ratio: getContrastRatio(fgHex, bgHex),
      };
    })
    .filter((row) => showAllPairs || row.ratio < row.minRatio);

  if (rows.length === 0) return;

  console.log(
    `\n${ansiColors.bright}${accent}.${mode} — token pairs:${ansiColors.reset}`,
  );
  rows.forEach(
    ({ label, fgResolved, bgResolved, fgHex, bgHex, minRatio, ratio }) => {
      console.log(
        [
          ` ${getContrastGrade(ratio, minRatio)}`,
          ratio.toFixed(2).padStart(6),
          displayColorSwatch(fgHex, "██"),
          "on",
          displayColorSwatch(bgHex, "██"),
          `: ${label} (${stepDesc(fgResolved)}/${stepDesc(bgResolved)})`,
        ].join(" "),
      );
    },
  );
};

console.log(
  `\n${ansiColors.bright}=== Composed token pairs (normal text: AA 4.5, AAA 7; focus ring: 3)${
    showAllPairs ? "" : " — failures only, --all for every pair"
  } ===${ansiColors.reset}`,
);
Object.entries(grouped).forEach(([accent, modes]) => {
  if (modes.light) displayTokenPairs(accent as AccentName, "light");
  if (modes.dark) displayTokenPairs(accent as AccentName, "dark");
});
