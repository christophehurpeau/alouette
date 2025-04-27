import type { GetProps } from "@tamagui/core";
import type { ReactElement, ReactNode } from "react";
declare const IconButtonFrame: import("@tamagui/core").TamaguiComponent<import("@tamagui/core").TamaDefer, import("@tamagui/core").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/core").StackStyleBase, {
    size?: number | undefined;
    internalForcedPseudoState?: import("../primitives/createVariants.ts").InternalPseudoState | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    variant?: "contained" | "outlined" | "elevated" | "ghost-contained" | "ghost-outlined" | undefined;
    withBorder?: boolean | import("@tamagui/core").SizeTokens | undefined;
    withBackground?: boolean | undefined;
    withElevation?: boolean | undefined;
    circular?: boolean | undefined;
    centered?: boolean | undefined;
}, import("@tamagui/core").StaticConfigPublic>;
type IconButtonFrameProps = GetProps<typeof IconButtonFrame>;
export interface IconButtonProps extends IconButtonFrameProps {
    icon: NonNullable<ReactElement>;
}
export declare function IconButton({ icon, disabled, size, variant, ...pressableProps }: IconButtonProps): ReactNode;
export {};
//# sourceMappingURL=IconButton.d.ts.map