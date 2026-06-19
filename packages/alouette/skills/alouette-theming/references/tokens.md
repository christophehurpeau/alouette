# alouette — Token Catalog

Base tokens cascade from the nearest theme scope (mode + optional accent). Use
the className form (`bg-surface`, `text-accent`) in markup; use `useThemeToken`
with the `--color-*` name only for props that can't take a className.

## Color tokens

Reference as `bg-*`, `text-*`, `border-*`, `outline-*` (className) or
`--color-*` (useThemeToken).

### Surfaces & backgrounds

| Token            | className examples            |
| ---------------- | ----------------------------- |
| `surface`        | `bg-surface`                  |
| `lowered`        | `bg-lowered`                  |
| `highlight`      | `bg-highlight`                |
| `highlight-accent` | `bg-highlight-accent`       |
| `translucent`    | `bg-translucent`              |
| `screen`         | `bg-screen`                   |

### Text / foreground

| Token              | className          | Use                          |
| ------------------ | ------------------ | ---------------------------- |
| `sharp`            | `text-sharp`       | Default body text            |
| `muted`            | `text-muted`       | Secondary text               |
| `accent`           | `text-accent`      | Accented text (current accent) |
| `accent-muted`     | `text-accent-muted`| Muted accented text          |
| `on-accent`        | `text-on-accent`   | Text on an accent background |
| `on-accent-muted`  | `text-on-accent-muted` | Muted text on accent     |
| `disabled-sharp`   | `text-disabled-sharp` | Disabled, on filled        |
| `disabled-muted`   | `text-disabled-muted` | Disabled, on outline       |

### Borders & gradients

| Token                   | className              |
| ----------------------- | ---------------------- |
| `border-sharp`          | `border-border-sharp`  |
| `border-muted`          | `border-border-muted`  |
| `screen-gradient-start` | `from-screen-gradient-start` |
| `screen-gradient-middle`| `via-screen-gradient-middle` |
| `screen-gradient-end`   | `to-screen-gradient-end` |

### Interactive & form tokens

Driven automatically by Button / IconButton / PressableBox / InputText state
variants; you rarely apply them by hand. Families:
`--color-interactive-contained-{pressable|hover|focus|active|disabled}`,
`--color-interactive-outlined-{pressable|hover|focus|active|disabled}`,
`--color-form-placeholder`.

## Spacing scale

Use as `p-*`, `px-*`, `py-*`, `m-*`, `gap-*`, etc. (`--spacing-*`).

`xxs` · `xs` · `sm` · `m` · `l` · `xl` · `xxl` · `3xl` · `4xl`

Example: `className="p-m gap-xs"` (not `p-4 gap-2`).

## Radius scale

Use as `rounded-*` (`--radius-*`): `xs` · `sm` · `md` · `lg`.

## Shadow / elevation

Use as `shadow-*`: `s` · `m` · `l` · `lowered`.

## Theme names (ScopedTheme)

`ScopedTheme theme={...}` accepts `"light"`, `"dark"`, or `"{mode}_{accent}"`
(e.g. `"light_brand"`, `"dark_danger"`). Prefer the `accent` prop or
`AccentScope` over composing theme names by hand.
