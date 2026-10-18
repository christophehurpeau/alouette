import type { Decorator } from "@storybook/react-vite";
import { DensityScope } from "../ui/containers/DensityScope";
import { ScopedTheme } from "../ui/containers/ScopedTheme";
import { AlouetteProvider } from "./AlouetteProvider";
import { SafeAreaProvider } from "./SafeAreaProvider";

// oxlint-disable-next-line react/function-component-definition -- not a component
export const AlouetteDecorator: Decorator = (storyFn, context) => {
  const theme: "dark" | "light" =
    context.globals.mode === "dark" ? "dark" : "light";

  const density =
    context.globals.density === "compact" ? "compact" : "comfortable";

  const themeVariables = context.parameters.alouette?.themeVariables;

  if (!themeVariables) {
    throw new Error(
      'AlouetteDecorator: missing "themeVariables" in parameters.alouette',
    );
  }

  return (
    <SafeAreaProvider>
      <AlouetteProvider themeVariables={themeVariables}>
        <ScopedTheme theme={theme}>
          <DensityScope density={density}>{storyFn(context)}</DensityScope>
        </ScopedTheme>
      </AlouetteProvider>
    </SafeAreaProvider>
  );
};
