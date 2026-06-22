// Browser shim for `process`. The alouette dist references
// `process.env.EXPO_PUBLIC_STORYBOOK_ENABLED` (Expo/react-native-web runtime
// flag); in a plain browser bundle `process` is undefined, throwing at render.
// Wired first via cfg.extraEntries so this side effect runs at IIFE init,
// before any component renders. The converter's esbuild define only covers
// NODE_ENV, so this is the supported config-driven way to define the rest.
const g = globalThis;
g.process = g.process || { env: {} };
g.process.env = g.process.env || {};
if (g.process.env.EXPO_PUBLIC_STORYBOOK_ENABLED == null) {
  g.process.env.EXPO_PUBLIC_STORYBOOK_ENABLED = "true";
}

// react-native-web injects `<style id="react-native-stylesheet">` at
// head.firstChild. The converter's render-check finds mount roots via
// `[id^="r"]`, and this style matches it FIRST (head precedes the body cells
// r0,r1,...), so roots[0] is the style — innerHTML-empty (rn-web uses
// insertRule), tripping a false `[RENDER] root empty`. Relocate the style to
// the END of <body> so the first `[id^="r"]` match is a real mount cell.
// rn-web keeps a JS handle to the element (createCSSStyleSheet only looks it
// up by id once), so moving it is safe and its rules keep applying. This moves
// rn-web's sheet after the utility CSS in source order; the rn-web atomic
// classes (r-*, css-view-*) and the NativeWind utilities target disjoint
// properties, so component styling is unchanged (verified against the
// pre-relocation render — only card-width reflow differs, not the components).
if (typeof document !== "undefined") {
  const relocate = () => {
    const s = document.getElementById("react-native-stylesheet");
    if (s && document.body && s.parentNode !== document.body) {
      document.body.appendChild(s);
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", relocate);
  } else {
    relocate();
  }
  g.addEventListener && g.addEventListener("load", relocate);
}
export {};
