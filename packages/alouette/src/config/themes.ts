/* eslint-disable complexity */
/* eslint-disable camelcase */
import type { Variable } from "@tamagui/core";
import { mappingLightToDark } from "./colorScales";
import type {
  AlouetteColorScaleNumber,
  AlouetteColorScales,
  AlouetteThemeNames,
} from "./colorScales";
import type { createAlouetteTokens } from "./createAlouetteTokens";
import { warnOnContrastIssues } from "./utils/colorContrast";

// export interface MinimalRootTheme {
//   backgroundColor: Variable<string>;
//   textColor: Variable<string>;
// }

// export interface RootTheme {
//   backgroundColor: Variable<string>;
//   textColor: Variable<string>;
// }

export interface ColorTheme {
  screenBackgroundColor: Variable<string>;
  "screenBackgroundColor.translucent": Variable<string>;
  "screenBackgroundColor.elevated": Variable<string>;
  nonInteractiveBackgroundColor: Variable<string>;
  "nonInteractiveBackgroundColor.elevated": Variable<string>;

  "gradientColor:start": Variable<string>;
  "gradientColor:middle": Variable<string>;
  "gradientColor:end": Variable<string>;
  textColor: Variable<string>;
  "textColor:disabled": Variable<string>;
  accentTextColor: Variable<string>;
  borderColor: Variable<string>;
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

  "interactive.contained.outlineColor:focus": Variable<string>;
  "interactive.elevated.outlineColor:focus": Variable<string>;
  "interactive.outlined.outlineColor:focus": Variable<string>;

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

