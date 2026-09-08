'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const Color = require('colorjs.io');
const node_fs = require('node:fs');
const node_path = require('node:path');

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
const maxChroma = ({
  lightness,
  hue,
  gamut
}) => {
  const space = gamut === "p3" ? "p3" : "srgb";
  let low = 0;
  let high = 0.5;
  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    if (new Color("oklch", [lightness, mid, hue]).to(space).inGamut()) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return low;
};
const toHex = ({ lightness, chroma, hue }) => {
  const color = new Color("oklch", [lightness, chroma, hue]).to("srgb");
  const hex = color.toGamut({ method: "css" }).toString({ format: "hex" });
  const full = hex.length === 4 ? hex.replace(/^#(.)(.)(.)$/, "#$1$1$2$2$3$3") : hex;
  return full.toUpperCase();
};
const createOklchScale = (spec, mode, gamut) => {
  const hueHi = spec.hueHi ?? spec.hue;
  const hueLo = spec.hueLo ?? spec.hue;
  const intensity = spec.intensity ?? 1;
  const ramp = lightnessRamps[spec.type][mode];
  const steps = ramp.map((lightness, index) => {
    const hue = hueLo + (hueHi - hueLo) * lightness;
    const chroma = relativeChromaCurve[mode][index] * intensity * maxChroma({ lightness, hue, gamut });
    return { lightness, chroma, hue };
  });
  return Object.fromEntries(
    steps.map((color, index) => [index + 1, color])
  );
};
const createColorScale = (spec, mode) => {
  const scale = createOklchScale(spec, mode, "srgb");
  return Object.fromEntries(
    Object.entries(scale).map(([step, color]) => [step, toHex(color)])
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
  // The counterpart of `lowered`: the fill of an element standing out of an
  // inset track — a SegmentedBar's selected chip, ConnectionState's bar.
  // Accented it is the accent's fill; in the neutral theme it stays the lightest
  // step, because that element has to be lighter than the track under it. That
  // is the opposite of what a neutral contained *button* needs (darker than the
  // surface it sits on), which is why the two are separate tokens.
  emphasis: selfAdaptive(6, 6, 1, 9),
  "screen-gradient-start": self(3, 4),
  "screen-gradient-middle": self(2, 5),
  "screen-gradient-end": self(1, 6),
  /* borders */
  "border-muted": self(7, 5),
  "border-sharp": self(8, 9),
  /* interactive */
  // The contained fill, the same steps in every theme: the neutral one is the
  // grayscale accent, not the absence of one, so `accent="neutral"` takes a
  // fill as dark as a colored accent's and the same white label. A pale
  // neutral fill cannot work here — the light steps just above it are
  // `surface` (2), `screen` (3) and `lowered` (4) themselves, so the button
  // dissolves into whatever it is placed on.
  // Press has no step of its own in dark mode: the scale jumps from 7 (#555555)
  // to 8 (#BCBCBC, where the text tones start), and white ink on #BCBCBC is
  // 1.9:1 — so a dark press holds at hover's value rather than climbing into
  // the text tones or receding to a darker step.
  "interactive-contained-pressable": self(6, 9),
  "interactive-contained-hover": self(7, 8),
  "interactive-contained-focus": self(7, 8),
  "interactive-contained-active": self(7),
  // PressableBox's `list` variant — a card row lifted off the surface
  // (PressableListItem). Its ground is a *tone*, not the accent's fill, and it
  // keeps the ambient `text-sharp` label. That is what separates it from
  // `emphasis`, which is the accent's fill — a SegmentedBar chip has to win
  // against its track, a list row does not.
  // The two modes get there from opposite ends. Light starts at the accent's
  // own `surface` step and walks down (2 → 3 → 4): the deeper tints read more
  // of the hue but turn salmon rather than red, and the hue is `on-list`'s job
  // anyway. Dark has no pale end, so a row takes the accent's own dark ground
  // (6 → 7), one notch under the contained fill. Neutral walks the card steps
  // in both (1 → 2 → 3 light — a row is never placed on a `surface`, so a hover
  // at step 2 has nothing to collide with — and 6 → 7 dark, which has nothing
  // above 7 to press into).
  "interactive-list-pressable": selfAdaptive(6, 6, 1, 2),
  "interactive-list-hover": selfAdaptive(7, 7, 2, 3),
  "interactive-list-focus": selfAdaptive(7, 7, 2, 3),
  "interactive-list-active": selfAdaptive(7, 7, 3, 4),
  // A ground-only state set for a control that has no rest ground at all
  // (PressableBox's `soft`): the fill stays a tone of the surrounding surface —
  // toward the screen in light mode, a step up in dark — so the label keeps its
  // own color instead of flipping onto an accent fill.
  "interactive-soft-hover": self(5, 3),
  "interactive-soft-focus": self(5, 3),
  "interactive-soft-active": self(6, 4),
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
  // Every contained fill, neutral included, is dark enough for white ink.
  "on-accent": gray(11, 1),
  "on-accent-muted": self(10, 4),
  // `emphasis` is a light chip in the neutral theme and the accent's fill when
  // accented, so its ink is the only one that flips with the accent.
  "on-emphasis": ({ isGrayscale, mode }) => ({
    source: "grayscale",
    step: (() => {
      if (mode === "dark") return 11;
      return isGrayscale ? 11 : 1;
    })()
  }),
  // The ink of a `list` row — its label and its caret. A light row can only
  // tint its ground (a red light enough for dark ink is a pink), so the accent
  // is carried by the ink there: `accent` when accented, and the ambient sharp
  // when neutral. A dark row already *is* the accent's ground, where an accent
  // ink would be a tint of the color under it (4:1), so it keeps the sharp ink.
  "on-list": ({ isGrayscale, mode }) => {
    if (mode === "dark") return { source: "grayscale", step: 10 };
    return isGrayscale ? { source: "grayscale", step: 11 } : { source: "self", step: 10 };
  },
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
const round = (value, digits) => Number(value.toFixed(digits));
const formatOklch = ({ lightness, chroma, hue }) => `oklch(${round(lightness, 4)} ${round(chroma, 4)} ${round(hue, 2)})`;
const hexAlphaToFraction = (alpha) => round(Number.parseInt(alpha, 16) / 255, 3);
const withOklchAlpha = (serialized, alpha) => alpha === 1 ? serialized : `${serialized.slice(0, -1)} / ${alpha})`;
const colorFormats = {
  srgb: {
    serialize: toHex,
    withAlpha: (serialized, alpha) => serialized + alpha,
    literal: (hex) => hex
  },
  oklch: {
    serialize: formatOklch,
    withAlpha: (serialized, alpha) => withOklchAlpha(serialized, hexAlphaToFraction(alpha)),
    literal: (hex) => {
      const { coords, alpha } = new Color(hex).to("oklch");
      const [lightness, chroma, hue] = coords;
      return withOklchAlpha(
        formatOklch({
          lightness: lightness ?? 0,
          chroma: chroma ?? 0,
          hue: hue || 0
        }),
        round(alpha, 3)
      );
    }
  }
};
const colorAt = ({
  scales,
  mode,
  accentName,
  step
}) => scales[`${accentName}.${mode}`][step];
const buildThemeVars = ({
  scales,
  mode,
  accentName,
  format
}) => {
  const isGrayscale = accentName === "grayscale";
  const vars = {};
  for (const [token, resolver] of Object.entries(tokenScaleMap)) {
    const resolved = resolver({ mode, isGrayscale, accent: accentName });
    if (!resolved) continue;
    if ("literal" in resolved) {
      vars[token] = format.literal(resolved.literal);
      continue;
    }
    const serialized = format.serialize(
      colorAt({
        scales,
        mode,
        accentName: resolved.source === "grayscale" ? "grayscale" : accentName,
        step: resolved.step
      })
    );
    vars[token] = resolved.alpha ? format.withAlpha(serialized, resolved.alpha) : serialized;
  }
  return vars;
};
const emit = (vars, indent) => Object.entries(vars).map(([key, value]) => `${indent}--color-${key}: ${value};`).join("\n");
const prefixVars = (vars) => Object.fromEntries(
  Object.entries(vars).map(([key, value]) => [`--color-${key}`, value])
);
const accents = accentEmitOrder.filter((name) => name !== "grayscale");
const themeTargets = [
  ...["light", "dark"].map(
    (mode) => ({
      theme: mode,
      mode,
      accentName: "grayscale"
    })
  ),
  ...["light", "dark"].flatMap(
    (mode) => accents.map(
      (accentName) => ({
        theme: `${mode}_${accentName}`,
        mode,
        accentName
      })
    )
  )
];
const emitThemeBlocks = ({
  scales,
  format,
  indent
}) => themeTargets.map(({ theme, mode, accentName }) => {
  const vars = buildThemeVars({ scales, mode, accentName, format });
  return `${indent}.${theme} {
${emit(vars, `${indent}  `)}
${indent}}`;
}).join("\n\n");
const webOnly = (rules) => `  @supports (display: contents) {
${rules}
  }`;
const buildPaletteCss = (srgbScales) => {
  const srgb = colorFormats.srgb;
  const lightVars = buildThemeVars({
    scales: srgbScales,
    mode: "light",
    accentName: "grayscale",
    format: srgb
  });
  return `@theme {
  /* color tokens \u2014 light theme as defaults, enabling bg-*, text-*, border-*
     color utilities. This block is the whole palette on native, where ScopedTheme
     overrides it at runtime with the themeVariables map fed to NativeWind's
     VariableContextProvider. Web instead resolves the .<theme> blocks below,
     applied as a className (the closest theme class wins, through inheritance). */
${emit(lightVars, "  ")}
}

@layer theme {
${webOnly(emitThemeBlocks({ scales: srgbScales, format: srgb, indent: "    " }))}
}
`;
};
const buildOklchPaletteCss = (p3Scales) => {
  const oklch = colorFormats.oklch;
  const lightOklchVars = buildThemeVars({
    scales: p3Scales,
    mode: "light",
    accentName: "grayscale",
    format: oklch
  });
  return `/* Wide-gamut palette: the same ramp with display-p3 chroma headroom. Web only \u2014
   the native compiler drops this feature query and keeps the base palette hex. */
@supports (color: oklch(0 0 0)) {
  @layer theme {
    /* overrides the @theme defaults, which cannot host a feature query */
    :root, :host {
${emit(lightOklchVars, "      ")}
    }

${emitThemeBlocks({ scales: p3Scales, format: oklch, indent: "    " })}
  }
}
`;
};
const buildThemeVariables = (scales, formatName = "srgb") => {
  const format = colorFormats[formatName];
  const baseVars = {
    light: buildThemeVars({
      scales,
      mode: "light",
      accentName: "grayscale",
      format
    }),
    dark: buildThemeVars({
      scales,
      mode: "dark",
      accentName: "grayscale",
      format
    })
  };
  return Object.fromEntries(
    themeTargets.map(({ theme, mode, accentName }) => [
      theme,
      prefixVars(
        accentName === "grayscale" ? baseVars[mode] : {
          ...baseVars[mode],
          ...buildThemeVars({ scales, mode, accentName, format })
        }
      )
    ])
  );
};

const generateTheme = (overrides) => {
  const specs = {
    ...defaultPaletteSpecs,
    ...overrides
  };
  const scalesForGamut = (gamut) => Object.fromEntries(
    Object.keys(specs).flatMap((name) => [
      [`${name}.light`, createOklchScale(specs[name], "light", gamut)],
      [`${name}.dark`, createOklchScale(specs[name], "dark", gamut)]
    ])
  );
  const srgbScales = scalesForGamut("srgb");
  const p3Scales = scalesForGamut("p3");
  return {
    css: buildPaletteCss(srgbScales),
    oklchCss: buildOklchPaletteCss(p3Scales),
    themeVariables: buildThemeVariables(srgbScales, "srgb"),
    oklchThemeVariables: buildThemeVariables(p3Scales, "oklch")
  };
};

const generatedHeader = "/* Generated by alouette writeTheme. DO NOT EDIT. */";
const serializeThemeVariables = (themeVariables) => `{
${Object.entries(themeVariables).map(([theme, variables]) => {
  const entries = Object.entries(variables).map(([name, value]) => `    "${name}": "${value}",`).join("\n");
  return `  ${theme}: {
${entries}
  },`;
}).join("\n")}
}`;
const themeVariablesModule = (themeVariables) => `${generatedHeader}
/* eslint-disable camelcase */
import type { ThemeVariablesMap } from "alouette";

/**
 * Resolved CSS-variable maps for every theme, paired with the generated palette
 * CSS. Pass to \`<AlouetteProvider themeVariables={...}>\`.
 */
export const themeVariables: ThemeVariablesMap = ${serializeThemeVariables(themeVariables)};
`;
const writeTheme = ({
  outDir,
  overrides,
  srgbOnly = false,
  cssFileName = "palette.css",
  themeVariablesFileName = "themeVariables.ts"
}) => {
  const { css, oklchCss, themeVariables } = generateTheme(overrides);
  node_fs.mkdirSync(outDir, { recursive: true });
  const cssPath = node_path.join(outDir, cssFileName);
  node_fs.writeFileSync(
    cssPath,
    `${generatedHeader}
/* App palette. Import after "alouette/core.css", instead of
   "alouette/global.css" \u2014 which carries alouette's default palette. */
${css}`
  );
  const themeVariablesPath = node_path.join(outDir, themeVariablesFileName);
  node_fs.writeFileSync(themeVariablesPath, themeVariablesModule(themeVariables));
  if (srgbOnly) {
    return { cssPath, oklchCssPath: void 0, themeVariablesPath };
  }
  const oklchCssPath = node_path.join(outDir, cssFileName.replace(/\.css$/, "-oklch$&"));
  node_fs.writeFileSync(
    oklchCssPath,
    `${generatedHeader}
/* Wide-gamut half of the app palette. Optional \u2014 import after "${cssFileName}"
   to opt web into the display-p3 ramp. */
${oklchCss}`
  );
  return { cssPath, oklchCssPath, themeVariablesPath };
};

exports.buildOklchPaletteCss = buildOklchPaletteCss;
exports.buildPaletteCss = buildPaletteCss;
exports.buildThemeVariables = buildThemeVariables;
exports.createColorScale = createColorScale;
exports.createOklchScale = createOklchScale;
exports.defaultPaletteSpecs = defaultPaletteSpecs;
exports.generateTheme = generateTheme;
exports.maxChroma = maxChroma;
exports.writeTheme = writeTheme;
//# sourceMappingURL=theme-generator-node22.cjs.map
