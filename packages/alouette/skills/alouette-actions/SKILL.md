---
name: alouette-actions
description: >
  Everything the user presses. Button and IconButton are the primary actions;
  ActionButton is the one to reach for when pressing starts an async operation —
  it runs the promise and shows the spinner, the success state and the failure
  message itself. ExternalLinkButton and InternalLinkButton are the
  link-shaped buttons, LinkText and ExternalLinkText the inline links inside a
  sentence, and Menu + MenuItem the dropdown that collects secondary actions
  behind one trigger. PressableBox and PressableListItem are the bases for a
  custom pressable surface: they carry the hover, focus, press and disabled
  affordance so it never has to be rebuilt by hand. Load when adding buttons,
  text links, a menu of actions, or custom pressable elements.
type: core
library: alouette
library_version: "22.11.0"
requires:
  - alouette-theming
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/actions/Button.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/actions/ActionButton.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/actions/IconButton.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/actions/PressableBox.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/actions/PressableListItem.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/actions/LinkText.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/actions/Menu.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/actions/MenuItem.tsx"
---

This skill builds on alouette-theming. Read it first for the accent model.

# alouette — Actions

Buttons and pressables carry interactive token states (hover/focus/active/
disabled) automatically. `variant` is
`"contained" | "list" | "outlined" | "ghost" | "soft"`; `size` is
`"sm" | "md"`; `accent`
is `"brand"` (default) `| "danger" | "info" | "success" | "warning" | "neutral"`.

**Differentiate buttons by `accent`, not by `variant`.** `contained` is the
material an action button is made of; the accent says how loud it is. The
secondary action beside a call to action is `accent="neutral"` — the same raised
ground and shadow on the neutral tokens — never a lighter `variant`.

## Setup

```tsx
import { Button } from "alouette";
import { CheckRegularIcon } from "alouette-icons/phosphor-icons/CheckRegularIcon";

<Button text="Save" icon={<CheckRegularIcon />} onPress={save} />;
```

## Core Patterns

### Button accents

```tsx
<Button text="Save" />                                 {/* contained, brand */}
<Button accent="neutral" text="Cancel" />                 {/* contained, neutral */}
<Button accent="danger" text="Delete" />
<Button size="sm" text="Small" />
```

`accent="neutral"` resolves to the plain mode theme (alouette-theming/SKILL.md), so
the button keeps the contained material — ground, shadow, hover/focus/press
states — on the grayscale palette. The neutral theme is an accent, not the
absence of one: the fill takes the same scale steps a colored accent does, so it
is a dark gray ground under the same white `text-on-accent` label. That is the Cancel of a
confirmation, the Close of a modal, the Add of a field array, the "Sign up"
beside a "Log in": a real button that does not compete with the accented one.
`AlertDialog` and the form editor modals already build their footers this way.

### The other variants are chrome, not secondary buttons

```tsx
<Button variant="soft" text="Docs" />
<IconButton variant="ghost" icon={<XRegularIcon />} aria-label="Close" />
```

`soft` has no ground and no border at rest: the affordance is a fill arriving on
hover/focus/press, and that fill is a tone of the surrounding surface rather than
the accent, so the label keeps its own color (never flip it to `text-on-accent`).
It is what a header pressable or a menu row wants, where a border tint reads as
noise.

`ghost` is the icon-only affordance inside a component's own frame — the modal
close, the message dismiss, the remove button of a field-array row — where a
second ground inside the frame would read as a nested card.

`outlined` has no default use. Reach for it only for a pressable that must not
carry a ground and is not chrome — a row of equal-weight actions in a dense
toolbar. A secondary or destructive-but-secondary action is `accent="neutral"` (or
`accent="danger"`), not `outlined`.

### Async action — prefer ActionButton

