import { forwardRef } from "react";
import type { Text as RNText } from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import { Text, type TextProps } from "../primitives/Text";

const storyTitleVariants = tv({
  base: "font-extrabold text-sharp",
  variants: {
    level: {
      1: "heading-xl mb-xl",
      2: "heading-lg mb-xl",
      3: "heading-md mb-m",
      4: "heading-sm mb-m",
    },
  },
  defaultVariants: {
    level: 1,
  },
});

type StoryTitleVariantProps = VariantProps<typeof storyTitleVariants>;

export interface StoryTitleProps extends TextProps, StoryTitleVariantProps {}

export const StoryTitle = forwardRef<RNText, StoryTitleProps>(
  ({ className, level, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={storyTitleVariants({ level, className })}
        {...props}
      />
    );
  },
);
