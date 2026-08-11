import type { StoryObj } from "@storybook/react-vite";
declare const _default: {
    title: string;
    parameters: {
        chromatic: {
            disableSnapshot: boolean;
        };
    };
};
export default _default;
export declare const Themes: StoryObj;
/**
 * On web a theme is a className and tokens resolve by CSS custom-property
 * inheritance, so the closest theme class must win whatever the order of the
 * generated blocks. `play` asserts it: a probe nested two accent scopes deep
 * resolves to the inner accent, not the outer one and not the file's last block.
 */
export declare const NestedThemes: StoryObj;
/**
 * The `colorFormat` toolbar global drives which palette CSS the web preview
 * loads (`.storybook/preview.tsx` toggles the wide-gamut overlay stylesheet).
 * It defaults to sRGB, so tokens must resolve to hex-derived `rgb()`.
 */
export declare const ColorFormatSrgb: StoryObj;
/** Same probes with the toolbar on OKLCH: the overlay stylesheet is enabled. */
export declare const ColorFormatOklch: StoryObj;
//# sourceMappingURL=themes.stories.d.ts.map