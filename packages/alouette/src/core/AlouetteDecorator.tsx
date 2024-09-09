import type { Decorator } from "@storybook/react";
import { AlouetteProvider } from "./AlouetteProvider";

// eslint-disable-next-line react/function-component-definition -- not a component
export const AlouetteDecorator: Decorator = (storyFn, context) => (
  // eslint-disable-next-line react/destructuring-assignment
  <AlouetteProvider tamaguiConfig={context.parameters.tamaguiConfig}>
    {storyFn(context)}
  </AlouetteProvider>
);
