import { tamaguiExtractPlugin, tamaguiPlugin } from "@tamagui/vite-plugin";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

export default defineConfig({
  define: {
    "process.env.STORYBOOK": "true",
  },
  resolve: {
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"].flatMap(
      (extension) => [".web" + extension, extension],
    ),
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
    react(),
    tamaguiPlugin({
      config: "./tamagui.config.ts",
      components: ["alouette"],
      optimize: process.env.NODE_ENV === "production",
    }),
  ],
});
