"use strict";

const {
  withStorybook,
} = require("@storybook/react-native/metro/withStorybook");
const { getDefaultConfig } = require("expo/metro-config.js");
const { withExpoSvgTransformer } = require("expo-svg-transformer");
const { withUniwindConfig } = require("uniwind/metro");

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

module.exports = withUniwindConfig(
  withStorybook(withExpoSvgTransformer(defaultConfig), {
    enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true",
  }),
  {
    cssEntryFile: "./src/global.css",
    dtsFile: "./src/uniwind-types.d.ts",
    extraThemes: [
      "light_brand",
      "dark_brand",
      "light_info",
      "dark_info",
      "light_success",
      "dark_success",
      "light_warning",
      "dark_warning",
      "light_danger",
      "dark_danger",
    ],
  },
);
