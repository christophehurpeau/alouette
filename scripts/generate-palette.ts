import convert from "color-convert";
import Color from "colorjs.io";
import fs from "node:fs";
import type { PaletteSpec } from "../packages/alouette/scripts/paletteSpecs.ts";
import { paletteSpecs } from "../packages/alouette/scripts/paletteSpecs.ts";
import type {
  AccentName,
  ResolvedToken,
} from "../packages/alouette/scripts/tokenScaleMap.ts";
import { resolveTokenEffective } from "../packages/alouette/scripts/tokenScaleMap.ts";

type ColorScale = Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11, string>;

// Palettes are generated in OKLCH so a single lightness ramp is perceptually
// uniform across every hue (HSL lightness is not — yellow at HSL L=56 reads far
// brighter than blue at the same L, which is why the old per-hue lightness
// tables existed). Chroma is specified *relative to the sRGB gamut*: each step
// requests a fraction of the maximum chroma sRGB can render at that step's
// lightness and hue. The fraction curve is shared by every palette and tiered
// by usage (muted surface tints, medium highlight mids, near-vivid interactive
// and text steps), so all hues are equally saturated relative to what's
// possible — yellow is naturally vivid where its gamut is wide (high
// lightness) and amber in shadow, with no per-palette chroma table.

// step:                     1     2     3     4     5     6     7     8     9    10    11
const lightnessRamps = {
  grayscale: {
    // only diff is on values 4-7 and 9-11
    dark: [0.18, 0.22, 0.26, 0.28, 0.32, 0.38, 0.45, 0.795, 0.865, 0.96, 1],
    // only diff is on the first 2 values
    light: [1, 0.98, 0.948, 0.89, 0.85, 0.79, 0.61, 0.54, 0.48, 0.42, 0.27],
  },
  accent: {
    dark: [0.18, 0.22, 0.26, 0.3, 0.34, 0.4, 0.5, 0.7, 0.82, 0.865, 0.955],
    light: [
      0.988, 0.968, 0.948, 0.89, 0.85, 0.79, 0.62, 0.54, 0.48, 0.42, 0.27,
    ],
  },
  brightAccent: {
    dark: [0.28, 0.32, 0.4, 0.45, 0.5, 0.53, 0.56, 0.8, 0.86, 0.9, 0.955],
    light: [0.988, 0.968, 0.948, 0.928, 0.89, 0.82, 0.8, 0.6, 0.56, 0.44, 0.27],
  },
} as const;
// Fraction of the max in-gamut chroma requested at each step. Usage tiers
// mirror the old HSL generator's 56/82/96 saturation bands: steps 1-3 pale
// surfaces, 4-6 highlight/message tints, 7-11 interactive fills and text.
const relativeChromaCurve: Record<"dark" | "light", number[]> = {
  dark: [0.6, 0.68, 0.72, 0.76, 0.78, 0.84, 0.88, 0.88, 0.85, 0.82, 0.86],
  light: [0.5, 0.52, 0.55, 0.6, 0.75, 0.78, 0.92, 0.97, 0.97, 0.97, 0.95],
};

// Largest OKLCH chroma still inside the sRGB gamut at this lightness/hue.
const maxSrgbChroma = (lightness: number, hue: number): number => {
  let low = 0;
  let high = 0.5;
  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    if (new Color("oklch", [lightness, mid, hue]).to("srgb").inGamut()) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return low;
};

const toHex = (lightness: number, chroma: number, hue: number): string => {
  const color = new Color("oklch", [lightness, chroma, hue]).to("srgb");
  const hex = color.toGamut({ method: "css" }).toString({ format: "hex" });
  // colorjs collapses to 3-digit shorthand (#050); expand so appended alpha
  // suffixes (e.g. selection = step + "40") stay valid 8-digit hex.
  const full =
    hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex;
  return full.toUpperCase();
};

const createColorScale = (
  spec: PaletteSpec,
  kind: "dark" | "light",
): ColorScale => {
  const hueHi = spec.hueHi ?? spec.hue;
  const hueLo = spec.hueLo ?? spec.hue;
  const intensity = spec.intensity ?? 1;
  const ramp = lightnessRamps[spec.type][kind];
  const steps = ramp.map((lightness, index) => {
    const hue = hueLo + (hueHi - hueLo) * lightness;
    const chroma =
      relativeChromaCurve[kind][index] *
      intensity *
      maxSrgbChroma(lightness, hue);
    return toHex(lightness, chroma, hue);
  });
  return Object.fromEntries(
    steps.map((hex, index) => [index + 1, hex]),
  ) as unknown as ColorScale;
};

const createColorPalettes = (name: string, spec: PaletteSpec) => {
  return {
    ['"' + name + '.light"']: createColorScale(spec, "light"),
    ['"' + name + '.dark"']: createColorScale(spec, "dark"),
  };
};

const generatePalettes = () => {
  const palettes: Record<string, ColorScale> = {};
  for (const [name, spec] of Object.entries(paletteSpecs)) {
    Object.assign(palettes, createColorPalettes(name, spec));
  }
  return palettes;
};

const palettes = generatePalettes();

if (
  process.argv[2] === "generate" ||
  process.argv[2] === "write" ||
  process.argv[2] === "--write"
) {
  let content = "/* eslint-disable import-x/extensions */\n";
  content += 'import { createColorScale } from "./colorScales.ts";\n';
  content += 'import type { AlouetteColorScales } from "./colorScales.ts";\n\n';
  content += "export const defaultColorScales: AlouetteColorScales = {\n";

  Object.entries(palettes).forEach(([name, palette]) => {
    content += `  ${name}: createColorScale({\n`;
    Object.entries(palette).forEach(([step, color]) => {
      content += `    ${step}: "${color}",\n`;
    });
    content += "  }),\n";
  });

  content += "} as const;\n";
  fs.writeFileSync(
    "packages/alouette/src/config/defaultColorScales.ts",
    content,
  );
} else {
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

  const grouped: Record<
    string,
    Partial<Record<"light" | "dark", ColorScale>>
  > = {};
  Object.entries(palettes).forEach(([rawName, palette]) => {
    const [accent, mode] = rawName.replace(/"/g, "").split(".") as [
      string,
      "light" | "dark",
    ];
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
}
