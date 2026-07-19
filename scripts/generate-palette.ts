import convert from "color-convert";
import fs from "node:fs";
import type { ResolvedToken } from "../packages/alouette/scripts/tokenScaleMap.ts";
import { resolveTokenEffective } from "../packages/alouette/scripts/tokenScaleMap.ts";

type ColorScale = Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11, string>;

const createColorScale = (
  baseColor: string,
  hue: number,
  kind: "dark" | "light",
  { boostTextContrast = 0, boostLight = 0, boostDark = 0 } = {},
): ColorScale => {
  const hsl = convert.hex.hsl(baseColor);
  if (hsl[0] !== hue) {
    console.warn(`Hue mismatch: ${hsl[0]} !== ${hue}`);
  }

  const saturations =
    hue === 0
      ? {
          dark: { standard: 0, medium: 0, moreSaturation: 0 },
          light: { standard: 0, medium: 0, moreSaturation: 0 },
        }
      : {
          dark: { standard: 56, medium: 72 + boostDark, moreSaturation: 88 },
          light: { standard: 56, medium: 82 + boostLight, moreSaturation: 96 },
        };

  const lightnessSteps =
    kind === "light"
      ? [
          hue === 0 ? 100 : 98,
          hue === 0 ? 98 : 96, // hue === 0 ? 96 : 92,
          92, // hue === 0 ? 92 : 86,
          88, // hue === 0 ? 86 : 82,
          78,
          72,
          56,
          48,
          38,
          28,
          8,
        ]
      : [
          6,
          12,
          16,
          hue === 0 ? 20 : 22,
          hue === 0 ? 24 : 26,
          hue === 0 ? 28 : 30,
          hue === 0 ? 32 : 42,
          52,
          66,
          76,
          hue === 0 ? 96 : 92,
        ];

  const scale: ColorScale = {
    1: `#${convert.hsl.hex([hue, saturations[kind].standard, lightnessSteps[0]])}`,
    2: `#${convert.hsl.hex([hue, saturations[kind].standard, lightnessSteps[1]])}`,
    3: `#${convert.hsl.hex([hue, saturations[kind].standard, lightnessSteps[2]])}`,
    4: `#${convert.hsl.hex([hue, saturations[kind].medium, boostLight + lightnessSteps[3]])}`,
    5: `#${convert.hsl.hex([hue, saturations[kind].medium, boostLight + lightnessSteps[4]])}`,
    6: `#${convert.hsl.hex([hue, saturations[kind].medium, boostLight + lightnessSteps[5]])}`,
    7: `#${convert.hsl.hex([hue, kind === "dark" ? saturations[kind].medium : saturations[kind].moreSaturation, boostLight + lightnessSteps[6]])}`,
    8: `#${convert.hsl.hex([hue, saturations[kind].moreSaturation, boostLight + lightnessSteps[7] + boostTextContrast])}`,
    9: `#${convert.hsl.hex([hue, saturations[kind].moreSaturation, boostLight + lightnessSteps[8] + boostTextContrast])}`,
    10: `#${convert.hsl.hex([hue, saturations[kind].moreSaturation, boostLight + lightnessSteps[9] + boostTextContrast])}`,
    11: `#${convert.hsl.hex([hue, saturations[kind].moreSaturation, lightnessSteps[10]])}`,
  };

  return scale;
};

const createColorPalettes = (
  name: string,
  color: string,
  hue: number,
  { boostLightTextContrast = 0, boost = 0, boostLight = boost } = {},
) => {
  return {
    ['"' + name + '.light"']: createColorScale(color, hue, "light", {
      boostTextContrast: boostLightTextContrast * -1, // we want less light to have more contrast
      boostLight: boostLight,
      boostDark: boost,
    }),
    ['"' + name + '.dark"']: createColorScale(color, hue, "dark", {
      boostLight: boostLight,
      boostDark: boost,
    }),
  };
};

