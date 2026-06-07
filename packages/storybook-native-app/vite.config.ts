import { createRequire } from "module";
import { rnw } from "vite-plugin-rnw";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import { URL, fileURLToPath } from "url";

// NativeWind's Babel preset is published as ESM that calls `require()` inside the
// preset body, which throws in Vite's ESM config context. Load the CommonJS
// build via createRequire so those internal `require()` calls resolve.
const require = createRequire(import.meta.url);
const nativewindBabelPreset = require("nativewind/babel").default;

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
    EXPO_OS: JSON.stringify("web"),
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
        presets: [nativewindBabelPreset],
      },
    }),
    tailwindcss(),
  ],
});
