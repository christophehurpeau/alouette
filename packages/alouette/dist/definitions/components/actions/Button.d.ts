import type { GetProps } from "@tamagui/core";
import type { ReactElement, ReactNode } from "react";
import type { Except } from "type-fest";
declare const ButtonFrame: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
    size?: number | "md" | "sm" | undefined;
    internalForcedPseudoState?: import("../primitives/createVariants").InternalPseudoState | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    variant?: "contained" | "outlined" | "elevated" | "ghost-contained" | "ghost-outlined" | undefined;
    withBorder?: boolean | import("@tamagui/web").SizeTokens | undefined;
    withBackground?: boolean | undefined;
    withElevation?: boolean | undefined;
    circular?: boolean | undefined;
    centered?: boolean | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
type ButtonFrameProps = GetProps<typeof ButtonFrame>;
export interface ButtonProps extends Except<ButtonFrameProps, "size"> {
    icon?: NonNullable<ReactElement>;
    text: ReactNode;
    size?: "md" | "sm";
}
export declare function Button({ icon, text, disabled, variant, size, ...pressableProps }: ButtonProps): ReactNode;
export {};
//# sourceMappingURL=Button.d.ts.map