import type { ThemeProps } from "@tamagui/core";
import type { ReactNode } from "react";
export interface GradientBackgroundProps {
    theme?: ThemeProps["name"];
    children?: ReactNode;
}
export declare const GradientBackground: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps | (import("@tamagui/core").RNTamaguiViewNonStyleProps & void), import("@tamagui/web").StackStyleBase, {
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
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
//# sourceMappingURL=GradientBackground.d.ts.map