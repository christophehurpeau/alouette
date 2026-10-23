# Pressable surfaces — PressableBox and PressableListItem

The base of every custom pressable: the hover, focus, press and disabled
affordance from the `interactive-*` tokens, the focus ring and the accent scope,
so none of it is rebuilt by hand.

## PressableBox and PressableListItem

`PressableBox` is a themed, pressable container (`variant`, `accent`,
`forceStyle`; `tonal` by default; `raised={false}` drops the tonal shadow for a
segment of a group that casts one). `PressableListItem` is a row with a
trailing caret, on the same `tonal` material as a button: a card lifted off
the surface whose ground is a tone of the theme, never the accent's fill. Its
label and caret are `text-on-tonal`, the ink that carries the accent where
the ground cannot. These, and the
link components below, are how something becomes interactive — never by wrapping
a display-only component (`Badge`, `Bullet`, `Text`) in a `Link` or `Pressable`
(alouette-styling/SKILL.md).

```tsx
import { PressableBox, PressableListItem, Text } from "alouette";

<PressableBox onPress={open}>
  <Text>Custom card</Text>
</PressableBox>

<PressableListItem onPress={open}>
  <Text>Row label</Text>
</PressableListItem>;
```

A `PressableListItem` holding more than a title needs `aria-label` ("Open Add
dark mode"), else the row is announced as every label, badge and date it holds.
`actions` pins buttons to the row's bottom end; each is a nested pressable that
takes its own press (the row's `onPress` does not fire), so give each its own
handler. On web a `role="button"` row is a `<button>`, so actions nest a button
in a button: pass `role="listitem"` (inside a `role="list"`) or `"menuitem"` for
valid markup. `href` makes the row a real `<a>` — only on a row with no
`actions` and no link in its children, which would nest inside the anchor.
The row has no outer margin, so it lines up with the content around it: the
list holding the rows spaces them (`<View className="gap-xs">`).

```tsx
<PressableListItem
  aria-label="Open Add dark mode"
  actions={<Button size="sm" text="Merge" onPress={merge} />}
  onPress={open}
>
  <Text className="font-body-bold">Add dark mode</Text>
</PressableListItem>
```

Source: packages/alouette/src/ui/actions/PressableListItem.tsx

`PressableBox` carries `group`, so a child can style itself from the pressable's
state (`group-hover:`, `group-active:`) — that is how `InteractiveIcon` swaps a
glyph. It also forwards its `ref`, as `Button` and `IconButton` do, so a button
can anchor a `Popover` or a `Menu`.

`href` makes it a link: react-native-web renders a real `<a>` (native ignores it
and routes from `onPress` — expo Router's `<Link asChild>` injects both), and the
default `role` becomes `"link"` instead of `"button"`. Every pressable built on
it inherits this — `Button`, `IconButton`, `AppHeaderSignIn` — and a component
needing another role passes its own (`MenuItem` stays a `menuitem`).

```tsx
<PressableBox href="/login">
  <Text>Log in</Text>
</PressableBox>
```

The keyboard focus ring is the `focus-ring` utility in the accent ink, on
`focus-visible` only — a mouse click never leaves a ring or a changed ground
behind. A `tonal` or `soft` pressable rings 2px inside its edge, `filled` and
`outlined` 2px outside it. `withFocusVisibleOutline="inset"` moves the ring inside for a
pressable whose parent clips (a `surface` is `overflow-hidden`), and
`withFocusVisibleOutline={false}` drops it for a row of a list that already
paints its cursor (a menu item, a listbox option), where the outline would ring
whatever the pointer crosses. `false` emits `outline-solid outline-0`, not
`outline-none` — react-native-css drops `outline-style: none`, so the UA ring
would survive.

Source: packages/alouette/src/ui/actions/PressableBox.tsx
