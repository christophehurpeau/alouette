import type { GetProps } from "@tamagui/core";
import type { FunctionComponent } from "react";
export declare const TextStyled: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiTextElement, import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
    size?: import("@tamagui/web").FontSizeTokens | undefined;
    tint?: "accent" | "muted" | "onAccent" | "sharp" | undefined;
    inherit?: boolean | undefined;
    family?: "$body" | "$heading" | "$body-monospace" | undefined;
    disabledSharp?: boolean | undefined;
    weight?: "$regular" | "$bold" | "$extraBold" | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
export type TextProps = Pick<GetProps<typeof TextStyled>, "children" | "disabledSharp" | "family" | "inherit" | "numberOfLines" | "size" | "textAlign" | "theme" | "tint" | "weight">;
export declare const Text: FunctionComponent<TextProps>;
declare const ParagraphStyled: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiTextElement, import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
    size?: import("@tamagui/web").FontSizeTokens | undefined;
    tint?: "accent" | "muted" | "onAccent" | "sharp" | undefined;
    inherit?: boolean | undefined;
    family?: "$body" | "$heading" | "$body-monospace" | undefined;
    disabledSharp?: boolean | undefined;
    weight?: "$regular" | "$bold" | "$extraBold" | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
export type ParagraphProps = Pick<GetProps<typeof ParagraphStyled>, "children" | "size" | "theme" | "tint">;
export declare const Paragraph: FunctionComponent<ParagraphProps>;
export {};
//# sourceMappingURL=Text.d.ts.map