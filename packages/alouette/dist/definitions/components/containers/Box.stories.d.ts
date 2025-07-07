import type { StoryObj } from "@storybook/react-vite";
import { Box } from "./Box";
type ThisStory = StoryObj<typeof Box>;
declare const _default: {
    title: string;
    component: import("@tamagui/core").TamaguiComponent<import("@tamagui/core").TamaDefer, import("@tamagui/core").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/core").StackStyleBase, {
        size?: number | undefined;
        interactive?: boolean | import("csstype").Property.Cursor | undefined;
        withBorder?: boolean | import("@tamagui/core").SizeTokens | undefined;
        withBackground?: boolean | undefined;
        withElevation?: boolean | undefined;
        circular?: boolean | undefined;
        centered?: boolean | undefined;
    }, import("@tamagui/core").StaticConfigPublic>;
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