---
name: alouette-responsive
description: >
  Build adaptive layouts. Prefer Tailwind responsive variant classes (sm:, md:,
  lg:, xl:) for responsive styling — they work on web and native. alouette
  customizes the widths: sm 480, md 768, lg 1024, xl 1280. Fall back to
  SwitchBreakpointsUsingDisplayNone / SwitchBreakpointsUsingNull (and
  useCurrentBreakpointName) only when a class can't express the change — a
  different component tree per size, or unmounting a heavy off-screen variant.
type: core
library: alouette
library_version: "20.6.0"
sources:
  - "christophehurpeau/alouette:packages/alouette/src/windowSize/SwitchBreakpoints.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/windowSize/useCurrentBreakpointName.ts"
  - "christophehurpeau/alouette:packages/alouette/src/config/Breakpoints.ts"
---

# alouette — Responsive design

Use Tailwind responsive variant classes (`sm:`, `md:`, `lg:`, `xl:`) for
responsive styling. They are the default tool, work on web and native (NativeWind
evaluates them at runtime), and need no extra component. alouette customizes the
breakpoint widths: **`sm` 480 · `md` 768 · `lg` 1024 · `xl` 1280** — note `sm` is
480px, not Tailwind's default 640.

Reach for `SwitchBreakpoints*` only when classes can't express the change: a
genuinely different component tree per size, or unmounting a heavy off-screen
variant.

## Setup

```tsx
import { VStack } from "alouette";

<VStack className="flex-col md:flex-row gap-m">…</VStack>;
```

## Core Patterns

### Responsive utility classes (preferred)

```tsx
<View className="p-m lg:p-xl" />
<Text className="text-base md:text-lg" />
<VStack className="flex-col md:flex-row" />
```

Stack on narrow screens, switch to a row at `md` (768px) and up.

### Switch whole subtrees when classes aren't enough

When a breakpoint needs different components (not just different classes), use
`SwitchBreakpoints`. `UsingDisplayNone` keeps every slot mounted and toggles
visibility (SSR-friendly on web); `UsingNull` mounts only the matching slot — use
it to keep heavy off-screen variants unmounted. The `base` slot is required.

```tsx
import { SwitchBreakpointsUsingNull } from "alouette";

<SwitchBreakpointsUsingNull base={<MobileNav />} large={<DesktopSidebar />} />;
```

### Read the current breakpoint in JS

```tsx
import { useCurrentBreakpointName } from "alouette";

const bp = useCurrentBreakpointName(); // "base" | "small" | "medium" | "large" | "wide"
```

## Common Mistakes

### HIGH Using SwitchBreakpoints where a responsive class would do

Wrong:

```tsx
<SwitchBreakpointsUsingNull
  base={<View className="flex-col" />}
  medium={<View className="flex-row" />}
/>
```

Correct:

```tsx
<View className="flex-col md:flex-row" />
```

Responsive variant classes are the default; they avoid mounting multiple subtrees
and work on web + native. Use `SwitchBreakpoints*` only when the variants are
genuinely different components or the off-screen one must be unmounted.

Source: packages/alouette/src/windowSize/SwitchBreakpoints.tsx

### MEDIUM Assuming Tailwind's default breakpoint widths

Wrong:

```tsx
// expecting sm: to start at 640px
<View className="sm:flex-row" />
```

Correct:

```tsx
// alouette sm: starts at 480px; md 768 / lg 1024 / xl 1280
<View className="md:flex-row" />
```

alouette overrides the breakpoint widths, so picking a prefix by Tailwind's
defaults shifts the layout boundary.

Source: packages/alouette/src/config/Breakpoints.ts

### MEDIUM Building responsive class names dynamically

Wrong:

```tsx
const cls = `${bp}:flex-row`;
<View className={cls} />
```

Correct:

```tsx
<View className="md:flex-row" />
```

Tailwind v4 only emits classes it sees as literal strings, so a runtime-built
`${bp}:flex-row` is never generated.

Source: packages/alouette/src/windowSize/SwitchBreakpoints.tsx

### MEDIUM SwitchBreakpoints without a base slot

Wrong:

```tsx
<SwitchBreakpointsUsingNull medium={<Wide />} />
```

Correct:

```tsx
<SwitchBreakpointsUsingNull base={<Narrow />} medium={<Wide />} />
```

When you do use `SwitchBreakpoints`, `base` is required — it is the fallback
below the smallest defined breakpoint. Omitting it is a type error.

Source: packages/alouette/src/windowSize/SwitchBreakpoints.tsx
