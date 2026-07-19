---
name: alouette-actions
description: >
  Buttons (Button, IconButton, ExternalLinkButton, InternalLinkButton) and
  pressable surfaces (PressableBox, PressableListItem). variant is
  contained|outlined|ghost, size is sm|md, accent defaults to brand. Button
  label is the required text prop (not children); IconButton
  requires aria-label. Interactive hover/focus/active/disabled states are built
  in. For async onPress use ActionButton (runs the promise, shows spinner +
  inline error); Button state ('loading'|'success'|'failed') is the manual
  escape hatch that overlays a spinner/terminal icon and disables the button.
  Load when adding buttons or custom pressable elements.
type: core
library: alouette
library_version: "20.6.0"
requires:
  - alouette-theming
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/actions/Button.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/actions/ActionButton.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/actions/IconButton.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/data/PressableBox.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/data/PressableListItem.tsx"
---

This skill builds on alouette-theming. Read it first for the accent model.

# alouette — Actions

Buttons and pressables carry interactive token states (hover/focus/active/
disabled) automatically. `variant` is `"contained" | "outlined" | "ghost"`;
`size` is `"sm" | "md"`; `accent` defaults to `"brand"`.

## Setup

```tsx
import { Button } from "alouette";
import { CheckRegularIcon } from "alouette-icons/phosphor-icons/CheckRegularIcon";

<Button text="Save" icon={<CheckRegularIcon />} onPress={save} />;
```

## Core Patterns

### Button variants and accents

```tsx
<Button text="Save" />                                 {/* contained, brand */}
<Button variant="outlined" text="Cancel" />
<Button variant="ghost" text="Dismiss" />
<Button accent="danger" text="Delete" />
<Button size="sm" text="Small" />
```

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
  errorToMessage={(error) => (error instanceof Error ? error.message : "Failed")}
/>;
```

`ActionButton` omits `onPress`/`state` from `ButtonProps` and manages them
itself — don't pass `state` to it.

### Manual loading state

Reach for `Button`'s `state` prop directly only when `ActionButton` doesn't fit
(state driven externally, e.g. by a form or store). `state` drives a transient
overlay and disables the button: `"loading"` shows an indeterminate spinner,
`"success"` a check, `"failed"` a warning icon (the spinner plays its finish
animation before the terminal icon). Any non-`undefined` `state` disables presses.

```tsx
import { Button, type ButtonState } from "alouette";

<Button text="Save" state={submitState} onPress={save} />
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

### Pressable surfaces

`PressableBox` is a themed, pressable container (`variant`, `accent`,
`forceStyle`). `PressableListItem` is a row with a trailing caret.

```tsx
import { PressableBox, PressableListItem, Text } from "alouette";

<PressableBox onPress={open}>
  <Text>Custom card</Text>
</PressableBox>

<PressableListItem onPress={open}>
  <Text>Row label</Text>
</PressableListItem>;
```

### Link buttons

```tsx
import { ExternalLinkButton, InternalLinkButton } from "alouette";

<ExternalLinkButton href="https://example.com" text="Open" />
<InternalLinkButton href="/settings" text="Settings" />
```

For full external-link control (in-app browser vs new tab), see
alouette-external-links/SKILL.md.

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

`variant` is only `"contained" | "outlined" | "ghost"`; the accent is chosen via
the `accent` prop. (`ghost` is a variant value, not a separate boolean prop.)

Source: packages/alouette/src/ui/data/PressableBox.tsx, ui/actions/Button.tsx

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
