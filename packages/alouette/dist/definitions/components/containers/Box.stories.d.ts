import type { StoryObj } from "@storybook/react";
import { Box } from "./Box";
type ThisStory = StoryObj<typeof Box>;
declare const _default: {
    title: string;
    component: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
        size?: number | undefined;
        internalForcedPseudoState?: import("../primitives/createVariants").InternalPseudoState | undefined;
        interactive?: boolean | import("csstype").Property.Cursor | undefined;
        withBorder?: boolean | import("@tamagui/web").SizeTokens | undefined;
        withBackground?: boolean | undefined;
        withElevation?: boolean | undefined;
        circular?: boolean | undefined;
        centered?: boolean | undefined;
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
        theme: {
            description: string;
            control: "select";
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        withBackground: {
            description: string;
            control: "boolean";
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        withBorder: {
            description: string;
            control: "boolean";
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        interactive: {
            description: string;
            control: "boolean";
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        padding: {
            description: string;
            control: "select";
            options: string[];
        };
        borderRadius: {
            description: string;
            control: "select";
            options: string[];
        };
    };
};
export default _default;
export declare const PreviewBoxStory: ThisStory;
export declare const Variants: ThisStory;
//# sourceMappingURL=Box.stories.d.ts.map