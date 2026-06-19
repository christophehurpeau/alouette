// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
import { join, dirname } from "path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../../alouette/src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
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
