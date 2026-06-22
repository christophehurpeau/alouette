import type { StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";
type ThisStory = StoryObj<typeof Badge>;
declare const _default: {
    title: string;
    component: typeof Badge;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        accent: {
            description: string;
            control: "select";
            options: import("../..").Accent[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        variant: {
            description: string;
            control: "select";
            options: readonly ["solid", "solid.enabled", "outlined"];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        size: {
            description: string;
            control: "select";
            options: readonly ["sm", "md"];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        children: {
            description: string;
            control: "text";
        };
    };
};
export default _default;
export declare const BadgePreviewStory: ThisStory;
export declare const BadgeVariantsStory: ThisStory;
//# sourceMappingURL=Badge.stories.d.ts.map