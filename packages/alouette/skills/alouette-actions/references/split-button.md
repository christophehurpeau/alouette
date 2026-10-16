# SplitButton — one button, a choice of which action it runs

`SplitButton` is a button joined to a caret. The main button shows and runs the
selected option; the caret opens a menu that changes the selection **without
running it** (GitHub's merge button). Reach for it when several actions are
alternatives to one another and the user picks one, then commits — not for a
list of unrelated secondary actions, which is a `Menu`.

```tsx
import { SplitButton, SplitButtonOption } from "alouette";

<SplitButton
  menuLabel="Merge method"
  defaultValue="squash"
  onPress={(method) => merge(method)}
>
  <SplitButtonOption
    value="squash"
    label="Squash and merge"
    description="The 3 commits will be combined into one commit in the base branch."
  />
  <SplitButtonOption value="rebase" label="Rebase and merge" />
  <SplitButtonOption value="merge" label="Create a merge commit" disabled />
</SplitButton>;
```

- `value` (controlled, with `onValueChange`) or `defaultValue` is required and
  must name one of the options: the selected option's `label` is the main
  button's text and accessible name.
- `menuLabel` names the group, the caret and the menu.
- `variant` is `tonal`, `filled` or `outlined` — no `soft`, a text button has no
  ground to split. `size`, `accent`, `disabled` and `state` are `Button`'s; the
  caret is disabled while `state` is set, so a running action cannot be swapped.
- The rows are `MenuItem`s with `checked`, so the menu opens on the checked one
  and the arrows move between the enabled ones.

## Common mistakes

### HIGH Anything but `SplitButtonOption` as a child

The children render twice: as the rows of the menu and as the main button's
label, where only the selected option prints its `label`. A `Separator`, a
`View` or a text node would land inside the button's label.

### MEDIUM A SplitButton whose options run immediately

If picking an entry should run it, the options are a `Menu` of `MenuItem`s next
to (or as the trigger of) a `Button`: a `SplitButton` row never runs its action.

Source: packages/alouette/src/ui/actions/SplitButton.tsx
