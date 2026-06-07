import type { ReactNode } from "react";
import { ScopedTheme } from "../containers/ScopedTheme";
import { ScrollView } from "../primitives/ScrollView";
import { StoryTitle } from "./StoryTitle";

export interface StoryContainerProps {
  title: ReactNode;
  children: NonNullable<ReactNode>;
}

export function StoryContainer({
  title,
  children,
}: StoryContainerProps): ReactNode {
  return (
    <ScopedTheme theme="light">
      <ScrollView className="bg-white p-3xl">
        <StoryTitle level={1}>{title}</StoryTitle>
        {children}
      </ScrollView>
    </ScopedTheme>
  );
}
