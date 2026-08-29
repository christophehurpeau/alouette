"use strict";

const { withAlouetteConfig } = require("alouette/metro.cjs");
const { getDefaultConfig } = require("expo/metro-config.js");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  // Resolve the workspace library to its sources, so the demo picks up edits
  // without a build step.
  if (moduleName === "alouette") {
    return {
      filePath: require.resolve("../alouette/src/index.ts"),
      type: "sourceFile",
    };
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withAlouetteConfig(defaultConfig);
