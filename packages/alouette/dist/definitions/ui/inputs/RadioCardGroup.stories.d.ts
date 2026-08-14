import type { StoryObj } from "@storybook/react-vite";
import { RadioCardGroup } from "./RadioCardGroup";
type ThisStory = StoryObj<typeof RadioCardGroup>;
declare const _default: {
    title: string;
    component: typeof RadioCardGroup;
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
export declare const PreviewRadioCardGroupStory: ThisStory;
export declare const StackRadioCardGroupStory: ThisStory;
export declare const VariantsRadioCardGroupStory: ThisStory;
export declare const TestsRadioCardGroupStory: ThisStory;
export declare const TestsStackRadioCardGroupStory: ThisStory;
export declare const TestsDisabledRadioCardGroupStory: ThisStory;
//# sourceMappingURL=RadioCardGroup.stories.d.ts.map