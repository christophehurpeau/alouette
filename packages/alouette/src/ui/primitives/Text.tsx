import type { ReactNode, Ref } from "react";
import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import type { Accent } from "../../core/AlouetteConfig";
import { twMerge } from "../../core/twMerge";
import { AccentScope } from "../containers/AccentScope";

export interface TextProps extends RNTextProps {
  accent?: Accent;
  ref?: Ref<RNText>;
}

export function Text({ className, accent, ...props }: TextProps): ReactNode {
  return (
    <AccentScope accent={accent}>
      <RNText
        className={twMerge("font-body text-sharp", className)}
        {...props}
      />
    </AccentScope>
  );
}

export type ParagraphProps = TextProps;

/**
 * A block of prose — `Text` with `role="paragraph"` (a real `<p>` on web) and
 * selectable content (`select-auto`, which native Text is not by default).
 *
 * It is the wrapper for sentences, never for a single value: a URL, a code
 * fragment, a label, a stat or a heading is a `Text` (or `Code` /
 * `ExternalLinkText` / `CodeBlock`), even when it stands alone on its line.
 * Reach for `Paragraph` when the content is one or more sentences the reader
 * may want to select and copy.
 *
 * Its children are inline only — `Text`, `Code`, `ExternalLinkText`. A `<p>`
 * takes no block content, so nesting another `Paragraph` or a `View` inside
 * one is invalid DOM on web.
 */
export function Paragraph({ className, ...props }: ParagraphProps): ReactNode {
  return (
    <Text
      role="paragraph"
      className={twMerge("select-auto", className)}
      {...props}
    />
  );
}
