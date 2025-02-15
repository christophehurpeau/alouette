import type { StoryObj } from "@storybook/react";
import { Button } from "./Button";
type ThisStory = StoryObj<typeof Button>;
declare const _default: {
    title: string;
    component: typeof Button;
    parameters: {
        componentSubtitle: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    argTypes: {
        text: {
            description: string;
            control: "text";
        };
        icon: {
            description: string;
            control: {
                type: "boolean";
            };
        };
        size: {
            description: string;
            control: "select";
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        variant: {
            description: string;
            control: "select";
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
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
        disabled: {
            description: string;
            control: "boolean";
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
    };
};
export default _default;
export declare const PreviewButtonStory: ThisStory;
export declare const Variants: ThisStory;
//# sourceMappingURL=Button.stories.d.ts.map