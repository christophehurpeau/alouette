import type { Variable } from "@tamagui/core";
import { createAlouetteTokens } from "./createAlouetteTokens";
import { AlouetteColorScaleNames } from "./colorScales";

interface MinimalTheme {
  backgroundColor: Variable;
  textColor: Variable;
}

const createTheme = <T extends MinimalTheme>(theme: T): T => {
  return theme;
};

const createColorTheme = (
  tokens: ReturnType<typeof createAlouetteTokens>,
  colorScaleName: AlouetteColorScaleNames,
  textColor = tokens.color.black,
  contrastTextColor = tokens.color.white,
) => {
  const getColor = (scaleNumber: number) =>
    tokens.color[
      (colorScaleName + `.${scaleNumber}`) as keyof typeof tokens.color
    ];
  return {
    mainColor: getColor(6),
    mainTextColor: getColor(9),
    contrastTextColor,
    borderColor: getColor(8),

    "interactive.contained.backgroundColor": getColor(5),
    "interactive.borderColor": getColor(8),

    "interactive.contained.backgroundColor:hover": getColor(4),
    "interactive.outlined.backgroundColor:hover": getColor(1),
    "interactive.borderColor:hover": getColor(7),

    "interactive.contained.backgroundColor:focus": getColor(4),
    "interactive.outlined.backgroundColor:focus": getColor(1),
    "interactive.borderColor:focus": getColor(7),

    "interactive.contained.backgroundColor:press": getColor(2),
    "interactive.outlined.backgroundColor:press": getColor(3),
    "interactive.borderColor:press": getColor(7),

    "interactive.contained.backgroundColor:disabled": tokens.color.disabled,
    "interactive.borderColor:disabled": tokens.color.disabled,
    "interactive.textColor:disabled": tokens.color.contrastDisabled,

    "interactive.forms.textColor": textColor,
    // "interactive.forms.backgroundColor": undefined,
    // "interactive.forms.backgroundColor:hover": undefined,
    "interactive.forms.backgroundColor:focus": getColor(1),
    "interactive.forms.backgroundColor:press": getColor(3),
    "interactive.forms.borderColor": getColor(10),
    "interactive.forms.borderColor:hover": getColor(7),
    "interactive.forms.borderColor:focus": getColor(7),
    "interactive.forms.borderColor:press": getColor(7),
    "interactive.forms.borderColor:disabled": tokens.color.disabled,
  };
};

export const createAlouetteThemes = (
  tokens: ReturnType<typeof createAlouetteTokens>,
) =>
  ({
    light: createTheme({
      backgroundColor: tokens.color.white,
      textColor: tokens.color.black,
    }),
    light_info: createColorTheme(tokens, "info"),
    light_success: createColorTheme(tokens, "success"),
    light_warning: createColorTheme(tokens, "warning"),
    light_danger: createColorTheme(tokens, "danger"),
    light_primary: createColorTheme(tokens, "primary"),

    dark: createTheme({
      backgroundColor: tokens.color.black,
      textColor: tokens.color.white,
    }),

    dark_info: createColorTheme(
      tokens,
      "info",
      tokens.color.black,
      tokens.color.white,
    ),
    dark_success: createColorTheme(
      tokens,
      "success",
      tokens.color.black,
      tokens.color.white,
    ),
    dark_warning: createColorTheme(
      tokens,
      "warning",
      tokens.color.black,
      tokens.color.white,
    ),
    dark_danger: createColorTheme(
      tokens,
      "danger",
      tokens.color.black,
      tokens.color.white,
    ),
    dark_primary: createColorTheme(
      tokens,
      "primary",
      tokens.color.black,
      tokens.color.white,
    ),
  }) as const;
