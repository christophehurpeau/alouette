import type { GetProps } from "@tamagui/core";
import type { ReactNode } from "react";
import type { Except } from "type-fest";
import type { SVGIconElement } from "../primitives/Icon";
export declare const buttonHeight: {
    sm: number;
    md: number;
};
declare const ButtonFrame: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
    disabled?: boolean | undefined;
    size?: "md" | "sm" | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    variant?: "outlined" | "contained" | "ghost-outlined" | "ghost-contained" | undefined;
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