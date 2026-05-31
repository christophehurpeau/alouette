import { uniwind } from "uniwind/vite";
import { rnw } from "vite-plugin-rnw";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import { URL, fileURLToPath } from "url";

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
    rnw(),
    tailwindcss(),
    uniwind({
      cssEntryFile: "./src/global.css",
      dtsFile: "./src/uniwind-types.d.ts",
      extraThemes: [
        "light_brand",
        "dark_brand",
        "light_info",
        "dark_info",
        "light_success",
        "dark_success",
        "light_warning",
        "dark_warning",
        "light_danger",
        "dark_danger",
      ],
    }),
  ],
});
