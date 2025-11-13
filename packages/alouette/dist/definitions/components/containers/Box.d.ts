import type { GetProps } from "@tamagui/core";
/** View with alouette variants */
export declare const Box: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
    size?: number | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    center?: boolean | undefined;
    withBorder?: boolean | import("@tamagui/web").SizeTokens | undefined;
    withBackground?: boolean | undefined;
    withScreenBackground?: boolean | "translucent" | undefined;
    withElevation?: boolean | undefined;
    circular?: boolean | undefined;
    fullscreen?: boolean | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
export type BoxProps = GetProps<typeof Box>;
export declare const SafeAreaBox: import("@tamagui/web").TamaguiComponent<Omit<import("@tamagui/web").GetFinalProps<import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
    size?: number | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    center?: boolean | undefined;
    withBorder?: boolean | import("@tamagui/web").SizeTokens | undefined;
    withBackground?: boolean | undefined;
    withScreenBackground?: boolean | "translucent" | undefined;
    withElevation?: boolean | undefined;
    circular?: boolean | undefined;
    fullscreen?: boolean | undefined;
}>, "padding" | "paddingBottom" | "paddingLeft" | "paddingRight" | "paddingTop"> & {
    padding?: never;
    paddingTop?: never;
    paddingBottom?: never;
    paddingLeft?: never;
    paddingRight?: never;
}, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps & {
    padding?: never;
    paddingTop?: never;
    paddingBottom?: never;
    paddingLeft?: never;
    paddingRight?: never;
}, import("@tamagui/web").StackStyleBase, {
    size?: number | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    center?: boolean | undefined;
    withBorder?: boolean | import("@tamagui/web").SizeTokens | undefined;
    withBackground?: boolean | undefined;
    withScreenBackground?: boolean | "translucent" | undefined;
    withElevation?: boolean | undefined;
    circular?: boolean | undefined;
    fullscreen?: boolean | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
export type SafeAreaBoxProps = GetProps<typeof SafeAreaBox>;
//# sourceMappingURL=Box.d.ts.map