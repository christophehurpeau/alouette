import path from "node:path";
import { fileURLToPath } from "node:url";
import withStorybook from "@storybook/react-native/metro/withStorybook";
import { getDefaultConfig } from "expo/metro-config.js";

const defaultConfig = getDefaultConfig(
  path.dirname(fileURLToPath(import.meta.url)),
);

export default withStorybook(defaultConfig, {
  enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true",
  onDisabledRemoveStorybook: true,
});
