import type { StoryObj } from "@storybook/react-vite";
import type { Accent } from "../../core/AlouetteConfig";
import { Blockquote } from "./Blockquote";
type ThisStory = StoryObj<typeof Blockquote>;
declare const _default: {
    title: string;
    component: typeof Blockquote;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        accent: {
            description: string;
            control: "select";
            options: Accent[];
        };
        size: {
            description: string;
            control: "inline-radio";
            options: string[];
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
export declare const BlockquotePreviewStory: ThisStory;
export declare const BlockquoteVariantsStory: ThisStory;
export declare const BlockquoteTestsStory: ThisStory;
//# sourceMappingURL=Blockquote.stories.d.ts.map