import type { StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";
type ThisStory = StoryObj<typeof Text>;
declare const _default: {
    title: string;
    component: import("react").FunctionComponent<import("./Text").TextProps>;
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
export declare const TextStory: ThisStory;
//# sourceMappingURL=Text.stories.d.ts.map