/* eslint-disable react/destructuring-assignment */
import type { Decorator } from "@storybook/react-vite";
import type { TamaguiProviderProps } from "@tamagui/core";
import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { AlouetteProvider } from "./AlouetteProvider";
import { SafeAreaProvider } from "./SafeAreaProvider";

export const AlouetteTamaguiConfigContext = createContext<
  TamaguiProviderProps["config"] | null
>(null);

// eslint-disable-next-line react/function-component-definition -- not a component
export const AlouetteDecorator: Decorator = (storyFn, context) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(systemColorScheme || "light");

  useEffect(() => {
    const backgroundColor = context.globals.backgrounds?.value;
    if (backgroundColor === "#000000") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [context.globals.backgrounds?.value]);

  return (
    <SafeAreaProvider>
      <AlouetteProvider
        tamaguiConfig={context.parameters.tamaguiConfig}
        defaultTheme={theme}
      >
        <AlouetteTamaguiConfigContext.Provider
          value={context.parameters.tamaguiConfig}
        >
          {storyFn(context)}
        </AlouetteTamaguiConfigContext.Provider>
      </AlouetteProvider>
    </SafeAreaProvider>
  );
};
