# Button materials — which variant and accent, on which ground

The rules are in SKILL.md; this is why each holds, and the cases at the edges.

## tonal, neutral and filled

`tonal` is a ground **lighter than the page it sits on**, lifted by
`shadow-s`: the lightest card step when neutral, the accent's pale tints in light
mode and its own dark ground in dark mode. The hue is carried by the
`text-on-tonal` ink (label and icon) — the accent itself on a light ground,
the sharp ink on a dark one — because a tint pale enough for dark ink cannot
carry it (a pale red reads as pink).

`accent="neutral"` resolves to the plain mode theme (alouette-theming/SKILL.md), so
the button keeps the tonal material — ground, shadow, hover/focus/press
states — on the grayscale palette: a white card with sharp ink. That is a lone
action that must not carry the accent: a `Menu` trigger, the Add of a field
array, a `Modal` footer's single "Close". Beside a primary action it becomes
`variant="soft"`: a neutral `tonal` twin reads as a second equal choice, and on
a white `bg-highlight` ground — a `Modal` or `AlertDialog` panel, the `AppHeader`
bar — its ground is the ground itself and dissolves. The form editor modals'
Cancel and the header's "Sign up" beside "Log in" are neutral `soft`.

`filled` is the accent's own fill, flat, under the `text-on-accent` label —
for the one action that must dominate its neighbours. The neutral theme is an
accent, not the absence of one: its fill is the sharp ink turned into a ground,
so a neutral `filled` button is black with a white label in light mode and
white with a dark label in dark mode. Beside a `filled` call to action, the
other action is neutral `soft`.

**On an accented surface** (`<Box accent className="surface">`, a
`GradientBackground`), a lone `tonal` button is always `accent="neutral"`: in light
mode an accented `tonal` ground is the accented surface's own step, so it
dissolves into it. The accented action there is `filled`, or `soft` for chrome.
What counts is the ground, not the theme: a `bg-highlight` panel stays neutral
inside an accented theme, so an accented `Modal` or `AlertDialog` keeps a
`tonal` confirm (with a neutral `soft` Cancel). On web, `PressableBox` warns
outside production when an accented `tonal` pressable has the same ground as the
surface behind it.

```tsx
<Box accent="danger" className="surface">
  <Button accent="neutral" variant="soft" text="Keep" onPress={keep} />
  <Button variant="filled" accent="danger" text="Delete" onPress={remove} />
</Box>
```

## `soft` beyond the secondary action, and `outlined`

```tsx
<Button variant="soft" text="Docs" />
<IconButton variant="soft" icon={<XRegularIcon />} aria-label="Close" />
```

`soft` has no ground and no border at rest: the affordance is a fill arriving on
hover/focus/press, and that fill is a tone of the surrounding surface rather than
the accent. A `PressableBox` row composed on it (a header pressable, a menu row)
therefore keeps its own label color — never flip it to `text-on-accent`. It is
what a header pressable or a menu row wants, where a border tint reads as noise,
and the icon-only affordance inside a component's own frame — the modal close,
the message dismiss, the remove button of a field-array row — where a second
ground inside the frame would read as a nested card. With no ground to carry the
accent, the soft `Button` carries it in its label (`text-accent`, underlined —
a text button), and the soft `IconButton` glyph turns `text-accent` on
hover/focus/press.

`outlined` has no default use. Reach for it only for a pressable that must not
carry a ground and is not chrome — a row of equal-weight actions in a dense
toolbar. A secondary action is `accent="neutral" variant="soft"`, not
`outlined`.

Source: packages/alouette/src/ui/actions/PressableBox.tsx; ui/actions/Button.tsx;
ui/actions/IconButton.tsx
