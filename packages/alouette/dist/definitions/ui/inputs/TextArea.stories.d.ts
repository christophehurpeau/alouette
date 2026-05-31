import type { StoryObj } from "@storybook/react-vite";
import { TextArea } from "./TextArea";
type ThisStory = StoryObj<typeof TextArea>;
declare const _default: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("./TextArea").TextAreaProps & import("react").RefAttributes<import("react-native").TextInput>>;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        placeholder: {
            control: "text";
        };
        disabled: {
            control: "boolean";
        };
        value: {
            control: "text";
        };
    };
};
export default _default;
export declare const PreviewTextAreaStory: ThisStory;
export declare const Variants: ThisStory;
//# sourceMappingURL=TextArea.stories.d.ts.map