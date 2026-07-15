// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import pobTypescriptReactConfig, {
  applyTs,
} from "@pob/eslint-config-typescript-react";
// import checkPackageDependenciesEslintPlugin from "check-package-dependencies/eslint-plugin";
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
      "**/vitest.config.ts",
      "**/tamagui.config.ts",
      "**/alouette-icons/lib/**",
      "**/scripts/**",
      "**/.design-sync/**",
      "**/.ds-sync/**",
      "**/ds-bundle/**",
    ],
  },
  ...pobTypescriptReactConfigs.node,
  ...pobTypescriptReactConfigs.allowUnsafe,
  ...pobTypescriptReactConfigs.allowImplicitReturnType,
  ...applyTs({
    mode: "directory",
    files: ["packages/storybook-app/"],
    configs: [
      {
        settings: {
          "check-package-dependencies": {
            isLibrary: false,
          },
        },
      },
      ...pobTypescriptReactConfigs.app,
      ...pobTypescriptReactConfigs["react-native-web"],
      // ...compat.config({
      //   extends: ["plugin:storybook/recommended"],
      // }),
    ],
  }),
  {
    files: ["**/*.stories.{ts,tsx}"],
    settings: {
      "import-x/core-modules": ["storybook", "storybook/test"],
    },
  },
  {
    files: ["**/*.test.{ts,tsx}"],
    rules: {
      // Test tooling (vitest, @testing-library) lives in the root devDependencies
      // and is run from the workspace root, so check the root package.json too.
      "import-x/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          packageDir: [
            import.meta.dirname,
            `${import.meta.dirname}/packages/alouette`,
          ],
        },
      ],
      "import-x/extensions": [
        "error",
        "always",
        {
          ignorePackages: true,
          pattern: {
            js: "always",
            cjs: "always",
            mjs: "always",
            cts: "always",
            mts: "always",
            ts: "always",
          },
        },
      ],
    },
  },
  ...storybook.configs["flat/recommended"],
  checkPackageDependenciesEslintPlugin.configs["recommended-library"],
  {
    files: ["**/storybook-native-app/package.json"],
    rules: {
      "check-package-dependencies/direct-duplicate-dependencies": [
        "error",
        {
          onlyWarnsFor: {
            vite: ["lightningcss"],
            "vite-plugin-rnw": ["@vitejs/plugin-react"],
          },
        },
      ],
      "check-package-dependencies/direct-peer-dependencies": [
        "error",
        {
          onlyWarnsFor: {
            "vite-plugin-rnw": ["typescript"],
          },
        },
      ],
    },
  },
];
