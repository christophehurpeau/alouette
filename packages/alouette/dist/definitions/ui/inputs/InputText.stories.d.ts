import type { StoryObj } from "@storybook/react-vite";
import { InputText } from "./InputText";
declare const _default: {
    title: string;
    component: import("react").FunctionComponent<import("./InputText").InputTextProps>;
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
export declare const PreviewInputTextStory: StoryObj<typeof InputText>;
export declare const Variants: StoryObj<typeof InputText>;
export declare const Tests: StoryObj<typeof InputText>;
//# sourceMappingURL=InputText.stories.d.ts.map