import { isWeb, styled } from "@tamagui/core";
import { Fragment } from "react";
import type { ReactNode } from "react";
import type { Except } from "type-fest";
import { Box } from "../containers/Box";
import { Surface } from "../containers/Surface";
import { ScrollView } from "../primitives/ScrollView";
import { VStack } from "../stacks/stacks";
import type { VStackProps } from "../stacks/stacks";
import { StoryTitle } from "./StoryTitle";

const InternalStorySection = styled(VStack, {
  marginBottom: "$2.0",
  marginHorizontal: "$-1.0",
  paddingHorizontal: "$1.0",
});

export type StorySectionProps = Except<VStackProps, "marginBottom"> & {
  title: ReactNode;
  children: ReactNode;
  level?: 1 | 2;
  withSurface?: boolean;
};

function StorySection({
  title,
  children,
  level = 1,
  withSurface = false,
  ...props
}: StorySectionProps): ReactNode {
  return (
    <InternalStorySection {...props}>
      <StoryTitle level={(level + 1) as 2 | 3}>{title}</StoryTitle>
      {withSurface ? (
        <Surface>{children}</Surface>
      ) : (
        <VStack gap="$1.0">{children}</VStack>
      )}
    </InternalStorySection>
  );
}

function SubSection({
  title,
  children,
  withSurface = false,
  ...props
}: StorySectionProps): ReactNode {
  return (
    <InternalStorySection marginBottom="$1.0" {...props}>
      <StoryTitle level={3}>{title}</StoryTitle>
      {withSurface ? (
        <Surface>{children}</Surface>
      ) : (
        <VStack gap="$1.0">{children}</VStack>
      )}
    </InternalStorySection>
  );
}

const ScrollViewNative = isWeb ? Fragment : ScrollView;

export interface StoryProps {
  documentation?: NonNullable<ReactNode>;
  children?: NonNullable<ReactNode>;
  noDarkTheme?: boolean;
}

export function Story({
  documentation,
  children,
  noDarkTheme,
}: StoryProps): ReactNode {
  return (
    <ScrollViewNative>
      {documentation && (
        <Surface highlight shadow="s" theme="brand" marginBottom="$3.0">
          {documentation}
        </Surface>
      )}
      {["light", ...(noDarkTheme ? [] : ["dark"])].map((theme) => (
        <Box
          key={theme}
          theme={theme}
          backgroundColor="$bg-screen"
          padding="$2.0"
        >
          {children}
        </Box>
      ))}
    </ScrollViewNative>
  );
}

Story.Section = StorySection;
Story.SubSection = SubSection;
