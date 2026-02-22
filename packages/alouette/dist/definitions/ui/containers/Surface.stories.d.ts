import type { StoryObj } from "@storybook/react-vite";
import { Surface } from "./Surface";
type ThisStory = StoryObj<typeof Surface>;
declare const _default: {
    title: string;
    component: import("react").ComponentType<import("./Surface").SurfaceProps>;
    parameters: {
        componentSubtitle: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    argTypes: {
        highlight: {
            description: string;
            control: {
                type: "boolean";
            };
        };
        shadow: {
            description: string;
            control: {
                type: "select";
            };
            options: string[];
            table: {
                defaultValue: {
                    summary: undefined;
                };
            };
        };
        children: {
            control: "text";
            description: string;
        };
    };
};
export default _default;
export declare const PreviewSurfaceStory: ThisStory;
export declare const VariantsSurfaceStory: ThisStory;
//# sourceMappingURL=Surface.stories.d.ts.map