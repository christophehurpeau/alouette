---
name: pr-screenshots
description: Capture Storybook stories as PNGs and embed them in a pull request. Use when opening or updating a PR that changes how a component looks, or when asked for screenshots.
---

`pnpm -C packages/storybook-native-app screenshots:stories` builds the static
Storybook, serves it on a random port for the run only, and screenshots stories
with Playwright. Never start a Storybook dev server or a separate static server
for this.

1. Find the story ids: `screenshots:stories --list <filter>` (matches id or
   title).
2. Capture and upload in one run, passing `--no-build` if the build is already
   current:

   ```sh
   pnpm -C packages/storybook-native-app screenshots:stories --upload <pr> \
     <storyId> "<storyId>#<Story.Section title>"
   ```

   - Each story is captured once its `play` has run, frozen by Storybook
     (`freeze=finished`): a story whose `play` opens a dialog or a menu is
     captured open. A story that throws fails the run.
   - `<storyId>` alone is the full page; `#<Section title>` crops to the first
     `Story.Section` with that title, i.e. the light one. Prefer the
     component's Variants story — `<Story>` already renders the light and dark
     modes one under the other — and crop sections of a long one.
   - `--width <px>` (default 1200) for a narrow-viewport shot; `--out <dir>`
     keeps the files (default: a fresh dir under `$TMPDIR`).
   - `--upload <pr>` commits the files to the orphan branch `pr-assets/<pr>`
     (chained, never force-pushed) and prints an `<img>` tag per file, pinned
     to the commit SHA.

3. Look at each PNG before publishing it, then add the tags to a
   `## Screenshots` section of the PR body, above the attribution line, with a
   one-line caption each.
