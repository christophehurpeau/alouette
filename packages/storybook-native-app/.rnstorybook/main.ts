import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import type { StorybookConfig } from "@storybook/react-native";

const main: StorybookConfig = {
  stories: ["../../alouette/src/**/*.stories.@(ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-ondevice-notes"),
    getAbsolutePath("@storybook/addon-ondevice-controls"),
    getAbsolutePath("@storybook/addon-ondevice-backgrounds"),
    getAbsolutePath("@storybook/addon-ondevice-actions"),
  ],
};

export default main;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
