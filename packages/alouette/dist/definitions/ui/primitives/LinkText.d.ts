import type { GetProps } from "@tamagui/core";
import type { FunctionComponent } from "react";
declare const LinkTextStyled: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiTextElement, import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
    size?: import("@tamagui/web").FontSizeTokens | undefined;
    tint?: "accent" | "muted" | "onAccent" | "sharp" | undefined;
    inherit?: boolean | undefined;
    family?: "$body" | "$heading" | "$body-monospace" | undefined;
    disabledSharp?: boolean | undefined;
    weight?: "$regular" | "$bold" | "$extraBold" | undefined;
    subtle?: boolean | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
export type LinkTextProps = Pick<GetProps<typeof LinkTextStyled>, "children" | "disabled" | "subtle" | "theme" | "tint">;
export declare const LinkText: FunctionComponent<LinkTextProps>;
export {};
//# sourceMappingURL=LinkText.d.ts.map