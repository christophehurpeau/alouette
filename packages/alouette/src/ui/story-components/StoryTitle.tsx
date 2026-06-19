import { forwardRef } from "react";
import type { Text as RNText } from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import { Text, type TextProps } from "../primitives/Text";

const storyTitleVariants = tv({
  base: "font-heading-extrabold text-sharp",
  variants: {
    level: {
      1: "text-4xl mb-xl",
      2: "text-3xl mb-xl",
      3: "text-2xl mb-m",
      4: "text-xl mb-m",
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
