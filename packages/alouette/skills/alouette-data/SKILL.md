---
name: alouette-data
description: >
  Data-display components. Badge: a small pill label for status, counts or
  categories. accent defaults to brand, size is sm/md, variant is
  solid (tinted) / solid.enabled (filled) / outlined; optional icon takes a
  rendered icon element and is auto-sized. Badge has no className prop and is
  not pressable. EditableItem: a labelled row (bold label + summary node +
  optional details/children) with a pencil IconButton; it owns no editor and
  calls onEdit, editAriaLabel is required. Load when labelling an item with a
  status, count, tag or category chip, or when showing a value with an edit
  affordance.
type: core
library: alouette
library_version: "21.0.0"
requires:
  - alouette-theming
  - alouette-actions
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/data/Badge.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/data/Badge.stories.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/data/EditableItem.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/data/EditableItem.stories.tsx"
---

This skill builds on alouette-theming. Read it first for the accent model.

# alouette — Data display

`Badge` is a small, self-sizing pill that labels something: a status, a count, a
category. It is display-only — it renders no press handling and no accessible
role.

## Setup

```tsx
import { Badge } from "alouette";

<Badge>New</Badge>;
```

## Core Patterns

### Accent

`accent` defaults to `"brand"` and drives the whole badge — it wraps its content
in `AccentScope`, so the background, border and text all resolve from the accent
theme in the current light/dark mode.

```tsx
<Badge accent="success">Paid</Badge>
<Badge accent="danger">Overdue</Badge>
<Badge accent="info">Beta</Badge>
```

### Variants

`variant` is `"solid" | "solid.enabled" | "outlined"`, default `"solid"`.

```tsx
<Badge variant="solid">Draft</Badge>          {/* tinted fill, sharp text */}
<Badge variant="solid.enabled">Active</Badge> {/* full accent fill, on-accent text */}
<Badge variant="outlined">Archived</Badge>    {/* accent border + accent text */}
```

`solid` is the quiet default (a tinted highlight background). Use
`solid.enabled` for the one badge that must read as switched-on, and `outlined`
where a fill would compete with the surface behind it.

### Size and icon

`size` is `"sm" | "md"` (default `"md"`) and controls padding, text size **and**
the icon size (12px / 16px). Pass `icon` as a rendered element; do not size it
yourself.

```tsx
import { StarRegularIcon } from "alouette-icons/phosphor-icons/StarRegularIcon";

<Badge size="sm" icon={<StarRegularIcon />}>
  Featured
</Badge>;
```

### Placement

The badge is `self-start`, so it never stretches to fill a stack. Position it
with a wrapper — it takes no `className`.

```tsx
<HStack className="gap-xs items-center">
  <Text className="text-base">Invoice #128</Text>
  <Badge accent="success" size="sm">Paid</Badge>
</HStack>
```

## EditableItem

`EditableItem` is the labelled row that shows a saved value and offers to edit
it: a bold `label`, a `summary` node beside it, and a pencil `IconButton` on the
right. It owns **no** editor and no state — it calls `onEdit`.

```tsx
import { EditableItem, Badge } from "alouette";

<EditableItem
  label="Display name"
  summary={<Badge accent="brand">Ada Lovelace</Badge>}
  editAriaLabel="Edit display name"
  onEdit={openEditor}
/>;
```

`summary` is any node — a `Badge` is only the most compact option; a `Text`
(sharp, muted or mono) reads better for a plain value, and omitting it leaves
the label alone. `details` adds muted helper text under the label, and
`children` render **below** the row for a value too large for `summary`.

```tsx
<EditableItem
  label="Biography"
  details="Shown on your public profile."
  editAriaLabel="Edit biography"
  onEdit={openEditor}
>
  <Paragraph>Mathematician and writer…</Paragraph>
</EditableItem>
```

`editAriaLabel` is required — the button has no visible text. `editIcon`
defaults to `PencilSimpleRegularIcon`; `variant` (`contained` / `outlined` /
`ghost`), `accent` and `disabled` are forwarded to the `IconButton`.

