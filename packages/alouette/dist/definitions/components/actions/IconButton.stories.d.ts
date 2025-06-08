import type { StoryObj } from "@storybook/react-vite";
import { IconButton } from "./IconButton.tsx";
type ThisStory = StoryObj<typeof IconButton>;
declare const _default: {
    title: string;
    component: typeof IconButton;
    parameters: {
        componentSubtitle: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    argTypes: {
        icon: {
            description: string;
            control: "boolean";
        };
        size: {
            description: string;
            control: "select";
            options: number[];
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
        "aria-label": {
            description: string;
            control: "text";
        };
    };
};
export default _default;
export declare const PreviewIconButtonStory: ThisStory;
export declare const Variants: ThisStory;
//# sourceMappingURL=IconButton.stories.d.ts.map