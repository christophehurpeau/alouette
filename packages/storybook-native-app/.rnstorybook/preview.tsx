import type { Preview } from "@storybook/react-native";
import { AlouetteDecorator } from "alouette";
import tamaguiConfig from "../tamagui.config";

const preview: Preview = {
  decorators: [AlouetteDecorator],

  parameters: {
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
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      // matchers: {
      //   color: /(background|color)$/i,
      //   date: /Date$/,
      // },
    },
    tamaguiConfig,
  },
};

export default preview;
