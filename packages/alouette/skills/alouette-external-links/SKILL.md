---
name: alouette-external-links
description: >
  Open external URLs with ExternalLink (wraps expo-web-browser / Linking) or
  ExternalLinkButton, configuring openLinkBehavior per platform (native:
  linking|webBrowser; web: targetBlank|targetSelf). Load when linking out to
  external URLs from alouette UI.
type: composition
library: alouette
library_version: "20.0.0"
requires:
  - alouette-actions
sources:
  - "christophehurpeau/alouette:packages/alouette/src/expo/ExternalLink.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/actions/Button.tsx"
---

This skill builds on alouette-actions. Read it first for button props.

# alouette + expo-web-browser — External links

`ExternalLink` centralizes outbound-URL behavior per platform: an in-app browser
sheet (expo-web-browser) or `Linking` on native, and a new tab or same tab on
web. `ExternalLinkButton` is the button shortcut for the common case.

`ExternalOpenLinkBehavior`:
`{ native: "linking" | "webBrowser"; web: "targetBlank" | "targetSelf" }`.

## Setup

```tsx
import { ExternalLinkButton } from "alouette";

<ExternalLinkButton href="https://example.com" text="Open docs" />;
```

## Core Patterns

### Wrap any component with explicit per-platform behavior

`ExternalLink` takes the target component via `as` and forwards remaining props.

```tsx
import { ExternalLink, Button } from "alouette";

<ExternalLink
  as={Button}
  href="https://example.com"
  openLinkBehavior={{ native: "webBrowser", web: "targetBlank" }}
  text="Open"
/>;
```

- `native: "webBrowser"` opens an in-app browser sheet themed with alouette colors.
- `native: "linking"` hands off to the OS browser via `Linking.openURL`.
- `web: "targetBlank"` opens a new tab; `"targetSelf"` navigates in place.

## Common Mistakes

### MEDIUM Calling Linking.openURL directly

Wrong:

```tsx
import { Linking } from "react-native";
<Pressable onPress={() => Linking.openURL(href)} />
```

Correct:

```tsx
<ExternalLink
  as={Button}
  href={href}
  openLinkBehavior={{ native: "webBrowser", web: "targetBlank" }}
  text="Open"
/>
```

`ExternalLink` handles the in-app themed browser sheet on native and the correct
target behavior on web; calling `Linking` directly loses both.

Source: packages/alouette/src/expo/ExternalLink.tsx

### MEDIUM Omitting openLinkBehavior

Wrong:

```tsx
<ExternalLink as={Button} href={href} text="Open" />
```

Correct:

```tsx
<ExternalLink
  as={Button}
  href={href}
  openLinkBehavior={{ native: "linking", web: "targetSelf" }}
  text="Open"
/>
```

`openLinkBehavior` is required and selects the native and web strategies; without
it the link can't decide how to open and throws on an unsupported branch.
(`ExternalLinkButton` defaults this for you — use it for the simple case.)

Source: packages/alouette/src/expo/ExternalLink.tsx
