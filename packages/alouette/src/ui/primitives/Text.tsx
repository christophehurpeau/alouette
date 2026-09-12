import { forwardRef } from "react";
import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { extendTailwindMerge } from "tailwind-merge";
import type { Accent } from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-family": [
        "font-body",
        "font-body-bold",
        "font-body-extrabold",
        "font-heading",
        "font-heading-bold",
        "font-heading-extrabold",
        "font-mono",
        "font-mono-bold",
        "font-mono-extrabold",
      ],
    },
  },
});

export interface TextProps extends RNTextProps {
  accent?: Accent;
}

export const Text = forwardRef<RNText, TextProps>(
  ({ className, accent, ...props }, ref) => {
    return (
      <AccentScope accent={accent}>
        <RNText
          ref={ref}
          className={twMerge("font-body text-sharp", className)}
          {...props}
        />
      </AccentScope>
    );
  },
);

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
 * takes no block content, so nesting another `Paragraph`, a `View` or a
 * `Surface` inside one is invalid DOM on web.
 */
export const Paragraph = forwardRef<RNText, ParagraphProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        role="paragraph"
        className={`select-auto ${className ?? ""}`}
        {...props}
      />
    );
  },
);
