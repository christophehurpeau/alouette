import type { StoryObj } from "@storybook/react-vite";
import { ColorModePicker } from "./ColorModePicker";
type ThisStory = StoryObj<typeof ColorModePicker>;
declare const _default: {
    title: string;
    component: typeof ColorModePicker;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        disabled: {
            control: "boolean";
        };
        variant: {
            control: "inline-radio";
            options: string[];
        };
        accent: {
            control: "select";
            options: (string | undefined)[];
        };
    };
};
export default _default;
export declare const PreviewColorModePickerStory: ThisStory;
export declare const VariantsColorModePickerStory: ThisStory;
export declare const TestsColorModePickerStory: ThisStory;
//# sourceMappingURL=ColorModePicker.stories.d.ts.map