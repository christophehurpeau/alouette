// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
import type { StorybookConfig } from "@storybook/react-native-web-vite";

// NativeWind's Babel preset is published as ESM that calls `require()` inside the
// preset body, which throws in Vite's ESM config context. Load the CommonJS
// build via createRequire so those internal `require()` calls resolve.
const require = createRequire(import.meta.url);
const nativewindBabelPreset = require("nativewind/babel").default;

const config: StorybookConfig = {
  stories: ["../../alouette/src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {
      pluginReactOptions: {
        babel: {
          // The NativeWind preset rewrites `react-native` / `react-native-web`
          // primitive imports to the className-aware `react-native-css/components`
          // wrappers. vite-plugin-rnw keeps react-native(-web) and react-native-css
          // in its transform set (their negative-lookahead exclude matches anything
          // starting with "react-native"), so the rewriting must be scoped to
          // first-party code only — otherwise it rewrites react-native-web's own
          // index.js and react-native-css's components into circular self-imports
          // whose base component is undefined at module init (copyComponentProperties
          // throws on Object.entries). Dev hides it; the production bundle's static
          // init order surfaces it.
          overrides: [
            {
              exclude: /node_modules/,
              presets: [nativewindBabelPreset],
            },
          ],
        },
      },
    },
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen",
  },
  docs: {
    defaultName: "Documentation",
  },
};

export default config;