  "interactive.forms.textColor": Variable<string>;
  "interactive.forms.placeholderTextColor": Variable<string>;
  "interactive.forms.outlineColor:focus": Variable<string>;
  "interactive.forms.backgroundColor": Variable<string>;
  "interactive.forms.backgroundColor:hover": Variable<string>;
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

export const createColorTheme = <
  const ColorTheme extends keyof AlouetteThemeNames,
>(
  tokens: ReturnType<typeof createAlouetteTokens<AlouetteColorScales>>,
  themeName: ColorTheme,
  mode: "dark" | "light" = "light",
  // TODO replace by color in scale
  backgroundColor?: Variable<string>,
  textColor?: Variable<string>,
) => {
  const alouetteTokens: ReturnType<
    typeof createAlouetteTokens<AlouetteColorScales>
  > = tokens;
  if (!backgroundColor) {
    backgroundColor =
      mode === "dark"
        ? alouetteTokens.color.blackBackground
        : alouetteTokens.color.whiteBackground;
  }
  if (!textColor) {
    textColor =
      mode === "dark"
        ? alouetteTokens.color.whiteText
        : alouetteTokens.color.blackText;
  }

  const getColor = (
    scaleNumber: AlouetteColorScaleNumber,
    tint?: "grayscale",
    adaptForDarkMode = true,
  ) => {
    return tokens.color[
      `${tint || themeName}.${mode}.${mode === "dark" && adaptForDarkMode ? mappingLightToDark[scaleNumber] : scaleNumber}` as keyof typeof tokens.color
    ];
  };

  const theme = {
    screenBackgroundColor: getColor(1),
    "screenBackgroundColor.elevated": getColor(
      mode === "dark" ? 2 : 1,
      undefined,
      false,
    ),
    "screenBackgroundColor.translucent":
      mode === "dark"
        ? alouetteTokens.color.blackBackgroundTranslucent
        : alouetteTokens.color.whiteBackgroundTranslucent,
    nonInteractiveBackgroundColor: getColor(3),
    "nonInteractiveBackgroundColor.elevated": getColor(
      mode === "dark" ? 4 : 3,
      undefined,
      false,
    ),

    "gradientColor:start": getColor(mode === "dark" ? 5 : 6, undefined, false),
    "gradientColor:middle": getColor(mode === "dark" ? 6 : 7, undefined, false),
    "gradientColor:end": getColor(mode === "dark" ? 4 : 5, undefined, false),

    textColor,
    accentTextColor: getColor(9),
    borderColor: getColor(8),
    shadowColor:
      mode === "dark"
        ? alouetteTokens.color.transparent
        : getColor(8, "grayscale", false),
    "textColor:disabled": getColor(mode === "dark" ? 8 : 7, "grayscale", false),

    "interactive.linkTextColor": getColor(9),
    "interactive.linkTextColor:hover": getColor(10),
    "interactive.linkTextColor:focus": getColor(10),
    "interactive.linkTextColor:press": getColor(8),
    "interactive.linkTextColor:disabled": getColor(9, "grayscale"),

    "interactive.contained.backgroundColor": getColor(6),
    "interactive.elevated.backgroundColor":
      mode === "dark" ? getColor(4, "grayscale", false) : backgroundColor,
    "interactive.elevated.shadowColor":
      mode === "dark" ? alouetteTokens.color.transparent : getColor(8),
    "interactive.elevated.borderColor": getColor(mode === "dark" ? 7 : 1),
    "interactive.outlined.backgroundColor": backgroundColor,
    "interactive.outlined.borderColor": getColor(7),

    "interactive.contained.backgroundColor:hover": getColor(5),
    "interactive.elevated.backgroundColor:hover": getColor(2),
    "interactive.elevated.borderColor:hover": getColor(mode === "dark" ? 8 : 1),
    "interactive.outlined.backgroundColor:hover": backgroundColor,
    "interactive.outlined.borderColor:hover": getColor(8),

    "interactive.contained.backgroundColor:focus": getColor(5),
    "interactive.elevated.backgroundColor:focus": getColor(2),
    "interactive.elevated.borderColor:focus": getColor(mode === "dark" ? 8 : 1),
    "interactive.outlined.backgroundColor:focus": backgroundColor,
    "interactive.outlined.borderColor:focus": getColor(8),

    "interactive.contained.outlineColor:focus": getColor(7, undefined, false),
    "interactive.outlined.outlineColor:focus": getColor(7, undefined, false),
    "interactive.elevated.outlineColor:focus": getColor(7, undefined, false),

    "interactive.contained.backgroundColor:press": getColor(3),
    "interactive.elevated.backgroundColor:press": getColor(4),
    "interactive.elevated.borderColor:press": getColor(mode === "dark" ? 8 : 1),
    "interactive.outlined.backgroundColor:press": backgroundColor,
    "interactive.outlined.borderColor:press": getColor(8),

    "interactive.contained.backgroundColor:disabled": getColor(
      4,
      "grayscale",
      false,
    ),
    "interactive.elevated.backgroundColor:disabled": backgroundColor,
    "interactive.elevated.shadowColor:disabled": getColor(8, "grayscale"),
    "interactive.elevated.borderColor:disabled": getColor(1, "grayscale"),
    "interactive.outlined.backgroundColor:disabled": backgroundColor,
    "interactive.outlined.borderColor:disabled": getColor(6, "grayscale"),

    "interactive.forms.textColor": textColor,
    "interactive.forms.placeholderTextColor": getColor(8, "grayscale"),
    "interactive.forms.outlineColor:focus": getColor(7, undefined, false),

    "interactive.forms.backgroundColor": backgroundColor,
    "interactive.forms.backgroundColor:hover": backgroundColor,
    "interactive.forms.backgroundColor:focus": getColor(2),
    "interactive.forms.backgroundColor:press": getColor(4),
    "interactive.forms.borderColor": getColor(7),
    "interactive.forms.borderColor:disabled": getColor(7, "grayscale"),
    "interactive.forms.borderColor:hover": getColor(
      mode === "dark" ? 8 : 6,
      undefined,
      false,
    ),
    "interactive.forms.borderColor:focus": getColor(
      mode === "dark" ? 8 : 6,
      undefined,
      false,
    ),
    "interactive.forms.borderColor:press": getColor(6),
  } satisfies FullTheme;

  if (process.env.NODE_ENV === "development") {
    // Check main text contrast
    warnOnContrastIssues(
      themeName,
      theme.textColor.val,
      theme.screenBackgroundColor.val,
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
