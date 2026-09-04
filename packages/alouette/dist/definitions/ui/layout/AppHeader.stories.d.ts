import type { StoryObj } from "@storybook/react-vite";
import { AppHeader } from "./AppHeader";
type ThisStory = StoryObj<typeof AppHeader>;
declare const _default: {
    title: string;
    component: typeof AppHeader;
    parameters: {
        componentSubtitle: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    argTypes: {
        size: {
            control: "inline-radio";
            options: string[];
        };
        variant: {
            control: "inline-radio";
            options: string[];
        };
        contentWidth: {
            control: "inline-radio";
            options: string[];
        };
        withSafeAreaTop: {
            control: "boolean";
        };
    };
};
export default _default;
export declare const PreviewAppHeaderStory: ThisStory;
export declare const VariantsAppHeaderStory: ThisStory;
export declare const TestsAppHeaderStory: ThisStory;
//# sourceMappingURL=AppHeader.stories.d.ts.map