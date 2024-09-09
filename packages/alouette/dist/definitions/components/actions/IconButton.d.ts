import type { GetProps } from "@tamagui/core";
import type { ReactElement, ReactNode } from "react";
declare const IconButtonFrame: import("@tamagui/core").TamaguiComponent<import("@tamagui/core").TamaDefer, import("@tamagui/core").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/core").StackStyleBase, {
    size?: number | undefined;
    internalForcedPseudoState?: import("../primitives/createVariants").InternalPseudoState | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    withBorder?: boolean | import("@tamagui/core").SizeTokens | undefined;
    withBackground?: boolean | undefined;
    circular?: boolean | undefined;
    centered?: boolean | undefined;
}, import("@tamagui/core").StaticConfigPublic>;
type IconButtonFrameProps = GetProps<typeof IconButtonFrame>;
export interface IconButtonProps extends IconButtonFrameProps {
    icon: NonNullable<ReactElement>;
}
export declare function IconButton({ icon, disabled, size, ...pressableProps }: IconButtonProps): ReactNode;
export {};
//# sourceMappingURL=IconButton.d.ts.map