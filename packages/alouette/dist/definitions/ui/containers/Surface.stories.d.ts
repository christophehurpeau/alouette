import type { StoryObj } from "@storybook/react-vite";
import { Surface } from "./Surface";
type ThisStory = StoryObj<typeof Surface>;
declare const _default: {
    title: string;
    component: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps | (import("@tamagui/core").RNTamaguiViewNonStyleProps & void), import("@tamagui/web").StackStyleBase, {
        size?: "lg" | "md" | "sm" | undefined;
        interactive?: boolean | import("csstype").Property.Cursor | undefined;
        tint?: "accent" | undefined;
        center?: boolean | undefined;
        lowered?: boolean | undefined;
        absoluteFill?: boolean | undefined;
        layer?: "highlight" | "surface" | "lowered" | "highlight-accent" | "translucent" | undefined;
        shadow?: "none" | "lowered" | "s" | "m" | "l" | undefined;
        square?: number | undefined;
        withBorder?: import("@tamagui/web").SizeTokens | undefined;
        withFocusVisibleOutline?: boolean | undefined;
        withBackground?: "interactive" | "highlight" | "surface" | undefined;
    }, import("@tamagui/web").StaticConfigPublic>;
    parameters: {
        componentSubtitle: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    argTypes: {
        shadow: {
            description: string;
            control: {
                type: "select";
            };
            options: string[];
            table: {
                defaultValue: {
                    summary: undefined;
                };
            };
        };
        children: {
            control: "text";
            description: string;
        };
    };
};
export default _default;
export declare const PreviewSurfaceStory: ThisStory;
export declare const VariantsSurfaceStory: ThisStory;
//# sourceMappingURL=Surface.stories.d.ts.map