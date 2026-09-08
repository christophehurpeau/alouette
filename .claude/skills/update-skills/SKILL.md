---
name: update-skills
description: How to update, reconcile, or add the alouette library skills in packages/alouette/skills (the @tanstack/intent / agentskills.io skills shipped with the package). Use when source components change, on version bumps, or when adding a skill for a new component.
---

The skills in `packages/alouette/skills/*/SKILL.md` are [@tanstack/intent](https://github.com/TanStack/intent) skills (agentskills.io spec) shipped inside the `alouette` package. Each is a derived artifact of the source files in its `sources:` frontmatter — never freehand them out of sync with source.

Their reader is an agent writing screens in a real app. Passing `intent validate` is the floor, not the goal — read [references/writing-skills.md](references/writing-skills.md) before writing any description, section or reference file.

## Tools

| command                                                                             | does                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node scripts/skills-status.ts`                                                     | the report: changed sources per skill (each with a ready-made `git diff` line), changed files no skill sources, new/removed `index.ts` exports and whether a skill covers them, description/line budgets, `skill_tree.yaml` drift, dead sources. `--json` for machine use, `--base <ref>` to override the base commit |
| `node scripts/skills-sync.ts`                                                       | writes `_artifacts/skill_tree.yaml` from SKILL.md frontmatter (description, type, path, requires, sources, references)                                                                                                                                                                                                |
| `node scripts/skills-sync.ts --check`                                               | same, read-only, exits 1 on drift (CI)                                                                                                                                                                                                                                                                                |
| `node scripts/skills-sync.ts --version`                                             | sets `library_version` in every SKILL.md and `library.version` in both artifacts to `packages/alouette/package.json`'s                                                                                                                                                                                                |
| `node scripts/skills-sync.ts --record`                                              | stamps `_artifacts/skills_state.json` with HEAD — the base the next status run diffs from                                                                                                                                                                                                                             |
| `node node_modules/@tanstack/intent/dist/cli.mjs validate packages/alouette/skills` | spec validation (1024-char description, 500-line SKILL.md)                                                                                                                                                                                                                                                            |
| `node node_modules/@tanstack/intent/dist/cli.mjs stale packages/alouette`           | intent's own view: version drift and sources changed since the last release                                                                                                                                                                                                                                           |

Never hand-edit `_artifacts/skill_tree.yaml` descriptions, sources or references — edit the SKILL.md frontmatter and run the sync.

`_artifacts/skills_state.json` is the reconciliation bookmark: the commit the skills were last brought in line with. It is what makes a run fast — diff a handful of files instead of a whole release. Without it, `skills-status.ts` falls back to the `alouette@<library_version>` tag.

## Reconcile after source changes / on a version bump

Typically run right before a release: `packages/alouette/package.json` still shows the last released version (the GitHub Action that bumps it and tags hasn't fired yet), and HEAD already holds what goes into the next one. The status script also covers the working tree, so staged-but-uncommitted components are included.

1. `node scripts/skills-status.ts`.
2. For each skill under **changed sources**, run the `git diff` line printed under it. Edit its SKILL.md only where a **public** API moved — an internal refactor of a sourced file needs nothing.
3. **new exports** flags components whose file no skill sources yet: coverage to add (a section in the skill that owns the domain, plus the `sources:` entries). **removed exports** is coverage to delete. **changed but sourced by no skill** is a gap to judge — add the file to a skill's `sources:` if that skill documents it, ignore it if it is genuinely internal.
4. Watch the **budget** rows: a skill near 500 lines takes its next section as a `references/` split, not as more lines.
5. `node scripts/skills-sync.ts` (add `--version` when `package.json` has moved past the recorded `library_version`).
6. `intent validate packages/alouette/skills` and `intent stale packages/alouette` — both must be clean.
7. `node scripts/skills-sync.ts --record` once they are, so the next run starts from here.

## Add a skill for a new component

`intent stale` never flags a new exported component lacking coverage — `skills-status.ts` does, from the `index.ts` export diff. Prefer extending the skill that owns the domain; a new skill is warranted only for a domain none of the current ones covers. To author one, `intent scaffold` (agent-guided: domain discovery → tree → skill), or copy an existing SKILL.md's frontmatter shape (`name`, `description`, `type`, `library`, `library_version`, `requires`, `sources`), then add its `_artifacts/skill_tree.yaml` entry by hand — `slug`, `domain` and `package` are the only fields the sync cannot derive.

## Remove a skill

Deleting `packages/alouette/skills/<name>/` is not enough: consumers who ran `alouette-install-skills` have a symlink at `.claude/skills/<name>` that would dangle. Add `<name>` to the `REMOVED_SKILLS` array in `packages/alouette/bin/install-skills.mjs` in the same change, and drop its `skill_tree.yaml` entry (`skills-status.ts` lists tree entries with no skill on disk).

## Invariants

- `"skills"` must stay in the `files` array of `packages/alouette/package.json`, else skills are not published.
- CI is `.github/workflows/check-skills.yml` (from `intent setup`): validates on PRs, opens a review PR on release when skills drift.
- These are distinct from this repo's Claude Code skills in `.claude/skills/` (e.g. [storybook](../storybook/SKILL.md)) — those are not shipped and not managed by intent.
- Consumers install shipped skills via `npx alouette-install-skills` (`packages/alouette/bin/install-skills.mjs`), which symlinks `packages/alouette/skills/*` into their `.claude/skills/`. This is separate from `intent`, which this repo uses only for authoring/reconciling skill content.
