import type { StoryObj } from "@storybook/react-vite";
import { CodeBlock } from "./CodeBlock";
type ThisStory = StoryObj<typeof CodeBlock>;
declare const _default: {
    title: string;
    component: typeof CodeBlock;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        title: {
            description: string;
            control: "text";
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
export declare const CodeBlockPreviewStory: ThisStory;
export declare const CodeBlockVariantsStory: ThisStory;
export declare const CodeBlockTestsStory: ThisStory;
//# sourceMappingURL=CodeBlock.stories.d.ts.map