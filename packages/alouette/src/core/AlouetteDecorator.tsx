/* eslint-disable react/destructuring-assignment */
import type { Decorator } from "@storybook/react-vite";
import { useEffect } from "react";
import { Uniwind } from "uniwind";
import { AlouetteProvider } from "./AlouetteProvider";
import { SafeAreaProvider } from "./SafeAreaProvider";

// eslint-disable-next-line react/function-component-definition -- not a component
export const AlouetteDecorator: Decorator = (storyFn, context) => {
  const theme: "dark" | "light" =
    context.globals.backgrounds?.value === "#000000" ? "dark" : "light";

  useEffect(() => {
    Uniwind.setTheme(theme);
  }, [theme]);

  return (
    <SafeAreaProvider>
      <AlouetteProvider defaultTheme={theme}>
        {storyFn(context)}
      </AlouetteProvider>
    </SafeAreaProvider>
  );
};
