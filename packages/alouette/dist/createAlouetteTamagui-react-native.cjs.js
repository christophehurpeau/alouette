'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const core = require('@tamagui/core');
const animationsReactNative = require('@tamagui/animations-react-native');

const animations = animationsReactNative.createAnimations({
  fast: {
    type: "timing",
    duration: 100,
    damping: 20,
    stiffness: 250
  },
  medium: {
    type: "timing",
    duration: 300,
    damping: 20,
    stiffness: 250
  },
  slow: {
    duration: 450,
    damping: 20,
    stiffness: 60
  },
  formElement: {
    type: "timing",
    duration: 200,
    damping: 20,
    stiffness: 250
  }
});
if ("navigator" in global) {
  const navigator = global.navigator;
  if (!navigator.userAgent?.startsWith("Node.js") && navigator.product !== "ReactNative") {
    throw new Error(
      `animations native is loaded in web: ${// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      navigator.appName || navigator.product || navigator.userAgent}`
    );
  }
}

const defaultHeadingFontSizes = {
  xxl: 64,
  xl: 48,
  lg: 40,
  md: 32,
  sm: 24,
  xs: 18
};
const defaultBodyFontSizes = {
  xxl: 48,
  xl: 24,
  lg: 18,
  md: 16,
  sm: 14,
  xs: 12
};
const roundWith1Precision = (value) => Math.round(value * 10) / 10;
const createAlouetteFonts = ({
  headingFontFamily = "Sora",
  headingFontSizes = defaultHeadingFontSizes,
  bodyFontFamily = "Sora",
  bodyFontSizes = defaultBodyFontSizes,
  monospaceFontFamily,
  monospaceFontSizes = defaultBodyFontSizes
} = {}) => ({
  heading: core.createFont({
    family: headingFontFamily,
    weight: {
      regular: "400",
      bold: "700",
      extraBold: "800"
    },
    face: {
      400: { normal: `${headingFontFamily}Regular` },
      700: { normal: `${headingFontFamily}Bold` },
      800: { normal: `${headingFontFamily}ExtraBold` }
    },
    size: headingFontSizes,
    lineHeight: {
      xxl: roundWith1Precision(1.1 * headingFontSizes.xxl),
      xl: roundWith1Precision(1.1 * headingFontSizes.xl),
      lg: roundWith1Precision(1.1 * headingFontSizes.lg),
      md: roundWith1Precision(1.2 * headingFontSizes.md),
      sm: roundWith1Precision(1.3 * headingFontSizes.sm),
      xs: roundWith1Precision(1.3 * headingFontSizes.xs)
    }
  }),
  body: core.createFont({
    family: bodyFontFamily,
    weight: {
      regular: "400",
      bold: "700",
      extraBold: "800"
    },
    face: {
      400: { normal: `${bodyFontFamily}Regular` },
      700: { normal: `${bodyFontFamily}Bold` },
      800: { normal: `${bodyFontFamily}ExtraBold` }
    },
    size: bodyFontSizes,
    lineHeight: {
      xxl: roundWith1Precision(1.4 * bodyFontSizes.xxl),
      xl: roundWith1Precision(1.4 * bodyFontSizes.xl),
      lg: roundWith1Precision(1.4 * bodyFontSizes.lg),
      md: roundWith1Precision(1.4 * bodyFontSizes.md),
      sm: roundWith1Precision(1.4 * bodyFontSizes.sm),
      xs: roundWith1Precision(1.4 * bodyFontSizes.xs)
    }
  }),
  ...monospaceFontFamily ? {
    "body-monospace": core.createFont({
      family: monospaceFontFamily,
      weight: {
        regular: "400",
        bold: "700",
        extraBold: "800"
      },
      face: {
        400: { normal: `${monospaceFontFamily}Regular` },
        700: { normal: `${monospaceFontFamily}Bold` },
        800: { normal: `${monospaceFontFamily}ExtraBold` }
      },
      size: monospaceFontSizes,
      lineHeight: {
        xxl: roundWith1Precision(1.4 * monospaceFontSizes.xxl),
        xl: roundWith1Precision(1.4 * monospaceFontSizes.xl),
        lg: roundWith1Precision(1.4 * monospaceFontSizes.lg),
        md: roundWith1Precision(1.4 * monospaceFontSizes.md),
        sm: roundWith1Precision(1.4 * monospaceFontSizes.sm),
        xs: roundWith1Precision(1.4 * monospaceFontSizes.xs)
      }
    })
  } : {}
});

