/* eslint-disable camelcase */
import type { Variable } from "@tamagui/core";
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
  "bg-screen": Variable<string>;
  "bg-surface": Variable<string>;
  "bg-highlight": Variable<string>;
  "bg-highlight-accent": Variable<string>;
  "bg-lowered": Variable<string>;
  "bg-translucent": Variable<string>;
  "bg-screen-gradient-start": Variable<string>;
  "bg-screen-gradient-middle": Variable<string>;
  "bg-screen-gradient-end": Variable<string>;

  "text-sharp": Variable<string>;
  "text-muted": Variable<string>;
  "text-accent": Variable<string>;
  "text-accent-muted": Variable<string>;
  "text-onAccent": Variable<string>;
  "text-onAccent-muted": Variable<string>;
  "text-disabled-sharp": Variable<string>;
  "text-disabled-muted": Variable<string>;

  "border-sharp": Variable<string>;
  "border-muted": Variable<string>;

  selectionBackgroundColor: string;

  "interactive.linkTextColor": Variable<string>;
  "interactive.linkTextColor:hover": Variable<string>;
  "interactive.linkTextColor:focus": Variable<string>;
  "interactive.linkTextColor:press": Variable<string>;
  "interactive.linkTextColor:disabled": Variable<string>;
  "interactive.link.outline:focus": Variable<string>;

  "interactive.contained.backgroundColor": Variable<string>;
  "interactive-accent.contained.backgroundColor": Variable<string>;
  "interactive.outlined.borderColor": Variable<string>;
  "interactive-accent.outlined.borderColor": Variable<string>;

  "interactive.contained.backgroundColor:hover": Variable<string>;
  "interactive-accent.contained.backgroundColor:hover": Variable<string>;
  "interactive.outlined.borderColor:hover": Variable<string>;
  "interactive-accent.outlined.borderColor:hover": Variable<string>;

  "interactive.contained.backgroundColor:focus": Variable<string>;
  "interactive-accent.contained.backgroundColor:focus": Variable<string>;
  "interactive.outlined.borderColor:focus": Variable<string>;
  "interactive-accent.outlined.borderColor:focus": Variable<string>;

  "interactive.contained.outlineColor:focus": Variable<string>;
  "interactive-accent.contained.outlineColor:focus": Variable<string>;
  "interactive.outlined.outlineColor:focus": Variable<string>;
  "interactive-accent.outlined.outlineColor:focus": Variable<string>;

  "interactive.contained.backgroundColor:press": Variable<string>;
  "interactive-accent.contained.backgroundColor:press": Variable<string>;
  "interactive.outlined.borderColor:press": Variable<string>;
  "interactive-accent.outlined.borderColor:press": Variable<string>;

  "interactive.contained.backgroundColor:disabled": Variable<string>;
  "interactive-accent.contained.backgroundColor:disabled": Variable<string>;
  "interactive.outlined.borderColor:disabled": Variable<string>;
  "interactive-accent.outlined.borderColor:disabled": Variable<string>;

  "interactive.forms.placeholderText": Variable<string>;
  "interactive.forms.disabledText": Variable<string>;

  "interactive.forms.backgroundColor": Variable<string>;
  "interactive.forms.backgroundColor:hover": Variable<string>;
  "interactive.forms.backgroundColor:focus": Variable<string>;
  "interactive.forms.backgroundColor:press": Variable<string>;
  "interactive.forms.backgroundColor:disabled": Variable<string>;

  "interactive.forms.borderColor": Variable<string>;
  "interactive.forms.borderColor:hover": Variable<string>;
  "interactive.forms.borderColor:focus": Variable<string>;
  "interactive.forms.borderColor:press": Variable<string>;
  "interactive.forms.borderColor:disabled": Variable<string>;
  "interactive.forms.outlineColor:focus": Variable<string>;
}

