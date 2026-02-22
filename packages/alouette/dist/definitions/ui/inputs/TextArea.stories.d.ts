import type { StoryObj } from "@storybook/react-vite";
import { TextArea } from "./TextArea";
declare const _default: {
    title: string;
    component: import("react").FunctionComponent<import("./TextArea").TextAreaProps>;
    parameters: {
        componentSubtitle: string;
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
        placeholder: {
            description: string;
            control: "text";
        };
        disabled: {
            description: string;
            control: "boolean";
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        value: {
            description: string;
            control: "text";
        };
    };
};
export default _default;
export declare const PreviewTextAreaStory: StoryObj<typeof TextArea>;
export declare const Variants: StoryObj<typeof TextArea>;
//# sourceMappingURL=TextArea.stories.d.ts.map