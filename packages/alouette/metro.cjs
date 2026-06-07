"use strict";

const { withNativewind } = require("nativewind/metro");

// NativeWind v5 discovers themes/utilities from the imported global.css and
// scans sources via @source directives — no cssEntryFile/extraThemes needed.
// The CSS entry is loaded by importing "alouette/global.css" in the app.
exports.withAlouetteConfig = (metroConfig, options) =>
  withNativewind(metroConfig, options);
