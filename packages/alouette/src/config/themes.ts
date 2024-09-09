/* eslint-disable camelcase */
import type { Variable } from "@tamagui/core";
import type { AlouetteColorScales } from "./colorScales";
import type { createAlouetteTokens } from "./createAlouetteTokens";

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
  mainColor: Variable<string>;
  mainTextColor: Variable<string>;
  contrastTextColor: Variable<string>;
  borderColor: Variable<string>;

  "interactive.contained.backgroundColor": Variable<string>;
  "interactive.borderColor": Variable<string>;

  "interactive.contained.backgroundColor:hover": Variable<string>;
  "interactive.outlined.backgroundColor:hover": Variable<string>;
  "interactive.borderColor:hover": Variable<string>;

  "interactive.contained.backgroundColor:focus": Variable<string>;
  "interactive.outlined.backgroundColor:focus": Variable<string>;
  "interactive.borderColor:focus": Variable<string>;

  "interactive.contained.backgroundColor:press": Variable<string>;
  "interactive.outlined.backgroundColor:press": Variable<string>;
  "interactive.borderColor:press": Variable<string>;

  "interactive.contained.backgroundColor:disabled": Variable<string>;
  "interactive.borderColor:disabled": Variable<string>;
  "interactive.textColor:disabled": Variable<string>;

  "interactive.forms.textColor": Variable<string>;
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

export const createColorTheme = <const ColorScales extends AlouetteColorScales>(
  tokens: ReturnType<typeof createAlouetteTokens<ColorScales>>,
  colorScaleName: string & keyof ColorScales,
  backgroundColor?: Variable<string>,
  textColor?: Variable<string>,
  contrastTextColor?: Variable<string>,
  // eslint-disable-next-line @typescript-eslint/max-params
) => {
  const alouetteTokens: ReturnType<
    typeof createAlouetteTokens<AlouetteColorScales>
  > = tokens;
  if (!backgroundColor) backgroundColor = alouetteTokens.color.white;
  if (!textColor) textColor = alouetteTokens.color.black;
  if (!contrastTextColor) contrastTextColor = alouetteTokens.color.white;

  const getColor = (scaleNumber: number) =>
    tokens.color[
      `${colorScaleName}.${scaleNumber}` as keyof typeof tokens.color
    ];

  return {
    backgroundColor,
    textColor,
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

    "interactive.contained.backgroundColor:disabled":
      alouetteTokens.color.disabled,
    "interactive.borderColor:disabled": alouetteTokens.color.disabled,
    "interactive.textColor:disabled": alouetteTokens.color.contrastDisabled,

    "interactive.forms.textColor": textColor,
    // "interactive.forms.backgroundColor": undefined,
    // "interactive.forms.backgroundColor:hover": undefined,
    "interactive.forms.backgroundColor:focus": getColor(1),
    "interactive.forms.backgroundColor:press": getColor(3),
    "interactive.forms.borderColor": getColor(10),
    "interactive.forms.borderColor:hover": getColor(7),
    "interactive.forms.borderColor:focus": getColor(7),
    "interactive.forms.borderColor:press": getColor(7),
    "interactive.forms.borderColor:disabled": alouetteTokens.color.disabled,
  } satisfies FullTheme;
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
    light: createColorTheme(
      alouetteTokens,
      "grayscale",
      alouetteTokens.color.white,
      alouetteTokens.color.black,
    ),
    light_info: createColorTheme(alouetteTokens, "info"),
    light_success: createColorTheme(alouetteTokens, "success"),
    light_warning: createColorTheme(alouetteTokens, "warning"),
    light_danger: createColorTheme(alouetteTokens, "danger"),
    light_primary: createColorTheme(alouetteTokens, "primary"),

    // dark: createRootTheme({
    //   backgroundColor: alouetteTokens.color.black,
    //   textColor: alouetteTokens.color.white,
    // }),

    // dark_info: createColorTheme(
    //   alouetteTokens,
    //   "info",
    //   alouetteTokens.color.black,
    //   alouetteTokens.color.white,
    // ),
    // dark_success: createColorTheme(
    //   alouetteTokens,
    //   "success",
    //   alouetteTokens.color.black,
    //   alouetteTokens.color.white,
    // ),
    // dark_warning: createColorTheme(
    //   alouetteTokens,
    //   "warning",
    //   alouetteTokens.color.black,
    //   alouetteTokens.color.white,
    // ),
    // dark_danger: createColorTheme(
    //   alouetteTokens,
    //   "danger",
    //   alouetteTokens.color.black,
    //   alouetteTokens.color.white,
    // ),
    // dark_primary: createColorTheme(
    //   alouetteTokens,
    //   "primary",
    //   alouetteTokens.color.black,
    //   alouetteTokens.color.white,
    // ),
  } as const;
};
