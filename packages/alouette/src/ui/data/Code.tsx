import { forwardRef } from "react";
import type { Text as RNText } from "react-native";
import { Text, type TextProps } from "../primitives/Text";

export type CodeProps = TextProps;

/**
 * Inline code — a mono-family fragment tinted on the highlight layer, meant to
 * sit inside a text flow (`<Paragraph>Run <Code>pnpm build</Code> first.</Paragraph>`).
 * No size class of its own: nested inside a `Text` it inherits the surrounding
 * size, so a code fragment never breaks the line rhythm.
 *
 * `role="code"` renders a `<code>` element on web; native keeps a plain Text.
 */
export const Code = forwardRef<RNText, CodeProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        role="code"
        // Android ignores horizontal padding on a nested (inline) Text — the
        // background still reads as a code fragment there.
        className={`font-mono bg-highlight rounded-xs px-xxs py-px select-auto ${className ?? ""}`}
        {...props}
      />
    );
  },
);
