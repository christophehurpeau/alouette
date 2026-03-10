import type { StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";
type ThisStory = StoryObj<typeof Text>;
declare const _default: {
    title: string;
    component: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiTextElement, import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
        size?: import("@tamagui/web").FontSizeTokens | undefined;
        tint?: "accent" | "muted" | "onAccent" | "sharp" | undefined;
        inherit?: boolean | undefined;
        family?: "$body" | "$heading" | "$body-monospace" | undefined;
        disabledSharp?: boolean | undefined;
        weight?: "$regular" | "$bold" | "$extraBold" | undefined;
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
export declare const TextStory: ThisStory;
export declare const Tests: ThisStory;
//# sourceMappingURL=Text.stories.d.ts.map