---
name: alouette-dialogs
description: >
  Overlays: Modal (controlled by visible/onClose, with title or required
  aria-label, optional icon/footer, size sm/md/lg, dismiss via backdrop/close/
  Escape/Android-back) and AlertDialog for confirmations. AlertDialog variant is
  confirm (cancel+confirm) | alert (single acknowledge) | required (single
  action, non-dismissible); accent defaults to danger. Prefer the icon-fixed
  presets QuestionAlertDialog / WarningAlertDialog / InfoAlertDialog /
  SuccessAlertDialog. Load when adding a modal, confirmation, or alert dialog.
type: core
library: alouette
library_version: "20.6.0"
requires:
  - alouette-theming
  - alouette-actions
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/Modal.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/AlertDialog.tsx"
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

### Modal labelling

A `Modal` must be labelled: pass `title` (rendered as the heading and used as the
accessible name) or, when there is no visible heading, an `aria-label`. `size` is
`"sm" | "md" | "lg"` (panel max-width + padding; default `md`). Optional `icon`
tints with the accent before the title; `footer` is the actions row; long bodies
scroll at ~70% viewport height. Use `hideCloseButton` to drop the corner close
button (the modal stays dismissible via backdrop/Escape/back).

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

`confirmDisabled` disables the primary button (e.g. while an async action runs).
Button labels default to Confirm/Cancel (confirm), OK (alert/required).

## Common Mistakes

### HIGH Modal without title or aria-label

Wrong:

```tsx
<Modal visible={open} onClose={close}><Text>…</Text></Modal>
```

Correct:

```tsx
<Modal visible={open} onClose={close} title="Details"><Text>…</Text></Modal>
// or, with no visible heading:
<Modal visible={open} onClose={close} aria-label="Image preview"><Image … /></Modal>
```

`ModalProps` is a union that requires either `title` or `aria-label`; a dialog
with no accessible name is an accessibility failure (and a type error).

Source: packages/alouette/src/ui/containers/Modal.tsx

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
