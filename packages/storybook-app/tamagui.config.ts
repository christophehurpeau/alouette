import {
  createAlouetteTamagui,
  defaultColorScales,
} from "alouette/createAlouetteTamagui";

const config = createAlouetteTamagui({ colorScales: defaultColorScales });

export type AppConfig = typeof config;

declare module "@tamagui/core" {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
