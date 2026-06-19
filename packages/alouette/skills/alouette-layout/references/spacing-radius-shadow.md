# alouette — Spacing, Radius & Shadow Scale

Use these alouette tokens instead of the default Tailwind numeric scale, so
layout stays on the design-system rhythm.

## Spacing

Applies to `p-*`, `px-*`, `py-*`, `pt-*`/`pb-*`/`pl-*`/`pr-*`, `m-*`, `gap-*`,
`gap-x-*`, `gap-y-*`. Token names (smallest → largest):

`xxs` · `xs` · `sm` · `m` · `l` · `xl` · `xxl` · `3xl` · `4xl`

```tsx
<VStack className="gap-xs p-m" />
<HStack className="gap-l px-xl" />
```

Note the single-letter middle steps (`m`, `l`) — there is no `md`/`lg` in the
spacing scale (those exist only in the radius scale).

## Radius

Applies to `rounded-*`:

`xs` · `sm` · `md` · `lg`

```tsx
<Surface className="rounded-sm" />
<Box className="rounded-md" />
```

## Shadow / elevation

Applies to `shadow-*`:

`s` · `m` · `l` · `lowered`

```tsx
<Surface shadow="m" />          {/* via Surface prop */}
<Box className="shadow-l" />    {/* or directly */}
```

`shadow-lowered` is the inset/sunken elevation paired with `variant="lowered"`
on `Surface`.

## Quick mapping from raw Tailwind

| Don't write | Write        |
| ----------- | ------------ |
| `p-4`       | `p-m`        |
| `gap-2`     | `gap-xs`     |
| `rounded-lg`| `rounded-sm` or `rounded-md` |
| `shadow-md` | `shadow-m`   |
