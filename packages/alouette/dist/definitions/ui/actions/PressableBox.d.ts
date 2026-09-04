import type { PressableProps as RNPressableProps, View as RNView } from "react-native";
import { type VariantProps } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
declare const pressableBoxVariants: import("tailwind-variants").TVReturnType<{
    variant: {
        contained: string;
        outlined: string;
        ghost: string;
        soft: string;
    };
    forceStyle: {
        hover: string;
        focus: string;
        press: string;
    };
}, undefined, "overflow-hidden", {
    withFocusVisibleOutline: {
        true: string;
        false: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    withFocusVisibleOutline: {
        true: string;
        false: string;
    };
}, undefined, string, {
    withFocusVisibleOutline: {
        true: string;
        false: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    withFocusVisibleOutline: {
        true: string;
        false: string;
    };
}, undefined, string, unknown, unknown, undefined>>>;
type PressableBoxVariantProps = VariantProps<typeof pressableBoxVariants>;
export interface PressableBoxProps extends RNPressableProps, PressableBoxVariantProps {
    accent?: Accent;
    className?: string;
    forceStyle?: "focus" | "hover" | "press";
    /**
     * Set it to `false` on a row of a list that already paints its cursor (a
     * menu item, a listbox option): the focus moves with the pointer there, so
     * the outline would ring whatever the mouse is over.
     */
    withFocusVisibleOutline?: boolean;
}
export declare const PressableBox: import("react").ForwardRefExoticComponent<PressableBoxProps & import("react").RefAttributes<RNView>>;
export {};
//# sourceMappingURL=PressableBox.d.ts.map