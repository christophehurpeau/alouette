---
name: alouette-layout
description: >
  Compose layout with Box / InteractiveBox / SafeAreaBox, Surface
  (variant/size/shadow), Stack / HStack / VStack, Separator, ScreenCenterLayout,
  and gradients (GradientBackground / GradientScrollView). Use the alouette
  spacing (xxs..4xl), radius (xs..lg) and shadow (s/m/l/lowered) scale via
  p-*/gap-*/rounded-*/shadow-* classes. Load when building screen structure,
  cards, spacing, or backgrounds.
type: core
library: alouette
library_version: "20.1.0"
requires:
  - alouette-theming
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/Box.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/Surface.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/stacks/stacks.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/stacks/Separator.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/GradientBackground.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/GradientScrollView.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/config/tokens.stories.tsx"
---

This skill builds on alouette-theming. Read it first for the token model.

# alouette — Layout

Compose structure from `View`/`Box`, `Surface`, stacks and `Separator`, sized
with the alouette spacing/radius/shadow scale (not the raw Tailwind numeric
scale).

## Setup

```tsx
import { Surface, VStack, Text } from "alouette";

<Surface>
  <VStack className="gap-m">
    <Text className="font-heading-bold text-xl">Card title</Text>
    <Text>Body</Text>
  </VStack>
</Surface>;
```

## Core Patterns

### Stacks

`Stack` is `flex-row flex-wrap`; `HStack` is `flex-row`; `VStack` is `flex-col`.
They are thin `View` wrappers — add `gap-*` for spacing.

```tsx
<VStack className="gap-xs">…</VStack>
<HStack className="gap-m items-center">…</HStack>
```

### Surface (elevated container)

`variant`: `surface` (default) · `lowered` · `translucent` · `highlight` ·
`highlight-accent`. `size`: `xs` · `sm` · `md` (default) · `lg` (padding + radius).
`shadow`: `s` (default) · `m` · `l` · `lowered`; defaults to `lowered` when
`variant="lowered"`.

```tsx
<Surface size="lg" shadow="m">Elevated</Surface>
<Surface variant="lowered">Sunken</Surface>
```

### Boxes

`Box` is a themed `View` (accepts `accent`). `InteractiveBox` adds press/hover
transitions. `SafeAreaBox` pads by the device safe-area insets.

```tsx
import { Box, SafeAreaBox } from "alouette";

<SafeAreaBox>
  <Box accent="brand">…</Box>
</SafeAreaBox>;
```

### Separator

```tsx
import { Separator } from "alouette";

<Separator />            {/* horizontal */}
<Separator vertical />   {/* vertical */}
```

### Background gradient

```tsx
import { GradientBackground, GradientScrollView } from "alouette";

<GradientBackground accent="brand" />

<GradientScrollView accent="brand">
  {content}
</GradientScrollView>;
```

## Common Mistakes

### HIGH Surface lowered/shadow passed as the wrong prop shape

Wrong:

```tsx
<Surface lowered>Sunken</Surface>
```

Correct:

```tsx
<Surface variant="lowered">Sunken</Surface>
```

`Surface` takes `variant` and `shadow` enum props; there is no boolean `lowered`
prop. `shadow` defaults to `"s"`, or `"lowered"` when `variant="lowered"`.

Source: packages/alouette/src/ui/containers/Surface.tsx

### MEDIUM Using the raw Tailwind numeric scale instead of tokens

Wrong:

```tsx
<VStack className="gap-2 p-4 rounded-lg">…</VStack>
```

Correct:

```tsx
<VStack className="gap-xs p-m rounded-sm">…</VStack>
```

`p-4` / `gap-2` use the default Tailwind scale, not the alouette spacing/radius
scale, so layouts drift from the design-system rhythm.

Source: src/config/tokens.stories.tsx (see references/spacing-radius-shadow.md)

### MEDIUM Reaching for expo-linear-gradient for backgrounds

Wrong:

```tsx
import { LinearGradient } from "expo-linear-gradient";
<LinearGradient colors={["#fff", "#eee"]} />
```

Correct:

```tsx
import { GradientBackground } from "alouette";
<GradientBackground accent="brand" />
```

alouette gradients are pure NativeWind classes; `GradientBackground` /
`GradientScrollView` need no gradient library, and expo-linear-gradient is not a
dependency.

Source: packages/alouette/src/ui/layout/GradientBackground.tsx

### MEDIUM Treating Stack as a column / a navigation Stack

Wrong:

```tsx
<Stack className="flex-col">…</Stack>
```

Correct:

```tsx
<VStack className="gap-m">…</VStack>
```

alouette `Stack` is `flex-row flex-wrap`. For a column use `VStack`; for a row
use `HStack`. It is unrelated to navigation stacks.

Source: packages/alouette/src/ui/stacks/stacks.tsx

## References

- [Spacing, radius & shadow scale](references/spacing-radius-shadow.md)

See also: alouette-responsive/SKILL.md — switch between layout variants by breakpoint.
