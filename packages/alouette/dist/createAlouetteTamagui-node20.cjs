'use strict';

const core = require('@tamagui/core');
const animationsReactNative = require('@tamagui/animations-react-native');
const reactNativeMediaDriver = require('@tamagui/react-native-media-driver');

const animations = animationsReactNative.createAnimations({
  fast: {
    type: "timing",
    duration: 100,
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
  if (!navigator.userAgent?.startsWith("Node.js")) {
    throw new Error(
      `animations native is loaded in web: ${// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      navigator.appName || navigator.product || navigator.userAgent}`
    );
  }
}

const defaultHeadingFontSizes = {
  xl: 48,
  lg: 40,
  md: 32,
  sm: 24,
  xs: 18
};
const defaultBodyFontSizes = { xl: 24, lg: 18, md: 16, sm: 14, xs: 12 };
const roundWith1Precision = (value) => Math.round(value * 10) / 10;
const createAlouetteFonts = ({
  headingFontFamily = "Inter",
  headingFontSizes = defaultHeadingFontSizes,
  bodyFontFamily = "Inter",
  bodyFontSizes = defaultBodyFontSizes
} = {}) => ({
  heading: core.createFont({
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
  body: core.createFont({
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
   * min-width: 0
   */
  BASE: 0,
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

const media = reactNativeMediaDriver.createMedia({
  small: { minWidth: Breakpoints.SMALL },
  medium: { minWidth: Breakpoints.MEDIUM },
  large: { minWidth: Breakpoints.LARGE },
  wide: { minWidth: Breakpoints.WIDE }
});

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
  return core.createTokens({
    color: {
      black: "#000000",
      white: "#ffffff",
      disabled: colorScales.grayscale[3],
      contrastDisabled: colorScales.grayscale[7],
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

const createColorTheme = (tokens, colorScaleName, backgroundColor, textColor, contrastTextColor) => {
  const alouetteTokens = tokens;
  if (!backgroundColor) backgroundColor = alouetteTokens.color.white;
  if (!textColor) textColor = alouetteTokens.color.black;
  if (!contrastTextColor) contrastTextColor = alouetteTokens.color.white;
  const getColor = (scaleNumber) => tokens.color[`${colorScaleName}.${scaleNumber}`];
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
    "interactive.contained.backgroundColor:disabled": alouetteTokens.color.disabled,
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
    "interactive.forms.borderColor:disabled": alouetteTokens.color.disabled
  };
};
const createAlouetteThemes = (tokens) => {
  const alouetteTokens = tokens;
  return {
    light: createColorTheme(
      alouetteTokens,
      "grayscale",
      alouetteTokens.color.white,
      alouetteTokens.color.black
    ),
    light_info: createColorTheme(alouetteTokens, "info"),
    light_success: createColorTheme(alouetteTokens, "success"),
    light_warning: createColorTheme(alouetteTokens, "warning"),
    light_danger: createColorTheme(alouetteTokens, "danger"),
    light_primary: createColorTheme(alouetteTokens, "primary")
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
  };
};

const createColorScale = (colorScale) => colorScale;
const defaultColorScales = {
  grayscale: createColorScale({
    1: "#faf9f8",
    2: "#f4f3ef",
    3: "#ebe9e5",
    4: "#dedad2",
    5: "#d1cdc5",
    6: "#bab8ae",
    7: "#aeaba3",
    8: "#9c9a92",
    9: "#8e8c83",
    10: "#74726a"
  }),
  success: createColorScale({
    1: "#f0f9f3",
    2: "#d4f0d4",
    3: "#a8e6a8",
    4: "#7edc7e",
    5: "#54d254",
    6: "#2ac82a",
    7: "#00be00",
    8: "#00b400",
    9: "#00aa00",
    10: "#009200"
  }),
  info: createColorScale({
    1: "#f0f9ff",
    2: "#d4f0ff",
    3: "#a8e6ff",
    4: "#7edcff",
    5: "#54d2ff",
    6: "#2ac8ff",
    7: "#00beff",
    8: "#00b4ff",
    9: "#00aaff",
    10: "#0092ff"
  }),
  warning: createColorScale({
    1: "#fff9f0",
    2: "#fff0d4",
    3: "#ffe6a8",
    4: "#ffdc7e",
    5: "#ffd254",
    6: "#ffc82a",
    7: "#ffbe00",
    8: "#ffb400",
    9: "#ffaa00",
    10: "#ff9200"
  }),
  danger: createColorScale({
    1: "#fff0f0",
    2: "#ffd4d4",
    3: "#ffaaaa",
    4: "#ff7e7e",
    5: "#ff5454",
    6: "#ff2a2a",
    7: "#ff0000",
    8: "#f40000",
    9: "#ea0000",
    10: "#d20000"
  }),
  primary: createColorScale({
    1: "#e1f4f6",
    2: "#b4e2e9",
    3: "#86cfdc",
    4: "#60bcd0",
    5: "#46aeca",
    6: "#31a1c4",
    7: "#2994b7",
    8: "#1e82a6",
    9: "#1c7193",
    10: "#125272"
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
      autocompleteSpecificTokens: "except-special"
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
//# sourceMappingURL=createAlouetteTamagui-node20.cjs.map