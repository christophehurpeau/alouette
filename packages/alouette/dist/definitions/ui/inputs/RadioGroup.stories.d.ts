import type { StoryObj } from "@storybook/react-vite";
import { RadioGroup } from "./RadioGroup";
type ThisStory = StoryObj<typeof RadioGroup>;
declare const _default: {
    title: string;
    component: typeof RadioGroup;
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
export declare const PreviewRadioGroupStory: ThisStory;
export declare const VariantsRadioGroupStory: ThisStory;
export declare const TestsRadioGroupStory: StoryObj<typeof RadioGroup>;
//# sourceMappingURL=RadioGroup.stories.d.ts.map