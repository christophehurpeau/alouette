import type { StoryObj } from "@storybook/react-vite";
import { PressableBox } from "./PressableBox";
type ThisStory = StoryObj<typeof PressableBox>;
declare const _default: {
    title: string;
    component: import("@tamagui/core").TamaguiComponent<import("@tamagui/core").TamaDefer, import("@tamagui/core").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/core").StackStyleBase, {
        size?: number | undefined;
        interactive?: boolean | import("csstype").Property.Cursor | undefined;
        withBorder?: boolean | import("@tamagui/core").SizeTokens | undefined;
        withBackground?: boolean | undefined;
        withElevation?: boolean | undefined;
        circular?: boolean | undefined;
        centered?: boolean | undefined;
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
export declare const PreviewPressableBoxStory: ThisStory;
export declare const Variants: ThisStory;
//# sourceMappingURL=PressableBox.stories.d.ts.map