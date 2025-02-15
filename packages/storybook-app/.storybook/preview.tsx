import { Preview } from "@storybook/react";
import { AlouetteDecorator } from "alouette";
import tamaguiConfig from "../tamagui.config";
import { DocTemplate } from "./DocTemplate";

const preview: Preview = {
  tags: ["autodocs"],
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
    docs: {
      toc: true,
      page: DocTemplate,
    },
  },

  decorators: [AlouetteDecorator],
};

export default preview;
