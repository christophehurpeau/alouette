---
name: alouette-dialogs
description: >
  Overlays: Modal (controlled by visible/onClose, required title, optional
  icon/footer/role, size sm/md/lg, dismiss via backdrop/close/Escape/
  Android-back) and AlertDialog for confirmations. The footer stays pinned to
  the bottom of the scrolling body (sticky on web, below the scroll box on
  native) and grows a separator while content scrolls under it. AlertDialog
  variant is confirm (cancel+confirm) | alert (single acknowledge) | required
  (single action, non-dismissible); accent defaults to danger. Prefer the
  icon-fixed presets QuestionAlertDialog / WarningAlertDialog / InfoAlertDialog /
  SuccessAlertDialog. onConfirm may return a promise: the dialog then shows a
  loading state, locks dismissal until it settles, and renders a rejection with
  errorToMessage. Load when adding a modal, confirmation, or alert dialog.
type: core
library: alouette
library_version: "22.6.0"
requires:
  - alouette-theming
  - alouette-actions
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/Modal.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/AlertDialog.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/PortalAccentScope.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/Modal.stories.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/AlertDialog.stories.tsx"
---

This skill builds on alouette-theming (accents) and alouette-actions (the footer
buttons). Read them first.

# alouette — Dialogs

`Modal` is a themed, accessible overlay you control with `visible` / `onClose`.
`AlertDialog` builds on it for the confirm/alert/required decision pattern with a
prebuilt footer. Both render through react-native's `Modal`, animate a fade, and
dismiss on backdrop press, the close button, the Android back button, and Escape
(web).

## Setup

```tsx
import { Modal, Button } from "alouette";

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button text="Open" onPress={() => setOpen(true)} />
      <Modal
        visible={open}
        onClose={() => setOpen(false)}
        title="Details"
        footer={<Button text="Done" onPress={() => setOpen(false)} />}
      >
        <Text>Body content.</Text>
      </Modal>
    </>
  );
}
```

## Core Patterns

### Modal header, body and footer

`title` is **required**: it renders as the heading and labels the dialog for
assistive tech (`aria-labelledby`). `size` is `"sm" | "md" | "lg"` (panel
max-width + padding; default `md`). Optional `icon` tints with the accent before
the title. Use `hideCloseButton` to drop the corner close button (the modal stays
dismissible via backdrop/Escape/back), `role="alertdialog"` for an interruption
that requires an explicit response, and `aria-describedby` to point at the
element describing the dialog.

The header sits **outside** the scroll box, so the title and the close button
stay put while the body scrolls under them (the body scrolls at ~70% viewport
height). `footer` is the actions row and stays pinned to the bottom of that
body — `position: sticky` inside the scroll content on web, laid out below the
scroll box on native, since Yoga has no sticky. It grows a top border only while
content is scrolled under it, and loses it at the end of the scroll. That is
built in: don't rebuild it with an absolutely-positioned bar or a scroll
listener.

### Accent across the portal

`accent` themes the whole panel. A modal renders through a portal, i.e. outside
the themed DOM subtree, so `Modal` rebuilds the scope inside with
`PortalAccentScope` (also exported, for any other portalled overlay). An
`AccentScope` placed *around* the `<Modal>` element in your tree does **not**
reach the panel — pass `accent` to the modal itself.

### AlertDialog — confirmations

Prefer the icon-fixed presets; each takes every `AlertDialog` prop except `icon`.
The `variant` selects the footer:

- `"confirm"` (default) — `onConfirm` + `onCancel`, a Cancel and a Confirm button.
- `"alert"` — `onClose`, a single acknowledge button.
- `"required"` — `onConfirm`, a single action; **cannot** be dismissed by
  backdrop/Escape/back (the user must respond).

`accent` defaults to `"danger"` (themes the icon and primary button).

```tsx
import { QuestionAlertDialog, WarningAlertDialog } from "alouette";

<QuestionAlertDialog
  visible={confirming}
  title="Delete project?"
  confirmText="Delete"
  onConfirm={handleDelete}
  onCancel={() => setConfirming(false)}
>
  This permanently removes the project and its data.
</QuestionAlertDialog>

<WarningAlertDialog
  variant="alert"
  visible={notice}
  title="Session expired"
  onClose={() => setNotice(false)}
>
  Please sign in again.
</WarningAlertDialog>
```

`confirmDisabled` disables the primary button (e.g. while a form is invalid).
Button labels default to Confirm/Cancel (confirm), OK (alert/required).

