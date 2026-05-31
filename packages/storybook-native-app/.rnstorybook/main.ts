import type { StorybookConfig } from "@storybook/react-native";

const main: StorybookConfig = {
  stories: ["../../alouette/src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-ondevice-notes",
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-backgrounds",
    "@storybook/addon-ondevice-actions",
  ],
};

export default main;
