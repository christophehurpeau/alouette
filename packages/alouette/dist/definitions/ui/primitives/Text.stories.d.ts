import type { StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";
type ThisStory = StoryObj<typeof Text>;
declare const _default: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("react-native").TextProps & import("react").RefAttributes<import("react-native").Text>>;
    parameters: {
        componentSubtitle: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
};
export default _default;
export declare const PreviewStory: ThisStory;
export declare const VariantsStory: ThisStory;
export declare const Tests: ThisStory;
//# sourceMappingURL=Text.stories.d.ts.map