import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import { playwright } from "@vitest/browser-playwright";
import { URL, fileURLToPath } from "url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const extensions = [
  ".mjs",
  ".js",
  ".mts",
  ".ts",
  ".jsx",
  ".tsx",
  ".json",
].flatMap((extension) => [".web" + extension, extension]);

export default defineConfig({
  define: {
    "process.env.STORYBOOK": "true",
    "process.env.EXPO_PUBLIC_STORYBOOK_ENABLED": "true",
    "process.env.EXPO_OS": JSON.stringify("web"),
  },
  // Tailwind runs through the @tailwindcss/vite plugin here; the inline (empty)
  // postcss config stops Vite auto-loading postcss.config.mjs (which exists for
  // Expo/Metro) and double-processing Tailwind.
  css: {
    postcss: {},
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".web.js": "jsx",
        ".js": "jsx",
        ".web.ts": "ts",
        ".web.mjs": "js",
        ".web.mts": "ts",
      },
    },
    holdUntilCrawlEnd: true,
    exclude: ["alouette-icons"],
  },
  resolve: {
    extensions,
    alias: {
      alouette: fileURLToPath(new URL("../alouette/src", import.meta.url)),
    },
  },
  plugins: [
    svgr({
      include: "**/*.svg",
      svgrOptions: {
        exportType: "named",
      },
    }),
    // vite-plugin-rnw (react-native -> react-native-web alias, flow strip, JSX,
    // and the NativeWind className transform) is wired by the
    // @storybook/react-native-web-vite framework in .storybook/main.ts, where the
    // NativeWind Babel preset is also passed and scoped to first-party code.
    // Tailwind utilities are compiled here by the @tailwindcss/vite plugin from
    // global.css.
    tailwindcss(),
  ],
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: fileURLToPath(new URL(".storybook", import.meta.url)),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
