export default function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { reanimated: false }]],
    plugins: ["react-native-reanimated/plugin"],
  };
}
