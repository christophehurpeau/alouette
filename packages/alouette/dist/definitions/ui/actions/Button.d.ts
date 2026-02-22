import type { GetProps } from "@tamagui/core";
import type { ReactNode } from "react";
import type { Except } from "type-fest";
import type { SVGIconElement } from "../primitives/Icon";
declare const ButtonFrame: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, unknown, import("@tamagui/web").TamaguiComponentPropsBaseBase & Omit<import("@tamagui/core").RNTamaguiViewNonStyleProps, "size" | "interactive" | "tint" | "center" | keyof import("@tamagui/web").StackStyleBase | "absoluteFill" | "layer" | "shadow" | "withBorder" | "withFocusVisibleOutline" | "withBackground"> & import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase> & {
    size?: number | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    tint?: "accent" | undefined;
    center?: boolean | undefined;
    absoluteFill?: boolean | undefined;
    layer?: "highlight" | "surface" | "lowered" | "highlight-accent" | undefined;
    shadow?: "none" | "lowered" | "s" | "m" | "l" | undefined;
    withBorder?: import("@tamagui/web").SizeTokens | undefined;
    withFocusVisibleOutline?: boolean | undefined;
    withBackground?: "interactive" | "highlight" | "surface" | undefined;
} & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>> & import("@tamagui/web").WithPseudoProps<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase> & {
    size?: number | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    tint?: "accent" | undefined;
    center?: boolean | undefined;
    absoluteFill?: boolean | undefined;
    layer?: "highlight" | "surface" | "lowered" | "highlight-accent" | undefined;
    shadow?: "none" | "lowered" | "s" | "m" | "l" | undefined;
    withBorder?: import("@tamagui/web").SizeTokens | undefined;
    withFocusVisibleOutline?: boolean | undefined;
    withBackground?: "interactive" | "highlight" | "surface" | undefined;
} & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>>> & import("@tamagui/web").WithMediaProps<import("@tamagui/web").WithThemeShorthandsAndPseudos<import("@tamagui/web").StackStyleBase, {
    size?: number | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    tint?: "accent" | undefined;
    center?: boolean | undefined;
    absoluteFill?: boolean | undefined;
    layer?: "highlight" | "surface" | "lowered" | "highlight-accent" | undefined;
    shadow?: "none" | "lowered" | "s" | "m" | "l" | undefined;
    withBorder?: import("@tamagui/web").SizeTokens | undefined;
    withFocusVisibleOutline?: boolean | undefined;
    withBackground?: "interactive" | "highlight" | "surface" | undefined;
}>>, import("@tamagui/web").StackStyleBase, {
    size?: "md" | "sm" | undefined;
    variant?: "outlined" | "contained" | "ghost-outlined" | "ghost-contained" | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
type ButtonFrameProps = GetProps<typeof ButtonFrame>;
export interface ButtonProps extends Except<ButtonFrameProps, "size"> {
    icon?: NonNullable<SVGIconElement>;
    text: ReactNode;
    size?: "md" | "sm";
}
export declare function Button({ icon, text, disabled, variant, size, ...pressableProps }: ButtonProps): ReactNode;
export declare function ExternalLinkButton(props: Except<ButtonProps, "render" | "role"> & {
    href: string;
}): ReactNode;
export declare function InternalLinkButton(props: Except<ButtonProps, "render" | "role"> & {
    href: string;
}): ReactNode;
export {};
//# sourceMappingURL=Button.d.ts.map