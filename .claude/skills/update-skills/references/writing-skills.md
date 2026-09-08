# Writing skills agents can actually use

The reader is an agent writing screens in someone's app, with the whole alouette
surface unknown to it and no time to browse. It sees skill **descriptions**
first (all 15 sit in its context at once) and loads a **body** only after
choosing one. So the two are optimized for different things: descriptions for
_picking the right skill and the right component_, bodies for _writing a call
site that compiles, is accessible, and doesn't fight the design system_.

`intent validate`'s limits (1024-char description, 500-line SKILL.md) are a
ceiling, not a target. Passing validation is not the goal; being loaded at the
right moment and answering fast is.

## Descriptions

State **what each component is for**. Never enumerate props, variant values or
sizes: they are the fastest-rotting part of the text, they cost retrieval signal
against the words the agent's task actually contains, and the agent reads them
from the types once the skill is loaded.

Include, in this order:

1. One clause naming the domain in the app's language ("Everything the user
   presses", "Tell the user what happened, in place").
2. Each exported component with its _purpose_, and — for anything confusable —
   the discriminator ("NavBar navigates between routes; Tabs switches views on
   one screen").
3. The rule that prevents the classic wrong choice, when there is one
   ("navigation is never a RadioButtonGroup, which announces a form value").
4. A closing `Load when …` listing the task phrasings that should pull it in —
   the words a developer would use ("a tab bar, a section switcher, a breadcrumb
   trail"), not the component names again.

Aim well under the limit. A description that needs 1000 characters is usually a
skill covering two domains, or one leaking prop detail.

```
# Avoid — prop enumeration, no purpose, no trigger vocabulary
Message (requires accent + icon) and the presets InfoMessage…; size is sm/md/lg;
variant is surface (raised, default) | flat.

# Prefer — purpose, discriminator, trigger
Tell the user what happened, in place. Message is the semantic banner —
InfoMessage, ConfirmationMessage, WarningMessage and ErrorMessage are its
ready-made meanings — optionally dismissible… Load when showing inline status,
alerts, dismissible notices, connection status, or progress.
```

## Bodies

A body earns its lines by carrying what the type signatures cannot:

- The **shortest correct call site** per component — copyable, no placeholder
  soup, real imports.
- **Rules a type can't express**: a required accessible name, an async
  lifecycle the component already owns, a geometry constant (44px targets), a
  platform difference (web vs native), which token family a state must come
  from.
- **Common Mistakes** as wrong/correct pairs, each with a severity and a
  `Source:` line. This is the highest-value section: it is what stops an agent
  from hand-rolling something the library already does.
- **Cross-skill pointers**, one line each, where a neighbouring skill owns the
  answer ("A read-only section behind one edit button is `EditableSurface`
  (alouette-data/SKILL.md), not a hand-built heading row on a bare `Surface`").

Leave out prop tables (the `.d.ts` is authoritative and always current),
exhaustive variant matrices, design rationale that changes no call site, and any
history of how the API used to look.

Every non-obvious claim needs a `Source:` line naming the file it came from —
that is what makes the next reconciliation a diff instead of a re-read.

## References

Split when a topic is needed by _some_ tasks only, or when the SKILL.md is
crowding 500 lines (`skills-status.ts` prints the budget). Good splits are
task-shaped: `field-arrays-and-editable-rows.md`, `app-shell.md`,
`choice-inputs.md`, `tokens.md`.

Splitting is not deleting. The parent keeps:

- the rule itself, in one or two sentences (an agent that never opens the
  reference must still not do the wrong thing), and
- a pointer where the detail used to be, phrased so it is obvious what is
  behind it: "Slots, breakpoints, the signed-out header and the per-route
  shell: [references/app-shell.md](references/app-shell.md)".

The reference carries the depth: the full example, the prop-level nuance, the
edge cases, the platform-specific behaviour. Files are listed in
`_artifacts/skill_tree.yaml` automatically by `scripts/skills-sync.ts` — never
hand-edit that list.

## Checklist before validating

- Description names purposes and triggers, no props, no variant values.
- Each component has one copyable call site.
- Each Common Mistake has wrong, correct, why, and `Source:`.
- Anything only some tasks need lives in `references/`, with the rule still
  stated in the parent.
- Confusable components are separated by an explicit discriminator sentence.
- `node scripts/skills-sync.ts` run, then `intent validate` and `intent stale`
  clean.
