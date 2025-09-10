import type { GetProps } from "@tamagui/core";
import type { ReactNode } from "react";
import type { SVGIconElement } from "../primitives/Icon";
declare const IconButtonFrame: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
    size?: number | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    variant?: "contained" | "outlined" | "elevated" | "ghost-contained" | "ghost-outlined" | undefined;
    withBorder?: boolean | import("@tamagui/web").SizeTokens | undefined;
    withBackground?: boolean | undefined;
    withElevation?: boolean | undefined;
    circular?: boolean | undefined;
    fullscreen?: boolean | undefined;
    centered?: boolean | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
type IconButtonFrameProps = GetProps<typeof IconButtonFrame>;
export interface IconButtonProps extends IconButtonFrameProps {
    icon: NonNullable<SVGIconElement>;
}
export declare function IconButton({ icon, disabled, size, variant, ...pressableProps }: IconButtonProps): ReactNode;
export {};
//# sourceMappingURL=IconButton.d.ts.map