const Breakpoints = {
  /**
   * min-width: 480px
   */
  SMALL: 480,
  /**
   * min-width: 768px
   */
  MEDIUM: 768,
  /**
   * min-width: 1024px
   */
  LARGE: 1024,
  /**
   * min-width: 1280px
   */
  WIDE: 1280
};

const media = {
  small: { minWidth: Breakpoints.SMALL },
  medium: { minWidth: Breakpoints.MEDIUM },
  large: { minWidth: Breakpoints.LARGE },
  wide: { minWidth: Breakpoints.WIDE }
};

const transformColorScalesToTokens = (colorScales) => {
  return Object.fromEntries(
    Object.entries(colorScales).flatMap(([colorName, colorScale]) => {
      return Object.entries(colorScale).map(([scaleNumber, colorValue]) => {
        return [`${colorName}.${scaleNumber}`, colorValue];
      });
    })
  );
};
const createAlouetteTokens = (colorScales, { spacing = 16 } = {}) => {
  return core.createTokens({
    color: {
      blackBackground: "#1f1e1e",
      whiteBackground: "#ffffff",
      // https://github.com/tamagui/tamagui/issues/3601 does not work at the moment
      blackBackgroundTranslucent: "#1f1e1e77",
      whiteBackgroundTranslucent: "#ffffff99",
      blackText: "#000000",
      whiteText: "#fdfdfd",
      transparent: "transparent",
      ...transformColorScalesToTokens(colorScales)
    },
    radius: {
      xs: spacing / 2,
      sm: spacing,
      md: spacing * 2,
      lg: spacing * 3
    },
    space: {
      "-1.0": -spacing,
      "0.25": spacing / 4,
      "0.5": spacing / 2,
      // previous $sm or $2
      "0.75": spacing * 0.75,
      // previous $3
      "1.0": spacing,
      // previous $md or $4
      "1.25": spacing * 1.25,
      // previous $5
      "1.5": spacing * 1.5,
      // previous $6
      "2.0": spacing * 2,
      // previous $8 or $md
      "3.0": spacing * 3
      // previous $12
    },
    // size: { ...sizes },
    size: {},
    zIndex: {},
    opacity: {
      disabled: 0.7
    }
  });
};

const getLuminance = (r, g, b) => {
  const values = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
};
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result?.[1] || !result[2] || !result[3]) return null;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
};
const getContrastRatio = (color1, color2) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return 0;
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};
const checkContrast = (foreground, background, level = "AA") => {
  const ratio = getContrastRatio(foreground, background);
  const minimumRatio = level === "AA" ? 4.5 : 7;
  return {
    ratio,
    passes: ratio >= minimumRatio,
    minimumRatio
  };
};
const warnOnContrastIssues = (themeName, textColor, backgroundColor) => {
  if (process.env.NODE_ENV !== "development") return;
  const result = checkContrast(textColor, backgroundColor);
  if (!result.passes) {
    console.warn(
      `[Alouette] Contrast warning in theme "${themeName}":
       Text color ${textColor} on background ${backgroundColor}
       has contrast ratio of ${result.ratio.toFixed(2)}.
       Minimum required: ${result.minimumRatio}
       This may cause accessibility issues.`
    );
  }
};

