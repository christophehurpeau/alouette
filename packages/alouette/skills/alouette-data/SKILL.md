---
name: alouette-data
description: >
  Data-display components. Badge: a small pill label for status, counts or
  categories. accent defaults to brand, size is sm/md, variant is
  solid (tinted) / solid.enabled (filled) / outlined; optional icon takes a
  rendered icon element and is auto-sized. Badge has no className prop and, like
  Bullet, is display-only: never wrap it in a Link or Pressable.
  EditableItem: a labelled row (bold label + summary node +
  optional details/children) with a pencil IconButton; it owns no editor and
  calls onEdit, editAriaLabel is required. Bullet: an icon + text list row, the
  icon tinted with the current accent. Code: an inline mono fragment that
  inherits the surrounding text size. CodeBlock: a lowered block of code that
  scrolls horizontally, with an optional title. Blockquote: a quoted excerpt with
  an accent rule and an optional citation node. Citation: an em dash plus the
  source, optionally linked. Load when labelling an item with a
  status, count, tag or category chip, when listing points with an icon, when
  showing a value with an edit affordance, or when rendering code, a quote or
  its attribution.
type: core
library: alouette
library_version: "22.9.0"
requires:
  - alouette-theming
  - alouette-actions
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/data/Badge.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/data/Badge.stories.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/data/EditableItem.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/data/EditableItem.stories.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/data/Bullet.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/data/Bullet.stories.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/data/Code.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/data/CodeBlock.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/data/Blockquote.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/data/Citation.tsx"
---

This skill builds on alouette-theming. Read it first for the accent model.

# alouette — Data display

`Badge` is a small, self-sizing pill that labels something: a status, a count, a
category. It is display-only — it renders no press handling and no accessible
role, and is never wrapped in a `Link` or `Pressable` to gain one; put the link
beside it.

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
  <Badge accent="success" size="sm">
    Paid
  </Badge>
</HStack>
```

## Bullet

`Bullet` is one row of an icon-led list: a leading `icon` tinted `text-accent`
and the text as `children`. It takes no `accent` of its own — it reads the
nearest scope, so accent a whole list by accenting its container. Stack rows in a
`VStack` and choose the gap yourself.

```tsx
import { Bullet, VStack } from "alouette";
import { CheckCircleRegularIcon } from "alouette-icons/phosphor-icons/CheckCircleRegularIcon";

<VStack className="gap-xs">
  <Bullet icon={<CheckCircleRegularIcon />}>Consistent UI</Bullet>
  <Bullet icon={<CheckCircleRegularIcon />}>Accessible</Bullet>
</VStack>;
```

The icon stays aligned with the **first** line (`items-start`) and the text
shrinks, so long content wraps under itself rather than pushing the icon down.

## Code and CodeBlock

`Code` is an inline fragment — mono family on the highlight layer, `role="code"`
(a real `<code>` on web). It sets **no** size class, so nested in a `Text` or
`Paragraph` it inherits the surrounding size and never breaks the line rhythm.

```tsx
import { Code, CodeBlock, Paragraph } from "alouette";

<Paragraph>
  Run <Code>pnpm --filter alouette build:css</Code> after editing the palette.
</Paragraph>;
```

`CodeBlock` is the block form: a lowered `Surface` holding mono text that scrolls
horizontally instead of wrapping, with an optional `title` (a file name or a
language) above it and `size` `"sm" | "md"` (default `"md"`) for the code text.

```tsx
<CodeBlock title="theme.ts">{`export const theme = {
  accent: "brand",
};`}</CodeBlock>
```

Both are display-only. To offer copying, put an `IconButton` beside the block —
never wrap it in a pressable.

## Blockquote and Citation

`Blockquote` renders a quoted excerpt behind an accent rule on its leading edge
(`role="blockquote"` → a real `<blockquote>` on web); its `children` are the
quote text and go into a `Paragraph`, sized by `size` `"sm" | "md"`. Attribution
goes to the `citation` prop as a node — normally a `Citation`.

```tsx
import { Blockquote, Citation } from "alouette";

<Blockquote
  accent="brand"
  citation={
    <Citation href="https://example.com/the-left-hand-of-darkness">
      The Left Hand of Darkness
    </Citation>
  }
>
  Light is the left hand of darkness.
