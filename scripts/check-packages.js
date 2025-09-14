import { createCheckPackageWithWorkspaces } from "check-package-dependencies";

await createCheckPackageWithWorkspaces()
  .checkRecommended({
    isLibrary: (pkg) => pkg.name === "storybook-native-app",
    onlyWarnsForInMonorepoPackagesDependencies: {
      "storybook-native-app": {
        "*": {
          invalidPeerDependencyVersion: ["react-native-web"],
          duplicateDirectDependency: ["react-native-web"],
        },
      },
    },
  })
  .run();
