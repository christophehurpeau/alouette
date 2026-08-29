# Choice inputs — autocomplete and single-select groups

## InputTextAutocomplete

A text field backed by a filtered listbox — use it when the user types to narrow
a known list. `Select` stays the right choice when the value is picked from the
list without typing.

```tsx
import { InputTextAutocomplete } from "alouette";

<InputTextAutocomplete
  aria-label="Fruit"
  placeholder="Search a fruit..."
  options={[
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Durian (sold out)", value: "durian", disabled: true },
  ]}
  onValueChange={setFruit}
/>;
```

Two values, each independently controllable: the **selection**
(`value` / `defaultValue` / `onValueChange`, called with `""` when cleared) and
the **text** (`inputValue` / `defaultInputValue` / `onInputValueChange`).
`defaultInputValue` falls back to the label of the initially selected option, so
a caller that only controls the selection still starts on the right text.

Options are filtered by a case-insensitive substring match on `label`; pass
`filterOption(option, inputValue)` for anything else. `emptyLabel` (default
`"No result"`) is announced in place of the list when nothing matches. It also
takes `accent`, `disabled`, `mode` (the `InputText` modes) and
`aria-label` / `aria-labelledby` — it renders no label element of its own, so one
of the two is what names both the field and the listbox.

The presentation is per platform and needs no handling: web anchors the menu
under the field with full keyboard navigation, while native opens a sheet holding
the editable input (a `Modal` resigns the keyboard behind it, so the field left in
the layout is a read-only trigger).

## Single-select groups

Three families share one API: the group owns the value (`value`, `defaultValue`,
`onValueChange`, plus `accent` and `disabled`), children are composed rather than
passed as an options array, and a child's own `disabled` affects only that
option. Label the group via `aria-labelledby`.

- `RadioGroup` + `Radio` — circle-dot list, for longer or self-evident options.
- `RadioButtonGroup` + `RadioButton` — segmented pill bar: a lowered 44px track,
  each pressable filling the tap target around a shorter visible chip. It is a
  form input; for the same material used to move between destinations or switch
  views use `NavBar` / `Tabs` (alouette-navigation/SKILL.md). `compact` tightens
  each chip's horizontal padding so more options fit on one row — the 44px tap
  target is unchanged.
- `RadioCardGroup` + `RadioCard` — cards with `icon`, `label`, `description` and
  a radio indicator, for options that need explaining. The selected card is
  `PressableBox`'s `contained` fill, the rest its `outlined` surface. Group
  `variant` is `"list"` (default, one per row) or `"stack"` (cards wrap and share
  a row from a 240px basis); both the group and each card take a `className` for
  layout (widths, wrapping), not for restyling the card material.

```tsx
<RadioGroup defaultValue="week" onValueChange={setRange} aria-labelledby={labelId}>
  <Radio value="day" label="Day" />
  <Radio value="month" label="Month" disabled />
</RadioGroup>

<RadioButtonGroup compact defaultValue="week" accent="brand">
  <RadioButton value="day" label="Day" />
  <RadioButton value="week" label="Week" />
</RadioButtonGroup>

<RadioCardGroup variant="stack" defaultValue="public" onValueChange={setVisibility}>
  <RadioCard value="public" icon={<GlobeRegularIcon />} label="Public"
    description="Anyone with the link" />
  <RadioCard value="private" icon={<LockRegularIcon />} label="Private" />
</RadioCardGroup>
```

`label` is each option's accessible name — required even when a description
carries the detail. Inside a form, render any of the three from a `FormField`
`render` prop: `value={field.value}` + `onValueChange={field.onChange}` +
`aria-labelledby={labelId}` (no `ref`, they are not focusable text). Since
`field.value` is typed from `name`, a `"day" | "week"` union field arrives as
that union, not as a widened `string`.
