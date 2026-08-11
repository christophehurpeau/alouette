import type { AccentName, PaletteSpec } from "./paletteSpecs.ts";
export interface WriteThemeParams {
    /** Directory the files are written to, created if missing. */
    outDir: string;
    /**
     * Per-accent params merged over the alouette defaults, so only the accents
     * the app re-colors need to be listed. Omit to reproduce the default palette.
     */
    overrides?: Partial<Record<AccentName, PaletteSpec>>;
    /**
     * Skip the `oklch()` overlay entirely and ship sRGB hex on every platform.
     * @default false
     */
    srgbOnly?: boolean;
    cssFileName?: string;
    themeVariablesFileName?: string;
}
export interface WriteThemeResult {
    cssPath: string;
    /**
     * The wide-gamut overlay, named after `cssFileName` (`palette-oklch.css`).
     * `undefined` when `srgbOnly` is set.
     */
    oklchCssPath: string | undefined;
    themeVariablesPath: string;
}
/**
 * Generate an app's palette and write it to disk: the palette CSS to import
 * after `alouette/core.css`, and the `themeVariables` module to pass to
 * `<AlouetteProvider themeVariables={...}>`. Writing them from one call is what
 * keeps the className tokens and the JS token reads on the same colors.
 *
 * - `palette.css` (hex, complete on its own) + `palette-oklch.css`, imported
 *   after it only if the app wants display-p3 chroma on web.
 * - `themeVariables.ts` in sRGB hex, the only format native can parse. The map
 *   feeds native token reads only — web resolves every token from the CSS — so
 *   there is no oklch counterpart.
 */
export declare const writeTheme: ({ outDir, overrides, srgbOnly, cssFileName, themeVariablesFileName, }: WriteThemeParams) => WriteThemeResult;
//# sourceMappingURL=writeTheme.d.ts.map