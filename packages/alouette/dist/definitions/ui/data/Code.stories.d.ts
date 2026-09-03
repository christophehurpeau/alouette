import type { StoryObj } from "@storybook/react-vite";
import { Code } from "./Code";
type ThisStory = StoryObj<typeof Code>;
declare const _default: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("../..").TextProps & import("react").RefAttributes<import("react-native").Text>>;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        children: {
            description: string;
            control: "text";
        };
    };
};
export default _default;
export declare const CodePreviewStory: ThisStory;
export declare const CodeVariantsStory: ThisStory;
export declare const CodeTestsStory: ThisStory;
//# sourceMappingURL=Code.stories.d.ts.map