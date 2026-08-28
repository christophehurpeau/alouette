import type { useCombobox as useComboboxWeb } from "downshift";

// downshift's `exports` map has no `react-native` condition on `"."`, and Metro
// ignores the legacy top-level `react-native` field as soon as `exports` exists
// (`unstable_enablePackageExports` has defaulted to true since Metro 0.82), so
// `import from "downshift"` resolves to the DOM build on device. The native
// build is only reachable at the `downshift/react-native` subpath, which
// declares `require` but no `import` — an ESM import there matches no condition
// at all — hence the require call.
// This file overrided by a `.web.ts` so only Metro (ios/android) ever resolves it: the
// rollup builds and Expo web keep the ESM import from `useCombobox.web.ts`.
// eslint-disable-next-line import-x/no-commonjs
const { useCombobox } = require("downshift/react-native") as {
  useCombobox: typeof useComboboxWeb;
};

export { useCombobox };
