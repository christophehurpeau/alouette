import type { Accent } from "../core/AlouetteConfig.ts";
export type AccentName = Accent | "grayscale";
export interface PaletteSpec {
    type: "accent" | "brightAccent" | "grayscale";
    hue: number;
    hueHi?: number;
    hueLo?: number;
    intensity?: number;
}
export declare const defaultPaletteSpecs: Record<AccentName, PaletteSpec>;
//# sourceMappingURL=paletteSpecs.d.ts.map