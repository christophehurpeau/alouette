import type { StoryObj } from "@storybook/react-vite";
import { Story } from "../story-components/Story";
import { HStack, Stack, VStack } from "./stacks";
declare const meta: {
    title: string;
    component: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
        fullscreen?: boolean | undefined;
        type?: "h" | "v" | undefined;
    }, import("@tamagui/web").StaticConfigPublic>;
    subcomponents: {
        HStack: any;
        VStack: any;
    };
    parameters: {
        componentSubtitle: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    argTypes: {
        type: {
            description: string;
            control: "select";
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        gap: {
            description: string;
            control: "select";
            options: string[];
        };
        theme: {
            description: string;
            control: "select";
            options: string[];
        };
        alignItems: {
            description: string;
            control: "select";
            options: string[];
        };
        justifyContent: {
            description: string;
            control: "select";
            options: string[];
        };
        flexWrap: {
            description: string;
            control: "boolean";
        };
    };
};
export default meta;
type Story = StoryObj<typeof Stack>;
export declare const StackStory: Story;
export declare const HStackStory: StoryObj<typeof HStack>;
export declare const VStackStory: StoryObj<typeof VStack>;
//# sourceMappingURL=stacks.stories.d.ts.map