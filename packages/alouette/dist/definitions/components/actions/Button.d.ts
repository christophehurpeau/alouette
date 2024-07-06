import type { GetProps } from "@tamagui/core";
import type { ReactElement, ReactNode } from "react";
declare const ButtonFrame: import("@tamagui/core").TamaguiComponent<import("@tamagui/core").TamaDefer, import("@tamagui/core").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/core").StackStyleBase, {
    size?: number | undefined;
    internalForcedPseudoState?: import("../primitives/createVariants").InternalPseudoState | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    variant?: "contained" | "outlined" | undefined;
    withBorder?: boolean | import("@tamagui/core").SizeTokens | undefined;
    withBackground?: boolean | undefined;
    circular?: boolean | undefined;
    centered?: boolean | undefined;
}, import("@tamagui/core").StaticConfigPublic>;
type ButtonFrameProps = GetProps<typeof ButtonFrame>;
export interface ButtonProps extends ButtonFrameProps {
    icon?: NonNullable<ReactElement>;
    text: ReactNode;
}
export declare function Button({ icon, text, disabled, variant, ...pressableProps }: ButtonProps): ReactNode;
export {};
//# sourceMappingURL=Button.d.ts.map