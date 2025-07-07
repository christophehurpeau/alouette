import type { StoryObj } from "@storybook/react-vite";
import { Typography } from "./Typography";
type ThisStory = StoryObj<typeof Typography>;
declare const _default: {
    title: string;
    component: import("@tamagui/core").TamaguiComponent<import("@tamagui/core").TamaDefer, import("@tamagui/core").TamaguiTextElement, import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/core").TextStylePropsBase, {
        size?: import("@tamagui/core").FontSizeTokens | undefined;
        inherit?: boolean | undefined;
        family?: "$body" | "$heading" | undefined;
        contrast?: boolean | undefined;
        weight?: "$regular" | "$bold" | "$black" | undefined;
        colored?: boolean | undefined;
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