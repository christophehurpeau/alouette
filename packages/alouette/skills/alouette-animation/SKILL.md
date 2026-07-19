---
name: alouette-animation
description: >
  Animate alouette UI two ways: NativeWind transitions (transition-*, duration-*,
  ease-* on state changes like active:/hover:/focus:) and CSS keyframe presence
  animations via PresenceOne / PresenceList (animate-slide-in/out,
  animate-collapse-in/out). exitDurationMs must come from animationDurationsMs so
  the unmount timer matches the keyframe. Both run on native via
  react-native-reanimated. Load when adding transitions or enter/exit animations.
type: core
library: alouette
library_version: "20.6.0"
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/Presence.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/animationDurationsMs.ts"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/Presence.stories.tsx"
---

# alouette — Animation

alouette animates with plain CSS — no animation library in your code — and on
native NativeWind v5 runs it through react-native-reanimated. There are two
mechanisms:

- **Transitions** — `transition-*` + `duration-*` + `ease-*` smooth a property
  change driven by state (`active:`, `hover:`, `focus:`, theme/accent change).
- **Presence (keyframes)** — `PresenceOne` / `PresenceList` play enter/exit
  keyframe animations on mount/unmount (`animate-slide-in/out`,
  `animate-collapse-in/out`), with durations from `animationDurationsMs`.

## Transitions (state changes)

State-change transitions (`transition-*` + `duration-*` + `ease-*`) are already
built into alouette's interactive components. Use `InteractiveBox` (or
`PressableBox`, `Button`, `IconButton`) — they animate press/hover/focus
coherently (e.g. press scale plus background/border color) with the system's
duration and easing. Don't reach for a raw react-native `Pressable`.

```tsx
import { InteractiveBox, Text } from "alouette";

<InteractiveBox onPress={open} className="bg-surface rounded-sm p-m">
  <Text>Animates on press / hover / focus</Text>
</InteractiveBox>;
```

For a custom transition, add `transition-*` utilities on an alouette component
that forwards `className` so it composes with the built-in ones. Prefer the
named `duration-*` tokens over raw numbers — they mirror `animationDurationsMs`
(`fast` 200, `fade` 300, `slide`/`progress` 600, `collapse` 800):

```tsx
<InteractiveBox className="transition-[background-color] duration-fast ease-in hover:bg-lowered" />
```

## Presence: swap a single child

```tsx
import { PresenceOne, Box, Text, animationDurationsMs } from "alouette";

function Swap({ step }: { step: number }) {
  return (
    <Box className="relative h-24 w-64">
      <PresenceOne
        activeKey={step}
        exitDurationMs={animationDurationsMs.slide}
        enterClassName="animate-slide-in"
        exitClassName="animate-slide-out"
        className="absolute inset-0 flex-center bg-surface rounded-md"
      >
        <Box>
          <Text className="font-heading-bold text-2xl">Step {step}</Text>
        </Box>
      </PresenceOne>
    </Box>
  );
}
```

## Core Patterns

### Animated list (add / remove)

Each child must have a stable `key`. Adding a key animates that item in; removing
one animates only that item out before unmounting.

```tsx
import { PresenceList, InfoMessage, animationDurationsMs } from "alouette";

<PresenceList
  exitDurationMs={animationDurationsMs.collapse}
  enterClassName="animate-collapse-in"
  exitClassName="animate-collapse-out"
  className="overflow-hidden"
>
  {items.map((item) => (
    <InfoMessage
      key={item.id}
      onDismiss={() => remove(item.id)}
      dismissIconAriaLabel="Dismiss"
    >
      {item.label}
    </InfoMessage>
  ))}
</PresenceList>;
```

`PresenceOne` swaps a single child and merges the animation classes onto it via
`cloneElement` (no wrapper); `PresenceList` wraps each child in its own `View`.

## Common Mistakes

### HIGH Hand-rolling transitions on a raw Pressable

Wrong:

```tsx
import { Pressable } from "react-native";
<Pressable className="transition-[transform] duration-200 active:scale-[0.975]">
  {children}
</Pressable>
```

Correct:

```tsx
import { InteractiveBox } from "alouette";
<InteractiveBox onPress={open}>{children}</InteractiveBox>
```

alouette's interactive components already bundle press/hover/focus transitions
with consistent duration and easing, plus disabled and focus-visible handling.
Re-implementing them on a bare `Pressable` drifts from the system and misses
that behavior.

Source: packages/alouette/src/ui/containers/Box.tsx (InteractiveBox); ui/data/PressableBox.tsx

### HIGH Hardcoding exitDurationMs instead of animationDurationsMs

Wrong:

```tsx
<PresenceOne activeKey={id} exitDurationMs={600}
  enterClassName="animate-slide-in" exitClassName="animate-slide-out">
```

Correct:

```tsx
import { animationDurationsMs } from "alouette";
<PresenceOne activeKey={id} exitDurationMs={animationDurationsMs.slide}
  enterClassName="animate-slide-in" exitClassName="animate-slide-out">
```

The unmount timer must equal the CSS keyframe duration. A hardcoded number drifts
from the framework value, cutting the exit animation short or leaving ghost nodes
mounted.

Source: packages/alouette/src/animationDurationsMs.ts; ui/containers/Presence.stories.tsx

### HIGH PresenceList children without stable keys

Wrong:

```tsx
{items.map((it, i) => <InfoMessage key={i}>{it}</InfoMessage>)}
```

Correct:

```tsx
{items.map((it) => <InfoMessage key={it.id}>{it.label}</InfoMessage>)}
```

`PresenceList` diffs children by key to play add/remove animations. Index keys
make removed items jump or skip their exit animation.

Source: packages/alouette/src/ui/containers/Presence.tsx (usePresenceList)

### MEDIUM PresenceOne child that doesn't forward className

Wrong:

```tsx
<PresenceOne activeKey={id} exitDurationMs={animationDurationsMs.slide}>
  <>{content}</>
</PresenceOne>
```

Correct:

```tsx
<PresenceOne activeKey={id} exitDurationMs={animationDurationsMs.slide}
  enterClassName="animate-slide-in" exitClassName="animate-slide-out">
  <Box>{content}</Box>
</PresenceOne>
```

`PresenceOne` merges the animation classes onto the child via `cloneElement`. A
Fragment or a component that drops `className` gets no animation; use an alouette
component (or one that forwards `className` to its root view).

Source: packages/alouette/src/ui/containers/Presence.tsx (PresenceOne)

### HIGH Expecting animations to run on native without reanimated

Wrong: relying on the CSS animation while react-native-reanimated (and the
`react-native-worklets/plugin` babel plugin) are not installed.

Correct: install `react-native-reanimated` and add the worklets babel plugin, so
NativeWind can run CSS transitions/animations on device.

NativeWind v5 drives native animations through reanimated; without it, animations
silently no-op on iOS/Android while still working on web.

Source: packages/storybook-native-app/babel.config.js; packages/alouette/package.json (peerDependencies)
