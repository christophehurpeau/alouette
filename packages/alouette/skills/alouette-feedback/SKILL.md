---
name: alouette-feedback
description: >
  Semantic message banners: Message (requires accent + icon) and the presets
  InfoMessage, ConfirmationMessage, WarningMessage. Optional dismiss requires
  onDismiss and dismissIconAriaLabel together; size is sm/md/lg. Load when
  showing inline status, alerts, or dismissible notices.
type: core
library: alouette
library_version: "19.0.0-beta.1"
requires:
  - alouette-theming
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/feedback/Message.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/feedback/Message.stories.tsx"
---

This skill builds on alouette-theming. Read it first for the accent model.

# alouette — Feedback messages

`Message` is an accent-themed banner with an icon and optional dismiss button.
Prefer the presets `InfoMessage` / `ConfirmationMessage` / `WarningMessage`,
which set the accent and icon for you.

## Setup

```tsx
import { InfoMessage } from "alouette";

<InfoMessage>Your changes were saved.</InfoMessage>;
```

## Core Patterns

### Presets

```tsx
import { InfoMessage, ConfirmationMessage, WarningMessage } from "alouette";

<InfoMessage>Heads up.</InfoMessage>           {/* accent="info"    */}
<ConfirmationMessage>Saved.</ConfirmationMessage> {/* accent="success" */}
<WarningMessage>Careful.</WarningMessage>       {/* accent="warning" */}
```

### Dismissible message

`onDismiss` and `dismissIconAriaLabel` must be provided together:

```tsx
<WarningMessage onDismiss={hide} dismissIconAriaLabel="Dismiss">
  Low disk space.
</WarningMessage>
```

### Custom Message (other accents / icons)

For accents without a preset (e.g. `danger`), use the base `Message` with an
explicit `accent` and `icon`. `size` is `"sm" | "md" | "lg"`.

```tsx
import { Message } from "alouette";
import { XCircleRegularIcon } from "alouette-icons/phosphor-icons/XCircleRegularIcon";

<Message accent="danger" icon={<XCircleRegularIcon />} size="lg">
  Payment failed.
</Message>;
```

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

See also: alouette-animation/SKILL.md — render messages in PresenceList for
animated add/remove.
