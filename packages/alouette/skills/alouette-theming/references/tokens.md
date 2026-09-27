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
| `on-tonal`        | `text-on-tonal`        | Ink of a `tonal` pressable     |
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
`--color-interactive-tonal-{pressable|hover|focus|active|disabled}`,
`--color-interactive-filled-{pressable|hover|focus|active|disabled}`,
`--color-interactive-outlined-{pressable|hover|focus|active|disabled}`,
`--color-form-placeholder`.

The `interactive-tonal-*` family is the ground of `PressableBox`'s default
`tonal` variant (`Button`, `IconButton`, `PressableListItem`), a _tone_ of the
theme lighter than the page — the card steps when neutral, the accent's pale
tints in light mode and its own dark ground in dark mode — so its label, icon and
caret take `text-on-tonal` instead of `text-on-accent`: that ink is the accent
itself in light mode, where a pale tint cannot carry the hue, and the sharp
ambient ink in dark mode, where the ground already is the accent. It is too deep
a ground for `muted`, so secondary `text-muted` copy on it belongs on a neutral
one only.

The `interactive-filled-*` family is the accent's own fill in every theme, the
neutral one included — `accent="neutral"` is the grayscale accent, whose fill is
the sharp ink turned into a ground: near black in light mode, near white in dark.
`text-on-accent` is white on every colored fill and on the neutral light one,
and dark on the neutral dark one; `enabled` (Avatar, Badge `solid.enabled`,
BrandLogo, the web Switch track) takes the same ground in the neutral theme.
`emphasis` is the separate, lighter fill for an element
sitting on a `lowered` track (a `SegmentedBar` chip), whose ink is
`text-on-emphasis`.

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
