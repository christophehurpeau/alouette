export type ColorClassName = string | "text-accent" | "text-disabled-muted" | "text-disabled" | "text-muted" | "text-on-accent-muted" | "text-on-accent" | "text-sharp";
/**
 * Resolves a `text-*` Tailwind className (e.g. `"text-accent"`) to its
 * concrete `--color-*` token value for the active theme. For native SVG
 * props (`color`, `stroke`, `fill`) that can't take a className directly and
 * so can't rely on CSS `currentColor` the way web SVG can.
 */
export declare function useColorToken(className: ColorClassName): string | undefined;
//# sourceMappingURL=useColorToken.d.ts.map