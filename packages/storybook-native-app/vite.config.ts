import { transformWithEsbuild } from "vite";
import { tamaguiPlugin } from "@tamagui/vite-plugin";
import react from "@vitejs/plugin-react";
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
    // extensions: [`.mjs`, `.js`, `.ts`, `.mts`].flatMap((extension) => [
    //   ".web" + extension,
    //   extension,
    // ]),
    holdUntilCrawlEnd: true,
    exclude: ["alouette-icons"],
  },
  resolve: {
    extensions,
    alias: {
      alouette: fileURLToPath(new URL("../alouette/src", import.meta.url)),
      "alouette/createAlouetteTamagui": fileURLToPath(
        new URL("../alouette/src/createAlouetteTamagui.ts", import.meta.url),
      ),
    },
  },
  plugins: [
    svgr({
      include: "**/*.svg",
      svgrOptions: {
        exportType: "named",
      },
    }),
    react(),
    tamaguiPlugin({
      config: "./tamagui.config.ts",
      components: ["alouette"],
      excludeReactNativeWebExports: [], // TODO properly exclude
      useReactNativeWebLite: "without-animated",
      disableExtraction: process.env.NODE_ENV !== "production",
    }),
  ].filter(Boolean),
});
