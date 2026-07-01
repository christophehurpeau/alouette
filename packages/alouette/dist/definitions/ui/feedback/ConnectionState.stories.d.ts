import type { StoryObj } from "@storybook/react-vite";
import { ConnectionState } from "./ConnectionState";
type ThisStory = StoryObj<typeof ConnectionState>;
declare const _default: {
    title: string;
    component: typeof ConnectionState;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        state: {
            description: string;
            control: "select";
            options: (string | null)[];
        };
        forceHidden: {
            description: string;
            control: "boolean";
        };
        forceVisible: {
            description: string;
            control: "boolean";
        };
        children: {
            description: string;
            control: "text";
        };
    };
};
export default _default;
export declare const ConnectionStatePreviewStory: ThisStory;
export declare const ConnectionStateVariantsStory: ThisStory;
//# sourceMappingURL=ConnectionState.stories.d.ts.map