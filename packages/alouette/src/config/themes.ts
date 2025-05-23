/* eslint-disable camelcase */
import type { Variable } from "@tamagui/core";
import type {
  AlouetteColorScaleNumber,
  AlouetteColorScales,
} from "./colorScales.ts";
import type { createAlouetteTokens } from "./createAlouetteTokens.ts";
import { warnOnContrastIssues } from "./utils/colorContrast.ts";

// export interface MinimalRootTheme {
//   backgroundColor: Variable<string>;
//   textColor: Variable<string>;
// }

// export interface RootTheme {
//   backgroundColor: Variable<string>;
//   textColor: Variable<string>;
// }

export interface ColorTheme {
  backgroundColor: Variable<string>;
  textColor: Variable<string>;
  contrastTextColor: Variable<string>;
  "textColor:disabled": Variable<string>;
  "contrastTextColor:disabled": Variable<string>;
  mainColor: Variable<string>;
  mainTextColor: Variable<string>;
  borderColor: Variable<string>;
  contrastBorderColor: Variable<string>;
  shadowColor: Variable<string>;

  "interactive.linkTextColor": Variable<string>;
  "interactive.linkTextColor:hover": Variable<string>;
  "interactive.linkTextColor:focus": Variable<string>;
  "interactive.linkTextColor:press": Variable<string>;
  "interactive.linkTextColor:disabled": Variable<string>;

  "interactive.contained.backgroundColor": Variable<string>;
  "interactive.elevated.backgroundColor": Variable<string>;
  "interactive.elevated.shadowColor": Variable<string>;
  "interactive.elevated.borderColor": Variable<string>;
  "interactive.outlined.backgroundColor": Variable<string>;
  "interactive.outlined.borderColor": Variable<string>;

  "interactive.contained.backgroundColor:hover": Variable<string>;
  "interactive.elevated.backgroundColor:hover": Variable<string>;
  "interactive.elevated.borderColor:hover": Variable<string>;
  "interactive.outlined.backgroundColor:hover": Variable<string>;
  "interactive.outlined.borderColor:hover": Variable<string>;

  "interactive.contained.backgroundColor:focus": Variable<string>;
  "interactive.elevated.backgroundColor:focus": Variable<string>;
  "interactive.elevated.borderColor:focus": Variable<string>;
  "interactive.outlined.backgroundColor:focus": Variable<string>;
  "interactive.outlined.borderColor:focus": Variable<string>;

  "interactive.contained.backgroundColor:press": Variable<string>;
  "interactive.elevated.backgroundColor:press": Variable<string>;
  "interactive.elevated.borderColor:press": Variable<string>;
  "interactive.outlined.backgroundColor:press": Variable<string>;
  "interactive.outlined.borderColor:press": Variable<string>;

  "interactive.contained.backgroundColor:disabled": Variable<string>;
  "interactive.elevated.backgroundColor:disabled": Variable<string>;
  "interactive.elevated.shadowColor:disabled": Variable<string>;
  "interactive.elevated.borderColor:disabled": Variable<string>;
  "interactive.outlined.backgroundColor:disabled": Variable<string>;
  "interactive.outlined.borderColor:disabled": Variable<string>;
  "interactive.textColor:disabled": Variable<string>;

  "interactive.forms.textColor": Variable<string>;
  "interactive.forms.placeholderTextColor": Variable<string>;
  // "interactive.forms.backgroundColor": Variable<string>,
  // "interactive.forms.backgroundColor:hover": Variable<string>,
  "interactive.forms.backgroundColor:focus": Variable<string>;
  "interactive.forms.backgroundColor:press": Variable<string>;
  "interactive.forms.borderColor": Variable<string>;
  "interactive.forms.borderColor:hover": Variable<string>;
  "interactive.forms.borderColor:focus": Variable<string>;
  "interactive.forms.borderColor:press": Variable<string>;
  "interactive.forms.borderColor:disabled": Variable<string>;
}

// export interface FullTheme extends ColorTheme, RootTheme {}
export type FullTheme = ColorTheme;

// export const createRootTheme = <T extends MinimalRootTheme>(
//   theme: T,
// ): FullTheme => {
//   return theme satisfies RootTheme as unknown as FullTheme;
// };

const darkModeScaleNumbers: Record<
  AlouetteColorScaleNumber,
  AlouetteColorScaleNumber
> = {
  1: 10,
  2: 9,
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4,
  8: 3,
  9: 2,
  10: 1,
};

