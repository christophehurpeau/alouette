import { styled } from "@tamagui/core";
import type { ReactNode } from "react";
import type { Except } from "type-fest";
import { Box } from "../containers/Box";
import { VStack } from "../primitives/stacks";
import type { VStackProps } from "../primitives/stacks";
import { StoryTitle } from "./StoryTitle";

const InternalStorySection = styled(VStack, {
  marginBottom: "$8",
  paddingHorizontal: "$4",
  marginHorizontal: "$-4",
  variants: {
    withBackground: {
      true: {
        backgroundColor: "$backgroundColor",
      },
    },
  } as const,
});

export type StorySectionProps = Except<VStackProps, "marginBottom"> & {
  title: ReactNode;
  children: ReactNode;
  level?: 1 | 2;
  withBackground?: boolean;
};

function StorySection({
  title,
  children,
  level = 1,
  withBackground,
  ...props
}: StorySectionProps): ReactNode {
  return (
    <InternalStorySection withBackground={withBackground} {...props}>
      <StoryTitle level={(level + 1) as 2 | 3}>{title}</StoryTitle>
      {children}
    </InternalStorySection>
  );
}

function SubSection({
  title,
  children,

  ...props
}: StorySectionProps): ReactNode {
  return (
    <InternalStorySection marginBottom="$4" {...props}>
      <StoryTitle level={3}>{title}</StoryTitle>
      {children}
    </InternalStorySection>
  );
}

export interface StoryProps {
  documentation?: NonNullable<ReactNode>;
  children?: NonNullable<ReactNode>;
}

export function Story({ documentation, children }: StoryProps): ReactNode {
  return (
    <>
      {documentation && (
        <Box
          withBorder="$2"
          borderRadius="$md"
          padding="$md"
          theme="primary"
          marginBottom="$12"
        >
          {documentation}
        </Box>
      )}
      {["light", "dark"].map((theme) => (
        <Box
          key={theme}
          theme={theme}
          backgroundColor="$backgroundColor"
          padding="$md"
        >
          {children}
        </Box>
      ))}
    </>
  );
}

Story.Section = StorySection;
Story.SubSection = SubSection;
