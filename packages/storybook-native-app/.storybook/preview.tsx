import { Preview } from "@storybook/react-vite";
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
    layout: "fullscreen",
    docs: {
      toc: true,
      page: DocTemplate,
    },
  },

  decorators: [AlouetteDecorator],
};

export default preview;