export const createColorTheme = <const ColorScales extends AlouetteColorScales>(
  tokens: ReturnType<typeof createAlouetteTokens<ColorScales>>,
  colorScaleName: string & keyof ColorScales,
  mode: "dark" | "light" = "light",
  backgroundColor?: Variable<string>,
  textColor?: Variable<string>,
  contrastTextColor?: Variable<string>,
) => {
  const alouetteTokens: ReturnType<
    typeof createAlouetteTokens<AlouetteColorScales>
  > = tokens;
  if (!backgroundColor) {
    backgroundColor =
      mode === "dark" ? alouetteTokens.color.black : alouetteTokens.color.white;
  }
  if (!textColor) {
    textColor =
      mode === "dark" ? alouetteTokens.color.white : alouetteTokens.color.black;
  }
  if (!contrastTextColor) {
    if (colorScaleName === "grayscale") {
      contrastTextColor =
        mode === "dark"
          ? alouetteTokens.color.white
          : alouetteTokens.color.black;
    } else {
      contrastTextColor =
        mode === "dark"
          ? alouetteTokens.color.black
          : alouetteTokens.color.white;
    }
  }

  const getColor = (
    lightScaleNumber: AlouetteColorScaleNumber,
    forceScaleNumber = colorScaleName,
  ) => {
    // Invert scale for dark mode
    const scaleNumber =
      mode === "dark"
        ? darkModeScaleNumbers[lightScaleNumber]
        : lightScaleNumber;

    return tokens.color[
      `${forceScaleNumber}.${scaleNumber}` as keyof typeof tokens.color
    ];
  };

  const contrastBorderColor = contrastTextColor;

  const theme = {
    backgroundColor,
    textColor,
    mainColor: getColor(6),
    mainTextColor: getColor(9),
    contrastTextColor,
    borderColor: getColor(8),
    contrastBorderColor,
    shadowColor: getColor(9),
    "textColor:disabled": getColor(3, "grayscale"),
    "contrastTextColor:disabled": getColor(7, "grayscale"),

    "interactive.linkTextColor": getColor(9),
    "interactive.linkTextColor:hover": getColor(7),
    "interactive.linkTextColor:focus": getColor(7),
    "interactive.linkTextColor:press": getColor(7),
    "interactive.linkTextColor:disabled": getColor(3, "grayscale"),

    "interactive.contained.backgroundColor": getColor(5),
    "interactive.elevated.backgroundColor": backgroundColor,
    "interactive.elevated.shadowColor": getColor(9),
    "interactive.elevated.borderColor": contrastBorderColor,
    "interactive.outlined.backgroundColor": backgroundColor,
    "interactive.outlined.borderColor": getColor(mode === "dark" ? 5 : 8),

    "interactive.contained.backgroundColor:hover": getColor(4),
    "interactive.elevated.backgroundColor:hover": getColor(1),
    "interactive.elevated.borderColor:hover": contrastBorderColor,
    "interactive.outlined.backgroundColor:hover": getColor(1),
    "interactive.outlined.borderColor:hover": getColor(mode === "dark" ? 5 : 7),

    "interactive.contained.backgroundColor:focus": getColor(4),
    "interactive.elevated.backgroundColor:focus": getColor(1),
    "interactive.elevated.borderColor:focus": contrastBorderColor,
    "interactive.outlined.backgroundColor:focus": getColor(1),
    "interactive.outlined.borderColor:focus": getColor(7),

    "interactive.contained.backgroundColor:press": getColor(2),
    "interactive.elevated.backgroundColor:press": getColor(3),
    "interactive.elevated.borderColor:press": contrastBorderColor,
    "interactive.outlined.backgroundColor:press": getColor(3),
    "interactive.outlined.borderColor:press": getColor(7),

    "interactive.contained.backgroundColor:disabled": getColor(3, "grayscale"),
    "interactive.elevated.backgroundColor:disabled": backgroundColor,
    "interactive.elevated.shadowColor:disabled": getColor(9, "grayscale"),
    "interactive.elevated.borderColor:disabled": getColor(3, "grayscale"),
    "interactive.outlined.backgroundColor:disabled": backgroundColor,
    "interactive.outlined.borderColor:disabled": getColor(3, "grayscale"),
    "interactive.textColor:disabled": getColor(7, "grayscale"),

    "interactive.forms.textColor": textColor,
    "interactive.forms.placeholderTextColor": getColor(3, "grayscale"),

    // "interactive.forms.backgroundColor": undefined,
    // "interactive.forms.backgroundColor:hover": undefined,
    "interactive.forms.backgroundColor:focus": getColor(1),
    "interactive.forms.backgroundColor:press": getColor(3),
    "interactive.forms.borderColor": getColor(10),
    "interactive.forms.borderColor:hover": getColor(7),
    "interactive.forms.borderColor:focus": getColor(7),
    "interactive.forms.borderColor:press": getColor(7),
    "interactive.forms.borderColor:disabled": getColor(3, "grayscale"),
  } satisfies FullTheme;

  if (process.env.NODE_ENV === "development") {
    // Check main text contrast
    warnOnContrastIssues(
      colorScaleName,
      theme.textColor.val,
      theme.backgroundColor.val,
    );
  }

  return theme;
};

export const createAlouetteThemes = <
  const ColorScales extends AlouetteColorScales,
>(
  tokens: ReturnType<typeof createAlouetteTokens<ColorScales>>,
) => {
  const alouetteTokens: ReturnType<
    typeof createAlouetteTokens<AlouetteColorScales>
  > = tokens;
  return {
    light: createColorTheme(alouetteTokens, "grayscale", "light"),
    light_info: createColorTheme(alouetteTokens, "info", "light"),
    light_success: createColorTheme(alouetteTokens, "success", "light"),
    light_warning: createColorTheme(alouetteTokens, "warning", "light"),
    light_danger: createColorTheme(alouetteTokens, "danger", "light"),
    light_primary: createColorTheme(alouetteTokens, "primary", "light"),

    dark: createColorTheme(alouetteTokens, "grayscale", "dark"),
    dark_info: createColorTheme(alouetteTokens, "info", "dark"),
    dark_success: createColorTheme(alouetteTokens, "success", "dark"),
    dark_warning: createColorTheme(alouetteTokens, "warning", "dark"),
    dark_danger: createColorTheme(alouetteTokens, "danger", "dark"),
    dark_primary: createColorTheme(alouetteTokens, "primary", "dark"),
  } as const;
};
