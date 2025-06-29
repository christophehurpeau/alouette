"use strict";

const withStorybook = require("@storybook/react-native/metro/withStorybook");
const { withTamagui } = require("@tamagui/metro-plugin");
const { getDefaultConfig } = require("expo/metro-config.js");
const { withExpoSvgTransformer } = require("expo-svg-transformer");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = withStorybook(
  withTamagui(withExpoSvgTransformer(defaultConfig), {
    config: "./tamagui.config.ts",
    components: ["alouette"],
  }),
  {
    enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true",
    onDisabledRemoveStorybook: true,
  },
);
