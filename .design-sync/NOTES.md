# design-sync notes — alouette

Repo-specific gotchas and decisions for syncing alouette to claude.ai/design.
Shape: storybook. Package: `alouette` (window global `Alouette`).

## Scope

- Expanded to **all storied components** (2026-07-04): removed the `titleMap`
  null exclusions that previously limited the sync to Inputs (`Switch`,
  `InputText`, `TextArea`). Full roster now includes Button, IconButton,
  AlertDialog, Box, Modal, Presence, Surface, PressableBox, PressableListItem,
  Badge, ConnectionState, Message, Select, GradientBackground, FlatList, Icon,
  ScrollView, SectionList, Text, View, Separator, stacks (HStack/VStack) — in
  addition to the original Inputs set.
- Icons: `alouette-icons` has no root export (only `./phosphor-icons/*`), so
  the `[ICON_PKG]` auto-include's `export * from "alouette-icons"` cannot
  resolve — `.design-sync/icons-barrel.mjs` stubs the root import empty.
  Icon/IconButton stories import specific `alouette-icons/phosphor-icons/*`
  subpaths directly; those bundle per-story via the default subpath-bundling
  policy (`story-imports.mjs`), so no global icon merge is needed unless the
  build says otherwise. Revisit this note if `[BUNDLE_EXPORT]` or missing-icon
  renders show up for Icon/IconButton.
- `[TITLE_UNMAPPED]` on the full-roster build dropped 5 titles: `Themes`,
  `Tokens` — docs/showcase stories over design tokens, not components,
  `titleMap: null`. `SwitchBreakpoints` — its story only exercises the two
  helper exports `SwitchBreakpointsUsingDisplayNone`/`...UsingNull`, no plain
  `SwitchBreakpoints` export exists; excluded (`titleMap: null`) as a
  responsive-visibility utility, not a design component — revisit if the
  agent needs conditional-breakpoint-rendering guidance. `Presence` → mapped
  to `PresenceOne` (`titleMap`); `PresenceList` shares the file but has no
  story of its own. `Stacks` → mapped to `HStack` (`titleMap`); the same
  story file's `VStackStory`/`StackStory` cover `VStack`/`Stack`, which are
  the same component with a different `direction`/base — graded
  sibling-trusted off `HStack`'s primary story.

## Compare harness

