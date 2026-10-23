---
name: alouette-actions
description: >
  Everything the user presses. Button and IconButton are the actions;
  ActionButton is the one to reach for when pressing starts an async operation
  — it runs the promise and shows its pending, success and failure states. DecisionBar is the row of actions ending a decision
  (a dialog footer, a form's Cancel and Save) and owns their order. The
  secondary action beside a primary one is a neutral soft text button, never a
  second tonal one. ExternalLinkButton and InternalLinkButton are link-shaped
  buttons; LinkText and ExternalLinkText the links inside a sentence.
  PressableBox and PressableListItem are the bases of a custom pressable card
  or row: nothing becomes interactive by being wrapped. A disabled button says why with
  disabledReason, and Tooltip describes any other element. Menus of actions
  are alouette-menus. Load when adding buttons, an async action, dialog or form
  actions, text links, a tooltip, or a custom pressable card or list row.
sources:
  - packages/alouette/src/ui/actions/Button.tsx
  - packages/alouette/src/ui/actions/ActionButton.tsx
  - packages/alouette/src/ui/actions/DecisionBar.tsx
  - packages/alouette/src/ui/actions/IconButton.tsx
  - packages/alouette/src/ui/actions/PressableBox.tsx
  - packages/alouette/src/ui/actions/PressableListItem.tsx
  - packages/alouette/src/ui/actions/LinkText.tsx
  - packages/alouette/src/ui/actions/LinkTextFrame.tsx
  - packages/alouette/src/ui/containers/Tooltip.tsx
  - packages/alouette/src/ui/containers/Tooltip.web.tsx
  - packages/alouette/src/ui/containers/mergeTooltipTriggerProps.ts
---

This skill builds on alouette-theming. Read it first for the accent model.

# alouette — Actions

Buttons and pressables carry interactive token states (hover/active/disabled,
plus the keyboard focus ring) automatically. `variant` is
`"tonal" | "filled" | "outlined" | "soft"`; `size` is
`"sm" | "md" | "lg"` (38/44/52px — `lg` is the prominent call to action of a
landing page or a hero, never a size for an action among others); `accent`
is `"brand" | "danger" | "info" | "success" | "warning" | "neutral"`. Unset,
a `Button` takes the accent of the nearest accent scope (a `Modal`, `Message`,
`Box` or `AccentScope` with an `accent`), and `"brand"` outside one.

**The secondary action is neutral `soft`.** `tonal` (the default) is the
material an action button is made of; the accent says how loud it is. The
secondary action beside a call to action is `accent="neutral" variant="soft"` —
a neutral text button that gives way to the primary — never a neutral `tonal`
twin of it, and never `outlined`.

## Setup

```tsx
import { Button } from "alouette";
import { CheckRegularIcon } from "alouette-icons/phosphor-icons/Check";

<Button text="Save" icon={<CheckRegularIcon />} onPress={save} />;
```

## Core Patterns

### Button accents

```tsx
<Button text="Save" />                                 {/* tonal, brand */}
<Button accent="neutral" text="Menu" />                   {/* tonal, neutral */}
<Button accent="neutral" variant="soft" text="Cancel" />  {/* the secondary action */}
<Button accent="danger" text="Delete" />
<Button variant="filled" text="Publish" />              {/* the accent's fill */}
<Button size="sm" text="Small" />
<Button size="lg" variant="filled" text="Get started" />  {/* the hero call to action */}
```

- `tonal` is a ground **lighter than the page it sits on**, lifted by
  `shadow-s`; the hue is carried by the `text-on-tonal` ink, not the ground.
- `accent="neutral"` keeps the tonal material on the grayscale palette: a lone
  action that must not carry the accent (a `Menu` trigger, a field array's Add,
  a `Modal` footer's single "Close"). Beside a primary action it becomes
  `variant="soft"`.
- `filled` is the accent's own fill, flat, for the one action that must
  dominate; the neutral `filled` button is black in light mode, white in dark.
- **On an accented surface** (`<Box accent className="surface">`, a
  `GradientBackground`) a lone `tonal` button is `accent="neutral"`, and the
  accented action is `filled` or `soft`: an accented `tonal` ground is the
  surface's own step and dissolves. A `bg-highlight` panel (`Modal`,
  `AlertDialog`) is a neutral ground, so it keeps an accented `tonal` confirm.
  On web, `PressableBox` warns outside production when that happens.
- `soft` has no ground at rest: the secondary action, chrome where a border
  reads as noise (header pressables, menu rows), and an icon-only control
  inside a component's own frame (a modal close, a message dismiss). `outlined`
  has no default use.

```tsx
<Box accent="danger" className="surface">
  <Button accent="neutral" variant="soft" text="Keep" onPress={keep} />
  <Button variant="filled" accent="danger" text="Delete" onPress={remove} />
</Box>
```

Why each holds (the ink on a pale tint, the dissolving ground, the soft label
and glyph tints) and when `outlined` fits:
[references/button-materials.md](references/button-materials.md).

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
inside a raised surface (a `surface` card, a modal panel), pass
`errorMessageVariant="flat"` so the message doesn't read as a card on a card:

```tsx
<Box className="surface">
  <ActionButton
    text="Delete"
    errorMessageVariant="flat"
    onPress={remove}
    errorToMessage={toMessage}
  />
</Box>
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
import { XRegularIcon } from "alouette-icons/phosphor-icons/X";

<IconButton icon={<XRegularIcon />} aria-label="Close" onPress={close} />;
```

`size` is `"sm" | "md"` or a number (custom diameter in px); `iconSize="fill"`
makes the icon take 80% of the button. `variant` is `"tonal" | "filled" |
"soft"` — an icon-only button has no `outlined`.

### Disabled with a reason

When an action is unavailable for a reason the user should know, pass
`disabledReason` to `Button`, `IconButton` or `ActionButton` rather than
`disabled`. A non-empty reason disables the button, adds the reason to its
accessible description, and on web shows it in a `Tooltip` on hover. Like any
disabled button it leaves the tab order (react-native-web sets the native
`disabled` attribute), so a screen reader gets the reason from the
description.

```tsx
<Button
  text="Archive"
  disabledReason={
    isDeploying ? "A deployment of this project is still running" : null
  }
  onPress={archive}
/>
```

Don't wrap a disabled button in a DOM element carrying `title`:
react-native-web forwards no `title`, the wrapper is web-only, and the reason
then has to be repeated in `aria-label`. Any other element (an icon-only
button's label, a truncated value) is described by a `Tooltip`, whose `render`
hands the props to spread on it; native shows no panel and announces the
content as the accessibility hint. The trigger props, `mergeTooltipTriggerProps`
and placement: [references/tooltip.md](references/tooltip.md).

### Icon weight on interaction

`Button`, `IconButton` and `MenuItem` take an optional `activeIcon` next to
`icon` — usually the duotone twin of the same glyph — rendered while the control
is hovered, focused or pressed. It is an accent on top of the affordance, not a
replacement: the background and border still come from the `interactive-*`
tokens, and a disabled control never swaps.

```tsx
import {
  ArrowLeftDuotoneIcon,
  ArrowLeftRegularIcon,
} from "alouette-icons/phosphor-icons/ArrowLeft";

<Button
  text="Back"
  icon={<ArrowLeftRegularIcon />}
  activeIcon={<ArrowLeftDuotoneIcon />}
  onPress={goBack}
/>;
```

### Pressable surfaces

`PressableBox` is the themed, pressable container every custom pressable
starts from (`tonal` by default, the same `variant`s as a button);
`PressableListItem` is a row with a trailing caret on the same `tonal`
material. These, and the link components below, are how something becomes
interactive — never by wrapping a display-only component (`Badge`, `Bullet`,
`Text`) in a `Link` or `Pressable` (alouette-styling/SKILL.md).

```tsx
import { PressableBox, PressableListItem, Text } from "alouette";

<PressableBox onPress={open}>
  <Text>Custom card</Text>
</PressableBox>

<PressableListItem aria-label="Open Add dark mode" onPress={open}>
  <Text className="font-body-bold">Add dark mode</Text>
</PressableListItem>;
```

A `PressableListItem` holding more than a title needs `aria-label`, else the
row is announced as every label, badge and date it holds. `href` makes either
one a real `<a>` on web with the `link` role. Rows carry their own ground and
shadow, so a list of them stands on the screen ground — never inside a
`surface` card — and the list spaces them (`<View className="gap-xs">`).
`PressableBox` carries `group` for children styled from its state, and the
keyboard focus ring is drawn for you on `focus-visible` only.

Row `actions`, valid nesting roles, `raised={false}`, `href` routing and the
focus-ring options: [references/pressable-surfaces.md](references/pressable-surfaces.md).

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
app behind a leading external-link arrow (`icon={null}` drops it). `size` is
`"sm" | "md"` on both. Inside a `Text` or `Paragraph` either one renders as a
nested `Text`, so it wraps with the sentence and sits on its baseline on both
platforms; on its own line it is a pressable row carrying the focus ring. Primary
navigation between screens is a `NavBar`, not a text link
(alouette-navigation/SKILL.md); for full external-link control (in-app browser vs
new tab), see alouette-external-links/SKILL.md.

```tsx
<LinkText href="/settings" text="Account settings" />
```

### Menu of secondary actions

Secondary, rare or destructive actions go behind one trigger in a `Menu` of
`MenuItem`s rather than in a row of buttons, and one button choosing which of
several alternative actions it runs is a `SplitButton`: both are
alouette-menus/SKILL.md.

### Decision bar

The actions ending a decision — a `Modal` footer, an inline form's Cancel and
Save, a reply box — are a `DecisionBar`, never a hand-built row. It
right-aligns them in one order whatever the call site's: the dismiss action,
`alternative`, then `primary`. A lone "Close" is a `DecisionBar` with only a
`primary`.

```tsx
import { ActionButton, DecisionBar } from "alouette";

<DecisionBar
  dismissText="Discard"
  onDismiss={close}
  alternative={
    <ActionButton
      accent="neutral"
      text="Save draft"
      onPress={saveDraft}
      errorToMessage={toMessage}
    />
  }
  primary={
    <ActionButton text="Publish" onPress={publish} errorToMessage={toMessage} />
  }
/>;
```

- `primary` is required: an `ActionButton` for an async action, a
  `FormSubmitButton` in a `Form`, a plain `Button` for a synchronous one.
- `onDismiss` makes the bar render the dismiss action itself, as the neutral
  `soft` text button labelled `dismissText` ("Cancel" by default), so a
  dismissal always looks the same. `emphasis="dismiss"` turns it neutral
  `filled` when backing out is the expected answer — pass a `soft` primary then.
  `dismissDisabled` locks it while the primary is pending.
- `alternative` is one other way to commit ("Save draft" beside "Publish").
  Several alternatives are a `SplitButton` or a `Menu`.
- It holds only actions that end the decision. An editor's tools (attach,
  insert a template) are not part of it: lay the editor's toolbar beside it.

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

### HIGH A tonal or `outlined` secondary button

Wrong:

```tsx
<Button accent="neutral" text="Cancel" onPress={close} />
<Button text="Save" onPress={save} />

<Button variant="outlined" text="Cancel" onPress={close} />
<Button text="Save" onPress={save} />
```

Correct:

```tsx
<Button accent="neutral" variant="soft" text="Cancel" onPress={close} />
<Button text="Save" onPress={save} />
```

The secondary action gives way to the primary one. A neutral `tonal` Cancel keeps
the ground and the shadow, so the pair reads as two equal choices — and on a
white `bg-highlight` panel (a `Modal` footer) its ground is the panel's white and
dissolves. An `outlined` one draws a frame that competes, and on a `surface`
card its `bg-highlight` fights the card it sits on. Neutral `soft` is a text
button in the ambient ink: present, and plainly second.

Source: packages/alouette/src/ui/containers/AlertDialog.tsx, ui/actions/Button.tsx

### HIGH A hand-built row of decision buttons

Wrong:

```tsx
<View className="flex-row gap-xs">
  <Button text="Save" onPress={save} />
  <Button accent="neutral" variant="soft" text="Cancel" onPress={close} />
</View>
```

Correct:

```tsx
<DecisionBar
  dismissText="Cancel"
  onDismiss={close}
  primary={<Button text="Save" onPress={save} />}
/>
```

Each hand-built row picks its own alignment and order, and nothing catches it:
each one is correct on its own and passes review, and the app ends up with
Save before Cancel in one form and after it in the next. `DecisionBar` sets the
order from its props, not from the children's order.

Source: packages/alouette/src/ui/actions/DecisionBar.tsx

### HIGH Using non-existent variant names

Wrong:

```tsx
<Button variant="contained" text="Cancel" />
<Button variant="primary" text="Save" />
```

Correct:

```tsx
<Button accent="neutral" variant="soft" text="Cancel" />
<Button accent="brand" text="Save" />
```

`variant` is only `"tonal" | "filled" | "outlined" | "soft"` (`IconButton`:
no `outlined`); `contained`, `list` and `ghost` no longer exist. The accent is
chosen via the `accent` prop — `"brand" | "danger" | "info" | "success" |
"warning" | "neutral"`.

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
