import type { StoryObj } from "@storybook/react-vite";
import { InputText } from "./InputText";
type ThisStory = StoryObj<typeof InputText>;
declare const _default: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("./InputText").InputTextProps & import("react").RefAttributes<import("react-native").TextInput>>;
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
        maxLength: {
            control: "number";
        };
    };
};
export default _default;
export declare const PreviewInputTextStory: ThisStory;
export declare const Variants: ThisStory;
export declare const Tests: StoryObj<typeof InputText>;
//# sourceMappingURL=InputText.stories.d.ts.map