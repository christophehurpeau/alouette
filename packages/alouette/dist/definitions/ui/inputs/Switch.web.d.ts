import type { GestureReponderEvent, GetProps } from "@tamagui/core";
declare const SwitchFrame: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
    disabled?: boolean | undefined;
    size?: "md" | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    tint?: "accent" | undefined;
    center?: boolean | undefined;
    absoluteFill?: boolean | undefined;
    layer?: "highlight" | "surface" | "lowered" | "highlight-accent" | "translucent" | undefined;
    shadow?: "none" | "lowered" | "s" | "m" | "l" | undefined;
    square?: number | undefined;
    withBorder?: import("@tamagui/web").SizeTokens | undefined;
    withFocusVisibleOutline?: boolean | undefined;
    withBackground?: "interactive" | "highlight" | "surface" | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
interface SwitchAdditionalProps {
    checked: boolean;
    onChange: (e: GestureReponderEvent) => void;
    onValueChange?: (newValue: boolean) => void;
}
export type SwitchProps = Pick<GetProps<typeof SwitchFrame>, "aria-labelledby" | "disabled"> & SwitchAdditionalProps;
export declare const Switch: import("@tamagui/web").TamaguiComponent<Omit<import("@tamagui/web").GetFinalProps<import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
    disabled?: boolean | undefined;
    size?: "md" | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    tint?: "accent" | undefined;
    center?: boolean | undefined;
    absoluteFill?: boolean | undefined;
    layer?: "highlight" | "surface" | "lowered" | "highlight-accent" | "translucent" | undefined;
    shadow?: "none" | "lowered" | "s" | "m" | "l" | undefined;
    square?: number | undefined;
    withBorder?: import("@tamagui/web").SizeTokens | undefined;
    withFocusVisibleOutline?: boolean | undefined;
    withBackground?: "interactive" | "highlight" | "surface" | undefined;
}>, keyof SwitchAdditionalProps> & SwitchAdditionalProps, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps & SwitchAdditionalProps, import("@tamagui/web").StackStyleBase, {
    disabled?: boolean | undefined;
    size?: "md" | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    tint?: "accent" | undefined;
    center?: boolean | undefined;
    absoluteFill?: boolean | undefined;
    layer?: "highlight" | "surface" | "lowered" | "highlight-accent" | "translucent" | undefined;
    shadow?: "none" | "lowered" | "s" | "m" | "l" | undefined;
    square?: number | undefined;
    withBorder?: import("@tamagui/web").SizeTokens | undefined;
    withFocusVisibleOutline?: boolean | undefined;
    withBackground?: "interactive" | "highlight" | "surface" | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
export {};
//# sourceMappingURL=Switch.web.d.ts.map