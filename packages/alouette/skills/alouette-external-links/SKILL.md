---
name: alouette-external-links
description: >
  Open external URLs with ExternalLink (wraps expo-web-browser / Linking), or the
  two ready-made call sites: ExternalLinkButton (a Button) and ExternalLinkText
  (an inline text link with a leading arrow icon, size sm|md). openLinkBehavior
  is per platform (native: linking|webBrowser; web: targetBlank|targetSelf) —
  required on ExternalLink, defaulted to webBrowser/targetBlank on the two
  wrappers. Load when linking out to external URLs from alouette UI.
type: composition
library: alouette
library_version: "22.9.0"
requires:
  - alouette-actions
sources:
  - "christophehurpeau/alouette:packages/alouette/src/expo/ExternalLink.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/expo/ExternalLink.web.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/expo/ExternalLink.shared.ts"
  - "christophehurpeau/alouette:packages/alouette/src/ui/actions/ExternalLinkText.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/actions/ExternalLinkText.stories.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/actions/Button.tsx"
---

This skill builds on alouette-actions. Read it first for button props.

# alouette + expo-web-browser — External links

`ExternalLink` centralizes outbound-URL behavior per platform: an in-app browser
sheet (expo-web-browser) or `Linking` on native, and a new tab or same tab on
web. Two components apply it for you — `ExternalLinkButton` for a call to action,
`ExternalLinkText` for a link inside a text flow.

`ExternalOpenLinkBehavior` (exported from `alouette`):
`{ native: "linking" | "webBrowser"; web: "targetBlank" | "targetSelf" }`. Both
wrappers default it to `{ native: "webBrowser", web: "targetBlank" }`.

## Setup

```tsx
import { ExternalLinkButton, ExternalLinkText } from "alouette";

<ExternalLinkButton href="https://example.com" text="Open docs" />
<ExternalLinkText href="https://example.com" text="the documentation" />;
```

## Core Patterns

### Inline link vs link button

`ExternalLinkButton` takes every `Button` prop (`variant`, `size`, `accent`,
`icon`, `state`, …) and reads as an action. `ExternalLinkText` is the lightweight
one: bold underlined text preceded by an affordance icon (the external-link
arrow, overridable via `icon`), `size` `"sm" | "md"`, an `accent`, and a
`disabled` state — on web the text and icon tint through hover/active from the
interactive tokens, and the row carries the focus-visible outline.

```tsx
<Paragraph>
  Read <ExternalLinkText size="sm" href={docsUrl} text="the guide" /> first.
</Paragraph>
```

A disabled link drops its `href` on both platforms, because a disabled
`Pressable` never sees the press that would cancel the navigation. On web both
wrappers go through `ExternalLink`, which renders a real anchor with
`target="_blank"` + `rel="noopener noreferrer"` (unless `web: "targetSelf"`), so
middle-click and copy-link work.

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
<Pressable onPress={() => Linking.openURL(href)} />;
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

`openLinkBehavior` is required on `ExternalLink` itself and selects the native
and web strategies; without it the link can't decide how to open and throws on an
unsupported branch. (`ExternalLinkButton` and `ExternalLinkText` default it for
you — use them for the simple case.)

Source: packages/alouette/src/expo/ExternalLink.tsx; expo/ExternalLink.shared.ts

### MEDIUM A pressable Text instead of ExternalLinkText

Wrong:

```tsx
<Pressable onPress={() => openUrl(href)}>
  <Text className="underline text-accent">the documentation</Text>
</Pressable>
```

Correct:

```tsx
<ExternalLinkText href={href} text="the documentation" />
```

The hand-rolled version has no `role="link"`, no affordance icon, no
hover/active/focus tint from the interactive tokens, and on web no real anchor —
so the link cannot be middle-clicked or copied.

Source: packages/alouette/src/ui/actions/ExternalLinkText.tsx
