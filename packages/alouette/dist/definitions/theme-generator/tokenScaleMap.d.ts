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
export declare const tokenScaleMap: Record<string, TokenResolver>;
export declare const resolveToken: (token: string, ctx: TokenContext) => ResolvedToken | null;
export declare const resolveTokenEffective: (token: string, ctx: TokenContext) => ResolvedToken;
//# sourceMappingURL=tokenScaleMap.d.ts.map