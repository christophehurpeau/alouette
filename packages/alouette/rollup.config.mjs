import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import createRollupConfig from "@pob/rollup-esbuild/createRollupConfig.js";
import replace from "@rollup/plugin-replace";

export default createRollupConfig({
  cwd: dirname(fileURLToPath(import.meta.url)),
  outDirectory: "dist",
  plugins: ({ target }) =>
    target === "node" || target === "browser"
      ? [
          replace({
            preventAssignment: true,
            delimiters: ['"', '"'],
            "react-native": '"react-native-web"',
          }),
        ]
      : [],
});
