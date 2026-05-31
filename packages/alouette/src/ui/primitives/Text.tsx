import { forwardRef } from "react";
import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "body-xs",
        "body-sm",
        "body-md",
        "body-lg",
        "body-xl",
        "body-xxl",
        "body-3xl",
        "heading-xs",
        "heading-sm",
        "heading-md",
        "heading-lg",
        "heading-xl",
        "heading-xxl",
        "heading-3xl",
        "mono-xs",
        "mono-sm",
        "mono-md",
        "mono-lg",
        "mono-xl",
        "mono-xxl",
        "mono-3xl",
      ],
    },
  },
});

export type TextProps = RNTextProps;

export const Text = forwardRef<RNText, TextProps>(
  ({ className, ...props }, ref) => {
    return (
      <RNText
        ref={ref}
        className={twMerge("text-sharp", className)}
        {...props}
      />
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
