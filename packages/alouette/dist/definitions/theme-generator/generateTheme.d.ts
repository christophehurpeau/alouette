import type { AlouetteTheme } from "../core/AlouetteConfig.ts";
import type { AccentName, PaletteSpec } from "./paletteSpecs.ts";
export interface GenerateThemeResult {
    /**
     * Palette CSS to import after `alouette/core.css`: the `@theme` color defaults
     * (which generate the color utilities — bg-, text-, border-) plus the twelve
     * `:where(.<theme>)` selector blocks.
     */
    css: string;
    /**
     * Resolved CSS-variable map for every theme, to pass to
     * `<AlouetteProvider themeVariables={...}>` so JS token reads (gradients,
     * native Switch, placeholder/SVG tint) match the CSS.
     */
    themeVariables: Record<AlouetteTheme, Record<`--color-${string}`, string>>;
}
/**
 * Generate a coherent theme for the alouette accents from hue params. Overrides
 * are merged over {@link defaultPaletteSpecs}, so an app can re-color only the
 * accents it cares about (e.g. `brand`) and inherit the rest.
 */
export declare const generateTheme: (overrides?: Partial<Record<AccentName, PaletteSpec>>) => GenerateThemeResult;
//# sourceMappingURL=generateTheme.d.ts.map