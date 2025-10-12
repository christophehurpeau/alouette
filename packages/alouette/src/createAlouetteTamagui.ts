import { createTamagui } from "@tamagui/core";
import { animations } from "./config/animations";
import type { AlouetteColorScales } from "./config/colorScales";
import type { AlouetteFontsOptions } from "./config/createAlouetteFonts";
import { createAlouetteFonts } from "./config/createAlouetteFonts";
import type { createAlouetteTokens } from "./config/createAlouetteTokens";
import { media } from "./config/media";
import type { createAlouetteThemes } from "./config/themes";

export { createAlouetteTokens } from "./config/createAlouetteTokens";

export interface AlouetteTamaguiOptions {
  fonts?: AlouetteFontsOptions;
}

export {
  createColorTheme,
  createAlouetteThemes,
  type FullTheme,
} from "./config/themes";

export {
  createColorScale,
  type AlouetteColorIntent,
  type AlouetteColorScales,
  type AlouetteColorScale,
} from "./config/colorScales";

export { defaultColorScales } from "./config/defaultColorScales";

export const createAlouetteTamagui = <
  const ColorScales extends AlouetteColorScales,
  const Tokens extends ReturnType<typeof createAlouetteTokens<ColorScales>>,
  const Themes extends ReturnType<typeof createAlouetteThemes<ColorScales>>,
>(
  tokens: Tokens,
  themes: Themes,
  options: AlouetteTamaguiOptions = {},
) => {
  return createTamagui({
    fonts: createAlouetteFonts(options.fonts),
    tokens,
    themes,
    media,
    animations,
    settings: {
      allowedStyleValues: "somewhat-strict-web",
      autocompleteSpecificTokens: "except-special",
    },
    components: ["alouette"],
  } as const);
};