const createColorTheme = (tokens, themeName, mode = "light", textColor) => {
  const alouetteTokens = tokens;
  if (!textColor) {
    textColor = mode === "dark" ? alouetteTokens.color.whiteText : alouetteTokens.color.blackText;
  }
  const getSpecificColor = (scaleNumberDarkMode, scaleNumberLightMode) => {
    return tokens.color[`${themeName}.${mode}.${mode === "dark" ? scaleNumberDarkMode : scaleNumberLightMode}`];
  };
  const getSpecificGrayScaleColor = (scaleNumberDarkMode, scaleNumberLightMode) => {
    return tokens.color[`grayscale.${mode}.${mode === "dark" ? scaleNumberDarkMode : scaleNumberLightMode}`];
  };
  const bgScreen = getSpecificColor(2, 3);
  const bgSurface = getSpecificColor(3, 2);
  const bgHighlight = getSpecificColor(4, 1);
  const theme = {
    // NEW
    "bg-screen": bgScreen,
    "bg-surface": bgSurface,
    "bg-highlight": bgHighlight,
    "bg-highlight-accent": getSpecificColor(4, 4),
    "bg-lowered": getSpecificColor(1, 4),
    // deep, combine with deep shadow dark = 0% light = 82%
    "bg-translucent": mode === "dark" ? alouetteTokens.color.blackBackgroundTranslucent : alouetteTokens.color.whiteBackgroundTranslucent,
    "bg-screen-gradient-start": getSpecificColor(3, 4),
    "bg-screen-gradient-middle": getSpecificColor(2, 5),
    "bg-screen-gradient-end": getSpecificColor(1, 6),
    "text-sharp": getSpecificColor(11, 11),
    // headings, buttons, and important text dark = 96% light = 5%
    "text-muted": getSpecificGrayScaleColor(9, 9),
    // rest dark = 68% light = 30%
    "text-accent": themeName === "grayscale" ? getSpecificColor(11, 11) : getSpecificColor(9, 9),
    // same as sharp in default theme, same as muted in colored themes
    "text-accent-muted": getSpecificColor(9, 8),
    "text-onAccent": themeName === "grayscale" ? getSpecificColor(11, 11) : getSpecificColor(11, 9),
    "text-onAccent-muted": themeName === "grayscale" ? getSpecificColor(9, 8) : getSpecificColor(9, 6),
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
      4
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
      2
    ),
    "interactive.contained.backgroundColor:focus": getSpecificColor(6, 4),
    "interactive-accent.contained.backgroundColor:focus": getSpecificColor(
      7,
      2
    ),
    "interactive.contained.outlineColor:focus": getSpecificColor(7, 7),
    "interactive-accent.contained.outlineColor:focus": getSpecificColor(7, 7),
    "interactive.contained.backgroundColor:press": getSpecificColor(6, 5),
    "interactive-accent.contained.backgroundColor:press": getSpecificColor(
      7,
      2
    ),
    "interactive.contained.backgroundColor:disabled": getSpecificGrayScaleColor(
      5,
      5
    ),
    "interactive-accent.contained.backgroundColor:disabled": getSpecificGrayScaleColor(5, 3),
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
      6
    ),
    "interactive-accent.outlined.borderColor:disabled": getSpecificGrayScaleColor(6, 6)
  };
  if (process.env.NODE_ENV === "development") {
    warnOnContrastIssues(
      themeName,
      theme["text-sharp"].val,
      theme["bg-screen"].val
    );
    warnOnContrastIssues(
      themeName,
      theme["text-sharp"].val,
      theme["bg-surface"].val
    );
    warnOnContrastIssues(
      themeName,
      theme["text-muted"].val,
      theme["bg-surface"].val
    );
  }
  return theme;
};
const createAlouetteThemes = (tokens, customCreateColorTheme = createColorTheme) => {
  const alouetteTokens = tokens;
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
    light_danger: customCreateColorTheme(alouetteTokens, "danger", "light")
  };
};

const createColorScale = (colorScale) => colorScale;

