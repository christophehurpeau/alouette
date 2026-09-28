import { jsx, jsxs } from "react/jsx-runtime";
import { Path, Svg } from "react-native-svg";

/**
 * @param {string | undefined} backgroundPath
 * @param {string[]} paths
 */
const createSvgIcon = (backgroundPath, paths) => (props) =>
  jsxs(Svg, {
    viewBox: "0 0 256 256",
    fill: "currentColor",
    ...props,
    children: [
      backgroundPath && jsx(Path, { d: backgroundPath, opacity: 0.2 }),
      ...paths.map((d) => jsx(Path, { d })),
    ],
  });

/** @param {string[]} paths */
export const createIcon = (...paths) => createSvgIcon(undefined, paths);

/**
 * @param {string} backgroundPath drawn under `paths` at 20% opacity
 * @param {string[]} paths
 */
export const createDuotoneIcon = (backgroundPath, ...paths) =>
  createSvgIcon(backgroundPath, paths);
