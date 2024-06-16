import { Preview } from "@storybook/react";
import { AlouetteProvider } from "alouette";
import tamaguiConfig from "../tamagui.config";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => (
      <AlouetteProvider tamaguiConfig={tamaguiConfig}>
        {Story()}
      </AlouetteProvider>
    ),
  ],
};

export default preview;