</Blockquote>;
```

`Citation` is an em dash plus the source, muted, `size` `"sm" | "md"`. With
`href` the source becomes an `ExternalLinkText` (so `openLinkBehavior` applies);
without it, plain muted text. It stands alone under any excerpt, not only under a
`Blockquote`.

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
`Form` — its fields come through `render`, which hands them that inner `Form`'s
`control`. Reach for `EditableItem` directly only when the editor is not a form
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
<Badge variant="filled" size="lg">
  Active
</Badge>
```

Correct:

```tsx
<Badge variant="solid.enabled" size="md">
  Active
</Badge>
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
<Badge accent="success" size="sm">
  Paid
</Badge>
```

A manual pill uses raw Tailwind colors instead of accent tokens, so it does not
follow light/dark mode or the accent theme, and its padding/radius drift from
the scale.

Source: packages/alouette/src/ui/data/Badge.tsx

### HIGH Wrapping a display-only component in a Link or Pressable

`Badge`, `Bullet` and an `EditableItem` `summary` are display-only; wrapping one
to make it interactive is forbidden — see alouette-styling/SKILL.md for the rule.
On native it is also broken layout: an expo Router `<Link>` without `asChild`
renders a `Text`, which cannot contain the `View` these components render.

Wrong:

```tsx
<Link href={ticket.url}>
  <Badge>{ticket.key}</Badge>
</Link>
```

Correct — the link beside the badge it labels, or inside the `Bullet` text:

```tsx
<HStack className="gap-xs items-center">
  <ExternalLinkText size="sm" href={ticket.url} text={ticket.key} />
  {ticket.status ? <Badge size="sm">{ticket.status}</Badge> : null}
</HStack>

<Bullet icon={<FileRegularIcon />}>
  <ExternalLinkText href={doc.url} text={doc.title} />
</Bullet>
```

When the pressable target must itself be a pill, build the chip with
`PressableBox` (alouette-actions) rather than nesting a `Badge` in a link.

Source: packages/alouette/src/ui/data/Badge.tsx; ui/actions/ExternalLinkText.tsx;
ui/actions/PressableBox.tsx

### HIGH Hand-rolling the label + value + pencil row

Wrong:

```tsx
<HStack className="items-center justify-between">
  <HStack className="items-center gap-sm">
    <Text className="font-body-bold text-md">Display name</Text>
    <Badge>{name}</Badge>
  </HStack>
  <IconButton
    size="sm"
    icon={<PencilSimpleRegularIcon />}
    onPress={openEditor}
  />
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

### MEDIUM Hand-rolling a bulleted row

Wrong:

```tsx
<HStack className="gap-sm items-start">
  <Icon icon={<CheckCircleRegularIcon />} className="text-accent" />
  <Text className="shrink">Accessible</Text>
</HStack>
```

Correct:

```tsx
<Bullet icon={<CheckCircleRegularIcon />}>Accessible</Bullet>
```

That is exactly what `Bullet` renders. Hand-rolled rows drift on the gap and
routinely drop `shrink` on the `Text`, which stops long text from wrapping.

Source: packages/alouette/src/ui/data/Bullet.tsx

### MEDIUM Expecting EditableItem to open an editor

`EditableItem` renders no modal and holds no state — `onEdit` is yours to wire.
Nothing happens on press until you open something from it.

Source: packages/alouette/src/ui/data/EditableItem.tsx; ui/forms/FormEditableItem.tsx

### MEDIUM Pinning a size on inline Code

Wrong:

```tsx
<Paragraph className="text-xl">
  Run <Code className="text-sm">build:css</Code> first.
</Paragraph>
```

Correct:

```tsx
<Paragraph className="text-xl">
  Run <Code>build:css</Code> first.
</Paragraph>
```

`Code` deliberately carries no size class so it inherits the text it sits in; a
fixed size makes the fragment jump out of the line on both platforms.

Source: packages/alouette/src/ui/data/Code.tsx

### MEDIUM Hand-rolling a code block with Surface + Text

Wrong:

```tsx
<Surface variant="lowered">
  <Text className="font-mono text-sm">{snippet}</Text>
</Surface>
```

Correct:

```tsx
<CodeBlock title="theme.ts">{snippet}</CodeBlock>
```

The hand-rolled block wraps long lines instead of scrolling them, and drops the
`select-auto` / `web:whitespace-pre` pair that keeps the code selectable and
its indentation intact on web.

Source: packages/alouette/src/ui/data/CodeBlock.tsx

See also: alouette-icons/SKILL.md for importing icon elements;
alouette-theming/SKILL.md for what each accent resolves to;
alouette-external-links/SKILL.md and alouette-actions/SKILL.md for the link and
pressable components these display-only ones must never stand in for.
