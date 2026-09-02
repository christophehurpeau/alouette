---
name: alouette-styling
description: >
  Styling conventions for writing components with alouette: express enum-like
  props (variant/size/shadow/state) as tailwind-variants tv() variants instead of
  a Record lookup, give one component a single tv() with slots instead of several
  tv objects, style through className instead of inline style, and write pixel
  sizes as arbitrary values (w-[380px]) rather than the canonical spacing-scale
  class. States the alouette design principles every component must satisfy,
  including that interactivity is a component and never a wrapper. Load when
  writing, restyling or reviewing a component.
type: core
library: alouette
library_version: "22.9.0"
requires:
  - alouette-theming
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/Modal.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/Surface.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/selection/SegmentedItem.tsx"
---

# alouette — Styling conventions

How a component's classes are declared and applied. Which classes to use is
covered by alouette-theming (tokens), alouette-layout (spacing/radius/shadow) and
alouette-typography (text).

## Design principles

Every component is measured against these:

- Consistent UI
- Unique
- Professional
- Accessible
- Depth using shades, shadows and tint
- Multi-platform: web and native (ios/android at the moment)
- Explicit affordance element for interactive surfaces (Chevron icon or action text “View”, “Open”, or “Details”)
- Animated

## Core patterns

### Enum-like props are `tv()` variants

A prop that selects between a fixed set of classes (`variant`, `size`, `shadow`,
`selected`, `disabled`) is a `tv()` variant. The keys become the prop's type via
`VariantProps`, and `defaultVariants` supplies the default. Resolve a value in
component code only when one variant's default depends on another prop
(`Surface`: `shadow` defaults to `lowered` when `variant="lowered"`).

```tsx
import { type VariantProps, tv } from "tailwind-variants";

const surfaceVariants = tv({
  base: "overflow-hidden",
  variants: {
    variant: { surface: "bg-surface", lowered: "bg-lowered" },
    size: { sm: "p-m rounded-sm", md: "p-xl rounded-sm" },
  },
  defaultVariants: { variant: "surface", size: "md" },
});

type SurfaceVariantProps = VariantProps<typeof surfaceVariants>;

export interface SurfaceProps extends BoxProps, SurfaceVariantProps {}
```

Pass the incoming `className` through the call (`surfaceVariants({ size, className })`)
so callers can extend it.

### One component, one `tv()` — use `slots`

A component that styles several elements declares **one** `tv()` with `slots`,
not one `tv()` per element. The variant props are then declared once and applied
to every element from a single call, so the elements cannot drift.

```tsx
const modalVariants = tv({
  slots: {
    panel: "w-full max-h-full",
    inset: "bg-highlight shadow-l",
    footer: "…",
  },
  variants: {
    size: {
      sm: { panel: "max-w-[360px]", inset: "rounded-sm p-xs", footer: "py-xs" },
      md: { panel: "max-w-[520px]", inset: "rounded-sm p-m", footer: "py-m" },
    },
  },
  defaultVariants: { size: "md" },
});

const styles = modalVariants({ size, withFooter: footer !== undefined });
<View className={styles.panel()}>
  <View className={styles.inset()}>…</View>
</View>;
```

`extend` still applies for a slot that is a strict superset of another tv
(`labelVariants = tv({ extend: foregroundVariants, base: "…" })`).

### `className`, not inline `style`

Everything that can be a class is a class — classes participate in theming,
variants, `group-*`/state modifiers and the Tailwind scan. Inline `style` is only
for a value computed at runtime that no static class can express (a measured
dimension, `windowHeight * 0.7`, a token-derived pixel height).

### Pixel sizes as arbitrary values

Write a pixel dimension as an arbitrary value — `w-[380px]`, `max-w-[460px]`,
`min-h-[44px]` — and keep it even when the linter suggests the canonical
spacing-scale class (`w-95`, `max-w-115`, `min-h-11`). The scale class hides the
actual pixel value, which is the thing being reasoned about. This applies to
one-off pixel dimensions only; padding, gap and radius still use the token scale
(`p-m`, `gap-xs`, `rounded-sm`).

### Interactivity is a component, never a wrapper

Nesting a display-only component in a `Link` or `Pressable` does not make it
interactive: the wrapper takes the role while the visible element keeps none of
the `interactive-*` states, no focus-visible outline and no affordance. Use a
pressable component (alouette-actions/SKILL.md), and put the display-only
element inside or beside it.

## Common Mistakes

### HIGH A `Record` lookup instead of a `tv()` variant

Wrong:

```tsx
const LAYER_CLASS = { surface: "bg-surface", lowered: "bg-lowered" } as const;
<Box className={LAYER_CLASS[variant]} />;
```

Correct:

```tsx
const boxVariants = tv({
  variants: { variant: { surface: "bg-surface", lowered: "bg-lowered" } },
  defaultVariants: { variant: "surface" },
});
<Box className={boxVariants({ variant })} />;
```

The lookup map duplicates the prop's union type by hand, has no default handling,
no compound variants and no `className` merge.

Source: packages/alouette/src/ui/containers/Surface.tsx

### HIGH Several `tv()` objects for one component

Wrong:

```tsx
const chipVariants = tv({ variants: { selected: …, disabled: … } });
const segmentVariants = tv({ variants: { selected: …, disabled: … } });
const labelVariants = tv({ variants: { selected: …, disabled: … } });
```

Correct:

```tsx
const itemVariants = tv({
  slots: { chip: "…", segment: "…", label: "…" },
  variants: {
    selected: { true: { chip: "opacity-100", label: "text-on-accent" } },
  },
});
const styles = itemVariants({ selected, disabled });
```

Repeating `selected`/`disabled` across separate tv objects means every variant
change has to be made in three places, and each element is called separately at
render time.

Source: packages/alouette/src/ui/containers/Modal.tsx

### MEDIUM Inline `style` for a static value

Wrong:

```tsx
<View style={{ maxWidth: 460, paddingHorizontal: 16 }} />
```

Correct:

```tsx
<View className="max-w-[460px] px-m" />
```

An inline `style` is invisible to variants, state modifiers and theming, and on
web it wins over the class it silently conflicts with.

Source: packages/alouette/src/ui/containers/Modal.tsx

### MEDIUM Collapsing a pixel size to the spacing-scale class

Wrong:

```tsx
<View className="w-95 min-h-11" />
```

Correct:

```tsx
<View className="w-[380px] min-h-[44px]" />
```

`w-95` / `min-h-11` are the same pixels but read as scale steps; the explicit
arbitrary value keeps the measurement legible (`min-h-[44px]` is the
accessibility touch-target minimum, not a padding choice).

Source: packages/alouette/src/ui/actions/Button.tsx

See also: alouette-theming/SKILL.md (which classes), alouette-layout/SKILL.md
(spacing/radius/shadow scale).
