import type { ReactNode } from "react";
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

export function StoryTitle({
  className,
  level,
  ...props
}: StoryTitleProps): ReactNode {
  return (
    <Text className={storyTitleVariants({ level, className })} {...props} />
  );
}