- `[GENERAL]` Long stories (tall `Variants`-style compositions) crop at 700px
  in the compare sheet: `compare.mjs`'s `storyShot()` screenshots the ds page
  with `fullPage:false` (viewport-capped) for module-preview `?story=`
  navigation, while the storybook side (`captureStory()`) screenshots the
  `#storybook-root` element directly, which auto-expands to full content
  height. So for any story taller than 700px the sheet's right column shows
  only the top slice even when the full render matches — verified for Button
  by serving `ds-bundle/` locally and taking a manual `fullPage:true`
  screenshot (matched storybook's dark+light sections exactly at 9404px).
  This is a harness capture asymmetry (`compare.mjs` is the oracle — never
  forked), not a DS defect: grade from the visible top slice plus, when in
  doubt, a manual full-page capture, same as any other framing difference the
  rubric says to ignore. Don't re-diagnose this on future tall stories.
- `[GENERAL]` `--tests` stories (`AlertDialog Tests`, `Modal Tests`, `Select
  Tests`, `Text Tests`, plus the pre-existing `Switch Tests`/`InputText
  Tests`) all carry a `play:` interaction function (opens a dialog, types
  into a field, etc.) that Storybook autoplays on load but the compiled
  preview never invokes — so the ds preview renders the pre-interaction
  state while the storybook reference shows the post-interaction state
  (e.g. AlertDialog's Tests story shows an open "Terms updated" dialog in
  storybook, nothing in the preview). Skipped via `cfg.overrides.<Name>.skip`
  for every component that has one — same treatment as the original
  Inputs sync. `--documentation` (autodocs) entries need no skip: the
  converter already excludes them from the story set.
- `[GENERAL]` **Real DS bug found via compare, not a harness artifact:**
  `Select`'s Variants sheet showed a genuine visual defect (a stray "Durian
  (sold out)" option label overlapping the "Variants" title) — distinct from
  the 700px-crop artifact above because it was an overlap at the TOP, not a
  crop at the bottom. Root cause: `Select.web.tsx`'s wrapper `View`
  (`wrapperVariants` base) never set `relative`, so the absolutely-positioned
  label-overlay `View` (`absolute inset-0`) escaped to whatever distant
  ancestor happened to be positioned instead of its own ~46px row — on a
  page with many stacked Select instances, one overlay expanded to span
  nearly the full page height. Real Storybook didn't show it because
  react-native-web's runtime NativeWind interop applies `position: relative`
  to Views by default; the esbuild-bundled `react-native-css` path used by
  this converter does not, so an explicit `relative` class is required.
  Fixed at the source (`wrapperVariants` base gained `relative`), rebuilt,
  and recaptured clean — see commit history for `Select.web.tsx`. Lesson: a
  "needs-grade" artifact that looks like overlapping/misplaced content
  (rather than a clean crop or missing interaction state) is worth chasing
  as a real bug, not filed under the known harness quirks above.

## Build

- `pnpm --filter alouette build` (`clean:build` then `tsc -p tsconfig.json`)
  now succeeds cleanly on `main` (verified 2026-07-04) — the prior
  `dark_brand`/`AlouetteModeTheme` tsc failures were fixed upstream (commit
  `04954409`). The `git checkout -- packages/alouette/dist/definitions`
  workaround below is no longer needed; left here only in case a future
  branch reintroduces a tsc failure.
- Entry: `./packages/alouette/dist/index-browser.es.js` (the `browser` export).
- `--node-modules ./node_modules` (repo root): pnpm's node-modules linker keeps
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

## Resolved: row/flex layout collapse (stacks.tsx shim gap)

- `[GENERAL]` **Fixed 2026-07-04, not a bundler/RNW bootstrap defect as first
  suspected.** The full-roster fan-out batches (`batchA.md`/`batchB.md`,
  since merged into this note and deleted) misdiagnosed this as react-native-web's
  runtime atomic reset classes (`css-view-*`, flex/gap/centering) failing to
  apply in the ds-bundle — affecting Badge, Box, ConnectionState, FlatList,
  GradientBackground, HStack, Icon, PresenceOne, PressableBox,
  PressableListItem, ScrollView, SectionList, Separator (rows collapsing to
  vertical stacks, `gap`/`items-center`/`justify-between` having zero effect).
  Root cause was narrower: `ui/stacks/stacks.tsx` (exports `Stack`/`HStack`/
  `VStack`) lives in a directory named `stacks`, and `story-imports.mjs`'s
  `exportedComponentFor()` heuristic matches a resolved path's file/dir
  basename against known export names — "stacks" matches none of them, so the
  redirect-to-global silently fell through to "bundle from source," giving
  every story that (directly or via `story-components/Story.tsx`, which
  imports `VStack`) touched a stack component its own independently-compiled
  `stacks.tsx`, using a raw un-aliased react-native-web `View` (its
  `pickProps`/`forwardedProps` allowlist drops `className` outright) instead
  of the `react-native-css`-wrapped global. That looked exactly like a
  bootstrap/style-injection failure because every row layout in this DS is
  built from `HStack`, so the blast radius matched what a real RNW-init bug
  would produce. **Fix**: `cfg.storyImports.shim: ["ui/stacks/stacks"]` in
  `.design-sync/config.json` — forces the shim-to-global path regardless of
  the naming heuristic. Rebuilt and recaptured all 25 components clean; every
  story previously flagged mismatch/close under this cause now matches
  (see individual `.design-sync/.cache/compare/<Name>.grade.json` files dated
  2026-07-04). If a future re-sync adds a new file under `ui/<dir>/<dir>.tsx`
  whose exports don't match its own directory name, apply the same
  `storyImports.shim` (or `.bundle`) override rather than re-suspecting the
  bundler.

## Re-sync risks (watch-list)

- **New source files whose export names don't match their file/dir basename**
  (like `stacks.tsx` above) silently fall through `story-imports.mjs`'s
  `exportedComponentFor()` heuristic to "bundle from source" instead of
  redirecting to the global — giving that story its own independently-compiled,
  non-`className`-aware copy of the component. Symptom: a row/flex/gap layout
  that looks fine in storybook collapses to a vertical stack (or loses
  `className` styling) only in the ds preview. Add `cfg.storyImports.shim` (or
  `.bundle`, if source-bundling is actually intended) for the resolved path.
- **GradientBackground's `absolute inset-0` overlay** (Light/Dark Brand
  stories) needs a definite-height ancestor to fill against; real Storybook's
  canvas/decorator provides one, the design-sync preview's provider chain
  (`SafeAreaProvider > AlouetteProvider > ScopedTheme`) does not — content
  collapses/escapes above the viewport, gradient never paints. Not the same
  bug as the stacks.tsx one above (verified via isolated Playwright fullPage
  capture): this is a preview-harness sizing gap, not a component defect —
  GradientScrollView's Scroll story is unaffected. Needs a `min-h-screen`-
  equivalent wrapper in the preview provider chain; not yet fixed.
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
