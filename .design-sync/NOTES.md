# design-sync notes — alouette

Repo-specific gotchas and decisions for syncing alouette to claude.ai/design.
Shape: storybook. Package: `alouette` (window global `Alouette`).

## Scope

- First sync is scoped to **Inputs only**: `Switch`, `InputText`, `TextArea`.
- All other storied components are excluded via name-keyed `cfg.titleMap` nulls
  (Button, IconButton, Box, Surface, PressableBox, PressableListItem, Message,
  GradientBackground, Separator, Icon, Text, View). To bring a category into
  scope on a later sync, remove its `titleMap: null` entries.

## Build

- `[GENERAL]` `dist/definitions/` (the `.d.ts` tree the converter reads) is
  committed, but `yarn workspace alouette build` runs `clean:build` then
  `tsc -p tsconfig.json`, and **tsc currently fails** on pre-existing type
  errors in the generated `themeVariables.ts` / `useThemeToken.ts` on the
  `feat/nativewind` branch (theme keys like `dark_brand` not in
  `AlouetteModeTheme`). Rollup bundles still emit. After building, restore the
  definitions: `git checkout -- packages/alouette/dist/definitions`. Not a
  design-sync problem to fix — it is the repo's branch state.
- Entry: `./packages/alouette/dist/index-browser.es.js` (the `browser` export).
- `--node-modules ./node_modules` (repo root): yarn's node-modules linker keeps
  `react`/`react-dom` only at the root; the package's own node_modules is sparse.

## NativeWind / react-native-web bundling (the load-bearing fixes)

- `[GENERAL]` **className interop.** The prebuilt dist uses standard
  `react/jsx-runtime` and imports `react-native-web` directly — it is NOT built
  with NativeWind's Babel preset (storybook applies that via vite-plugin-rnw,
  aliasing `alouette` to source). So in a plain esbuild bundle, `className`
  (`bg-lowered`, etc.) is dropped and components render unstyled/invisible.
  Fix: `cfg.tsconfig` (`.design-sync/tsconfig.bundle.json`) aliases
  `react-native-web` → `node_modules/react-native-css/dist/commonjs/components/index.cjs`
  (the className-aware wrappers, a full superset of the rn-web surface), which
  replicates the preset's import rewrite at the bundle seam. `react-native` is
  aliased to real `react-native-web/dist/index.js` (the wrappers + nativewind
  import bare `react-native`); only a babel-plugin file imports `react-native-web`
  bare in node_modules, so no circular alias at runtime.
- `[GENERAL]` **`process` shim** (`.design-sync/process-shim.mjs`, wired first in
  `cfg.extraEntries`). The dist references
  `process.env.EXPO_PUBLIC_STORYBOOK_ENABLED`; `process` is undefined in the
  browser → ReferenceError at render. The shim defines it at IIFE init. Value
  set to `"true"` to match the storybook reference's own vite define.
- `[GENERAL]` **render-check `[RENDER] root empty` false positive.** rn-web
  injects `<style id="react-native-stylesheet">` at `head.firstChild`; the
  validator's mount-root selector `[id^="r"]` matches it FIRST, and it is
  innerHTML-empty (rn-web uses insertRule) → false `rootEmpty`. The same shim
  relocates that `<style>` to the end of `<body>` on DOMContentLoaded so the
  first `[id^="r"]` match is a real mount cell. Fidelity verified unchanged
  (rn-web atomic classes and NativeWind utilities target disjoint properties).
  Worth reporting upstream as a converter gap for react-native-web DSes.
- `[RENDER_THIN]` warns for all three (`maxHeight: 0`): the validator measures
  the mount's direct children, which rn-web lays out at 0 height while content
  paints in descendants. Warning only (not `bad`); render is correct — see the
  compare sheets. Recorded so a future sync treats it as known, not new.
- `alouette-icons` has no root export (only `./phosphor-icons/*`), so the
  `[ICON_PKG]` auto-include's `export * from "alouette-icons"` cannot resolve.
  Aliased to an empty stub barrel (`.design-sync/icons-barrel.mjs`); the dist's
  specific icon subpath imports still bundle inline. Icons are therefore NOT on
  the `window.Alouette` global — fine for Inputs scope; revisit when syncing
  icon-consuming components.

## Stories (preview + variants shape)

- Each input exports `Preview<Name>Story` (primary), `Variants`, and (Switch,
  InputText) an interaction `Tests` story. `cfg.overrides.<Name>.primaryStory`
  points at the `Preview…Story`; `skip` drops the `--tests` and `--documentation`
  (autodocs) story ids.
- `[GENERAL]` Story files import `{ Story, accents }` etc. from
  `../story-components/Story`. `accents` is a non-component export, so the default
  redirect-to-global made `ds_Story_exports.accents` undefined. Fix:
  `cfg.storyImports.bundle: ["story-components"]` bundles the story-component
  helpers from source (components they import recurse to the global, preserving
  context identity).
- `cfg.provider` = `SafeAreaProvider > AlouetteProvider > ScopedTheme(theme=light)`,
  the same chain as `.storybook`'s `AlouetteDecorator`. Set explicitly (not via
  the bundled decorator) so the providers come from the SAME global bundle as the
  components — the bundled decorator's NativeWind variable context is a different
  instance and its theme vars never reach the global components.

## Re-sync risks (watch-list)

- **tsc/definitions**: if `dist/definitions` is stale or missing after a rebuild,
  re-run `git checkout -- packages/alouette/dist/definitions` (see Build). If the
  branch's tsc errors are fixed upstream, this whole step goes away.
- **Provider light-pin**: `InputText`/`TextArea` `Variants` graded `close` — their
  `Story` helper also renders a dark-mode block that the light-pinned preview
  omits. Intentional. If you ever want dark variants shown, that is a provider
  decision, not a regression.
- **rnw stylesheet relocation** depends on rn-web's id `react-native-stylesheet`
  and its single `getElementById` lookup (createCSSStyleSheet.js). A major
  react-native-web bump could change either; re-verify the screenshots if
  `[RENDER] root empty` reappears.
- **react-native-css/components path** is a versioned dist path
  (`dist/commonjs/components/index.cjs`). A react-native-css major bump may move
  it — update `tsconfig.bundle.json` if the bundle errors `Could not resolve
  "react-native-web"`.
- **EXPO_PUBLIC_STORYBOOK_ENABLED="true"** in the shim matches storybook; if a
  component branches on it in a way that diverges from production web, revisit.