For a direct action whose `onPress` is async (delete, retry, publish — not a
form submit, which uses `FormSubmitButton`), use `ActionButton`. It runs the
promise, derives the button `state` for you (spinner while pending, terminal
icon on settle), and renders an inline `ErrorMessage` on rejection. Map the
error to a string via the required `errorToMessage`.

```tsx
import { ActionButton } from "alouette";

<ActionButton
  accent="danger"
  text="Delete"
  onPress={async () => deleteItem(id)}
  errorToMessage={(error) =>
    error instanceof Error ? error.message : "Failed"
  }
/>;
```

`ActionButton` omits `onPress`/`state` from `ButtonProps` and manages them
itself — don't pass `state` to it.

The failure message is a raised `ErrorMessage`. When the button already sits
inside a raised surface (a `Surface` card, a modal panel), pass
`errorMessageVariant="flat"` so the message doesn't read as a card on a card:

```tsx
<Surface>
  <ActionButton
    text="Delete"
    errorMessageVariant="flat"
    onPress={remove}
    errorToMessage={toMessage}
  />
</Surface>
```

Leave it unset everywhere else — see alouette-feedback for when `flat` is
warranted.

### Manual loading state

Reach for `Button`'s `state` prop directly only when `ActionButton` doesn't fit
(state driven externally, e.g. by a form or store). `state` drives a transient
overlay and disables the button: `"loading"` shows an indeterminate spinner,
`"success"` a check, `"failed"` a warning icon (the spinner plays its finish
animation before the terminal icon). Any non-`undefined` `state` disables presses.

```tsx
import { Button, type ButtonState } from "alouette";

<Button text="Save" state={submitState} onPress={save} />;
// submitState: ButtonState | undefined = "loading" | "success" | "failed"
```

Don't drive loading UI yourself (spinner + manual `disabled`) — use
`ActionButton`, or set `state`.

### Icon-only button

```tsx
import { IconButton } from "alouette";
import { XRegularIcon } from "alouette-icons/phosphor-icons/XRegularIcon";

<IconButton icon={<XRegularIcon />} aria-label="Close" onPress={close} />;
```

`size` is `"sm" | "md"` or a number (custom diameter in px); `iconSize="fill"`
makes the icon take 80% of the button.

### Icon weight on interaction

`Button`, `IconButton` and `MenuItem` take an optional `activeIcon` next to
`icon` — usually the duotone twin of the same glyph — rendered while the control
is hovered, focused or pressed. It is an accent on top of the affordance, not a
replacement: the background and border still come from the `interactive-*`
tokens, and a disabled control never swaps.

```tsx
import { ArrowLeftDuotoneIcon } from "alouette-icons/phosphor-icons/ArrowLeftDuotoneIcon";
import { ArrowLeftRegularIcon } from "alouette-icons/phosphor-icons/ArrowLeftRegularIcon";

<Button
  text="Back"
  icon={<ArrowLeftRegularIcon />}
  activeIcon={<ArrowLeftDuotoneIcon />}
  onPress={goBack}
/>;
```

### Pressable surfaces

`PressableBox` is a themed, pressable container (`variant`, `accent`,
`forceStyle`). `PressableListItem` is a row with a trailing caret, on the
`list` variant: a card lifted off the surface whose ground is a tone of the
theme — the card steps when neutral, the accent's pale tints in light mode and its
own dark ground in dark mode, never the accent's fill. Its label and caret are
`text-on-list`, the ink that carries the accent where the ground cannot. These, and the
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

`withFocusVisibleOutline={false}` drops the focus ring for a row of a list that
already paints its cursor (a menu item, a listbox option), where the outline
would ring whatever the pointer crosses. It emits `outline-solid outline-0`, not
`outline-none` — react-native-css drops `outline-style: none`, so the UA ring
would survive.

### Link buttons

```tsx
import { ExternalLinkButton, ExternalLinkText, InternalLinkButton, LinkText } from "alouette";

<ExternalLinkButton href="https://example.com" text="Open" />
<InternalLinkButton href="/settings" text="Settings" />
```

