import type { GetProps } from "@tamagui/core";
import type { ReactNode } from "react";
import type { SetRequired } from "type-fest";
import type { SVGIconElement } from "../primitives/Icon";
declare const IconButtonFrame: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
    disabled?: boolean | undefined;
    size?: number | "md" | "sm" | undefined;
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
type IconButtonFrameProps = GetProps<typeof IconButtonFrame>;
export interface IconButtonProps extends SetRequired<IconButtonFrameProps, "aria-label"> {
    icon: NonNullable<SVGIconElement>;
    iconSize?: "fill";
}
export declare function IconButton({ icon, disabled, size, iconSize, variant, ...pressableBoxProps }: IconButtonProps): ReactNode;
export {};
//# sourceMappingURL=IconButton.d.ts.map