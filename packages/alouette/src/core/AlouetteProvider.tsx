import type { TamaguiProviderProps } from "@tamagui/core";
import { TamaguiProvider } from "@tamagui/core";
import type { ReactNode } from "react";

export interface AlouetteProviderProps {
  children: ReactNode;
  tamaguiConfig: TamaguiProviderProps["config"];
}

export function AlouetteProvider({
  children,
  tamaguiConfig,
}: AlouetteProviderProps): ReactNode {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      {children}
    </TamaguiProvider>
  );
}