const defaultColorScales = {
  "grayscale.light": createColorScale({
    1: "#FFFFFF",
    2: "#F5F5F5",
    3: "#EBEBEB",
    4: "#E0E0E0",
    5: "#C7C7C7",
    6: "#B8B8B8",
    7: "#8F8F8F",
    8: "#616161",
    9: "#474747",
    10: "#2E2E2E",
    11: "#141414"
  }),
  "grayscale.dark": createColorScale({
    1: "#0F0F0F",
    2: "#1F1F1F",
    3: "#292929",
    4: "#333333",
    5: "#3D3D3D",
    6: "#474747",
    7: "#525252",
    8: "#A8A8A8",
    9: "#C2C2C2",
    10: "#DBDBDB",
    11: "#F5F5F5"
  }),
  "brand.light": createColorScale({
    1: "#F7FBFD",
    2: "#EFF8FB",
    3: "#DFF1F6",
    4: "#C7EEF9",
    5: "#99DFF5",
    6: "#7DD7F2",
    7: "#23C8FB",
    8: "#0493BE",
    9: "#024D64",
    10: "#012732",
    11: "#011F28"
  }),
  "brand.dark": createColorScale({
    1: "#071418",
    2: "#0D2830",
    3: "#123540",
    4: "#104E60",
    5: "#135C72",
    6: "#156A84",
    7: "#1E94B8",
    8: "#5CD1F5",
    9: "#8CDFF8",
    10: "#BCECFB",
    11: "#D9F4FD"
  }),
  "danger.light": createColorScale({
    1: "#FDF7F7",
    2: "#FBEFEF",
    3: "#F6E0DF",
    4: "#FBD2D0",
    5: "#F7A4A1",
    6: "#F48985",
    7: "#FB342D",
    8: "#C80B04",
    9: "#6E0602",
    10: "#3C0301",
    11: "#280201"
  }),
  "danger.dark": createColorScale({
    1: "#180707",
    2: "#300F0D",
    3: "#401312",
    4: "#691411",
    5: "#7B1714",
    6: "#8C1B17",
    7: "#C1251F",
    8: "#F56A66",
    9: "#F89996",
    10: "#FBC7C5",
    11: "#FDDAD9"
  }),
  "info.light": createColorScale({
    1: "#F7FBFD",
    2: "#EFF8FB",
    3: "#DFF0F6",
    4: "#C7EDF9",
    5: "#99DEF5",
    6: "#7DD5F2",
    7: "#23C5FB",
    8: "#048FBE",
    9: "#024B64",
    10: "#012632",
    11: "#011E28"
  }),
  "info.dark": createColorScale({
    1: "#071418",
    2: "#0D2730",
    3: "#123440",
    4: "#104C60",
    5: "#135A72",
    6: "#156884",
    7: "#1E92B8",
    8: "#5CCEF5",
    9: "#8CDDF8",
    10: "#BCEBFB",
    11: "#D9F4FD"
  }),
  "success.light": createColorScale({
    1: "#F7FDF7",
    2: "#EFFBEF",
    3: "#DFF6DF",
    4: "#C7F9C7",
    5: "#99F599",
    6: "#7DF27D",
    7: "#23FB23",
    8: "#04BE04",
    9: "#025002",
    10: "#011E01",
    11: "#012801"
  }),
  "success.dark": createColorScale({
    1: "#071807",
    2: "#0D300D",
    3: "#124012",
    4: "#106010",
    5: "#137213",
    6: "#158415",
    7: "#1EB81E",
    8: "#5CF55C",
    9: "#8CF88C",
    10: "#BCFBBC",
    11: "#D9FDD9"
  }),
  "warning.light": createColorScale({
    1: "#FDFBF7",
    2: "#FBF7EF",
    3: "#F6EEDF",
    4: "#F6E1B6",
    5: "#F0CE89",
    6: "#EDC36E",
    7: "#FAAC0F",
    8: "#AA7203",
    9: "#281B01",
    10: "#F6F900",
    11: "#281B01"
  }),
  "warning.dark": createColorScale({
    1: "#181207",
    2: "#30240D",
    3: "#403012",
    4: "#4F390D",
    5: "#604610",
    6: "#725213",
    7: "#A7781B",
    8: "#F3BB49",
    9: "#F6CD79",
    10: "#F9DFA9",
    11: "#FDF1D9"
  })
};

const createAlouetteTamagui = (tokens, themes, options = {}) => {
  return core.createTamagui({
    fonts: createAlouetteFonts(options.fonts),
    tokens,
    themes,
    media,
    animations,
    settings: {
      allowedStyleValues: "somewhat-strict-web",
      autocompleteSpecificTokens: "except-special",
      selectionStyles: (theme) => {
        return {
          backgroundColor: theme.selectionBackgroundColor
        };
      }
    },
    components: ["alouette"]
  });
};

exports.createAlouetteTamagui = createAlouetteTamagui;
exports.createAlouetteThemes = createAlouetteThemes;
exports.createAlouetteTokens = createAlouetteTokens;
exports.createColorScale = createColorScale;
exports.createColorTheme = createColorTheme;
exports.defaultColorScales = defaultColorScales;
//# sourceMappingURL=createAlouetteTamagui-react-native.cjs.js.map
