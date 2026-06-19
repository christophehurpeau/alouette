import { Fragment, type ReactNode } from "react";
import { Platform } from "react-native";
import type { Accent, AlouetteModeTheme } from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";
import { ScopedTheme } from "../containers/ScopedTheme";
import { Surface } from "../containers/Surface";
import { ScrollView } from "../primitives/ScrollView";
import { View } from "../primitives/View";
import { VStack } from "../stacks/stacks";
import { styled } from "../styled";
import { StoryTitle } from "./StoryTitle";

export interface StorySectionProps {
  title: ReactNode;
  children: ReactNode;
  level?: 1 | 2;
  modeTheme?: AlouetteModeTheme;
  accent?: Accent;
  withSurface?: boolean;
}

const InternalStorySection = styled(View, "-mx-l px-l");

function StorySection({
  title,
  children,
  level = 1,
  modeTheme,
  accent,
  withSurface = false,
}: StorySectionProps): ReactNode {
  const content = (
    <InternalStorySection className="pb-xl bg-screen">
      {withSurface ? (
        <Surface>
          <StoryTitle level={(level + 1) as 2 | 3}>{title}</StoryTitle>
          <VStack className="gap-m">{children}</VStack>
        </Surface>
      ) : (
        <>
          <StoryTitle level={(level + 1) as 2 | 3}>{title}</StoryTitle>
          <VStack className="gap-m">{children}</VStack>
        </>
      )}
    </InternalStorySection>
  );

  if (modeTheme) {
    return <ScopedTheme theme={modeTheme}>{content}</ScopedTheme>;
  }
  if (accent) {
    return <AccentScope accent={accent}>{content}</AccentScope>;
  }
  return content;
}

function StorySubSection({
  title,
  children,
  modeTheme,
  accent,
  withSurface = false,
}: StorySectionProps): ReactNode {
  const content = (
    <InternalStorySection className="mb-m">
      {withSurface ? (
        <Surface>
          <StoryTitle level={3}>{title}</StoryTitle>
          <VStack className="gap-m">{children}</VStack>
        </Surface>
      ) : (
        <>
          <StoryTitle level={3}>{title}</StoryTitle>
          <VStack className="gap-m">{children}</VStack>
        </>
      )}
    </InternalStorySection>
  );
  if (modeTheme) {
    return <ScopedTheme theme={modeTheme}>{content}</ScopedTheme>;
  }
  if (accent) {
    return <AccentScope accent={accent}>{content}</AccentScope>;
  }
  return content;
}

// const SimpleWebScrollView = styled(View, "h-full overflow-auto");

const ScrollWrapper = Platform.OS === "web" ? Fragment : ScrollView;

export interface StoryProps {
  documentation?: NonNullable<ReactNode>;
  children?: NonNullable<ReactNode>;
  noDarkMode?: boolean;
}

export function Story({
  documentation,
  children,
  noDarkMode,
}: StoryProps): ReactNode {
  return (
    <ScrollWrapper>
      {documentation && (
        <Surface accent="info" className="mb-xxl">
          {documentation}
        </Surface>
      )}
      {(["light", ...(noDarkMode ? [] : ["dark"])] as ("dark" | "light")[]).map(
        (mode) => (
          <ScopedTheme key={mode} theme={mode}>
            <View className="bg-screen p-l">{children}</View>
          </ScopedTheme>
        ),
      )}
    </ScrollWrapper>
  );
}

Story.Section = StorySection;
Story.SubSection = StorySubSection;

export const accents: Accent[] = [
  "brand",
  "danger",
  "info",
  "success",
  "warning",
];
