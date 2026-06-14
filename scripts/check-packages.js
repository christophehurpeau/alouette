import { createCheckPackageWithWorkspaces } from "check-package-dependencies";

await createCheckPackageWithWorkspaces({
  isLibrary: (pkg) => pkg.name !== "storybook-native-app",
})
  .checkRecommended({
    // react-native-css (NativeWind v5's native engine) breaks at runtime with
    // lightningcss >=1.31 ("failed to deserialize Specifier"), so the app pins
    // lightningcss to 1.30.x. Vite wants ^1.32.0 and nests its own copy. This
    // intentional split would otherwise be a hard duplicate-dependency error.
    onlyWarnsForInMonorepoPackagesDependencies: {
      "storybook-native-app": {
        vite: {
          duplicateDirectDependency: ["lightningcss"],
          missingPeerDependency: [],
          invalidPeerDependencyVersion: [],
        },
        "vite-plugin-rnw": {
          duplicateDirectDependency: ["@vitejs/plugin-react"],
        },
      },
    },
  })
  .run();