// export interface FullTheme extends ColorTheme, RootTheme {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FullTheme extends ColorTheme {}

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
) => {
  const alouetteTokens: ReturnType<
    typeof createAlouetteTokens<AlouetteColorScales>
  > = tokens;

  const getSpecificColor = (
    scaleNumberDarkMode: AlouetteColorScaleNumber,
    scaleNumberLightMode: AlouetteColorScaleNumber,
  ) => {
    return tokens.color[
      `${themeName}.${mode}.${mode === "dark" ? scaleNumberDarkMode : scaleNumberLightMode}` as keyof typeof tokens.color
    ];
  };
  const getSpecificGrayScaleColor = (
    scaleNumberDarkMode: AlouetteColorScaleNumber,
    scaleNumberLightMode: AlouetteColorScaleNumber,
  ) => {
    return tokens.color[
      `grayscale.${mode}.${mode === "dark" ? scaleNumberDarkMode : scaleNumberLightMode}` as keyof typeof tokens.color
    ];
  };

  const bgScreen = getSpecificColor(2, 3); // bottom dark = 6% light = 92/86%
  const bgSurface = getSpecificColor(3, 2); // middle dark = 12% light = 96/92%
  const bgHighlight = getSpecificColor(4, 1); // top or raised dark = 16% light = 100/96%

  const theme = {
    // NEW
    "bg-screen": bgScreen,
    "bg-surface": bgSurface,
    "bg-highlight": bgHighlight,
    "bg-highlight-accent": getSpecificColor(4, 4),

    "bg-lowered": getSpecificColor(1, 4), // deep, combine with deep shadow dark = 0% light = 82%
    "bg-translucent":
      mode === "dark"
        ? alouetteTokens.color.blackBackgroundTranslucent
        : alouetteTokens.color.whiteBackgroundTranslucent,
    "bg-screen-gradient-start": getSpecificColor(3, 4),
    "bg-screen-gradient-middle": getSpecificColor(2, 5),
    "bg-screen-gradient-end": getSpecificColor(1, 6),

    "text-sharp": getSpecificColor(11, 11), // headings, buttons, and important text dark = 96% light = 5%
    "text-muted": getSpecificGrayScaleColor(9, 9), // rest dark = 68% light = 30%

    "text-accent":
      themeName === "grayscale"
        ? getSpecificColor(11, 11)
        : getSpecificColor(9, 9), // same as sharp in default theme, same as muted in colored themes
    "text-accent-muted": getSpecificColor(9, 8),
    "text-onAccent":
      themeName === "grayscale"
        ? getSpecificColor(11, 11)
        : getSpecificColor(11, 9),
    "text-onAccent-muted":
      themeName === "grayscale"
        ? getSpecificColor(9, 8)
        : getSpecificColor(9, 6),

    "text-disabled-muted": getSpecificGrayScaleColor(8, 7),
    "text-disabled-sharp": getSpecificGrayScaleColor(8, 8),

    "border-sharp": getSpecificColor(8, 8),
    "border-muted": getSpecificColor(7, 7),

    selectionBackgroundColor: `${getSpecificColor(9, 9).val}40`,

    // shadowTop: `${getSpecificColor(1, 1).val}40`,
    // shadow2: `${getSpecificColor(11, 11).val}40`,
    // shadow3: `${getSpecificColor(11, 11).val}20`,

    // shadowLowered1: `${getSpecificColor(11, 11).val}40`,
    // shadowLowered2: `${getSpecificColor(1, 1).val}40`,
    // shadowLowered3: `${getSpecificColor(1, 1).val}20`,

    // "shadowinset":
    //   mode === "dark"
    //     ? alouetteTokens.color.transparent
    //     : getColor(8, "grayscale", false),

    "interactive.linkTextColor": getSpecificColor(9, 9),
    "interactive.linkTextColor:hover": getSpecificColor(10, 10),
    "interactive.linkTextColor:focus": getSpecificColor(10, 10),
    "interactive.linkTextColor:press": getSpecificColor(8, 8),
    "interactive.linkTextColor:disabled": getSpecificGrayScaleColor(9, 9),
    "interactive.link.outline:focus": getSpecificColor(7, 7),

    "interactive.forms.placeholderText": getSpecificGrayScaleColor(8, 8),
    "interactive.forms.disabledText": getSpecificGrayScaleColor(9, 9),

    // identical to "surface"
    "interactive.forms.backgroundColor": getSpecificGrayScaleColor(3, 1),
    "interactive.forms.backgroundColor:hover": getSpecificGrayScaleColor(3, 1),
    "interactive.forms.backgroundColor:focus": getSpecificGrayScaleColor(3, 1),
    "interactive.forms.backgroundColor:press": getSpecificGrayScaleColor(3, 1),
    "interactive.forms.backgroundColor:disabled": getSpecificGrayScaleColor(
      4,
      4,
    ),

    "interactive.forms.borderColor": getSpecificColor(7, 7),
    "interactive.forms.borderColor:disabled": getSpecificGrayScaleColor(7, 6),
    "interactive.forms.borderColor:hover": getSpecificColor(8, 8),
    "interactive.forms.borderColor:focus": getSpecificColor(8, 8),
    "interactive.forms.borderColor:press": getSpecificColor(8, 8),

    "interactive.forms.outlineColor:focus": getSpecificColor(8, 8),

    // TODO

    // borderColor: ,// same as backgroundBaseColor for light mode
    // highlightBorder: "hsl(0 0 100%)", // dark = 60% light = 100%

    // TODO interactive.background linear gradient 0 surface 5% raised
    // TODO interactive.background:hover linear gradient 0 surface (100%?) raised
    // TODO shadow 0 2px 2px hsla(0, 0, 0, 0.07), 0 4px 4px hsla(0, 0, 0, 0.15)

    // LEGACY

    "interactive.contained.backgroundColor": getSpecificColor(4, 1),
    // interactive-accent should be used for interactive elements in accent color themes.
    "interactive-accent.contained.backgroundColor": getSpecificColor(6, 3),
    "interactive.contained.backgroundColor:hover": getSpecificColor(6, 4),
    "interactive-accent.contained.backgroundColor:hover": getSpecificColor(
      7,
      2,
    ),
    "interactive.contained.backgroundColor:focus": getSpecificColor(6, 4),
    "interactive-accent.contained.backgroundColor:focus": getSpecificColor(
      7,
      2,
    ),
    "interactive.contained.outlineColor:focus": getSpecificColor(7, 7),
    "interactive-accent.contained.outlineColor:focus": getSpecificColor(7, 7),
    "interactive.contained.backgroundColor:press": getSpecificColor(6, 5),
    "interactive-accent.contained.backgroundColor:press": getSpecificColor(
      7,
      2,
    ),
    "interactive.contained.backgroundColor:disabled": getSpecificGrayScaleColor(
      5,
      5,
    ),
    "interactive-accent.contained.backgroundColor:disabled":
      getSpecificGrayScaleColor(5, 3),

    "interactive.outlined.borderColor": getSpecificColor(7, 7),
    "interactive-accent.outlined.borderColor": getSpecificColor(7, 7),
    "interactive.outlined.borderColor:hover": getSpecificColor(8, 8),
    "interactive-accent.outlined.borderColor:hover": getSpecificColor(8, 8),
    "interactive.outlined.borderColor:focus": getSpecificColor(8, 8),
    "interactive-accent.outlined.borderColor:focus": getSpecificColor(8, 8),
    "interactive.outlined.outlineColor:focus": getSpecificColor(7, 7),
    "interactive-accent.outlined.outlineColor:focus": getSpecificColor(7, 7),
    "interactive.outlined.borderColor:press": getSpecificColor(8, 8),
    "interactive-accent.outlined.borderColor:press": getSpecificColor(8, 8),
    "interactive.outlined.borderColor:disabled": getSpecificGrayScaleColor(
      6,
      6,
    ),
    "interactive-accent.outlined.borderColor:disabled":
      getSpecificGrayScaleColor(6, 6),
  } satisfies FullTheme;

  if (process.env.NODE_ENV === "development") {
    // Check main text contrast
    warnOnContrastIssues(
      themeName,
      theme["text-sharp"].val,
      theme["bg-screen"].val,
    );
    warnOnContrastIssues(
      themeName,
      theme["text-sharp"].val,
      theme["bg-surface"].val,
    );
    warnOnContrastIssues(
      themeName,
      theme["text-muted"].val,
      theme["bg-surface"].val,
    );
  }

  return theme;
};

