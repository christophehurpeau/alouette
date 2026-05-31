import { Children, type ReactNode } from "react";
import { Platform } from "react-native";
import { tv } from "tailwind-variants";
import { View } from "../primitives/View";
import { VStack } from "../stacks/stacks";
import { StoryTitle } from "./StoryTitle";

const rowVariants = tv(
  {
    base: "flex-col",
    variants: {
      breakpoint: {
        small: "sm:flex-row sm:mb-xl",
        medium: "md:flex-row md:mb-xl",
      },
      flexWrap: { true: "" },
    },
    compoundVariants: [
      { breakpoint: "small", flexWrap: true, class: "sm:flex-wrap sm:gap-m" },
      { breakpoint: "medium", flexWrap: true, class: "md:flex-wrap md:gap-m" },
    ],
  },
  { twMerge: false },
);

const itemVariants = tv(
  {
    base: "pt-m pb-xl",
    variants: {
      breakpoint: {
        small: "sm:pt-0 sm:pb-0 sm:my-xxs shrink",
        medium: "md:pt-0 md:pb-0 md:my-xxs shrink",
      },
      flexWrap: {
        true: "",
        false: "",
      },
      loose: {
        true: "",
        false: "grow",
      },
    },
    compoundVariants: [
      { breakpoint: "small", flexWrap: false, class: "sm:basis-0" },
      { breakpoint: "medium", flexWrap: false, class: "md:basis-0" },
    ],
    defaultVariants: {
      flexWrap: false,
    },
  },
  { twMerge: false },
);

export interface StoryGridRowProps {
  children: NonNullable<ReactNode>;
  breakpoint?: "medium" | "small";
  flexWrap?: boolean;
  loose?: boolean;
}

function StoryGridRow({
  children,
  breakpoint = "small",
  flexWrap,
  loose,
}: StoryGridRowProps): ReactNode {
  return (
    <View className={rowVariants({ breakpoint, flexWrap })}>
      {Children.map(children, (child) => (
        <View className={itemVariants({ breakpoint, flexWrap, loose })}>
          {child}
        </View>
      ))}
    </View>
  );
}

export interface StoryGridColProps {
  children: NonNullable<ReactNode>;
  title?: string;
  platform?: "all" | "native" | "web";
}

function StoryGridCol({
  title,
  children,
  platform = "all",
}: StoryGridColProps): ReactNode {
  const isNative = Platform.OS === "ios" || Platform.OS === "android";

  if (Platform.OS === "web" && platform === "native") {
    return null;
  }
  if (isNative && platform === "web") {
    return null;
  }

  return title ? (
    <VStack>
      <StoryTitle level={4} numberOfLines={1}>
        {title}
      </StoryTitle>
      {children}
    </VStack>
  ) : (
    children
  );
}

export const StoryGrid = {
  Row: StoryGridRow,
  Col: StoryGridCol,
};
