import type { StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";
type ThisStory = StoryObj<typeof Switch>;
declare const _default: {
    title: string;
    component: typeof Switch;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        disabled: {
            control: "boolean";
        };
        checked: {
            control: "boolean";
        };
    };
};
export default _default;
export declare const PreviewSwitchStory: ThisStory;
export declare const Variants: ThisStory;
export declare const Tests: StoryObj<typeof Switch>;
//# sourceMappingURL=Switch.stories.d.ts.map