const generatePalettes = () => {
  const palettes = {
    ...createColorPalettes("grayscale", "#8e8e8e", 0),
    ...createColorPalettes("brand", "#31a1c4", 194, {
      boostLightTextContrast: 8,
    }),
    ...createColorPalettes("danger", "#b52a26", 2, {
      boostLightTextContrast: 8,
      boostLight: 2,
    }),
    ...createColorPalettes("info", "#2ac8ff", 195, {
      boostLightTextContrast: 8,
    }),
    ...createColorPalettes("success", "#2ac82a", 120, {
      boostLightTextContrast: 12,
      boost: -2,
    }),
    ...createColorPalettes("warning", "#ffb72a", 40, {
      boostLightTextContrast: 8,
      boostLight: -2,
    }),
  };

  return palettes;
};

const palettes = generatePalettes();

if (
  process.argv[2] === "generate" ||
  process.argv[2] === "write" ||
  process.argv[2] === "--write"
) {
  let content = "/* eslint-disable import-x/extensions */\n";
  content += "import { createColorScale } from './colorScales.ts';\n";
  content += "import type { AlouetteColorScales } from './colorScales.ts';\n\n";
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

  const displayPalette = (name: string, palette: ColorScale) => {
    const palettePageBackground = name.includes(".light")
      ? "#ffffff"
      : "#1f1e1e";
    const paletteColorText = name.includes(".light") ? "#000000" : "#fdfdfd";

    console.log(`\n${ansiColors.bright}${name}:${ansiColors.reset}`);
    Object.entries(palette).forEach(([step, color]) => {
      const swatch = displayColorSwatch(color, "██");
      const colorToCompareForStepBefore7 = paletteColorText;

      const colorToCompareForStepAfter7 = palettePageBackground;

      const highContrastColor = name.includes(".light") ? "#000000" : "#ffffff";

      console.log(
        [
          `  ${step.padStart(2, " ")}:`,
          swatch,
          color,
          ...[
            getContrastGrade(
              getContrastRatio(
                color,
                Number(step) < 7
                  ? colorToCompareForStepBefore7
                  : colorToCompareForStepAfter7,
              ),
            ),
            ["3", "4", "5", "6", "7"].includes(step)
              ? "/ vs high contrast: " +
                getContrastGrade(getContrastRatio(color, highContrastColor))
              : null,

            ["8", "9", "10"].includes(step)
              ? "/ vs .1: " +
                getContrastGrade(getContrastRatio(color, palette["1"]))
              : null,
          ],
        ]
          .filter(Boolean)
          .join(" "),
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
      label: "Badge solid          (sharp / highlight-accent)",
      fg: "sharp",
      bg: "highlight-accent",
    },
    {
      label: "Badge solid.enabled  (sharp / enabled)",
      fg: "sharp",
      bg: "enabled",
    },
    {
      label: "Badge outlined       (accent / surface)",
      fg: "accent",
      bg: "surface",
    },
    { label: "text-sharp on surface", fg: "sharp", bg: "surface" },
    { label: "text-sharp on screen", fg: "sharp", bg: "screen" },
    { label: "text-sharp on highlight", fg: "sharp", bg: "highlight" },
    { label: "accent-muted on surface", fg: "accent-muted", bg: "surface" },
    { label: "muted on surface", fg: "muted", bg: "surface" },
    { label: "muted on screen", fg: "muted", bg: "screen" },
    { label: "muted on highlight", fg: "muted", bg: "highlight" },
    { label: "accent on screen", fg: "accent", bg: "screen" },
    { label: "accent on highlight", fg: "accent", bg: "highlight" },
    {
      label: "on-accent on contained fill (rest)",
      fg: "on-accent",
      bg: "interactive-contained-pressable",
    },
    {
      label: "on-accent on contained fill (active)",
      fg: "on-accent",
      bg: "interactive-contained-active",
    },
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

  const displayTokenPairs = (accent: string, mode: "light" | "dark") => {
    const isGrayscale = accent === "grayscale";
    const rows = tokenPairs
      .map(({ label, fg, bg }) => {
        const fgResolved = resolveTokenEffective(fg, { mode, isGrayscale });
        const bgResolved = resolveTokenEffective(bg, { mode, isGrayscale });
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
          `${label} (${stepDesc(fgResolved)}/${stepDesc(bgResolved)})`,
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
    if (modes.light) displayTokenPairs(accent, "light");
    if (modes.dark) displayTokenPairs(accent, "dark");
  });
}
