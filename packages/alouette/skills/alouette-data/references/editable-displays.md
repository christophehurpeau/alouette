# alouette — EditableItem & EditableSurface

The two read-only displays that carry an edit affordance. Both show a saved
value behind a single pencil `IconButton` and own **no** editor and no state:
they call `onEdit`, and that button is the only pressable — pressing the value
or the body does nothing. `editAriaLabel` is required (the button has no visible
text) and `editIcon` defaults to `PencilSimpleRegularIcon`.

## EditableItem — one labelled value

A bold `label`, a `summary` node beside it, `details` as muted helper text under
it, and `children` **below** the row for a value too large for `summary`.

```tsx
import { EditableItem, Badge } from "alouette";

<EditableItem
  label="Display name"
  summary={<Badge accent="brand">Ada Lovelace</Badge>}
  details="Shown on your public profile."
  editAriaLabel="Edit display name"
  onEdit={openEditor}
/>;

<EditableItem
  label="Biography"
  editAriaLabel="Edit biography"
  onEdit={openEditor}
>
  <Paragraph>Mathematician and writer…</Paragraph>
</EditableItem>;
```

`summary` is any node — a `Badge` is only the most compact option; a `Text`
(sharp, muted or mono) reads better for a plain value, and omitting it leaves the
label alone. `variant` (`contained` / `outlined` / `ghost`), `accent` and
`disabled` are forwarded to the `IconButton`.

## EditableSurface — a titled section

A `Surface` with a `title` heading, an optional `titleBadge` beside it,
`details` under it, and `children` as the read-only body. It renders
`role="region"` labelled by the `title` alone — the badge stays out of the
accessible name.

```tsx
<EditableSurface
  title="Event details"
  titleBadge={<Badge accent="brand">12 August 2026</Badge>}
  details="The date, and what guests see before coming."
  editAriaLabel="Edit event details"
  onEdit={openEditor}
>
  <Paragraph className="text-sm">An evening of readings…</Paragraph>
  <Paragraph className="text-muted text-sm">
    The gate closes at 19:00.
  </Paragraph>
</EditableSurface>
```

`accent`, `className`, `shadow`, `size` and `variant` are the **`Surface`'s**
(alouette-layout/SKILL.md), so the edit button's own
`contained` / `outlined` / `ghost` / `soft` goes through `editIconVariant`:

```tsx
// Wrong — `ghost` is not a Surface variant
<EditableSurface variant="ghost" … />
// Correct
<EditableSurface variant="lowered" editIconVariant="ghost" … />
```

## Choosing between them, and wiring the editor

Choose by shape, not by size: one value with a short summary is an
`EditableItem`; a titled section of several blocks is an `EditableSurface`.

When the editor is a modal form, use `FormEditableItem` / `FormEditableSurface`
(alouette-forms/SKILL.md) instead of wiring `onEdit` yourself — they add the open
state, the `Modal` and its own `Form`, whose fields come through `render` bound
to that inner form's `control`. Reach for the plain components only when the
editor is not a form: navigating to a screen, opening a picker.

Source: packages/alouette/src/ui/data/EditableItem.tsx;
ui/containers/EditableSurface.tsx
