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
