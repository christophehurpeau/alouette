// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import pobTypescriptReactConfig, {
  applyTs,
} from "@pob/eslint-config-typescript-react";
import checkPackageDependenciesEslintPlugin from "check-package-dependencies/eslint-plugin";
import storybook from "eslint-plugin-storybook";

const { configs: pobTypescriptReactConfigs } = pobTypescriptReactConfig();

export default [
  {
    ignores: [
      "**/.tamagui/**",
      "**/.storybook/**",
      "**/storybook-static/**",
      "**/.rnstorybook/**",
      "**/vite.config.ts",
      "**/tamagui.config.ts",
      "**/alouette-icons/lib/**",
    ],
  },
  ...pobTypescriptReactConfigs.node,
  ...pobTypescriptReactConfigs.allowUnsafe,
  ...pobTypescriptReactConfigs.allowImplicitReturnType,
  checkPackageDependenciesEslintPlugin.configs["recommended-library"],
  ...applyTs({
    mode: "directory",
    files: ["packages/storybook-app/"],
    configs: [
      ...pobTypescriptReactConfigs.app,
      ...pobTypescriptReactConfigs["react-native-web"],
      // ...compat.config({
      //   extends: ["plugin:storybook/recommended"],
      // }),
    ],
  }),
  ...storybook.configs["flat/recommended"],
];
