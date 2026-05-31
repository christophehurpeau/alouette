import type { Text as RNText } from "react-native";
import { type VariantProps } from "tailwind-variants";
import { type TextProps } from "../primitives/Text";
declare const storyTitleVariants: import("tailwind-variants").TVReturnType<{
    level: {
        1: string;
        2: string;
        3: string;
        4: string;
    };
}, undefined, "font-extrabold text-sharp", {
    level: {
        1: string;
        2: string;
        3: string;
        4: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    level: {
        1: string;
        2: string;
        3: string;
        4: string;
    };
}, undefined, "font-extrabold text-sharp", unknown, unknown, undefined>>;
type StoryTitleVariantProps = VariantProps<typeof storyTitleVariants>;
export interface StoryTitleProps extends TextProps, StoryTitleVariantProps {
}
export declare const StoryTitle: import("react").ForwardRefExoticComponent<StoryTitleProps & import("react").RefAttributes<RNText>>;
export {};
//# sourceMappingURL=StoryTitle.d.ts.map