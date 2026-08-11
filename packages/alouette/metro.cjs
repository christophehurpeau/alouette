"use strict";

const { withNativewind } = require("nativewind/metro");

exports.withAlouetteConfig = (metroConfig, options) =>
  withNativewind(metroConfig, {
    ...options,
  });
