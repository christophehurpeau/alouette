// Single source of truth mapping each semantic token to a color-scale step,
// per mode and accent. Shared by `build-css.ts` (emits the CSS variables /
// themeVariables) and the repo-root `scripts/generate-palette.ts` contrast
// audit (resolves the steps a token pair actually uses), so the two can never
// drift. A token resolves to a `{ source, step }` (which palette + which scale
// step for this mode), a `{ literal }` (a fixed value), or `null` when the
// token is not emitted for the given accent.

export type Mode = "dark" | "light";
export type ScaleNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface TokenStep {
  source: "self" | "grayscale";
  step: ScaleNum;
  alpha?: string;
}
export interface TokenLiteral {
  literal: string;
}
export type ResolvedToken = TokenStep | TokenLiteral;

export interface TokenContext {
  mode: Mode;
  isGrayscale: boolean;
}
export type TokenResolver = (ctx: TokenContext) => ResolvedToken | null;

// `self` reads the accent's own palette; `gray` always reads grayscale (base
// tokens whose value is fixed regardless of accent, e.g. text-muted/on-accent).
const step = (
  source: "self" | "grayscale",
  dark: ScaleNum,
  light: ScaleNum,
  alpha?: string,
): TokenResolver => {
  return ({ mode }) => {
    const resolved: TokenStep = { source, step: mode === "dark" ? dark : light };
    if (alpha) resolved.alpha = alpha;
    return resolved;
  };
};

const self = (dark: ScaleNum, light: ScaleNum = dark, alpha?: string) =>
  step("self", dark, light, alpha);
const gray = (dark: ScaleNum, light: ScaleNum = dark) =>
  step("grayscale", dark, light);

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
// global.css / themeVariables, with the grayscale-only block first.
export const tokenScaleMap: Record<string, TokenResolver> = {
  /* grayscale-only base tokens */
  translucent: grayscaleOnly(({ mode }) => ({ literal: translucent[mode] })),
  "disabled-sharp": grayscaleOnly(gray(9, 9)),
  "disabled-muted": grayscaleOnly(gray(9, 7)),
  "disabled-interactive": grayscaleOnly(gray(7, 6)),
  "disabled-interactive-muted": grayscaleOnly(gray(4, 4)),
  muted: grayscaleOnly(gray(10, 10)),
  "form-border-disabled": grayscaleOnly(gray(7, 6)),
  "form-placeholder": grayscaleOnly(gray(9, 9)),
  "form-disabled-text": grayscaleOnly(gray(10, 10)),
  "interactive-contained-disabled": grayscaleOnly(gray(5, 5)),
  "interactive-outlined-disabled": grayscaleOnly(gray(6, 6)),
  "interactive-accent-outlined-disabled": grayscaleOnly(gray(6, 6)),

  /* backgrounds */
  screen: self(2, 3),
  surface: self(3, 2),
  highlight: self(4, 1),
  enabled: self(7, 5),
  "highlight-accent": self(4),
  lowered: self(1, 4),
  "screen-gradient-start": self(3, 4),
  "screen-gradient-middle": self(2, 5),
  "screen-gradient-end": self(1, 6),

  /* borders */
  "border-muted": self(7),
  "border-sharp": self(9),

  /* interactive */
  "interactive-contained-pressable": ({ mode, isGrayscale }) => ({
    source: "self",
    step: mode === "dark" ? 6 : isGrayscale ? 1 : 9,
  }),
  "interactive-contained-hover": ({ mode, isGrayscale }) => ({
    source: "self",
    step: mode === "dark" ? 7 : isGrayscale ? 2 : 8,
  }),
  "interactive-contained-focus": ({ mode, isGrayscale }) => ({
    source: "self",
    step: mode === "dark" ? 7 : isGrayscale ? 2 : 8,
  }),
  "interactive-contained-active": ({ mode, isGrayscale }) => ({
    source: "self",
    step: mode === "dark" ? 7 : isGrayscale ? 3 : 7,
  }),

  "interactive-outlined-pressable": self(7, 9),
  "interactive-outlined-hover": self(9, 7),
  "interactive-outlined-focus": self(9, 7),
  "interactive-outlined-active": self(9, 7),
  "interactive-outlined-outline-focus": self(7),

  "interactive-active": self(9),
  "interactive-pressable": self(10),
  "interactive-hover": self(11),

  /* texts */
  sharp: self(11),
  accent: ({ isGrayscale }) => ({ source: "self", step: isGrayscale ? 11 : 10 }),
  "accent-muted": self(10, 9),
  "on-accent": ({ mode, isGrayscale }) =>
    isGrayscale
      ? { source: "self", step: 11 }
      : { source: "grayscale", step: mode === "dark" ? 11 : 1 },
  "on-accent-muted": ({ mode, isGrayscale }) => ({
    source: "self",
    step: mode === "dark" ? 10 : isGrayscale ? 9 : 4,
  }),

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
  return resolveToken(token, ctx) ?? resolveToken(token, { ...ctx, isGrayscale: true })!;
};
