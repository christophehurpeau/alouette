// @ts-expect-error missing css types
import "../src/global.css";
import { Decorator, Preview } from "@storybook/react-vite";
import { AlouetteDecorator } from "alouette";
import { themeVariables } from "alouette/defaultThemeVariables";
// @ts-expect-error missing css types for vite inline import
import oklchPaletteCss from "alouette/default-palette-oklch.css?inline";
import type { ReactNode } from "react";
import { useLayoutEffect } from "react";
import { DocTemplate } from "./DocTemplate";

// The web half of the `colorFormat` global. Web theming is CSS classes, so the
// color space is decided by which palette CSS applies: the wide-gamut overlay
// ships as its own stylesheet, held here and enabled/disabled from the toolbar.
// Appended to <head> after global.css, hence last in `@layer theme` — it wins
// over the hex blocks of default-palette.css, and still loses to the unlayered
// utilities. `AlouetteDecorator` swaps the themeVariables map: the native half.
// Vite-only (`?inline`), so the Expo-web preview stays sRGB. Inline rather than
// a `<link>` because a link's `disabled` is unreliable until its sheet loads,
// whereas a style element's sheet exists as soon as it is in the document.
const oklchPaletteStyle = document.createElement("style");
oklchPaletteStyle.id = "alouette-oklch-palette";
oklchPaletteStyle.textContent = oklchPaletteCss;
document.head.append(oklchPaletteStyle);
oklchPaletteStyle.disabled = true;

interface OklchPaletteProps {
  colorFormat: unknown;
  children: ReactNode;
}

function OklchPalette({ colorFormat, children }: OklchPaletteProps): ReactNode {
  useLayoutEffect(() => {
    oklchPaletteStyle.disabled = colorFormat !== "oklch";
  }, [colorFormat]);

  return children;
}

const OklchPaletteDecorator: Decorator = (storyFn, context) => (
  <OklchPalette colorFormat={context.globals.colorFormat}>
    {storyFn(context)}
  </OklchPalette>
);

const preview: Preview = {
  tags: ["autodocs"],
  globalTypes: {
    colorFormat: {
      description:
        "Color space of the theme variables: sRGB hex is what native renders, OKLCH adds display-p3 chroma headroom on web.",
      toolbar: {
        title: "Color",
        icon: "paintbrush",
        items: [
          { value: "srgb", title: "sRGB (hex)" },
          { value: "oklch", title: "OKLCH (P3)" },
        ],
        dynamicTitle: true,
      },
    },

    mode: {
      description: "Light or dark theme mode.",
      toolbar: {
        title: "Mode",
        icon: "sun",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    colorFormat: "srgb",
  },
  parameters: {
    alouette: {
      themeVariables: themeVariables,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
    docs: {
      toc: true,
      page: DocTemplate,
    },
  },

  decorators: [OklchPaletteDecorator, AlouetteDecorator],
};

export default preview;
