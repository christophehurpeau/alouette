import { createCheckPackageWithWorkspaces } from "check-package-dependencies";

await createCheckPackageWithWorkspaces({
  isLibrary: (pkg) => pkg.name !== "storybook-native-app",
})
  .checkRecommended({
    onlyWarnsForInMonorepoPackagesDependencies: {
      "storybook-native-app": {
        "*": {
          duplicateDirectDependency: [],
        },
      },
    },
  })
  .run();
