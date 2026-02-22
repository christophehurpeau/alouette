import type { GetProps } from "@tamagui/core";
import type { ComponentType } from "react";
export declare const Stack: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
    absoluteFill?: boolean | undefined;
    type?: "h" | "v" | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
export type StackProps = GetProps<typeof Stack>;
export declare const HStack: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
    absoluteFill?: boolean | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
export type HStackProps = GetProps<typeof HStack>;
export declare const VStack: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {}, import("@tamagui/web").StaticConfigPublic>;
export type VStackProps = GetProps<typeof VStack>;
declare const CenterFrame: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
    absoluteFill?: boolean | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
export type CenterProps = Pick<GetProps<typeof CenterFrame>, "absoluteFill" | "children" | "flexGrow" | "flexShrink">;
export declare const Center: ComponentType<CenterProps>;
export {};
//# sourceMappingURL=stacks.d.ts.map