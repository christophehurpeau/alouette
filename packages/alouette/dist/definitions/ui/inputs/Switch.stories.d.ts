import type { StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";
declare const _default: {
    title: string;
    component: typeof Switch;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        disabled: {
            description: string;
            control: "boolean";
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        checked: {
            description: string;
            control: "boolean";
        };
    };
};
export default _default;
export declare const PreviewSwitchStory: StoryObj<typeof Switch>;
export declare const Variants: StoryObj<typeof Switch>;
export declare const Tests: StoryObj<typeof Switch>;
//# sourceMappingURL=Switch.stories.d.ts.map