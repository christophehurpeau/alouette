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
    onlyWarnsForInMonorepoPackagesDependencies: {
      "storybook-native-app": {
        "@tamagui/vite-plugin": {
          duplicateDirectDependency: ["@tamagui/react-native-web-lite"],
        },
      },
    },
  })
  .run();
