import { createTamagui } from "@tamagui/core";
// eslint-disable-next-line import/extensions
import { animations } from "./config/animations";
import type { AlouetteColorScales } from "./config/colorScales.ts";
import type { AlouetteFontsOptions } from "./config/createAlouetteFonts.ts";
import { createAlouetteFonts } from "./config/createAlouetteFonts.ts";
import type { createAlouetteTokens } from "./config/createAlouetteTokens.ts";
import { media } from "./config/media.ts";
import type { createAlouetteThemes } from "./config/themes.ts";

export { createAlouetteTokens } from "./config/createAlouetteTokens.ts";

export interface AlouetteTamaguiOptions {
  fonts?: AlouetteFontsOptions;
}

export {
  createColorTheme,
  createAlouetteThemes,
  type FullTheme,
} from "./config/themes.ts";

export {
  defaultColorScales,
  createColorScale,
  type AlouetteColorScales,
  type AlouetteColorScale,
} from "./config/colorScales.ts";

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
