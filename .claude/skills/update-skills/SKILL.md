---
name: update-skills
description: How to update, reconcile, or add the alouette library skills in packages/alouette/skills (the @tanstack/intent / agentskills.io skills shipped with the package). Use when source components change, on version bumps, or when adding a skill for a new component.
---

The skills in `packages/alouette/skills/*/SKILL.md` are [@tanstack/intent](https://github.com/TanStack/intent) skills (agentskills.io spec) shipped inside the `alouette` package. Each is a derived artifact of the source files in its `sources:` frontmatter — never freehand them out of sync with source.

Run the CLI from the repo root via `node node_modules/@tanstack/intent/dist/cli.mjs <cmd>` (or `pnpm dlx @tanstack/intent@latest <cmd>`).

## Reconcile after source changes / on a version bump

1. `intent stale packages/alouette` — flags version drift and skills whose sources changed.
2. For each flagged skill: diff its `sources:` files since the version the skill was last verified against (`git diff <prev-tag> HEAD -- <source>`), and edit SKILL.md to match the current public API (description, examples, Common Mistakes).
3. Bump `library_version` in every reconciled SKILL.md to the package version.
4. Bump the matching `version:` in `_artifacts/domain_map.yaml` and `_artifacts/skill_tree.yaml` — `stale` checks these too and warns if they differ from SKILL.md.
5. `intent validate packages/alouette/skills` then `intent stale packages/alouette` — both must be clean.

Only edit content when a **public** API changed. Internal refactors of a sourced file (no exported prop/signature change) need only the version bump.

## Add a skill for a new component

`stale` does not flag new exported components lacking coverage — check `git diff <prev-tag> HEAD -- packages/alouette/src/index.ts` for new exports. To author one, `intent scaffold` (agent-guided: domain discovery → tree → skill), or copy an existing SKILL.md and follow its frontmatter shape (`name`, `description`, `type`, `library`, `library_version`, `requires`, `sources`).

## Remove a skill

Deleting `packages/alouette/skills/<name>/` is not enough on its own — consumers who already ran `alouette-install-skills` have a symlink at `.claude/skills/<name>` that would be left dangling. Add `<name>` to the `REMOVED_SKILLS` array in `packages/alouette/bin/install-skills.mjs` in the same change so the next install run cleans it up.

## Invariants

- `"skills"` must stay in the `files` array of `packages/alouette/package.json`, else skills are not published.
- CI is `.github/workflows/check-skills.yml` (from `intent setup`): validates on PRs, opens a review PR on release when skills drift.
- These are distinct from this repo's Claude Code skills in `.claude/skills/` (e.g. [storybook](../storybook/SKILL.md)) — those are not shipped and not managed by intent.
- Consumers install shipped skills via `npx alouette-install-skills` (`packages/alouette/bin/install-skills.mjs`), which symlinks `packages/alouette/skills/*` into their `.claude/skills/`. This is separate from `intent`, which this repo uses only for authoring/reconciling skill content.
