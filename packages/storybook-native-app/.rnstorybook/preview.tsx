import type { Preview } from "@storybook/react-native";
import { AlouetteDecorator } from "alouette";
import { themeVariables } from "alouette/defaultThemeVariables";
// @ts-expect-error missing css types
import "./preview.css";

// This Storybook also runs on web (Expo web / react-native-web), so it carries
// the same alouette parameters and globals as .storybook/preview.tsx. sRGB is the
// initial global everywhere: it is what an actual device can render, since React
// Native's color parser has no oklch().
const preview: Preview = {
  decorators: [AlouetteDecorator],

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
  },

  parameters: {
    alouette: {
      themeVariables: themeVariables,
    },
    backgrounds: {
      options: {
        light: {
          name: "light",
          value: "#ffffff",
        },

        dark: {
          name: "dark",
          value: "#000000",
        },
      },
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {},
  },

  initialGlobals: {
    colorFormat: "srgb",
    backgrounds: {
      value: "light",
    },
  },
};

export default preview;
