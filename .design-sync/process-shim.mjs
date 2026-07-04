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
// insertRule), tripping a false `[RENDER] root empty`.
//
// Original fix (WRONG, found 2026-07-04): relocating the element via
// `body.appendChild(s)` reparents it — and reparenting a <style> element in
// Chromium silently discards every rule inserted via the CSSOM `insertRule`
// API (confirmed: 174 rules before the move, 0 after). rn-web's entire base
// View/Text reset (display:flex, flexDirection:column, position:relative,
// etc.) is inserted that way, so the move was quietly deleting it on every
// render — not "disjoint from NativeWind utilities" as originally assumed.
// Symptoms traced to this: Select's `absolute inset-0` overlay escaping to a
// distant ancestor (no default `position:relative`), and — found across two
// fan-out batches — `flex-row`/`self-start`/gap-based layouts collapsing to
// block stacking (no default `display:flex`) in Badge, Box, ConnectionState,
// FlatList, HStack/Stack/VStack, Icon, GradientBackground, PresenceOne,
// PressableListItem, ScrollView, SectionList, Separator, PressableBox.
//
// Fix: rename the id instead of moving the node, so it stops matching
// `[id^="r"]` without ever touching its position in the DOM (no reparent,
// no rule loss). rn-web only looks the element up by id once at creation
// time (same comment as before), so renaming afterward is safe.
if (typeof document !== "undefined") {
  const rename = () => {
    const s = document.getElementById("react-native-stylesheet");
    if (s) {
      s.id = "";
      s.setAttribute("data-rnw-stylesheet", "react-native-stylesheet");
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", rename);
  } else {
    rename();
  }
  g.addEventListener && g.addEventListener("load", rename);
}
export {};
