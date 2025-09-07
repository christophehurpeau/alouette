import convert from "color-convert";
import fs from "node:fs";

type ColorScale = Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10, string>;

const createColorScale = (
  baseColor: string,
  hue: number,
  kind: "dark" | "light",
  { boostTextContrast = 0, boostLight = 0 } = {},
): ColorScale => {
  const hsl = convert.hex.hsl(baseColor);
  if (hsl[0] !== hue) {
    console.warn(`Hue mismatch: ${hsl[0]} !== ${hue}`);
  }

  const saturations =
    hue === 0
      ? {
          dark: { standard: 0, interactive: 0, moreSaturation: 0 },
          light: { standard: 0, interactive: 0, moreSaturation: 0 },
        }
      : {
          dark: { standard: 85, interactive: 78, moreSaturation: 88 },
          light: { standard: 56, interactive: 82, moreSaturation: 96 },
        };

  const lightnessSteps =
    kind === "light"
      ? [96, 92, 88, 84, 78, 72, 56, 38, 32, 18]
      : [
          hue === 0 ? 10 : 6,
          hue === 0 ? 12 : 10,
          hue === 0 ? 16 : 12,
          hue === 0 ? 20 : 16,
          hue === 0 ? 24 : 24,
          hue === 0 ? 28 : 24,
          hue === 0 ? 32 : 28,
          62,
          68,
          82,
        ];

  const scale: ColorScale = {
    1: `#${convert.hsl.hex([hue, saturations[kind].standard, lightnessSteps[0]])}`,
    2: `#${convert.hsl.hex([hue, saturations[kind].interactive, boostLight + lightnessSteps[1]])}`,
    3: `#${convert.hsl.hex([hue, saturations[kind].interactive, boostLight + lightnessSteps[2]])}`,
    4: `#${convert.hsl.hex([hue, saturations[kind].interactive, boostLight + lightnessSteps[3]])}`,
    5: `#${convert.hsl.hex([hue, saturations[kind].interactive, boostLight + lightnessSteps[4]])}`,
    6: `#${convert.hsl.hex([hue, saturations[kind].interactive, boostLight + lightnessSteps[5]])}`,
    7: `#${convert.hsl.hex([hue, saturations[kind].interactive, boostLight + lightnessSteps[6]])}`,
    8: `#${convert.hsl.hex([hue, saturations[kind].moreSaturation, boostLight + lightnessSteps[7] + boostTextContrast])}`,
    9: `#${convert.hsl.hex([hue, saturations[kind].moreSaturation, boostLight + lightnessSteps[8] + boostTextContrast])}`,
    10: `#${convert.hsl.hex([hue, saturations[kind].moreSaturation, boostLight + lightnessSteps[9] + boostTextContrast])}`,
  };

  return scale;
};

const createColorPalettes = (
  name: string,
  color: string,
  hue: number,
  { boostLightTextContrast = 0, boostLight = 0 } = {},
) => {
  return {
    ['"' + name + '.light"']: createColorScale(color, hue, "light", {
      boostTextContrast: boostLightTextContrast * -1, // we want less light to have more contrast
      boostLight: boostLight,
    }),
    ['"' + name + '.dark"']: createColorScale(color, hue, "dark", {
      boostLight: boostLight,
    }),
  };
};

const generatePalettes = () => {
  const palettes = {
    ...createColorPalettes("grayscale", "#8e8e8e", 0),
    ...createColorPalettes("primary", "#31a1c4", 194, {
      boostLightTextContrast: 8,
    }),
    ...createColorPalettes("danger", "#b52a26", 2, {
      boostLight: 6,
    }),
    ...createColorPalettes("info", "#2ac8ff", 195, {
      boostLightTextContrast: 8,
    }),
    ...createColorPalettes("success", "#2ac82a", 120, {
      boostLightTextContrast: 8,
    }),
    ...createColorPalettes("warning", "#ffb72a", 40, {
      boostLightTextContrast: 16,
      boostLight: 6,
    }),
  };

  return palettes;
};

const palettes = generatePalettes();

if (process.argv[2] === "generate") {
  let content = "";
  content += "import { createColorScale } from './colorScales';\n";
  content += "import type { AlouetteColorScales } from './colorScales';\n\n";
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
    console.log(`\n${ansiColors.bright}${name}:${ansiColors.reset}`);
    Object.entries(palette).forEach(([step, color]) => {
      const swatch = displayColorSwatch(color, "██");
      const colorToCompareForStepBefore7 = name.includes(".light")
        ? "#000000"
        : "#fdfdfd";
      const colorToCompareForStepAfter7 = name.includes(".light")
        ? "#ffffff"
        : "#121212";
      console.log(
        [
          `  ${step.padStart(2, " ")}:`,
          swatch,
          color,
          ...(step === "7"
            ? ["N/A"]
            : [
                getContrastGrade(
                  getContrastRatio(
                    color,
                    Number(step) < 7
                      ? colorToCompareForStepBefore7
                      : colorToCompareForStepAfter7,
                  ),
                ),
                ["8", "9", "10"].includes(step)
                  ? "/ vs .1: " +
                    getContrastGrade(getContrastRatio(color, palette["1"]))
                  : null,
              ]),
        ]
          .filter(Boolean)
          .join(" "),
      );
    });
  };

  Object.entries(palettes).forEach(([name, palette]) => {
    displayPalette(name, palette);
  });
}
