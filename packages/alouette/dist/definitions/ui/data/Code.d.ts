import type { Text as RNText } from "react-native";
import { type TextProps } from "../primitives/Text";
export type CodeProps = TextProps;
/**
 * Inline code — a mono-family fragment tinted on the highlight layer, meant to
 * sit inside a text flow (`<Paragraph>Run <Code>pnpm build</Code> first.</Paragraph>`).
 * No size class of its own: nested inside a `Text` it inherits the surrounding
 * size, so a code fragment never breaks the line rhythm.
 *
 * `role="code"` renders a `<code>` element on web; native keeps a plain Text.
 */
export declare const Code: import("react").ForwardRefExoticComponent<TextProps & import("react").RefAttributes<RNText>>;
//# sourceMappingURL=Code.d.ts.map