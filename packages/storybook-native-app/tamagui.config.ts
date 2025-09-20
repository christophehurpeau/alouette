import { isWeb } from "@tamagui/core";
import {
  createAlouetteTamagui,
  createAlouetteThemes,
  createAlouetteTokens,
  defaultColorScales,
} from "../alouette/src/createAlouetteTamagui";

const tokens = createAlouetteTokens(defaultColorScales);
const config = createAlouetteTamagui(tokens, createAlouetteThemes(tokens), {
  fonts: {
    monospaceFontFamily: isWeb ? "Chivo Mono" : "ChivoMono",
  },
});

export type AppConfig = typeof config;

declare module "@tamagui/core" {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
