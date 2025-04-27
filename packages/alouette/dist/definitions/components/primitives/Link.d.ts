import type { GetProps } from "@tamagui/core";
import type { DistributedOmit } from "type-fest";
declare const Anchor: import("@tamagui/core").TamaguiComponent<import("@tamagui/core").TamaDefer, import("@tamagui/core").TamaguiTextElement, import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/core").TextStylePropsBase, {
    size?: "xs" | "sm" | "md" | "xl" | "lg" | undefined;
    family?: "heading" | "body" | undefined;
    weight?: "black" | "bold" | "regular" | undefined;
    contrast?: boolean | undefined;
}, import("@tamagui/core").StaticConfigPublic>;
type AnchorProps = GetProps<typeof Anchor>;
export type LinkProps = DistributedOmit<AnchorProps, "href"> & {
    href: string;
};
export declare const Link: import("react").ForwardRefExoticComponent<Omit<import("@tamagui/core").GetFinalProps<import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/core").TextStylePropsBase, {
    size?: "xs" | "sm" | "md" | "xl" | "lg" | undefined;
    family?: "heading" | "body" | undefined;
    weight?: "black" | "bold" | "regular" | undefined;
    contrast?: boolean | undefined;
}>, "href"> & {
    href: string;
} & import("react").RefAttributes<HTMLAnchorElement>>;
export {};
//# sourceMappingURL=Link.d.ts.map