---
name: alouette-menus
description: >
  Put several actions behind one trigger. Menu opens a list of MenuItem rows
  from any pressable the caller composes (anchored under it on web, an overlay
  on native): the home of secondary, rare or destructive actions, and of a set
  of checked choices. SplitButton is one button joined to a caret, whose menu
  picks which of several alternative actions the button runs without running
  it (a merge method); options that run as soon as they are picked are a Menu
  instead. Load when adding an overflow or "more" menu, a dropdown of actions,
  a kebab button, a context menu of a row, or a button with a choice of
  methods.
sources:
  - packages/alouette/src/ui/actions/Menu.tsx
  - packages/alouette/src/ui/actions/MenuItem.tsx
  - packages/alouette/src/ui/actions/SplitButton.tsx
  - packages/alouette/src/ui/actions/SplitButtonOption.tsx
---

This skill builds on alouette-actions (the buttons a menu opens from). Read it
first.

# alouette — Menus

## Menu of secondary actions

`Menu` is a pressable that opens a list of actions: anchored under its trigger on
web, an overlay on native. Prefer it over a row of buttons for actions that are
secondary, rare or destructive. The trigger is composed through `render` — spread
the params it gives you (they carry the `ref`, `onPress`, `aria-haspopup` and
`aria-expanded`) onto any pressable. `label` names the menu; `header` renders
above the items, outside the `menu` element.

```tsx
import { IconButton, Menu, MenuItem, Separator } from "alouette";

<Menu
  label="Document actions"
  render={(triggerProps) => (
    <IconButton
      icon={<DotsThreeRegularIcon />}
      aria-label="Document actions"
      variant="soft"
      {...triggerProps}
    />
  )}
>
  <MenuItem label="Rename" icon={<PencilRegularIcon />} onPress={rename} />
  <Separator />
  <MenuItem label="Delete" accent="danger" onPress={remove} />
</Menu>;
```

A `MenuItem` closes the menu after its `onPress`. `accent` colors its label and
icon (`danger` for a destructive action — the row itself stays a plain surface).
`href` renders a real anchor on web, so expo Router's `<Link asChild>` composes
with it, and a disabled item drops the `href`. `description` adds a line under
the label; `checked` makes the rows a set of choices (`menuitemradio`), and the
menu then opens on the checked one. `activeIcon` swaps the glyph on hover,
focus and press, as on a `Button`.

On web the panel hangs from the trigger's end edge and sizes to its items. A
full-width trigger takes `align="start"`, or `width="anchor"` to make the panel
exactly as wide; a trigger pinned at the bottom of the viewport (a sidebar's
account row) takes `side="top"`.

The account menu of an application header is already built on it:
`AppHeaderAccount` and `AppSidebarAccount` take the `MenuItem`s as children
(alouette-app-shell/SKILL.md).

Source: packages/alouette/src/ui/actions/Menu.tsx; ui/actions/MenuItem.tsx

## SplitButton — one button, a choice of which action it runs

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

Source: packages/alouette/src/ui/actions/SplitButton.tsx

## Common Mistakes

### MEDIUM Not spreading the trigger params onto the trigger

Wrong:

```tsx
<Menu label="Document actions" render={() => <IconButton … onPress={open} />}>
```

Correct:

```tsx
<Menu
  label="Document actions"
  render={(triggerProps) => (
    <IconButton aria-label="Document actions" icon={…} {...triggerProps} />
  )}
>
```

The params carry the `ref` the web panel anchors to, the `onPress` that opens
it, and `aria-haspopup` / `aria-expanded`. Without them the menu never opens, or
opens unanchored and unannounced.

Source: packages/alouette/src/ui/actions/Menu.tsx

### HIGH Anything but `SplitButtonOption` as a child of SplitButton

The children render twice: as the rows of the menu and as the main button's
label, where only the selected option prints its `label`. A `Separator`, a
`View` or a text node would land inside the button's label.

Source: packages/alouette/src/ui/actions/SplitButton.tsx

### MEDIUM A SplitButton whose options run immediately

If picking an entry should run it, the options are a `Menu` of `MenuItem`s next
to (or as the trigger of) a `Button`: a `SplitButton` row never runs its action.
Several alternatives to the primary action of a `DecisionBar` are one of the
two, never a row of extra buttons (alouette-actions/SKILL.md).

Source: packages/alouette/src/ui/actions/SplitButton.tsx
