import type { StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";
type ThisStory = StoryObj<typeof Avatar>;
declare const _default: {
    title: string;
    component: typeof Avatar;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        name: {
            control: "text";
        };
        size: {
            control: "inline-radio";
            options: string[];
        };
        accent: {
            control: "select";
            options: import("../..").Accent[];
        };
    };
};
export default _default;
export declare const PreviewAvatarStory: ThisStory;
export declare const VariantsAvatarStory: ThisStory;
export declare const TestsAvatarStory: ThisStory;
//# sourceMappingURL=Avatar.stories.d.ts.map