### Async confirmations

`onConfirm` (confirm and required variants) may return a promise. The dialog then
runs the same state machine as `ActionButton`: the button shows a spinner, the
dialog locks (Cancel disabled, backdrop/Escape/Android-back stop dismissing) and
unlocks when the promise settles. Do **not** hand-roll this with
`confirmDisabled` and local state.

Pass `errorToMessage` to turn a rejection into a message shown full width in the
footer (a flat `ErrorMessage`, since the dialog panel is already raised), with
the dialog left open so the action can be retried; without it a failure only
flips the button to its failed state. There is no default formatter — a library
one could only hardcode an English string.

Close the dialog yourself once the promise resolves — the dialog never closes
itself on success.

```tsx
<WarningAlertDialog
  visible={confirming}
  title="Delete project"
  confirmText="Delete"
  errorToMessage={(error) => (error instanceof Error ? error.message : t("unknownError"))}
  onConfirm={async () => {
    await deleteProject();
    setConfirming(false);
  }}
  onCancel={() => setConfirming(false)}
>
  This permanently removes the project and its data.
</WarningAlertDialog>
```

## Common Mistakes

### HIGH Labelling a Modal with aria-label instead of title

Wrong:

```tsx
<Modal visible={open} onClose={close} aria-label="Image preview"><Image … /></Modal>
```

Correct:

```tsx
<Modal visible={open} onClose={close} title="Image preview"><Image … /></Modal>
```

`title` is a required `ModalProps` prop and there is no `aria-label`: every modal
gets a visible heading, which is also its accessible name (`aria-labelledby`).
`aria-describedby` is the only aria prop `Modal` takes.

Source: packages/alouette/src/ui/containers/Modal.tsx

### MEDIUM Putting the action buttons in children instead of footer

Wrong:

```tsx
<Modal visible={open} onClose={close} title="Details">
  <Text>…</Text>
  <HStack className="justify-end gap-m"><Button text="Done" onPress={close} /></HStack>
</Modal>
```

Correct:

```tsx
<Modal visible={open} onClose={close} title="Details" footer={<Button text="Done" onPress={close} />}>
  <Text>…</Text>
</Modal>
```

A row placed in `children` scrolls away with the body. `footer` stays pinned at
the bottom of the scroll box on both platforms, right-aligns its buttons, and
takes on the separator border while content scrolls under it.

Source: packages/alouette/src/ui/containers/Modal.tsx

### MEDIUM Wrapping the Modal element in AccentScope

Wrong:

```tsx
<AccentScope accent="danger">
  <Modal visible={open} onClose={close} title="Delete project">…</Modal>
</AccentScope>
```

Correct:

```tsx
<Modal accent="danger" visible={open} onClose={close} title="Delete project">…</Modal>
```

The panel renders through a portal, outside the themed subtree, so a surrounding
scope never reaches it. `Modal` rebuilds the theme inside with
`PortalAccentScope` from its own `accent` prop.

Source: packages/alouette/src/ui/containers/PortalAccentScope.tsx

### HIGH Building a confirmation out of a raw Modal

Wrong: a `Modal` with hand-placed Cancel/Confirm buttons and manual `role`.

Correct:

```tsx
<QuestionAlertDialog visible={open} title="Discard changes?"
  onConfirm={discard} onCancel={close} />
```

`AlertDialog` sets `role="alertdialog"`, wires the description to
`aria-describedby`, hides the close button, and builds the footer for the chosen
`variant`. Reach for `Modal` directly only for non-decision content.

Source: packages/alouette/src/ui/containers/AlertDialog.tsx

### MEDIUM Expecting a required dialog to close on backdrop/Escape

`variant="required"` intentionally ignores backdrop, Escape, and the Android back
button — only its explicit action closes it. Use it for must-respond
interruptions (accept terms, forced sign-out), not for ordinary dialogs, which
should stay dismissible (`confirm` / `alert`).

Source: packages/alouette/src/ui/containers/AlertDialog.tsx

### LOW Passing icon to a preset dialog

The presets (`QuestionAlertDialog`, `WarningAlertDialog`, `InfoAlertDialog`,
`SuccessAlertDialog`) fix the icon; their props are `AlertDialogUsageProps` =
every `AlertDialog` prop except `icon`. Use the base `AlertDialog` when you need
a custom icon.

Source: packages/alouette/src/ui/containers/AlertDialog.tsx
