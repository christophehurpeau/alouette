import type { AccentName, PaletteSpec } from "./paletteSpecs.ts";
export interface WriteThemeParams {
    /** Directory the two files are written to, created if missing. */
    outDir: string;
    /**
     * Per-accent params merged over the alouette defaults, so only the accents
     * the app re-colors need to be listed. Omit to reproduce the default palette.
     */
    overrides?: Partial<Record<AccentName, PaletteSpec>>;
    cssFileName?: string;
    themeVariablesFileName?: string;
}
export interface WriteThemeResult {
    cssPath: string;
    themeVariablesPath: string;
}
/**
 * Generate an app's palette and write both halves of it to disk: the palette
 * CSS to import after `alouette/core.css`, and the `themeVariables` module to
 * pass to `<AlouetteProvider themeVariables={...}>`. Writing both from one call
 * is what keeps the className tokens and the JS token reads on the same colors.
 */
export declare const writeTheme: ({ outDir, overrides, cssFileName, themeVariablesFileName, }: WriteThemeParams) => WriteThemeResult;
//# sourceMappingURL=writeTheme.d.ts.map