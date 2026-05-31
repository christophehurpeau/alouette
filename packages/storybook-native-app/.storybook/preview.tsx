// @ts-expect-error missing css types
import "../src/global.css";
import { Preview } from "@storybook/react-vite";
import { AlouetteDecorator } from "alouette";
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
    layout: "fullscreen",
    docs: {
      toc: true,
      page: DocTemplate,
    },
  },

  decorators: [AlouetteDecorator],
};

export default preview;
