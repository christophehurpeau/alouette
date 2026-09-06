import type { StoryObj } from "@storybook/react-vite";
import { EditableSurface } from "./EditableSurface";
type ThisStory = StoryObj<typeof EditableSurface>;
declare const _default: {
    title: string;
    component: typeof EditableSurface;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        title: {
            control: "text";
        };
        details: {
            control: "text";
        };
        size: {
            control: "select";
            options: string[];
        };
        variant: {
            control: "select";
            options: string[];
        };
        editIconVariant: {
            control: "select";
            options: string[];
        };
        accent: {
            control: "select";
            options: import("../..").Accent[];
        };
        disabled: {
            control: "boolean";
        };
    };
};
export default _default;
export declare const EditableSurfacePreviewStory: ThisStory;
export declare const EditableSurfaceVariantsStory: ThisStory;
export declare const EditableSurfaceTestsStory: ThisStory;
//# sourceMappingURL=EditableSurface.stories.d.ts.map