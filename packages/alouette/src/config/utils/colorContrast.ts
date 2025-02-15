/**
 * Calculates relative luminance of a color
 * Based on WCAG 2.0 formula: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
const getLuminance = (r: number, g: number, b: number) => {
  const values: [number, number, number] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.039_28 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];

  return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
};

/**
 * Converts hex color to RGB values
 */
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result?.[1] || !result[2] || !result[3]) return null;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
};

/**
 * Calculates contrast ratio between two colors
 * Returns ratio between 1 and 21
 */
export const getContrastRatio = (color1: string, color2: string) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 0;

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Checks if contrast ratio meets WCAG requirements
 */
export const checkContrast = (
  foreground: string,
  background: string,
  level: "AA" | "AAA" = "AA",
) => {
  const ratio = getContrastRatio(foreground, background);
  const minimumRatio = level === "AA" ? 4.5 : 7;

  return {
    ratio,
    passes: ratio >= minimumRatio,
    minimumRatio,
  };
};

/**
 * Development warning for contrast issues
 */
export const warnOnContrastIssues = (
  themeName: string,
  textColor: string,
  backgroundColor: string,
) => {
  if (process.env.NODE_ENV !== "development") return;

  const result = checkContrast(textColor, backgroundColor);

  if (!result.passes) {
    console.warn(
      `[Alouette] Contrast warning in theme "${themeName}":
       Text color ${textColor} on background ${backgroundColor}
       has contrast ratio of ${result.ratio.toFixed(2)}.
       Minimum required: ${result.minimumRatio}
       This may cause accessibility issues.`,
    );
  }
};
