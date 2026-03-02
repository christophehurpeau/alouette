import type { StoryObj } from "@storybook/react-vite";
import { LinkText } from "./LinkText";
type ThisStory = StoryObj<typeof LinkText>;
declare const _default: {
    title: string;
    component: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiTextElement, import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
        size?: import("@tamagui/web").FontSizeTokens | undefined;
        tint?: "accent" | "muted" | "onAccent" | "sharp" | undefined;
        inherit?: boolean | undefined;
        family?: "$body" | "$heading" | "$body-monospace" | undefined;
        disabledSharp?: boolean | undefined;
        weight?: "$regular" | "$bold" | "$extraBold" | undefined;
        subtle?: boolean | undefined;
    }, import("@tamagui/web").StaticConfigPublic>;
    parameters: {
        componentSubtitle: string;
    };
};
export default _default;
export declare const PreviewLinkStory: ThisStory;
export declare const Variants: ThisStory;
//# sourceMappingURL=LinkText.stories.d.ts.map