import { type PressableProps, View as RNView, type ViewProps as RNViewProps } from "react-native";
import type { VariantProps } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
export declare const boxBaseClasses = "shrink";
export interface BoxProps extends RNViewProps {
    accent?: Accent;
}
export declare const Box: import("react").ForwardRefExoticComponent<BoxProps & import("react").RefAttributes<RNView>>;
export declare const interactiveBoxVariants: import("tailwind-variants").TVReturnType<{
    withFocusVisibleOutline: {
        true: string;
    };
}, undefined, string, {
    withFocusVisibleOutline: {
        true: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    withFocusVisibleOutline: {
        true: string;
    };
}, undefined, string, unknown, unknown, undefined>>;
export interface InteractiveBoxProps extends VariantProps<typeof interactiveBoxVariants>, PressableProps {
}
export declare const InteractiveBox: import("react").ForwardRefExoticComponent<InteractiveBoxProps & import("react").RefAttributes<RNView>>;
export type SafeAreaBoxProps = Omit<BoxProps, "style">;
export declare const SafeAreaBox: import("react").ForwardRefExoticComponent<SafeAreaBoxProps & import("react").RefAttributes<RNView>>;
//# sourceMappingURL=Box.d.ts.map