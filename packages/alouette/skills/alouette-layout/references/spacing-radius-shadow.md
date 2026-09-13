# alouette — Spacing, Radius & Shadow Scale

Use these alouette tokens instead of the default Tailwind numeric scale, so
layout stays on the design-system rhythm.

## Spacing

Applies to `p-*`, `px-*`, `py-*`, `pt-*`/`pb-*`/`pl-*`/`pr-*`, `m-*`, `gap-*`,
`gap-x-*`, `gap-y-*`. Token names (smallest → largest):

`xxs` · `xs` · `sm` · `m` · `l` · `xl` · `xxl` · `3xl` · `4xl`

```tsx
<View className="gap-xs p-m" />
<View className="flex-row gap-l px-xl" />
```

Note the single-letter middle steps (`m` 16px, `l` 24px). `md` and `lg` exist as
aliases of those two, but the single-letter spelling is the one used across the
library — keep to it so spacing reads consistently. In the radius scale, `md` and
`lg` are the real (and only) names for their steps.

## Radius

Applies to `rounded-*`:

`xs` · `sm` · `md` · `lg`

```tsx
<Box className="rounded-md" />
<Box className="surface surface-sm" />   {/* a surface: padding + radius as one class */}
```

Surface sizes pair the two scales: `surface-xxs` (`p-xs rounded-xs`) ·
`surface-xs` (`p-sm rounded-xs`) · `surface-sm` (`p-m rounded-sm`) ·
`surface-md` (`p-xl rounded-sm`) · `surface-lg` (`p-xxl rounded-md`).

## Shadow / elevation

Applies to `shadow-*`:

`s` · `m` · `l` · `lowered`

```tsx
<Box className="surface shadow-m" />
<Box className="shadow-l" />
```

`shadow-lowered` is the inset/sunken elevation. It always travels with the
lowered ground, so write the `lowered` utility (`bg-lowered shadow-lowered`)
rather than the shadow alone.

## Quick mapping from raw Tailwind

| Don't write  | Write                        |
| ------------ | ---------------------------- |
| `p-4`        | `p-m`                        |
| `gap-2`      | `gap-xs`                     |
| `rounded-lg` | `rounded-sm` or `rounded-md` |
| `shadow-md`  | `shadow-m`                   |
