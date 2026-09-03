import type { StoryObj } from "@storybook/react-vite";
import { Citation } from "./Citation";
type ThisStory = StoryObj<typeof Citation>;
declare const _default: {
    title: string;
    component: typeof Citation;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        accent: {
            description: string;
            control: "select";
            options: import("../..").Accent[];
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
        href: {
            description: string;
            control: "text";
        };
        children: {
            description: string;
            control: "text";
        };
    };
};
export default _default;
export declare const CitationPreviewStory: ThisStory;
export declare const CitationVariantsStory: ThisStory;
export declare const CitationTestsStory: ThisStory;
//# sourceMappingURL=Citation.stories.d.ts.map