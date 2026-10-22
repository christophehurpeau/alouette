---
name: update-skills
description: How to update, reconcile, or add the alouette library skills in packages/alouette/skills (the agentskills.io skills shipped with the package). Use before a release, when source components change, or when adding a skill for a new component.
---

The skills in `packages/alouette/skills/*/SKILL.md` are [agentskills.io](https://agentskills.io) skills shipped inside the `alouette` package. Each is a derived artifact of the source files in its `sources:` frontmatter — never freehand them out of sync with source.

Their reader is an agent writing screens in a real app. A valid skill is the floor, not the goal — read [references/writing-skills.md](references/writing-skills.md) before writing any description, section or reference file.

## Frontmatter

```yaml
---
name: alouette-actions # the directory name
description: >
  Purpose, discriminators, then "Load when …" (max 1024 chars).
sources: # repo-relative paths the skill documents
  - packages/alouette/src/ui/actions/Button.tsx
---
```

Nothing else: `name` and `description` are what an agent reads, `sources` is what the status script diffs.

## Reconcile before a release

`packages/alouette/package.json` still shows the last released version (the GitHub Action that bumps it and tags hasn't fired yet), and HEAD already holds what goes into the next one.

1. `node scripts/skills-status.ts` — diffs from the `alouette@<package.json version>` tag (`--base <ref>` to override) to the working tree, so uncommitted work is included.
2. For each skill under **changed sources**, run the `git diff` line printed under it. Edit its SKILL.md only where a **public** API moved — an internal refactor of a sourced file needs nothing.
3. **new exports** flags exports whose file no skill sources yet: coverage to add (a section in the skill that owns the domain, plus the `sources:` entries). **removed exports** is coverage to delete. **changed but sourced by no skill** is a gap to judge — add the file to a skill's `sources:` if that skill documents it, ignore it if it is genuinely internal.
4. Watch the **budget** rows: a skill near 500 lines takes its next section as a `references/` split, not as more lines.
5. Re-run the script once the edits are done: it exits 1 under **invalid skills** (name ≠ directory, description missing or over 1024 chars, SKILL.md over 500 lines, a source that no longer exists).

## Add a skill for a new component

Prefer extending the skill that owns the domain; a new skill is warranted only for a domain none of the current ones covers. Copy an existing SKILL.md's frontmatter shape.

## Remove a skill

Deleting `packages/alouette/skills/<name>/` is not enough: consumers who ran `alouette-install-skills` have a symlink at `.claude/skills/<name>` that would dangle. Add `<name>` to the `REMOVED_SKILLS` array in `packages/alouette/bin/install-skills.mjs` in the same change.

## Invariants

- `"skills"` must stay in the `files` array of `packages/alouette/package.json`, else skills are not published.
- Consumers install shipped skills via `npx alouette-install-skills` (`packages/alouette/bin/install-skills.mjs`), which symlinks `packages/alouette/skills/*` into their `.claude/skills/`.
- These are distinct from this repo's Claude Code skills in `.claude/skills/` (e.g. [storybook](../storybook/SKILL.md)), which are not shipped.
