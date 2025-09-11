import { createCheckPackageWithWorkspaces } from "check-package-dependencies";

await createCheckPackageWithWorkspaces()
  .checkRecommended({
    isLibrary: (pkg) => pkg.name === "storybook-native-app",
  })
  .run();
