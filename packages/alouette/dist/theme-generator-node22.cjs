'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const Color = require('colorjs.io');

const defaultPaletteSpecs = {
  grayscale: { type: "grayscale", hue: 0, intensity: 0 },
  brand: { type: "accent", hue: 225 },
  // Slightly pinker tints (hueHi 20) matching the old palette's pale reds.
  danger: { type: "accent", hue: 27, hueHi: 20 },
  info: { type: "accent", hue: 233 },
  success: { type: "accent", hue: 145 },
  // Amber ramp: cream tints at the light end, bronze shadows — the classic
  // warning gold rather than lemon yellow.
  warning: { type: "brightAccent", hue: 85, hueHi: 95, hueLo: 75 }
};

const lightnessRamps = {
  grayscale: {
    dark: [0.18, 0.24, 0.28, 0.32, 0.36, 0.4, 0.45, 0.795, 0.865, 0.96, 1],
    // only diff is on the first 2 values
    light: [1, 0.98, 0.948, 0.89, 0.85, 0.79, 0.61, 0.54, 0.48, 0.42, 0.27]
  },
  accent: {
    dark: [0.18, 0.22, 0.26, 0.3, 0.34, 0.4, 0.5, 0.7, 0.82, 0.865, 0.955],
    light: [
      0.988,
      0.968,
      0.948,
      0.89,
      0.85,
      0.79,
      0.62,
      0.54,
      0.48,
      0.42,
      0.27
    ]
  },
  brightAccent: {
    dark: [0.28, 0.32, 0.4, 0.45, 0.5, 0.53, 0.56, 0.8, 0.86, 0.9, 0.955],
    light: [0.988, 0.968, 0.948, 0.928, 0.89, 0.82, 0.8, 0.6, 0.56, 0.44, 0.27]
  }
};
const relativeChromaCurve = {
  dark: [0.6, 0.68, 0.72, 0.76, 0.78, 0.84, 0.88, 0.88, 0.85, 0.82, 0.86],
  light: [0.5, 0.52, 0.55, 0.6, 0.75, 0.78, 0.92, 0.97, 0.97, 0.97, 0.95]
};
const maxSrgbChroma = (lightness, hue) => {
  let low = 0;
  let high = 0.5;
  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    if (new Color("oklch", [lightness, mid, hue]).to("srgb").inGamut()) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return low;
};
const toHex = (lightness, chroma, hue) => {
  const color = new Color("oklch", [lightness, chroma, hue]).to("srgb");
  const hex = color.toGamut({ method: "css" }).toString({ format: "hex" });
  const full = hex.length === 4 ? hex.replace(/^#(.)(.)(.)$/, "#$1$1$2$2$3$3") : hex;
  return full.toUpperCase();
};
const createColorScale = (spec, mode) => {
  const hueHi = spec.hueHi ?? spec.hue;
  const hueLo = spec.hueLo ?? spec.hue;
  const intensity = spec.intensity ?? 1;
  const ramp = lightnessRamps[spec.type][mode];
  const steps = ramp.map((lightness, index) => {
    const hue = hueLo + (hueHi - hueLo) * lightness;
    const chroma = relativeChromaCurve[mode][index] * intensity * maxSrgbChroma(lightness, hue);
    return toHex(lightness, chroma, hue);
  });
  return Object.fromEntries(
    steps.map((hex, index) => [index + 1, hex])
  );
};

const step = (source, dark, light, alpha) => {
  return ({ mode }) => {
    const resolved = {
      source,
      step: mode === "dark" ? dark : light
    };
    if (alpha) resolved.alpha = alpha;
    return resolved;
  };
};
const self = (dark, light = dark, alpha) => step("self", dark, light, alpha);
const gray = (dark, light = dark) => step("grayscale", dark, light);
const selfAdaptive = (grayscaleDark, coloredDark, grayscaleLight = grayscaleDark, coloredLight = coloredDark) => ({ isGrayscale, mode }) => ({
  source: "self",
  step: (() => {
    if (mode === "dark") return isGrayscale ? grayscaleDark : coloredDark;
    return isGrayscale ? grayscaleLight : coloredLight;
  })()
});
const grayscaleOnly = (resolver) => (ctx) => ctx.isGrayscale ? resolver(ctx) : null;
const translucent = {
  dark: "#1f1e1e55",
  light: "#ffffff66"
};
const tokenScaleMap = {
  /* grayscale-only base tokens */
  translucent: grayscaleOnly(({ mode }) => ({ literal: translucent[mode] })),
  /* grayscale-only backgrounds */
  screen: grayscaleOnly(self(2, 3)),
  highlight: grayscaleOnly(self(4, 1)),
  /* grayscale-only texts */
  "disabled-sharp": grayscaleOnly(gray(9, 9)),
  "disabled-muted": grayscaleOnly(gray(9, 7)),
  "disabled-interactive": grayscaleOnly(gray(7, 6)),
  "disabled-interactive-muted": grayscaleOnly(gray(4, 4)),
  sharp: grayscaleOnly(gray(10, 11)),
  muted: grayscaleOnly(gray(9, 10)),
  /* grayscale-only unsorted */
  "form-border-disabled": grayscaleOnly(gray(7, 6)),
  "form-placeholder": grayscaleOnly(gray(8, 9)),
  "form-disabled-text": grayscaleOnly(gray(9, 10)),
  "interactive-contained-disabled": grayscaleOnly(gray(5, 6)),
  "interactive-outlined-disabled": grayscaleOnly(gray(6, 6)),
  "interactive-accent-outlined-disabled": grayscaleOnly(gray(6, 6)),
  /* backgrounds */
  surface: self(3, 2),
  enabled: self(7, 9),
  "highlight-accent": self(4),
  lowered: self(1, 4),
  "screen-gradient-start": self(3, 4),
  "screen-gradient-middle": self(2, 5),
  "screen-gradient-end": self(1, 6),
  /* borders */
  "border-muted": self(7, 5),
  "border-sharp": self(8, 9),
  /* interactive */
  "interactive-contained-pressable": selfAdaptive(6, 6, 1, 9),
  "interactive-contained-hover": selfAdaptive(7, 7, 2, 8),
  "interactive-contained-focus": selfAdaptive(7, 7, 2, 8),
  "interactive-contained-active": selfAdaptive(7, 7, 3, 7),
  "interactive-outlined-pressable": self(7, 9),
  "interactive-outlined-hover": self(8, 7),
  "interactive-outlined-focus": self(8, 7),
  "interactive-outlined-active": self(8, 7),
  "interactive-outlined-outline-focus": self(8, 7),
  "interactive-active": self(9),
  "interactive-pressable": self(10),
  "interactive-hover": self(11),
  /* texts */
  accent: selfAdaptive(11, 10),
  "on-accent": ({ isGrayscale, mode }) => ({
    source: "grayscale",
    step: (() => {
      if (mode === "dark") return 11;
      return isGrayscale ? 11 : 1;
    })()
  }),
  "on-accent-muted": selfAdaptive(10, 10, 9, 4),
  /* specials */
  selection: self(10, 10, "40")
};

const accentEmitOrder = [
  "grayscale",
  "brand",
  "info",
  "success",
  "warning",
  "danger"
];
const colorAt = (scales, mode, accentName, step) => scales[`${accentName}.${mode}`][step];
const buildThemeVars = (scales, mode, accentName) => {
  const isGrayscale = accentName === "grayscale";
  const vars = {};
  for (const [token, resolver] of Object.entries(tokenScaleMap)) {
    const resolved = resolver({ mode, isGrayscale, accent: accentName });
    if (!resolved) continue;
    vars[token] = "literal" in resolved ? resolved.literal : colorAt(
      scales,
      mode,
      resolved.source === "grayscale" ? "grayscale" : accentName,
      resolved.step
    ) + (resolved.alpha ?? "");
  }
  return vars;
};
const emit = (vars, indent) => Object.entries(vars).map(([key, value]) => `${indent}--color-${key}: ${value};`).join("\n");
const prefixVars = (vars) => Object.fromEntries(
  Object.entries(vars).map(([key, value]) => [`--color-${key}`, value])
);
const accents = accentEmitOrder.filter((name) => name !== "grayscale");
const buildPaletteCss = (scales) => {
  const lightVars = buildThemeVars(scales, "light", "grayscale");
  const darkVars = buildThemeVars(scales, "dark", "grayscale");
  const baseBlocks = [
    ["light", lightVars],
    ["dark", darkVars]
  ].map(
    ([name, vars]) => `  :where(.${name}, .${name} *) {
${emit(vars, "    ")}
  }`
  ).join("\n\n");
  const accentBlocks = ["light", "dark"].flatMap(
    (mode) => accents.map((accentName) => {
      const vars = buildThemeVars(scales, mode, accentName);
      return `  :where(.${mode}_${accentName}, .${mode}_${accentName} *) {
${emit(vars, "    ")}
  }`;
    })
  ).join("\n\n");
  return `@theme {
  /* color tokens \u2014 light theme as defaults, enabling bg-*, text-*, border-*
     color utilities. Other themes override via the :where(.<theme>) blocks below,
     applied at runtime through ScopedTheme (NativeWind's VariableContextProvider). */
${emit(lightVars, "  ")}
}

@layer theme {
${baseBlocks}

${accentBlocks}
}
`;
};
const buildThemeVariables = (scales) => {
  const resolved = {
    light: prefixVars(buildThemeVars(scales, "light", "grayscale")),
    dark: prefixVars(buildThemeVars(scales, "dark", "grayscale"))
  };
  for (const mode of ["light", "dark"]) {
    const base = buildThemeVars(scales, mode, "grayscale");
    for (const accent of accents) {
      resolved[`${mode}_${accent}`] = prefixVars({
        ...base,
        ...buildThemeVars(scales, mode, accent)
      });
    }
  }
  return resolved;
};

const generateTheme = (overrides) => {
  const specs = {
    ...defaultPaletteSpecs,
    ...overrides
  };
  const scales = Object.fromEntries(
    Object.keys(specs).flatMap((name) => [
      [`${name}.light`, createColorScale(specs[name], "light")],
      [`${name}.dark`, createColorScale(specs[name], "dark")]
    ])
  );
  return {
    css: buildPaletteCss(scales),
    themeVariables: buildThemeVariables(scales)
  };
};

exports.buildPaletteCss = buildPaletteCss;
exports.buildThemeVariables = buildThemeVariables;
exports.createColorScale = createColorScale;
exports.defaultPaletteSpecs = defaultPaletteSpecs;
exports.generateTheme = generateTheme;
//# sourceMappingURL=theme-generator-node22.cjs.map
