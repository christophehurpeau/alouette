import type { StoryObj } from "@storybook/react-vite";
import { LinearProgress } from "./LinearProgress";
type ThisStory = StoryObj<typeof LinearProgress>;
declare const _default: {
    title: string;
    component: typeof LinearProgress;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        progress: {
            description: string;
            control: {
                type: "range";
                min: number;
                max: number;
            };
        };
        hidden: {
            description: string;
            control: "boolean";
        };
        accent: {
            description: string;
            control: "select";
            options: string[];
        };
        size: {
            description: string;
            control: "select";
            options: string[];
        };
    };
};
export default _default;
export declare const LinearProgressPreviewStory: ThisStory;
export declare const LinearProgressVariantsStory: ThisStory;
//# sourceMappingURL=LinearProgress.stories.d.ts.map