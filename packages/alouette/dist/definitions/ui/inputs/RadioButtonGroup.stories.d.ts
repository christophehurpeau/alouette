import type { StoryObj } from "@storybook/react-vite";
import { RadioButtonGroup } from "./RadioButtonGroup";
type ThisStory = StoryObj<typeof RadioButtonGroup>;
declare const _default: {
    title: string;
    component: typeof RadioButtonGroup;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        disabled: {
            control: "boolean";
        };
        accent: {
            control: "select";
            options: (string | undefined)[];
        };
    };
};
export default _default;
export declare const PreviewRadioButtonGroupStory: ThisStory;
export declare const VariantsRadioButtonGroupStory: ThisStory;
export declare const TestsRadioButtonGroupStory: StoryObj<typeof RadioButtonGroup>;
//# sourceMappingURL=RadioButtonGroup.stories.d.ts.map