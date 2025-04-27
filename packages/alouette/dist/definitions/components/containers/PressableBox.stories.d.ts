import type { StoryObj } from "@storybook/react";
import { PressableBox } from "./PressableBox.tsx";
type ThisStory = StoryObj<typeof PressableBox>;
declare const _default: {
    title: string;
    component: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
        size?: number | undefined;
        internalForcedPseudoState?: import("../primitives/createVariants.ts").InternalPseudoState | undefined;
        interactive?: boolean | import("csstype").Property.Cursor | undefined;
        withBorder?: boolean | import("@tamagui/web").SizeTokens | undefined;
        withBackground?: boolean | undefined;
        withElevation?: boolean | undefined;
        circular?: boolean | undefined;
        centered?: boolean | undefined;
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
export declare const PreviewPressableBoxStory: ThisStory;
export declare const Variants: ThisStory;
//# sourceMappingURL=PressableBox.stories.d.ts.map