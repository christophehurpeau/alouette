import type { GetProps } from "@tamagui/core";
import type { ReactElement, ReactNode } from "react";
import type { Except } from "type-fest";
declare const ButtonFrame: import("@tamagui/core").TamaguiComponent<import("@tamagui/core").TamaDefer, import("@tamagui/core").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/core").StackStyleBase, {
    size?: number | "md" | "sm" | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    variant?: "contained" | "outlined" | "elevated" | "ghost-contained" | "ghost-outlined" | undefined;
    withBorder?: boolean | import("@tamagui/core").SizeTokens | undefined;
    withBackground?: boolean | undefined;
    withElevation?: boolean | undefined;
    circular?: boolean | undefined;
    centered?: boolean | undefined;
}, import("@tamagui/core").StaticConfigPublic>;
type ButtonFrameProps = GetProps<typeof ButtonFrame>;
export interface ButtonProps extends Except<ButtonFrameProps, "size"> {
    icon?: NonNullable<ReactElement>;
    text: ReactNode;
    size?: "md" | "sm";
}
export declare function Button({ icon, text, disabled, variant, size, ...pressableProps }: ButtonProps): ReactNode;
export declare const ExternalLinkButton: import("@tamagui/core").TamaguiComponent<import("@tamagui/core").TamaDefer, unknown, import("@tamagui/core").TamaguiComponentPropsBaseBase & ButtonProps, import("@tamagui/core").StackStyleBase, {}, import("@tamagui/core").StaticConfigPublic>;
export {};
//# sourceMappingURL=Button.d.ts.map