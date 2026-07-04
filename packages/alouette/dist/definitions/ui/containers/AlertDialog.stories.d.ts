import type { StoryObj } from "@storybook/react-vite";
import type { Accent } from "../../core/AlouetteConfig";
import { AlertDialog } from "./AlertDialog";
type ThisStory = StoryObj<typeof AlertDialog>;
declare const _default: {
    title: string;
    component: typeof AlertDialog;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        title: {
            control: "text";
        };
        variant: {
            control: "inline-radio";
            options: string[];
        };
        size: {
            control: "select";
            options: string[];
        };
        accent: {
            control: "select";
            options: Accent[];
        };
    };
};
export default _default;
export declare const PreviewAlertDialogStory: ThisStory;
export declare const Variants: ThisStory;
export declare const Tests: StoryObj<typeof AlertDialog>;
//# sourceMappingURL=AlertDialog.stories.d.ts.map