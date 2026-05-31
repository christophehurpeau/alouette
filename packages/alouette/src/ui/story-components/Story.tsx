import { Fragment, type ReactNode } from "react";
import { Platform } from "react-native";
import { ScopedTheme } from "uniwind";
import type {
  AlouetteModeTheme,
  SemanticRole,
} from "../../core/AlouetteConfig";
import { SemanticScope } from "../containers/SemanticScope";
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
  /**
   * Optional uniwind theme name to scope this section to (e.g. "light_brand").
   * Full theme name (e.g. "light_brand"). No automatic light/dark composition —
   * consumers must pass the full name.
   */
  modeTheme?: AlouetteModeTheme;
  semanticRole?: SemanticRole;
  withSurface?: boolean;
}

const InternalStorySection = styled(View, "-mx-l px-l");

function StorySection({
  title,
  children,
  level = 1,
  modeTheme,
  semanticRole,
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
  if (semanticRole) {
    return <SemanticScope semanticRole={semanticRole}>{content}</SemanticScope>;
  }
  return content;
}

function StorySubSection({
  title,
  children,
  modeTheme,
  semanticRole,
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
  if (semanticRole) {
    return <SemanticScope semanticRole={semanticRole}>{content}</SemanticScope>;
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
        <Surface semanticRole="info" className="mb-xxl">
          {documentation}
        </Surface>
      )}
      {(["light", ...(noDarkMode ? [] : ["dark"])] as const).map((mode) => (
        <ScopedTheme key={mode} theme={mode}>
          <View className="bg-screen p-l">{children}</View>
        </ScopedTheme>
      ))}
    </ScrollWrapper>
  );
}

Story.Section = StorySection;
Story.SubSection = StorySubSection;

export const semanticRoles: SemanticRole[] = [
  "brand",
  "danger",
  "info",
  "success",
  "warning",
];
