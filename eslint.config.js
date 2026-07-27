// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import pobTypescriptReactConfig, {
  applyTs,
} from "@pob/eslint-config-typescript-react";
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
  ...pobTypescriptReactConfigs.checkPackages,
  // react-native-css (NativeWind v5's native engine) breaks at runtime with
  // lightningcss >=1.31 ("failed to deserialize Specifier"), so the app pins
  // lightningcss to 1.30.x. Vite wants ^1.32.0 and nests its own copy. This
  // intentional split would otherwise be a hard duplicate-dependency error.
  {
    files: ["**/storybook-native-app/package.json"],
    rules: {
      "check-package-dependencies/no-direct-duplicate-dependencies": [
        "error",
        {
          onlyWarnsFor: {
            vite: ["lightningcss"],
            "vite-plugin-rnw": ["@vitejs/plugin-react"],
          },
        },
      ],
      "check-package-dependencies/require-direct-peer-dependencies": [
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
