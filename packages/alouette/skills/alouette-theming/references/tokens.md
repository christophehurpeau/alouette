# alouette — Token Catalog

Base tokens cascade from the nearest theme scope (mode + optional accent).
Always reference them by className (`bg-surface`, `text-accent`) — that is the
only public form; alouette exports no hook to read a token value in JS.

## Color tokens

Reference as `bg-*`, `text-*`, `border-*`, `outline-*`. The `--color-*` names
below are the underlying CSS variables, used inside the generated palette CSS.

### Surfaces & backgrounds

| Token              | className examples    |
| ------------------ | --------------------- |
| `surface`          | `bg-surface`          |
| `lowered`          | `bg-lowered`          |
| `emphasis`         | `bg-emphasis`         |
| `highlight`        | `bg-highlight`        |
| `highlight-accent` | `bg-highlight-accent` |
| `translucent`      | `bg-translucent`      |
| `screen`           | `bg-screen`           |

### Text / foreground

| Token             | className              | Use                            |
| ----------------- | ---------------------- | ------------------------------ |
| `sharp`           | `text-sharp`           | Default body text              |
| `muted`           | `text-muted`           | Secondary text                 |
| `accent`          | `text-accent`          | Accented text (current accent) |
| `accent-muted`    | `text-accent-muted`    | Muted accented text            |
| `on-accent`       | `text-on-accent`       | Text on an accent background   |
| `on-accent-muted` | `text-on-accent-muted` | Muted text on accent           |
| `on-emphasis`     | `text-on-emphasis`     | Text on an `emphasis` element  |
| `on-list`         | `text-on-list`         | Label and caret of a list row  |
| `disabled-sharp`  | `text-disabled-sharp`  | Disabled, on filled            |
| `disabled-muted`  | `text-disabled-muted`  | Disabled, on outline           |

### Borders & gradients

| Token                    | className                    |
| ------------------------ | ---------------------------- |
| `border-sharp`           | `border-border-sharp`        |
| `border-muted`           | `border-border-muted`        |
| `screen-gradient-start`  | `from-screen-gradient-start` |
| `screen-gradient-middle` | `via-screen-gradient-middle` |
| `screen-gradient-end`    | `to-screen-gradient-end`     |

### Interactive & form tokens

Driven automatically by Button / IconButton / PressableBox / InputText state
variants; you rarely apply them by hand. Families:
`--color-interactive-contained-{pressable|hover|focus|active|disabled}`,
`--color-interactive-outlined-{pressable|hover|focus|active|disabled}`,
`--color-interactive-list-{pressable|hover|focus|active}`,
`--color-form-placeholder`.

The contained family is a real fill in every theme, the neutral one included —
`accent="neutral"` is the grayscale accent, so it takes the same scale steps a
colored accent does and carries the same white `text-on-accent` label. `emphasis`
is the separate, lighter fill for an element sitting on a `lowered` track (a
`SegmentedBar` chip), whose ink is `text-on-emphasis`. The `interactive-list-*`
family is separate again: it is the ground of `PressableBox`'s `list` variant
(`PressableListItem`), a _tone_ of the theme — the card steps when neutral, the
accent's pale tints in light mode and its own dark ground in dark mode — so a row
takes `text-on-list` for both label and caret instead of flipping to
`text-on-accent`: that ink is the accent itself in light mode, where a pale tint
cannot carry the hue, and the sharp ambient ink in dark mode, where the ground
already is the accent. It is too deep a ground for `muted`, so secondary
`text-muted` copy in a row belongs on a neutral one only.

## Spacing scale

Use as `p-*`, `px-*`, `py-*`, `m-*`, `gap-*`, etc. (`--spacing-*`).

`xxs` · `xs` · `sm` · `m` · `l` · `xl` · `xxl` · `3xl` · `4xl`

`md` and `lg` are aliases of `m` (16px) and `l` (24px); the single-letter
spelling is the one used across the library.

Example: `className="p-m gap-xs"` (not `p-4 gap-2`).

## Radius scale

Use as `rounded-*` (`--radius-*`): `xs` · `sm` · `md` · `lg`.

## Shadow / elevation

Use as `shadow-*`: `s` · `m` · `l` · `lowered`.

## Theme names (ScopedTheme)

`ScopedTheme theme={...}` accepts `"light"`, `"dark"`, or `"{mode}_{accent}"`
(e.g. `"light_brand"`, `"dark_danger"`). Prefer the `accent` prop or
`AccentScope` over composing theme names by hand.
