import type { Preview } from "@storybook/react-native";
import { AlouetteDecorator } from "alouette";
// @ts-expect-error missing css types
import "./preview.css";

const preview: Preview = {
  decorators: [AlouetteDecorator],

  parameters: {
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
    backgrounds: {
      value: "light",
    },
  },
};

export default preview;
