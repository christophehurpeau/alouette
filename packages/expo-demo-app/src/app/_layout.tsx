import {
  ChivoMono_700Bold as ChivoMonoBold,
  ChivoMono_800ExtraBold as ChivoMonoExtraBold,
  ChivoMono_400Regular as ChivoMonoRegular,
} from "@expo-google-fonts/chivo-mono";
import {
  Sora_700Bold as SoraBold,
  Sora_800ExtraBold as SoraExtraBold,
  Sora_400Regular as SoraRegular,
  useFonts,
} from "@expo-google-fonts/sora";
import { AlouetteProvider, SafeAreaProvider } from "alouette";
import { themeVariables } from "alouette/defaultThemeVariables";
import { Stack } from "expo-router";
import type { ReactNode } from "react";

export default function RootLayout(): ReactNode {
  const [fontsLoaded, errorFonts] = useFonts({
    SoraRegular,
    SoraBold,
    SoraExtraBold,
    ChivoMonoRegular,
    ChivoMonoBold,
    ChivoMonoExtraBold,
  });
  if (errorFonts) {
    throw errorFonts;
  }
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AlouetteProvider themeVariables={themeVariables}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: true, title: "With header" }}
          />
          <Stack.Screen name="no-header" options={{ headerShown: false }} />
        </Stack>
      </AlouetteProvider>
    </SafeAreaProvider>
  );
}
