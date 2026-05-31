import type { StoryObj } from "@storybook/react-vite";
import { Surface } from "./Surface";
type ThisStory = StoryObj<typeof Surface>;
declare const _default: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("./Surface").SurfaceProps & import("react").RefAttributes<import("react-native").View>>;
    parameters: {
        componentSubtitle: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
};
export default _default;
export declare const PreviewSurfaceStory: ThisStory;
export declare const VariantsSurfaceStory: ThisStory;
//# sourceMappingURL=Surface.stories.d.ts.map