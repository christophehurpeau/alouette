import type { AlouetteTheme } from "../core/AlouetteConfig.ts";
import type { AccentName, PaletteSpec } from "./paletteSpecs.ts";
type ThemeVariables = Record<AlouetteTheme, Record<`--color-${string}`, string>>;
export interface GenerateThemeResult {
    /**
     * Base palette CSS to import after `alouette/core.css`: the `@theme` color
     * defaults (which generate the color utilities — bg-, text-, border-) and the
     * twelve `.<theme>` selector blocks, in sRGB hex. Complete on its own,
     * on every platform.
     */
    css: string;
    /**
     * Optional wide-gamut overlay, re-declaring the same tokens as `oklch()`
     * behind `@supports` with display-p3 chroma headroom. Import it after
     * {@link GenerateThemeResult.css} to opt web into the more vivid ramp; skip it
     * to stay on sRGB everywhere.
     */
    oklchCss: string;
    /**
     * Resolved CSS-variable map for every theme in sRGB hex, to pass to
     * `<AlouetteProvider themeVariables={...}>` so JS token reads (gradients,
     * native Switch, placeholder/SVG tint) match the CSS. The only format native
     * can parse — write it to `themeVariables.ts`.
     */
    themeVariables: ThemeVariables;
    /**
     * The same map with display-p3 chroma headroom, serialized as `oklch()`.
     * Web-only material: the web build resolves every token from the palette CSS
     * and ignores this map, so it exists for tooling that needs the oklch values,
     * not for `<AlouetteProvider>`.
     */
    oklchThemeVariables: ThemeVariables;
}
/**
 * Generate a coherent theme for the alouette accents from hue params. Overrides
 * are merged over {@link defaultPaletteSpecs}, so an app can re-color only the
 * accents it cares about (e.g. `brand`) and inherit the rest.
 */
export declare const generateTheme: (overrides?: Partial<Record<AccentName, PaletteSpec>>) => GenerateThemeResult;
export {};
//# sourceMappingURL=generateTheme.d.ts.map