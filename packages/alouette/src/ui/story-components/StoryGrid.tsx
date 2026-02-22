import { View } from "@tamagui/core";
import type { ReactNode } from "react";
import { Children } from "react";
import { Platform } from "react-native";
import { VStack } from "../stacks/stacks";
import { StoryTitle } from "./StoryTitle";

export interface StoryGridRowProps {
  children: NonNullable<ReactNode>;
  breakpoint?: "medium" | "small";
  flexWrap?: boolean;
}

function StoryGridRow({
  children,
  breakpoint = "small",
  flexWrap,
}: StoryGridRowProps): ReactNode {
  return (
    <View
      flexDirection="column"
      {...{
        [`$${breakpoint}`]: {
          flexDirection: "row",
          marginBottom: "$2.0",
          flexWrap: flexWrap ? "wrap" : undefined,
          gap: flexWrap ? "$1.0" : undefined,
        },
      }}
    >
      {Children.map(children, (child) => (
        <View
          paddingTop="$1.0"
          paddingBottom="$2.0"
          {...{
            [`$${breakpoint}`]: {
              flexGrow: 1,
              flexBasis: flexWrap ? undefined : 0,
              paddingTop: 0,
              paddingBottom: 0,
              marginVertical: "$0.25",
            },
          }}
        >
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
