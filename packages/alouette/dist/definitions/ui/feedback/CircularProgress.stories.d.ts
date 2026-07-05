import type { StoryObj } from "@storybook/react-vite";
import { CircularProgress } from "./CircularProgress";
type ThisStory = StoryObj<typeof CircularProgress>;
declare const _default: {
    title: string;
    component: typeof CircularProgress;
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
export declare const CircularProgressPreviewStory: ThisStory;
export declare const CircularProgressVariantsStory: ThisStory;
//# sourceMappingURL=CircularProgress.stories.d.ts.map