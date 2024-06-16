import type { ReactNode } from "react";
import { styled } from "@tamagui/core";
import type { Except } from "type-fest";
import type { VStackProps } from "../primitives/stacks";
import { VStack } from "../primitives/stacks";
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
  withBackground,
  ...props
}: StorySectionProps): ReactNode {
  return (
    <InternalStorySection
      marginBottom="$4"
      withBackground={withBackground}
      {...props}
    >
      <StoryTitle level={3}>{title}</StoryTitle>
      {children}
    </InternalStorySection>
  );
}

export interface StoryProps {
  preview?: NonNullable<ReactNode>;
  children?: NonNullable<ReactNode>;
}

export function Story({ preview, children }: StoryProps): ReactNode {
  return (
    <>
      {preview && (
        <StorySection title="Preview" paddingBottom="$12">
          {preview}
        </StorySection>
      )}
      {children}
    </>
  );
}

Story.Section = StorySection;
Story.SubSection = SubSection;
