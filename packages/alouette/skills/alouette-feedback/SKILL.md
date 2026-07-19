---
name: alouette-feedback
description: >
  Semantic message banners: Message (requires accent + icon) and the presets
  InfoMessage, ConfirmationMessage, WarningMessage, ErrorMessage. Optional dismiss requires
  onDismiss and dismissIconAriaLabel together; size is sm/md/lg. Also
  ConnectionState, a top-pinned network-status banner driven by a state prop,
  and LinearProgress / CircularProgress determinate progress indicators
  (progress 0-100, accent, size xs/sm/md/lg). Load when showing inline status,
  alerts, dismissible notices, connection status, or progress.
type: core
library: alouette
library_version: "20.6.0"
requires:
  - alouette-theming
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/feedback/Message.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/feedback/Message.stories.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/feedback/ConnectionState.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/feedback/ConnectionState.stories.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/feedback/LinearProgress.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/feedback/CircularProgress.tsx"
---

This skill builds on alouette-theming. Read it first for the accent model.

# alouette — Feedback messages

`Message` is an accent-themed banner with an icon and optional dismiss button.
Prefer the presets `InfoMessage` / `ConfirmationMessage` / `WarningMessage` /
`ErrorMessage`, which set the accent and icon for you.

## Setup

```tsx
import { InfoMessage } from "alouette";

<InfoMessage>Your changes were saved.</InfoMessage>;
```

## Core Patterns

### Presets

```tsx
import { InfoMessage, ConfirmationMessage, WarningMessage, ErrorMessage } from "alouette";

<InfoMessage>Heads up.</InfoMessage>           {/* accent="info"    */}
<ConfirmationMessage>Saved.</ConfirmationMessage> {/* accent="success" */}
<WarningMessage>Careful.</WarningMessage>       {/* accent="warning" */}
<ErrorMessage>Payment failed.</ErrorMessage>   {/* accent="danger"  */}
```

### Dismissible message

`onDismiss` and `dismissIconAriaLabel` must be provided together:

```tsx
<WarningMessage onDismiss={hide} dismissIconAriaLabel="Dismiss">
  Low disk space.
</WarningMessage>
```

### Custom Message (other accents / icons)

The four presets cover `info` / `success` / `warning` / `danger`. For a
different accent or a custom icon, use the base `Message` with an explicit
`accent` and `icon`. `size` is `"sm" | "md" | "lg"`.

```tsx
import { Message } from "alouette";
import { XCircleRegularIcon } from "alouette-icons/phosphor-icons/XCircleRegularIcon";

<Message accent="brand" icon={<XCircleRegularIcon />} size="lg">
  Custom banner.
</Message>;
```

## Connection status banner

`ConnectionState` is a thin banner pinned to the top of its nearest positioned
ancestor. It stays hidden while `connected` and slides down to reveal a pill
when `connecting` or `disconnected`. It sets its own accent (`success` when
connected, `danger` otherwise), so no `accent` prop.

```tsx
import { ConnectionState } from "alouette";

<ConnectionState state={status}>
  {status === "connected" ? "Connected" : "Reconnecting…"}
</ConnectionState>;
```

`state` is `"connected" | "connecting" | "disconnected" | null` (`null` renders
nothing). `children` is the required pill label. On reconnection it turns green
and holds briefly before sliding out. `forceVisible` keeps it on-screen even
when connected (demos); `forceHidden` forces it off-screen regardless of state.

The banner is absolutely positioned, so its parent must establish a positioning
context and clip the off-screen pill — wrap it in `relative overflow-hidden`.

## Progress indicators

`LinearProgress` (a thin bar pinned to the top of its positioned ancestor) and
`CircularProgress` (a ring) show a **known** completion percentage. Both take
`progress` (0-100), `accent` (defaults `brand`), `size` (`"xs" | "sm" | "md" |
"lg"`), and `hidden` (fades out without unmounting). The fill animates on
`progress` change.

```tsx
import { LinearProgress, CircularProgress } from "alouette";

<CircularProgress progress={uploaded} accent="brand" size="md" />

<Box className="relative overflow-hidden">
  <LinearProgress progress={uploaded} hidden={uploaded >= 100} />
</Box>
```

For an **unknown**-duration wait (spinner), don't hand-roll one — a `Button`
with `state="loading"` already renders the indeterminate spinner (see
alouette-actions). There is no exported standalone indeterminate component.

## Common Mistakes

### MEDIUM onDismiss without dismissIconAriaLabel

Wrong:

```tsx
<InfoMessage onDismiss={hide}>Saved</InfoMessage>
```

Correct:

```tsx
<InfoMessage onDismiss={hide} dismissIconAriaLabel="Dismiss">
  Saved
</InfoMessage>
```

`Message` types `onDismiss` and `dismissIconAriaLabel` as a required pair;
providing one without the other is a type error and leaves the dismiss button
without an accessible label.

Source: packages/alouette/src/ui/feedback/Message.tsx

### MEDIUM Rendering the base Message without accent/icon

Wrong:

```tsx
<Message>Heads up</Message>
```

Correct:

```tsx
<WarningMessage>Heads up</WarningMessage>
```

The base `Message` requires both `accent` and `icon`. For the common cases use a
preset, which sets them.

Source: packages/alouette/src/ui/feedback/Message.tsx

### MEDIUM Hand-building a colored banner instead of Message

Wrong:

```tsx
<Box className="bg-yellow-100"><Text>Warning</Text></Box>
```

Correct:

```tsx
<WarningMessage>Warning</WarningMessage>
```

A manual banner loses accent theming, the leading icon, dark-mode support and
the dismiss a11y that `Message` provides.

Source: packages/alouette/src/ui/feedback/Message.tsx

### MEDIUM ConnectionState in a non-positioned, non-clipping parent

Wrong:

```tsx
<Box>
  <ConnectionState state={status}>Reconnecting…</ConnectionState>
</Box>
```

Correct:

```tsx
<Box className="relative overflow-hidden">
  <ConnectionState state={status}>Reconnecting…</ConnectionState>
</Box>
```

The banner is `absolute inset-x-0 top-0` and slides in from off-screen. Without a
positioned (`relative`) ancestor it anchors to the wrong element, and without
`overflow-hidden` the hidden/pre-slide pill leaks above the container.

Source: packages/alouette/src/ui/feedback/ConnectionState.tsx

### LOW Passing accent to ConnectionState

`ConnectionState` derives its accent from `state` (`success` when connected,
`danger` otherwise) — there is no `accent` prop. To theme it, change `state`.

Source: packages/alouette/src/ui/feedback/ConnectionState.tsx

### MEDIUM Using LinearProgress/CircularProgress for an unknown-duration wait

Wrong:

```tsx
<CircularProgress progress={0} /> {/* as a spinner */}
```

Correct:

```tsx
<Button text="Save" state="loading" onPress={save} />
```

`LinearProgress` / `CircularProgress` are determinate — they render the `progress`
value you pass. There is no exported indeterminate variant; a pending, no-percentage
wait is a `Button` `state="loading"` spinner (or `ActionButton`).

Source: packages/alouette/src/ui/feedback/CircularProgress.tsx; ui/actions/Button.tsx

See also: alouette-animation/SKILL.md — render messages in PresenceList for
animated add/remove.
