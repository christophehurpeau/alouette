import type { StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
type ThisStory = StoryObj<typeof Select>;
declare const _default: {
    title: string;
    component: typeof Select;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        placeholder: {
            control: "text";
        };
        disabled: {
            control: "boolean";
        };
    };
};
export default _default;
export declare const PreviewSelectStory: ThisStory;
export declare const Variants: ThisStory;
export declare const Tests: StoryObj<typeof Select>;
//# sourceMappingURL=Select.stories.d.ts.map