import type { StoryObj } from "@storybook/react-vite";
import { Message } from "./Message";
type ThisStory = StoryObj<typeof Message>;
declare const _default: {
    title: string;
    component: typeof Message;
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
        textCentered: {
            description: string;
            control: "boolean";
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        onDismiss: {
            description: string;
            control: "boolean";
        };
        children: {
            description: string;
            control: "text";
        };
    };
};
export default _default;
export declare const PreviewMessageStory: ThisStory;
export declare const Variants: ThisStory;
//# sourceMappingURL=Message.stories.d.ts.map