import type { StoryObj } from "@storybook/react";
import { Typography } from "./Typography.tsx";
type ThisStory = StoryObj<typeof Typography>;
declare const _default: {
    title: string;
    component: import("@tamagui/core").TamaguiComponent<import("@tamagui/core").TamaDefer, import("@tamagui/core").TamaguiTextElement, import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/core").TextStylePropsBase, {
        size?: "xs" | "sm" | "md" | "xl" | "lg" | undefined;
        family?: "heading" | "body" | undefined;
        weight?: "black" | "bold" | "regular" | undefined;
        contrast?: boolean | undefined;
    }, import("@tamagui/core").StaticConfigPublic>;
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