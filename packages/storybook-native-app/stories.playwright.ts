import fs from "node:fs";
import { expect, test } from "@playwright/test";

interface Story {
  id: string;
  title: string;
  name: string;
  type: string;
  tags: string[];
}

const index = JSON.parse(
  fs.readFileSync(
    new URL("./storybook-static/index.json", import.meta.url),
    // oxlint-disable-next-line unicorn-js/prefer-json-parse-buffer -- JSON.parse is typed to take a string
    "utf8",
  ),
) as { entries: Record<string, Story> };

const stories = Object.values(index.entries).filter(
  (story) => story.type === "story",
);

const widths = [319, 1200];

test.describe("Storybook Screenshots", () => {
  for (const story of stories) {
    if (story.tags.includes("disable-snapshot")) {
      continue;
    }
    for (const width of widths) {
      test(`${story.title} - ${story.name} - ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        page.on("console", (msg) => {
          if (msg.type() === "error") {
            // eslint-disable-next-line no-console -- we should throw when this happens
            console.log(`Error in browser for ${story.id}: ${msg.text()}`);
          }
        });

        await page.goto(`/iframe.html?id=${story.id}&viewMode=story`, {
          waitUntil: "domcontentloaded",
        });

        await page.waitForSelector("#storybook-root", {
          state: "visible",
          timeout: 5000,
        });
        await page.waitForTimeout(200);
        await expect(page).toHaveScreenshot(`${story.id}-${width}px.png`, {
          fullPage: true,
          animations: "disabled",
        });
      });
    }
  }
});
