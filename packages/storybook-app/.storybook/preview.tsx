import { Preview } from "@storybook/react";
import { AlouetteDecorator } from "alouette";
import tamaguiConfig from "../tamagui.config";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    tamaguiConfig,
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#000000",
        },
      ],
    },
  },

  decorators: [AlouetteDecorator],
};

export default preview;
