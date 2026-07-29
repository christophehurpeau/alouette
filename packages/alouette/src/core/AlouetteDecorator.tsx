/* eslint-disable react/destructuring-assignment */
import type { Decorator } from "@storybook/react-vite";
import { ScopedTheme } from "../ui/containers/ScopedTheme";
import { AlouetteProvider } from "./AlouetteProvider";
import { SafeAreaProvider } from "./SafeAreaProvider";

// eslint-disable-next-line react/function-component-definition -- not a component
export const AlouetteDecorator: Decorator = (storyFn, context) => {
  const theme: "dark" | "light" =
    context.globals.backgrounds?.value === "#000000" ? "dark" : "light";

  const themeVariables = context.parameters.alouette?.themeVariables;

  if (!themeVariables) {
    throw new Error(
      "AlouetteDecorator: missing themeVariables in parameters.alouette",
    );
  }

  return (
    <SafeAreaProvider>
      <AlouetteProvider themeVariables={themeVariables}>
        <ScopedTheme theme={theme}>{storyFn(context)}</ScopedTheme>
      </AlouetteProvider>
    </SafeAreaProvider>
  );
};
