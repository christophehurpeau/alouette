import type { GetProps } from "@tamagui/core";
import type { ReactNode } from "react";
import type { Except } from "type-fest";
import type { SVGIconElement } from "../primitives/Icon";
declare const ButtonFrame: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
    size?: number | "md" | "sm" | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    variant?: "contained" | "outlined" | "elevated" | "ghost-contained" | "ghost-outlined" | undefined;
    center?: boolean | undefined;
    withBorder?: boolean | import("@tamagui/web").SizeTokens | undefined;
    withBackground?: boolean | undefined;
    withScreenBackground?: boolean | "translucent" | undefined;
    withElevation?: boolean | undefined;
    circular?: boolean | undefined;
    fullscreen?: boolean | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
type ButtonFrameProps = GetProps<typeof ButtonFrame>;
export interface ButtonProps extends Except<ButtonFrameProps, "size"> {
    icon?: NonNullable<SVGIconElement>;
    text: ReactNode;
    size?: "md" | "sm";
}
export declare function Button({ icon, text, disabled, variant, size, ...pressableProps }: ButtonProps): ReactNode;
export declare function ExternalLinkButton(props: Except<ButtonProps, "href" | "role" | "tag"> & {
    href: string;
}): ReactNode;
export declare function InternalLinkButton(props: Except<ButtonProps, "href" | "role" | "tag"> & {
    href: string;
}): ReactNode;
export {};
//# sourceMappingURL=Button.d.ts.map