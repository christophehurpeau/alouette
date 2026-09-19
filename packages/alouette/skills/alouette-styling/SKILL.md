---
name: alouette-styling
description: >
  Styling conventions for writing components with alouette: express props keyed
  on internal state (selected/disabled/loading) or fanning out across slots as
  tailwind-variants tv() variants instead of a Record lookup, expose a class set
  the caller could write verbatim through className rather than as an alias
  variant prop, give one component a single tv() with slots instead of several
  tv objects, style through className instead of inline style, and write pixel
  sizes as arbitrary values (w-[380px]) rather than the canonical spacing-scale
  class. States the alouette design principles every component must satisfy,
  including that interactivity is a component and never a wrapper. Load when
  writing, restyling or reviewing a component.
type: core
library: alouette
requires:
  - alouette-theming
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/Modal.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/Surface.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/core/twMerge.ts"
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

### State-keyed props are `tv()` variants; aliases are `className`

A `tv()` variant is for a class set the **caller cannot write**: one keyed on
internal state (`selected`, `disabled`, `loading`), or one that fans out across
`slots` or interaction states (`PressableBox`'s `variant` spreads over
`interactive-*` on hover/focus/active). The keys become the prop's type via
`VariantProps`, and `defaultVariants` supplies the default.

```tsx
import { type VariantProps, tv } from "tailwind-variants";

const chipVariants = tv({
  base: "rounded-xs min-h-[32px]",
  variants: {
    selected: { true: "bg-emphasis shadow-s", false: "bg-transparent" },
    disabled: { true: "opacity-70" },
  },
  defaultVariants: { selected: false },
});

type ChipVariantProps = VariantProps<typeof chipVariants>;
```

A variant whose branches are classes the caller could type verbatim
(`variant: { highlight: "bg-highlight" }`, `size: { sm: "p-m rounded-sm" }`) is
an alias: leave it out and let the caller write the class. A prop cannot take a
breakpoint prefix, a class can (`surface-sm md:surface-lg`). A pairing that must
never be split becomes a `@utility` in `build-css.ts` instead — `lowered` (the
lowered ground + its inset shadow), `surface-{xxs…lg}` (padding + radius) — and
so does a role several components share (`surface-popover` for the Menu, Select
and InputTextAutocomplete panel), so they match by construction rather than by
each call site repeating the same classes. Give each new utility a class group
and its conflicts in `src/core/twMerge.ts`.

Pass the incoming `className` through the call (`chipVariants({ selected, className })`)
so callers can extend it. Outside a `tv()`, merge with a tailwind-merge
configured for the alouette scale, never by string concatenation
(`` `flex-row ${className}` `` emits both `flex-row` and a caller's `flex-col`
and lets stylesheet order pick). A `tv()` that takes a caller's `className` over
defaults on the named scale passes that same config as `{ twMergeConfig }`:
stock tailwind-merge does not know `p-m` and `p-xl` conflict, nor that `surface`
carries a padding and a radius. Inside the library that config is
`src/core/twMerge.ts`; it is **not** exported from `alouette`, so an app
component builds its own with `extendTailwindMerge` over the same named spacing
values and utility class groups.

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
const STATE_CLASS = {
  on: "bg-emphasis shadow-s",
  off: "bg-transparent",
} as const;
<Box className={STATE_CLASS[selected ? "on" : "off"]} />;
```

Correct:

```tsx
const chipVariants = tv({
  variants: {
    selected: { true: "bg-emphasis shadow-s", false: "bg-transparent" },
  },
  defaultVariants: { selected: false },
});
<Box className={chipVariants({ selected })} />;
```

The lookup map duplicates the prop's union type by hand, has no default handling,
no compound variants and no `className` merge.

Source: packages/alouette/src/ui/selection/SegmentedItem.tsx

### HIGH An alias variant for a class the caller could write

Wrong:

```tsx
const surfaceVariants = tv({
  variants: {
    variant: { surface: "bg-surface", highlight: "bg-highlight" },
    size: { sm: "p-m rounded-sm", md: "p-xl rounded-sm" },
  },
});
<Surface variant="highlight" size="sm" className="py-xs" />;
```

Correct:

```tsx
<Box className="surface bg-highlight surface-sm py-xs md:surface-md" />
```

Each branch is a class the caller could type, so the prop only hides it: the
bundle comes with padding the call site then has to fight, and no branch can be
switched at a breakpoint. A bundle worth keeping (padding + radius) is a
`@utility`, which a single class after it still overrides. A component whose
only job is those defaults is the same alias one level up — `Surface` is
deprecated for `<Box className="surface">` for this reason.

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
    selected: { true: { chip: "opacity-100", label: "text-on-emphasis" } },
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

### HIGH A `base` class a variant then has to override

Wrong:

```tsx
tv({
  base: "px-xs gap-xxs",
  variants: { variant: { segmented: "", icon: "rounded-md gap-0" } },
});
```

Correct:

```tsx
tv({
  base: "px-xs",
  variants: {
    variant: { segmented: "gap-xxs", icon: "rounded-md gap-0" },
  },
});
```

`base` holds only what every variant keeps. A property one variant cancels
belongs on each variant instead — the neutralizing class (`gap-0`, `p-0`,
`border-0`) hides which value actually applies and depends on merge order to win.

Source: packages/alouette/src/ui/selection/SegmentedBar.tsx

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