`LinkText` and `ExternalLinkText` are the inline counterparts — one underlined
text link treatment, for a link inside a text flow rather than a call to action.
`LinkText` goes to an in-app destination (`href` renders a real `<a>` on web,
native routes from `onPress`; `icon` is leading), `ExternalLinkText` leaves the
app and adds the trailing arrow. `size` is `"sm" | "md"` on both. Primary
navigation between screens is a `NavBar`, not a text link
(alouette-navigation/SKILL.md); for full external-link control (in-app browser vs
new tab), see alouette-external-links/SKILL.md.

```tsx
<LinkText href="/settings" text="Account settings" />
```

### Menu of secondary actions

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
      variant="ghost"
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
with it, and a disabled item drops the `href`.

## Common Mistakes

### HIGH Passing the button label as children instead of text

Wrong:

```tsx
<Button>Save</Button>
```

Correct:

```tsx
<Button text="Save" />
```

`Button` renders its label from the required `text` prop (plus an optional `icon`
prop); children are ignored, so `<Button>Save</Button>` shows no label.

Source: packages/alouette/src/ui/actions/Button.tsx

### HIGH `outlined` / `ghost` as the secondary button

Wrong:

```tsx
<Button variant="outlined" text="Cancel" onPress={close} />
<Button text="Save" onPress={save} />
```

Correct:

```tsx
<Button accent="neutral" text="Cancel" onPress={close} />
<Button text="Save" onPress={save} />
```

Both actions are buttons and must be made of the same material; what separates
them is the accent, not the amount of button they get. `outlined` and `ghost`
trade the ground and the shadow away, so the pair reads as one button and one
half-drawn thing — and on a `Surface` an outlined button's `bg-highlight` fights
the card it sits on. `accent="neutral"` keeps the material and drops only the color.

Source: packages/alouette/src/ui/containers/AlertDialog.tsx, ui/actions/Button.tsx

### HIGH Using non-existent variant names

Wrong:

```tsx
<Button variant="ghost-contained" text="Cancel" />
<Button variant="primary" text="Save" />
```

Correct:

```tsx
<Button variant="ghost" text="Cancel" />
<Button accent="brand" text="Save" />
```

`variant` is only `"contained" | "list" | "outlined" | "ghost" | "soft"`; the
accent is
chosen via the `accent` prop — `"brand" | "danger" | "info" | "success" |
"warning" | "neutral"`. (`ghost` is a variant value, not a separate boolean prop.)

Source: packages/alouette/src/ui/actions/PressableBox.tsx, ui/actions/Button.tsx

### MEDIUM IconButton without aria-label

Wrong:

```tsx
<IconButton icon={<XRegularIcon />} onPress={close} />
```

Correct:

```tsx
<IconButton icon={<XRegularIcon />} aria-label="Close" onPress={close} />
```

`IconButton` types `aria-label` as required because it has no text label;
omitting it is an accessibility failure and a type error.

Source: packages/alouette/src/ui/actions/IconButton.tsx

### HIGH IconButton triggering an async action instead of ActionButton

Wrong:

```tsx
<IconButton
  icon={<TrashRegularIcon />}
  aria-label="Delete"
  onPress={async () => deleteItem(id)}
/>
```

Correct:

```tsx
<ActionButton
  accent="danger"
  text="Delete"
  icon={<TrashRegularIcon />}
  onPress={async () => deleteItem(id)}
  errorToMessage={(error) =>
    error instanceof Error ? error.message : "Failed"
  }
/>
```

An icon alone doesn't communicate intent reliably — a visible text label is
required for any action with consequences. An `IconButton` also has no async
affordance: it won't show a spinner while the promise is pending or surface a
rejection. Use `ActionButton` (text + optional `icon`) so the intent is explicit
and the pending/error states are handled.

Source: packages/alouette/src/ui/actions/ActionButton.tsx, ui/actions/IconButton.tsx
