import { jsx, jsxs } from "react/jsx-runtime";

/**
 * @param {string | undefined} backgroundPath
 * @param {string[]} paths
 */
const createSvgIcon = (backgroundPath, paths) => (props) =>
  jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 256 256",
    fill: "currentColor",
    ...props,
    children: [
      backgroundPath && jsx("path", { d: backgroundPath, opacity: 0.2 }),
      ...paths.map((d) => jsx("path", { d })),
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
