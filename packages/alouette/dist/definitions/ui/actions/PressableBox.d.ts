import type { PressableProps as RNPressableProps, View as RNView } from "react-native";
import { type VariantProps } from "tailwind-variants";
import type { AccentOrNeutral } from "../../core/AlouetteConfig";
declare const pressableBoxVariants: import("tailwind-variants").TVReturnType<{
    variant: {
        contained: string;
        list: string;
        outlined: string;
        ghost: string;
        soft: string;
    };
    forceStyle: {
        hover: string;
        focus: string;
        press: string;
    };
}, undefined, "group overflow-hidden", {
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
    /** `"neutral"` drops an accent inherited from an ancestor and renders the
     * neutral interactive tokens — a `contained` secondary action. */
    accent?: AccentOrNeutral;
    className?: string;
    /**
     * Destination. react-native's Pressable types have no `href`, while
     * react-native-web forwards it and renders a real `<a>`; native ignores it,
     * so a native app routes from `onPress` — expo Router's `<Link asChild>`
     * injects both. Giving one turns the default `role` into `"link"`; a
     * component that needs another one (a `menuitem`) still passes its own.
     */
    href?: string;
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