import type { StoryObj } from "@storybook/react-vite";
import { Typography } from "./Typography.tsx";
type ThisStory = StoryObj<typeof Typography>;
declare const _default: {
    title: string;
    component: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiTextElement, import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
        size?: "xl" | "lg" | "md" | "sm" | "xs" | undefined;
        family?: "heading" | "body" | undefined;
        contrast?: boolean | undefined;
        weight?: "regular" | "bold" | "black" | undefined;
    }, import("@tamagui/web").StaticConfigPublic>;
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
export declare const BodyStory: ThisStory;
//# sourceMappingURL=Typography.stories.d.ts.map