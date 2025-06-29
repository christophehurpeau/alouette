import type { ReactNode } from "react";
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
    <ScrollView theme="light" backgroundColor="#fff" padding="$4">
      <StoryTitle level={1}>{title}</StoryTitle>
      {children}
    </ScrollView>
  );
}
