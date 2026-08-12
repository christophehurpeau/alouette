import type { StoryObj } from "@storybook/react-vite";
import { EditableItem } from "./EditableItem";
type ThisStory = StoryObj<typeof EditableItem>;
declare const _default: {
    title: string;
    component: typeof EditableItem;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        label: {
            control: "text";
        };
        details: {
            control: "text";
        };
        editAriaLabel: {
            control: "text";
        };
        variant: {
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
export declare const EditableItemPreviewStory: ThisStory;
export declare const EditableItemVariantsStory: ThisStory;
export declare const EditableItemTestsStory: ThisStory;
//# sourceMappingURL=EditableItem.stories.d.ts.map