export const createAlouetteThemes = <
  const ColorScales extends AlouetteColorScales,
>(
  tokens: ReturnType<typeof createAlouetteTokens<ColorScales>>,
  customCreateColorTheme = createColorTheme,
) => {
  const alouetteTokens: ReturnType<
    typeof createAlouetteTokens<AlouetteColorScales>
  > = tokens;
  return {
    dark: customCreateColorTheme(alouetteTokens, "grayscale", "dark"),
    light: customCreateColorTheme(alouetteTokens, "grayscale", "light"),

    dark_brand: customCreateColorTheme(alouetteTokens, "brand", "dark"),
    dark_info: customCreateColorTheme(alouetteTokens, "info", "dark"),
    dark_success: customCreateColorTheme(alouetteTokens, "success", "dark"),
    dark_warning: customCreateColorTheme(alouetteTokens, "warning", "dark"),
    dark_danger: customCreateColorTheme(alouetteTokens, "danger", "dark"),

    light_brand: customCreateColorTheme(alouetteTokens, "brand", "light"),
    light_info: customCreateColorTheme(alouetteTokens, "info", "light"),
    light_success: customCreateColorTheme(alouetteTokens, "success", "light"),
    light_warning: customCreateColorTheme(alouetteTokens, "warning", "light"),
    light_danger: customCreateColorTheme(alouetteTokens, "danger", "light"),
  } as const;
};
