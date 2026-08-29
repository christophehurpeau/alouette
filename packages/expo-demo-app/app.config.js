export default ({ config }) => ({
  ...config,
  name: "alouette-demo",
  slug: "alouette-demo",
  scheme: "alouette-demo",
  version: "1.0.0",
  orientation: "default",
  newArchEnabled: true,
  plugins: ["expo-router"],
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  web: {
    bundler: "metro",
  },
});
