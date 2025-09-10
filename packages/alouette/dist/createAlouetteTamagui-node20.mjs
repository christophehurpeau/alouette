import { createFont, createTokens, createTamagui } from '@tamagui/core';
import { createAnimations } from '@tamagui/animations-react-native';

const animations = createAnimations({
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
  formElement: {
    type: "timing",
    duration: 600,
    damping: 20,
    stiffness: 250
  }
});
if ("navigator" in global) {
  const navigator = global.navigator;
  if (
    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    !navigator.userAgent?.startsWith("Node.js") && navigator.product !== "ReactNative"
  ) {
    throw new Error(
      `animations native is loaded in web: ${// eslint-disable-next-line @typescript-eslint/restrict-template-expressions, n/no-unsupported-features/node-builtins
      navigator.appName || navigator.product || navigator.userAgent}`
    );
  }
}

const defaultHeadingFontSizes = { xl: 48, lg: 40, md: 32, sm: 24, xs: 18 };
const defaultBodyFontSizes = { xl: 24, lg: 18, md: 16, sm: 14, xs: 12 };
const roundWith1Precision = (value) => Math.round(value * 10) / 10;
const createAlouetteFonts = ({
  headingFontFamily = "Inter",
  headingFontSizes = defaultHeadingFontSizes,
  bodyFontFamily = "Inter",
  bodyFontSizes = defaultBodyFontSizes
} = {}) => ({
  heading: createFont({
    family: headingFontFamily,
    weight: {
      regular: "400",
      bold: "700",
      black: "900"
    },
    face: {
      400: { normal: `${headingFontFamily}Regular` },
      700: { normal: `${headingFontFamily}Bold` },
      900: { normal: `${headingFontFamily}Black` }
    },
    size: headingFontSizes,
    lineHeight: {
      xl: roundWith1Precision(1.1 * headingFontSizes.xl),
      lg: roundWith1Precision(1.1 * headingFontSizes.lg),
      md: roundWith1Precision(1.2 * headingFontSizes.md),
      sm: roundWith1Precision(1.3 * headingFontSizes.sm),
      xs: roundWith1Precision(1.3 * headingFontSizes.xs)
    }
  }),
  body: createFont({
    family: bodyFontFamily,
    weight: {
      regular: "400",
      bold: "700",
      black: "900"
    },
    face: {
      400: { normal: `${bodyFontFamily}Regular` },
      700: { normal: `${bodyFontFamily}Bold` },
      900: { normal: `${bodyFontFamily}Black` }
    },
    size: bodyFontSizes,
    lineHeight: {
      xl: roundWith1Precision(1.4 * bodyFontSizes.xl),
      lg: roundWith1Precision(1.4 * bodyFontSizes.lg),
      md: roundWith1Precision(1.4 * bodyFontSizes.md),
      sm: roundWith1Precision(1.4 * bodyFontSizes.sm),
      xs: roundWith1Precision(1.4 * bodyFontSizes.xs)
    }
  })
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

const createAlouetteSizes = (spacing, negative) => {
  const MAX_SIZE = 64;
  const sizes = {};
  for (let size = 0; size <= MAX_SIZE; size++) {
    sizes[negative ? `-${size}` : `${size}`] = size * spacing;
  }
  return sizes;
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
const createAlouetteTokens = (colorScales, { spacing = 4 } = {}) => {
  const sizes = createAlouetteSizes(spacing, false);
  const negativeSizes = createAlouetteSizes(
    -spacing,
    true
  );
  return createTokens({
    color: {
      blackBackground: "#1f1e1e",
      whiteBackground: "#ffffff",
      blackText: "#000000",
      whiteText: "#fdfdfd",
      ...transformColorScalesToTokens(colorScales)
    },
    radius: {
      ...sizes,
      xs: spacing * 2,
      sm: spacing * 4,
      md: spacing * 8
    },
    space: {
      ...sizes,
      ...negativeSizes,
      xs: spacing * 2,
      sm: spacing * 4,
      md: spacing * 8
    },
    size: { ...sizes },
    zIndex: {}
  });
};

const mappingLightToDark = {
  1: 1,
  2: 3,
  3: 4,
  4: 2,
  5: 6,
  6: 5,
  7: 7,
  8: 8,
  9: 9,
  10: 10
};
const createColorScale = (colorScale) => colorScale;

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

const createColorTheme = (tokens, intent, mode = "light", backgroundColor, textColor) => {
  const alouetteTokens = tokens;
  if (!backgroundColor) {
    backgroundColor = mode === "dark" ? alouetteTokens.color.blackBackground : alouetteTokens.color.whiteBackground;
  }
  if (!textColor) {
    textColor = mode === "dark" ? alouetteTokens.color.whiteText : alouetteTokens.color.blackText;
  }
  const getColor = (scaleNumber, tint, adaptForDarkMode = true) => {
    return tokens.color[`${tint || intent}.${mode}.${mode === "dark" && adaptForDarkMode ? mappingLightToDark[scaleNumber] : scaleNumber}`];
  };
  const theme = {
    backgroundColor,
    "gradientColor:start": getColor(mode === "dark" ? 5 : 6, void 0, false),
    "gradientColor:middle": getColor(mode === "dark" ? 6 : 7, void 0, false),
    "gradientColor:end": getColor(mode === "dark" ? 4 : 5, void 0, false),
    textColor,
    pageBackgroundColor: getColor(1),
    nonInteractiveBackgroundColor: getColor(3),
    accentTextColor: getColor(9),
    borderColor: getColor(8),
    shadowColor: getColor(8),
    "textColor:disabled": getColor(mode === "dark" ? 8 : 7, "grayscale", false),
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
    "interactive.contained.backgroundColor:disabled": getColor(
      4,
      "grayscale",
      false
    ),
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
    "interactive.forms.borderColor:press": getColor(6)
  };
  if (process.env.NODE_ENV === "development") {
    warnOnContrastIssues(
      intent,
      theme.textColor.val,
      theme.backgroundColor.val
    );
  }
  return theme;
};
const createAlouetteThemes = (tokens) => {
  const alouetteTokens = tokens;
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
    dark_primary: createColorTheme(alouetteTokens, "primary", "dark")
  };
};

const defaultColorScales = {
  "grayscale.light": createColorScale({
    1: "#F5F5F5",
    2: "#EBEBEB",
    3: "#DBDBDB",
    4: "#D1D1D1",
    5: "#C7C7C7",
    6: "#B8B8B8",
    7: "#8F8F8F",
    8: "#616161",
    9: "#525252",
    10: "#2E2E2E"
  }),
  "grayscale.dark": createColorScale({
    1: "#1A1A1A",
    2: "#1F1F1F",
    3: "#292929",
    4: "#333333",
    5: "#3D3D3D",
    6: "#474747",
    7: "#525252",
    8: "#9E9E9E",
    9: "#ADADAD",
    10: "#D1D1D1"
  }),
  "primary.light": createColorScale({
    1: "#EFF8FB",
    2: "#DAF4FB",
    3: "#BEEBF9",
    4: "#ABE5F7",
    5: "#99DFF5",
    6: "#7DD7F2",
    7: "#33C0EB",
    8: "#037496",
    9: "#025D78",
    10: "#012732"
  }),
  "primary.dark": createColorScale({
    1: "#02161C",
    2: "#092A35",
    3: "#0B3846",
    4: "#0E4758",
    5: "#135C72",
    6: "#156A84",
    7: "#17718C",
    8: "#49CCF3",
    9: "#66D4F5",
    10: "#A9E7F9"
  }),
  "danger.light": createColorScale({
    1: "#FBEFEF",
    2: "#FEF6F5",
    3: "#FDDAD9",
    4: "#FBC7C5",
    5: "#FAB5B2",
    6: "#F89996",
    7: "#F34F49",
    8: "#C80B04",
    9: "#AA0903",
    10: "#640502"
  }),
  "danger.dark": createColorScale({
    1: "#1C0302",
    2: "#4F0F0D",
    3: "#601210",
    4: "#721613",
    5: "#8C1B17",
    6: "#9E1E1A",
    7: "#A7201B",
    8: "#F56A66",
    9: "#F78682",
    10: "#FBC7C5"
  }),
  "info.light": createColorScale({
    1: "#EFF8FB",
    2: "#DAF3FB",
    3: "#BEEAF9",
    4: "#ABE4F7",
    5: "#99DEF5",
    6: "#7DD5F2",
    7: "#33BDEB",
    8: "#037196",
    9: "#025B78",
    10: "#012632"
  }),
  "info.dark": createColorScale({
    1: "#02161C",
    2: "#092A35",
    3: "#0B3746",
    4: "#0E4558",
    5: "#135A72",
    6: "#156884",
    7: "#176F8C",
    8: "#49C9F3",
    9: "#66D1F5",
    10: "#A9E5F9"
  }),
  "success.light": createColorScale({
    1: "#EFFBEF",
    2: "#DAFBDA",
    3: "#BEF9BE",
    4: "#ABF7AB",
    5: "#99F599",
    6: "#7DF27D",
    7: "#33EB33",
    8: "#038203",
    9: "#026402",
    10: "#011E01"
  }),
  "success.dark": createColorScale({
    1: "#021C02",
    2: "#093509",
    3: "#0B460B",
    4: "#0E580E",
    5: "#137213",
    6: "#158415",
    7: "#178C17",
    8: "#49F349",
    9: "#66F566",
    10: "#A9F9A9"
  }),
  "warning.light": createColorScale({
    1: "#FBF7EF",
    2: "#FEF8EC",
    3: "#FBEDD0",
    4: "#FAE6BD",
    5: "#F9DEAA",
    6: "#F6D38D",
    7: "#F1B641",
    8: "#825803",
    9: "#644302",
    10: "#1E1401"
  }),
  "warning.dark": createColorScale({
    1: "#1C1402",
    2: "#46330B",
    3: "#583F0E",
    4: "#694C11",
    5: "#845F15",
    6: "#956C18",
    7: "#9E721A",
    8: "#F5C25C",
    9: "#F6CD79",
    10: "#FBE6BC"
  })
};

const createAlouetteTamagui = (tokens, themes, options = {}) => {
  return createTamagui({
    fonts: createAlouetteFonts(options.fonts),
    tokens,
    themes,
    media,
    animations,
    settings: {
      allowedStyleValues: "somewhat-strict-web",
      autocompleteSpecificTokens: "except-special"
    },
    components: ["alouette"]
  });
};

export { createAlouetteTamagui, createAlouetteThemes, createAlouetteTokens, createColorScale, createColorTheme, defaultColorScales };
//# sourceMappingURL=createAlouetteTamagui-node20.mjs.map
