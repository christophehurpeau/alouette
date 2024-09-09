import { tamaguiExtractPlugin, tamaguiPlugin } from "@tamagui/vite-plugin";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import tamaguiConfig from "./tamagui.config.ts";
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
    tamaguiPlugin(tamaguiConfig.themeConfig),
    process.env.NODE_ENV === "production"
      ? tamaguiExtractPlugin(tamaguiConfig.themeConfig)
      : null,
  ].filter(Boolean),
});
