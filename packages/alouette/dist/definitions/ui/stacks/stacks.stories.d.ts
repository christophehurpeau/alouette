import type { StoryObj } from "@storybook/react-vite";
import { HStack, Stack, VStack } from "./stacks";
declare const meta: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("./stacks").StackProps & import("react").RefAttributes<import("react-native").View>>;
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
};
export default meta;
type ThisStory = StoryObj<typeof Stack>;
export declare const StackStory: ThisStory;
export declare const HStackStory: StoryObj<typeof HStack>;
export declare const VStackStory: StoryObj<typeof VStack>;
//# sourceMappingURL=stacks.stories.d.ts.map