For the usual case — the editor is a modal form — use `FormEditableItem` from
alouette-forms/SKILL.md, which adds the open state, the `Modal` and its own
`Form`. Reach for `EditableItem` directly only when the editor is not a form
(navigating to a screen, opening a picker).

## Common Mistakes

### HIGH Passing the icon as a component instead of an element

Wrong:

```tsx
<Badge icon={StarRegularIcon}>Featured</Badge>
```

Correct:

```tsx
<Badge icon={<StarRegularIcon />}>Featured</Badge>
```

`icon` is typed `SVGIconElement` — a rendered element, matching `Button` and
`Message`. A component reference is a type error and renders nothing.

Source: packages/alouette/src/ui/data/Badge.tsx; ui/primitives/Icon.tsx

### MEDIUM Passing className to Badge

Wrong:

```tsx
<Badge className="ml-xs bg-blue-500">New</Badge>
```

Correct:

```tsx
<Box className="ml-xs">
  <Badge accent="info">New</Badge>
</Box>
```

`BadgeProps` is `accent | size | variant | icon | children` — there is no
`className` (nor `style`) prop. Appearance comes from `accent` + `variant`;
spacing and placement come from the parent.

Source: packages/alouette/src/ui/data/Badge.tsx

### MEDIUM Inventing variant or size values

Wrong:

```tsx
<Badge variant="filled" size="lg">Active</Badge>
```

Correct:

```tsx
<Badge variant="solid.enabled" size="md">Active</Badge>
```

`variant` is exactly `"solid" | "solid.enabled" | "outlined"` (note the dotted
name) and `size` is only `"sm" | "md"` — unlike `Message`, there is no `lg`.

Source: packages/alouette/src/ui/data/Badge.tsx

### MEDIUM Hand-rolling a pill with Box + Text

Wrong:

```tsx
<Box className="rounded-full bg-green-100 px-xs py-xxs">
  <Text className="text-xs">Paid</Text>
</Box>
```

Correct:

```tsx
<Badge accent="success" size="sm">Paid</Badge>
```

A manual pill uses raw Tailwind colors instead of accent tokens, so it does not
follow light/dark mode or the accent theme, and its padding/radius drift from
the scale.

Source: packages/alouette/src/ui/data/Badge.tsx

### LOW Expecting Badge to be pressable

`Badge` renders a plain `Box` — no `onPress`, no `role`, no interactive token
states. For a tappable chip, wrap it (or build the chip) with `PressableBox`
from alouette-actions, which wires the hover/focus/press/disabled states.

Source: packages/alouette/src/ui/data/Badge.tsx; ui/data/PressableBox.tsx

### HIGH Hand-rolling the label + value + pencil row

Wrong:

```tsx
<HStack className="items-center justify-between">
  <HStack className="items-center gap-sm">
    <Text className="font-body-bold text-md">Display name</Text>
    <Badge>{name}</Badge>
  </HStack>
  <IconButton size="sm" icon={<PencilSimpleRegularIcon />} onPress={openEditor} />
</HStack>
```

Correct:

```tsx
<EditableItem
  label="Display name"
  summary={<Badge>{name}</Badge>}
  editAriaLabel="Edit display name"
  onEdit={openEditor}
/>
```

The hand-rolled row drifts on spacing and usually forgets the edit button's
`aria-label`, leaving it unnamed for assistive tech. When the editor is a form
modal, `FormEditableItem` replaces the surrounding state as well.

Source: packages/alouette/src/ui/data/EditableItem.tsx

### MEDIUM Expecting EditableItem to open an editor

`EditableItem` renders no modal and holds no state — `onEdit` is yours to wire.
Nothing happens on press until you open something from it.

Source: packages/alouette/src/ui/data/EditableItem.tsx; ui/forms/FormEditableItem.tsx

See also: alouette-icons/SKILL.md for importing icon elements;
alouette-theming/SKILL.md for what each accent resolves to.
