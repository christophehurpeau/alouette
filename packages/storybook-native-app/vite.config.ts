import { createRequire } from "node:module";
import { URL, fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vite";
import { rnw } from "vite-plugin-rnw";
import svgr from "vite-plugin-svgr";

// NativeWind's Babel preset is published as ESM that calls `require()` inside the
// preset body, which throws in Vite's ESM config context. Load the CommonJS
// build via createRequire so those internal `require()` calls resolve.
const requireCommonjs = createRequire(import.meta.url);
const nativewindBabelPreset = requireCommonjs("nativewind/babel").default;

const extensions = [
  ".mjs",
  ".js",
  ".mts",
  ".ts",
  ".jsx",
  ".tsx",
  ".json",
].flatMap((extension) => [`.web${extension}`, extension]);

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
    rolldownOptions: {
      moduleTypes: {
        ".web.js": "jsx",
        ".js": "jsx",
        ".web.ts": "ts",
        ".web.mjs": "js",
        ".web.mts": "ts",
      },
    },
    holdUntilCrawlEnd: true,
    // The NativeWind Babel preset adds these imports while transforming, after
    // the dependency crawl: discovered mid-run, they reload the page and fail
    // the tests on a cold cache (CI).
    include: [
      "react-native-css/components/FlatList",
      "react-native-css/components/Pressable",
      "react-native-css/components/ScrollView",
      "react-native-css/components/Text",
      "react-native-css/components/TextInput",
      "react-native-css/components/View",
    ],
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
    // NativeWind v5 (react-native-css) has no Vite plugin. Its styling works via
    // a Babel transform that rewrites `react-native` / `react-native-web` imports
    // to the className-aware `react-native-css/components` wrappers — without it,
    // react-native-web's createDOMProps drops the `className` prop and stories
    // render unstyled on web. We run that transform through vite-plugin-rnw's
    // Babel hook. The Tailwind utilities themselves are compiled by the
    // @tailwindcss/vite plugin below from global.css.
    rnw({
      babel: {
        babelrc: false,
        configFile: false,
        // The NativeWind preset rewrites `react-native` / `react-native-web`
        // primitive imports to the className-aware `react-native-css/components`
        // wrappers. vite-plugin-rnw keeps react-native(-web) and react-native-css
        // in its transform set (their negative-lookahead exclude matches anything
        // starting with "react-native") so flow/JSX still run on them — but the
        // rewriting must only touch first-party code. Left unscoped it rewrites
        // react-native-web's own index.js (re-exporting every primitive from the
        // css wrappers) and react-native-css's own components, both of which
        // create circular self-imports: at module init the base component is
        // undefined and copyComponentProperties() throws on Object.entries().
        // Dev hides it (unbundled live bindings); the production bundle's static
        // init order surfaces it. Scope the preset to non-node_modules only.
        overrides: [
          {
            exclude: /node_modules/,
            presets: [nativewindBabelPreset],
          },
        ],
      },
    }),
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
