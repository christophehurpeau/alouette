import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import type { Accent } from "../../core/AlouetteConfig";
export interface TextProps extends RNTextProps {
    accent?: Accent;
}
export declare const Text: import("react").ForwardRefExoticComponent<TextProps & import("react").RefAttributes<RNText>>;
export type ParagraphProps = TextProps;
export declare const Paragraph: import("react").ForwardRefExoticComponent<TextProps & import("react").RefAttributes<RNText>>;
//# sourceMappingURL=Text.d.ts.map