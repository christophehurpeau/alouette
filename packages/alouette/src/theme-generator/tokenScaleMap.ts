/* eslint-disable import-x/extensions */
// Single source of truth mapping each semantic token to a color-scale step,
// per mode and accent. Shared by `buildTheme.ts` (emits the CSS variables /
// themeVariables) and the repo-root `scripts/generate-palette.ts` contrast
// audit (resolves the steps a token pair actually uses), so the two can never
// drift. A token resolves to a `{ source, step }` (which palette + which scale
// step for this mode), a `{ literal }` (a fixed value), or `null` when the
// token is not emitted for the given accent.

import type { AccentName } from "./paletteSpecs.ts";

export type { AccentName } from "./paletteSpecs.ts";

export type Mode = "dark" | "light";
export type ScaleNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface TokenStep {
  source: "grayscale" | "self";
  step: ScaleNum;
  alpha?: string;
}
export interface TokenLiteral {
  literal: string;
}
export type ResolvedToken = TokenLiteral | TokenStep;

export interface TokenContext {
  mode: Mode;
  isGrayscale: boolean;
  accent: AccentName;
}

export type TokenResolver = (ctx: TokenContext) => ResolvedToken | null;

// `self` reads the accent's own palette; `gray` always reads grayscale (base
// tokens whose value is fixed regardless of accent, e.g. text-muted/on-accent).
const step = (
  source: "grayscale" | "self",
  dark: ScaleNum,
  light: ScaleNum,
  alpha?: string,
): TokenResolver => {
  return ({ mode }) => {
    const resolved: TokenStep = {
      source,
      step: mode === "dark" ? dark : light,
    };
    if (alpha) resolved.alpha = alpha;
    return resolved;
  };
};

const self = (dark: ScaleNum, light: ScaleNum = dark, alpha?: string) =>
  step("self", dark, light, alpha);
const gray = (dark: ScaleNum, light: ScaleNum = dark) =>
  step("grayscale", dark, light);
// Branches on both grayscale/colored and dark/light mode.
const selfAdaptive =
  (
    grayscaleDark: ScaleNum,
    coloredDark: ScaleNum,
    grayscaleLight: ScaleNum = grayscaleDark,
    coloredLight: ScaleNum = coloredDark,
  ): TokenResolver =>
  ({ isGrayscale, mode }) => ({
    source: "self",
    step: (() => {
      if (mode === "dark") return isGrayscale ? grayscaleDark : coloredDark;
      return isGrayscale ? grayscaleLight : coloredLight;
    })(),
  });

// Emitted only in the grayscale theme; colored sub-themes inherit the value
// through the CSS cascade (they never override it).
const grayscaleOnly =
  (resolver: TokenResolver): TokenResolver =>
  (ctx) =>
    ctx.isGrayscale ? resolver(ctx) : null;

const translucent: Record<Mode, string> = {
  dark: "#1f1e1e55",
  light: "#ffffff66",
};

// Insertion order is significant: it is the order tokens are emitted into
// the palette CSS / themeVariables, with the grayscale-only block first.
export const tokenScaleMap: Record<string, TokenResolver> = {
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
    step: ((): ScaleNum => {
      if (mode === "dark") return 11;
      return isGrayscale ? 11 : 1;
    })(),
  }),
  // The ink of a `list` row — its label and its caret. A light row can only
  // tint its ground (a red light enough for dark ink is a pink), so the accent
  // is carried by the ink there: `accent` when accented, and the ambient sharp
  // when neutral. A dark row already *is* the accent's ground, where an accent
  // ink would be a tint of the color under it (4:1), so it keeps the sharp ink.
  "on-list": ({ isGrayscale, mode }) => {
    if (mode === "dark") return { source: "grayscale", step: 10 };
    return isGrayscale
      ? { source: "grayscale", step: 11 }
      : { source: "self", step: 10 };
  },

  /* specials */
  selection: self(10, 10, "40"),
};

export const resolveToken = (
  token: string,
  ctx: TokenContext,
): ResolvedToken | null => {
  const resolver = tokenScaleMap[token];
  if (!resolver) throw new Error(`Unknown token: ${token}`);
  return resolver(ctx);
};

// The value a token actually resolves to in a theme, following grayscale-only
// base tokens into their inherited grayscale value (used by the contrast audit,
// where e.g. `text-muted` must resolve even on a colored surface).
export const resolveTokenEffective = (
  token: string,
  ctx: TokenContext,
): ResolvedToken => {
  return (
    resolveToken(token, ctx) ??
    resolveToken(token, {
      mode: ctx.mode,
      isGrayscale: true,
      accent: "grayscale",
    })!
  );
};
