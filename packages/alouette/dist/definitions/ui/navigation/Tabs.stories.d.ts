import type { StoryObj } from "@storybook/react-vite";
import { Tabs } from "./Tabs";
type ThisStory = StoryObj<typeof Tabs>;
declare const _default: {
    title: string;
    component: typeof Tabs;
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
export declare const PreviewTabsStory: ThisStory;
export declare const VariantsTabsStory: ThisStory;
export declare const TestsTabsStory: ThisStory;
//# sourceMappingURL=Tabs.stories.d.ts.map