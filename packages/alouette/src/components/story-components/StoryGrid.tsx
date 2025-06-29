import type { ReactNode } from "react";
import { Children } from "react";
import { Platform } from "react-native";
import { View } from "../primitives/View";
import { VStack } from "../primitives/stacks";
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
          marginVertical: "$-1",
          marginBottom: "$4",
          flexWrap: flexWrap ? "wrap" : undefined,
          gap: flexWrap ? "$xs" : undefined,
        },
      }}
    >
      {Children.map(children, (child) => (
        <View
          paddingTop="$2"
          paddingBottom="$4"
          {...{
            [`$${breakpoint}`]: {
              flexGrow: 1,
              flexBasis: flexWrap ? undefined : 0,
              paddingTop: 0,
              paddingBottom: 0,
              marginVertical: "$2",
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
