"use strict";

const {
  withStorybook,
} = require("@storybook/react-native/metro/withStorybook");
const { withAlouetteConfig } = require("alouette/metro");
const { getDefaultConfig } = require("expo/metro-config.js");
const { withExpoSvgTransformer } = require("expo-svg-transformer");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "alouette") {
    return {
      filePath: require.resolve("../alouette/src/index.ts"),
      type: "sourceFile",
    };
  }

  // Ensure you call the default resolver.
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withAlouetteConfig(
  withStorybook(withExpoSvgTransformer(defaultConfig), {
    enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true",
  }),
);
