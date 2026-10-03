import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  // not `*.test.ts`: the root vitest run would pick it up
  testMatch: "stories.playwright.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  outputDir: "./playwright-results",
  snapshotDir: "./snapshots",
  webServer: {
    command: "pnpm run serve:build",
    url: "http://localhost:6006",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  use: {
    baseURL: "http://localhost:6006",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
