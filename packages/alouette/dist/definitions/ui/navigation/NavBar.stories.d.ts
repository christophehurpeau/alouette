import type { StoryObj } from "@storybook/react-vite";
import { NavBar } from "./NavBar";
type ThisStory = StoryObj<typeof NavBar>;
declare const _default: {
    title: string;
    component: typeof NavBar;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        disabled: {
            control: "boolean";
        };
        orientation: {
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
export declare const PreviewNavBarStory: ThisStory;
export declare const VariantsNavBarStory: ThisStory;
export declare const TestsNavBarStory: ThisStory;
//# sourceMappingURL=NavBar.stories.d.ts.map