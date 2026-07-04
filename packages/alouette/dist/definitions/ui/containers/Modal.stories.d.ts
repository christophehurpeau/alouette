import type { StoryObj } from "@storybook/react-vite";
import { Modal } from "./Modal";
type ThisStory = StoryObj<typeof Modal>;
declare const _default: {
    title: string;
    component: typeof Modal;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        title: {
            control: "text";
        };
        size: {
            control: "select";
            options: string[];
        };
        accent: {
            control: "select";
            options: import("../..").Accent[];
        };
        hideCloseButton: {
            control: "boolean";
        };
    };
};
export default _default;
export declare const PreviewModalStory: ThisStory;
export declare const Variants: ThisStory;
export declare const Tests: StoryObj<typeof Modal>;
//# sourceMappingURL=Modal.stories.d.ts.map