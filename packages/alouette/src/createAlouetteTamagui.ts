import { createTamagui } from "@tamagui/core";
import { animations } from "./config/animations";
import type { AlouetteColorScales } from "./config/colorScales";
import type { AlouetteFontsOptions } from "./config/createAlouetteFonts";
import { createAlouetteFonts } from "./config/createAlouetteFonts";
import type { AlouetteTokensOptions } from "./config/createAlouetteTokens";
import { createAlouetteTokens } from "./config/createAlouetteTokens";
import { media } from "./config/media";
import { createAlouetteThemes } from "./config/themes";

interface AlouetteTamaguiOptions {
  colorScales: AlouetteColorScales;
  fonts?: AlouetteFontsOptions;
  tokens?: AlouetteTokensOptions;
}

export { defaultColorScales, createColorScale } from "./config/colorScales";

export const createAlouetteTamagui = (options: AlouetteTamaguiOptions) => {
  const tokens = createAlouetteTokens(options.colorScales, options.tokens);
  return createTamagui({
    fonts: createAlouetteFonts(options.fonts),
    tokens,
    themes: createAlouetteThemes(tokens),
    media,
    animations,
    settings: {
      allowedStyleValues: "strict",
      autocompleteSpecificTokens: true,
    },
    components: ["alouette"],
  } as const);
};
