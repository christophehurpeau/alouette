import type { GetProps } from "@tamagui/core";
import type { DistributedOmit } from "type-fest";
declare const Anchor: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiTextElement, import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
    size?: import("@tamagui/web").FontSizeTokens | undefined;
    disabled?: boolean | undefined;
    inherit?: boolean | undefined;
    family?: "$body" | "$heading" | undefined;
    accent?: boolean | undefined;
    weight?: "$regular" | "$bold" | "$black" | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
type AnchorProps = GetProps<typeof Anchor>;
export type LinkProps = DistributedOmit<AnchorProps, "href"> & {
    href: string;
};
export declare const Link: import("react").ForwardRefExoticComponent<Omit<import("@tamagui/web").GetFinalProps<import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
    size?: import("@tamagui/web").FontSizeTokens | undefined;
    disabled?: boolean | undefined;
    inherit?: boolean | undefined;
    family?: "$body" | "$heading" | undefined;
    accent?: boolean | undefined;
    weight?: "$regular" | "$bold" | "$black" | undefined;
}>, "href"> & {
    href: string;
} & import("react").RefAttributes<HTMLAnchorElement>>;
export {};
//# sourceMappingURL=Link.d.ts.map