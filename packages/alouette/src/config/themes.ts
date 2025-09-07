/* eslint-disable camelcase */
import type { Variable } from "@tamagui/core";
import { mappingLightToDark } from "./colorScales";
import type {
  AlouetteColorIntent,
  AlouetteColorScaleNumber,
  AlouetteColorScales,
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
  backgroundColor: Variable<string>;
  pageBackgroundColor: Variable<string>;
  nonInteractiveBackgroundColor: Variable<string>;
  "gradientColor:start": Variable<string>;
  "gradientColor:middle": Variable<string>;
  "gradientColor:end": Variable<string>;
  textColor: Variable<string>;
  "textColor:disabled": Variable<string>;
  coloredTextColor: Variable<string>;
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

export const createColorTheme = <const ColorIntent extends AlouetteColorIntent>(
  tokens: ReturnType<typeof createAlouetteTokens<AlouetteColorScales>>,
  intent: ColorIntent,
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
  ) => {
    return tokens.color[
      `${tint || intent}.${mode}.${mode === "dark" ? mappingLightToDark[scaleNumber] : scaleNumber}` as keyof typeof tokens.color
    ];
  };

  const theme = {
    backgroundColor,
    "gradientColor:start": getColor(5),
    "gradientColor:middle": getColor(7),
    "gradientColor:end": getColor(4),
    textColor,
    pageBackgroundColor: getColor(1),
    nonInteractiveBackgroundColor: getColor(3),
    coloredTextColor: getColor(9),
    borderColor: getColor(4),
    shadowColor: getColor(8),
    "textColor:disabled": getColor(6, "grayscale"),

    "interactive.linkTextColor": getColor(9),
    "interactive.linkTextColor:hover": getColor(10),
    "interactive.linkTextColor:focus": getColor(10),
    "interactive.linkTextColor:press": getColor(8),
    "interactive.linkTextColor:disabled": getColor(9, "grayscale"),

    "interactive.contained.backgroundColor": getColor(6),
    "interactive.elevated.backgroundColor": backgroundColor,
    "interactive.elevated.shadowColor": getColor(8),
    "interactive.elevated.borderColor": getColor(1),
    "interactive.outlined.backgroundColor": backgroundColor,
    "interactive.outlined.borderColor": getColor(7),

    "interactive.contained.backgroundColor:hover": getColor(5),
    "interactive.elevated.backgroundColor:hover": getColor(2),
    "interactive.elevated.borderColor:hover": getColor(1),
    "interactive.outlined.backgroundColor:hover": getColor(2),
    "interactive.outlined.borderColor:hover": getColor(6),

    "interactive.contained.backgroundColor:focus": getColor(5),
    "interactive.elevated.backgroundColor:focus": getColor(2),
    "interactive.elevated.borderColor:focus": getColor(1),
    "interactive.outlined.backgroundColor:focus": getColor(2),
    "interactive.outlined.borderColor:focus": getColor(6),

    "interactive.contained.backgroundColor:press": getColor(3),
    "interactive.elevated.backgroundColor:press": getColor(4),
    "interactive.elevated.borderColor:press": getColor(1),
    "interactive.outlined.backgroundColor:press": getColor(4),
    "interactive.outlined.borderColor:press": getColor(6),

    "interactive.contained.backgroundColor:disabled": getColor(4, "grayscale"),
    "interactive.elevated.backgroundColor:disabled": backgroundColor,
    "interactive.elevated.shadowColor:disabled": getColor(8, "grayscale"),
    "interactive.elevated.borderColor:disabled": getColor(1, "grayscale"),
    "interactive.outlined.backgroundColor:disabled": backgroundColor,
    "interactive.outlined.borderColor:disabled": getColor(7, "grayscale"),

    "interactive.forms.textColor": textColor,
    "interactive.forms.placeholderTextColor": getColor(8, "grayscale"),

    // "interactive.forms.backgroundColor": undefined,
    // "interactive.forms.backgroundColor:hover": undefined,
    "interactive.forms.backgroundColor:focus": getColor(2),
    "interactive.forms.backgroundColor:press": getColor(4),
    "interactive.forms.borderColor": getColor(7),
    "interactive.forms.borderColor:disabled": getColor(7, "grayscale"),
    "interactive.forms.borderColor:hover": getColor(6),
    "interactive.forms.borderColor:focus": getColor(6),
    "interactive.forms.borderColor:press": getColor(6),
  } satisfies FullTheme;

  if (process.env.NODE_ENV === "development") {
    // Check main text contrast
    warnOnContrastIssues(
      intent,
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
