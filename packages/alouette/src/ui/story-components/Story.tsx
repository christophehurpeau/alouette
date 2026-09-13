import type { ReactNode } from "react";
import type {
  Accent,
  AccentOrNeutral,
  AlouetteModeTheme,
} from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";
import { Box } from "../containers/Box";
import { ScopedTheme } from "../containers/ScopedTheme";
import { ScrollView } from "../primitives/ScrollView";
import { View } from "../primitives/View";
import { styled } from "../styled";
import { StoryTitle } from "./StoryTitle";

export interface StorySectionProps {
  title: ReactNode;
  children: ReactNode;
  level?: 1 | 2;
  modeTheme?: AlouetteModeTheme;
  accent?: AccentOrNeutral;
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
        <Box className="surface">
          <StoryTitle level={(level + 1) as 2 | 3}>{title}</StoryTitle>
          <View className="gap-m">{children}</View>
        </Box>
      ) : (
        <>
          <StoryTitle level={(level + 1) as 2 | 3}>{title}</StoryTitle>
          <View className="gap-m">{children}</View>
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
        <Box className="surface">
          <StoryTitle level={3}>{title}</StoryTitle>
          <View className="gap-m">{children}</View>
        </Box>
      ) : (
        <>
          <StoryTitle level={3}>{title}</StoryTitle>
          <View className="gap-m">{children}</View>
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
    <ScrollView>
      {documentation && (
        <Box accent="info" className="surface mb-xxl">
          {documentation}
        </Box>
      )}
      {(["light", ...(noDarkMode ? [] : ["dark"])] as ("dark" | "light")[]).map(
        (mode) => (
          <ScopedTheme key={mode} theme={mode}>
            <View className="bg-screen px-l">{children}</View>
          </ScopedTheme>
        ),
      )}
    </ScrollView>
  );
}

Story.Section = StorySection;
Story.SubSection = StorySubSection;

export const accentsWithoutNeutral: Accent[] = [
  "brand",
  "danger",
  "info",
  "success",
  "warning",
];

export const neutralAndAccents: AccentOrNeutral[] = [
  "neutral",
  ...accentsWithoutNeutral,
];
