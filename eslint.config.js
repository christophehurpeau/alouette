import pobTypescriptReactConfig, {
  applyTs,
} from "@pob/eslint-config-typescript-react";

const { compat, configs: pobTypescriptReactConfigs } = pobTypescriptReactConfig(
  import.meta.url,
);

export default [
  {
    ignores: [
      "**/.tamagui/**",
      "**/.storybook/**",
      "**/vite.config.ts",
      "**/tamagui.config.ts",
    ],
  },
  ...pobTypescriptReactConfigs.node,
  ...pobTypescriptReactConfigs.allowUnsafe,
  ...pobTypescriptReactConfigs.allowImplicitReturnType,
  ...applyTs({
    mode: "directory",
    files: ["packages/storybook-app/"],
    configs: [
      ...pobTypescriptReactConfigs.app,
      ...pobTypescriptReactConfigs["react-native-web"],
      ...compat.config({
        extends: ["plugin:storybook/recommended"],
      }),
    ],
  }),
];
