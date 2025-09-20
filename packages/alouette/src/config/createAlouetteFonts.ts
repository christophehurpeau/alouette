import { createFont } from "@tamagui/core";

const defaultHeadingFontSizes = { xl: 48, lg: 40, md: 32, sm: 24, xs: 18 };
const defaultBodyFontSizes = { xl: 24, lg: 18, md: 16, sm: 14, xs: 12 };

const roundWith1Precision = (value: number): number =>
  Math.round(value * 10) / 10;

export interface AlouetteFontsOptions {
  headingFontFamily?: string;
  headingFontSizes?: typeof defaultHeadingFontSizes;
  bodyFontFamily?: string;
  bodyFontSizes?: typeof defaultBodyFontSizes;
  monospaceFontFamily?: string;
  monospaceFontSizes?: typeof defaultBodyFontSizes;
}

export const createAlouetteFonts = ({
  headingFontFamily = "Sora",
  headingFontSizes = defaultHeadingFontSizes,
  bodyFontFamily = "Sora",
  bodyFontSizes = defaultBodyFontSizes,
  monospaceFontFamily,
  monospaceFontSizes = defaultBodyFontSizes,
}: AlouetteFontsOptions = {}) => ({
  heading: createFont({
    family: headingFontFamily,
    weight: {
      regular: "400",
      bold: "700",
      extraBold: "800",
    },
    face: {
      400: { normal: `${headingFontFamily}Regular` },
      700: { normal: `${headingFontFamily}Bold` },
      800: { normal: `${headingFontFamily}ExtraBold` },
    },
    size: headingFontSizes,
    lineHeight: {
      xl: roundWith1Precision(1.1 * headingFontSizes.xl),
      lg: roundWith1Precision(1.1 * headingFontSizes.lg),
      md: roundWith1Precision(1.2 * headingFontSizes.md),
      sm: roundWith1Precision(1.3 * headingFontSizes.sm),
      xs: roundWith1Precision(1.3 * headingFontSizes.xs),
    },
  }),
  body: createFont({
    family: bodyFontFamily,
    weight: {
      regular: "400",
      bold: "700",
      extraBold: "800",
    },
    face: {
      400: { normal: `${bodyFontFamily}Regular` },
      700: { normal: `${bodyFontFamily}Bold` },
      800: { normal: `${bodyFontFamily}ExtraBold` },
    },
    size: bodyFontSizes,
    lineHeight: {
      xl: roundWith1Precision(1.4 * bodyFontSizes.xl),
      lg: roundWith1Precision(1.4 * bodyFontSizes.lg),
      md: roundWith1Precision(1.4 * bodyFontSizes.md),
      sm: roundWith1Precision(1.4 * bodyFontSizes.sm),
      xs: roundWith1Precision(1.4 * bodyFontSizes.xs),
    },
  }),
  ...(monospaceFontFamily
    ? {
        monospace: createFont({
          family: monospaceFontFamily,
          weight: {
            regular: "400",
            bold: "700",
            extraBold: "800",
          },
          face: {
            400: { normal: `${monospaceFontFamily}Regular` },
            700: { normal: `${monospaceFontFamily}Bold` },
            800: { normal: `${monospaceFontFamily}ExtraBold` },
          },
          size: monospaceFontSizes,
          lineHeight: {
            xl: roundWith1Precision(1.1 * monospaceFontSizes.xl),
            lg: roundWith1Precision(1.1 * monospaceFontSizes.lg),
            md: roundWith1Precision(1.2 * monospaceFontSizes.md),
            sm: roundWith1Precision(1.3 * monospaceFontSizes.sm),
            xs: roundWith1Precision(1.3 * monospaceFontSizes.xs),
          },
        }),
      }
    : {}),
});
