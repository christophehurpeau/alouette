import type { Decorator } from "@storybook/react-vite";
import { StoryContainer } from "./StoryContainer.tsx";

// eslint-disable-next-line react/function-component-definition -- not a component, it's a decorator for storybook.
export const StoryDecorator: Decorator = (storyFn, { name, container }) => {
  if (container === false) return storyFn();
  return <StoryContainer title={name}>{storyFn()}</StoryContainer>;
};
