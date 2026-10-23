---
name: alouette-inputs
description: >
  The controls that take a value from the user. InputText is the text field,
  whose mode sets the keyboard, autocomplete and secure entry together;
  TextArea is its multiline twin, InputPassword adds the show/hide toggle, and
  InputCode is a one-time code (never a row of InputTexts). Switch applies a
  setting at once; a standalone Checkbox is a form opt-in. Select picks one
  value from a known list and InputTextAutocomplete narrows that list by
  typing. Single-select groups compose their children, never an options array:
  RadioGroup (a list), RadioButtonGroup (a segmented pill, behind the
  light/dark ColorModePicker) and RadioCardGroup (cards); multi-select
  CheckboxGroup and CheckboxCardGroup. A choice that moves between routes is
  navigation, not a radio group. Binding these to a validated form is
  alouette-forms. Load when adding a text field, a password or code field, a
  dropdown, a toggle, checkboxes, radio buttons, a segmented choice, or a
  light/dark switch.
sources:
  - packages/alouette/src/ui/inputs/InputText.tsx
  - packages/alouette/src/ui/inputs/InputPassword.tsx
  - packages/alouette/src/ui/inputs/InputCode.tsx
  - packages/alouette/src/ui/inputs/InputCode.stories.tsx
  - packages/alouette/src/ui/inputs/Select.shared.tsx
  - packages/alouette/src/ui/inputs/Select.tsx
  - packages/alouette/src/ui/inputs/Select.web.tsx
  - packages/alouette/src/ui/inputs/InputTextAutocomplete.shared.tsx
  - packages/alouette/src/ui/inputs/InputTextAutocomplete.tsx
  - packages/alouette/src/ui/inputs/InputTextAutocomplete.web.tsx
  - packages/alouette/src/ui/inputs/InputTextAutocomplete.stories.tsx
  - packages/alouette/src/ui/inputs/TextArea.tsx
  - packages/alouette/src/ui/inputs/Switch.tsx
  - packages/alouette/src/ui/inputs/Switch.web.tsx
  - packages/alouette/src/ui/inputs/RadioGroup.tsx
  - packages/alouette/src/ui/inputs/Radio.tsx
  - packages/alouette/src/ui/inputs/RadioButtonGroup.tsx
  - packages/alouette/src/ui/inputs/RadioButton.tsx
  - packages/alouette/src/ui/inputs/RadioCardGroup.tsx
  - packages/alouette/src/ui/inputs/RadioCard.tsx
  - packages/alouette/src/ui/inputs/RadioCardGroup.stories.tsx
  - packages/alouette/src/ui/inputs/CheckboxGroup.tsx
  - packages/alouette/src/ui/inputs/Checkbox.tsx
  - packages/alouette/src/ui/inputs/CheckboxCardGroup.tsx
  - packages/alouette/src/ui/inputs/CheckboxCard.tsx
  - packages/alouette/src/ui/inputs/ColorModePicker.tsx
  - packages/alouette/src/ui/inputs/ColorModePicker.stories.tsx
---

This skill builds on alouette-theming (token model). Read it first.

# alouette — Inputs

The raw controls. Each one works on its own, controlled (`value` +
`onChangeText` / `onValueChange`) or not; inside a validated form the same
control is rendered from a `FormField`'s `render`, which hands it the field
bindings and the label/error wiring (alouette-forms/SKILL.md).

## Core Patterns

```tsx
import { InputText } from "alouette";

<InputText
  mode="email"
  value={email}
  onChangeText={setEmail}
  placeholder="you@example.com"
/>;
```

### Input modes

`mode` bundles the right keyboard, input mode, autocomplete and secure entry:
`"password" | "email" | "number" | "tel" | "url" | "search" | "webSearch"`.

A one-time code (SMS, e-mail, authenticator) is `InputCode`, never a row of
`InputText`s: one input holds the code behind its cells, so paste, OS autofill,
Backspace and the screen reader see a single field. Modes, `onComplete` and the
form wiring: [references/input-code.md](references/input-code.md).

A password is `InputPassword`, not `mode="password"`: that mode plus an eye
toggle in the field (`aria-pressed` while the password shows, named by
`toggleLabel`, default "Show password"), controlled through `visible` /
`defaultVisible` / `onVisibleChange`. Pass `autoComplete="new-password"` on a
sign-up form.

### Slots: a glyph or an icon button in the field

`startSlot` / `endSlot` overlay the field's leading / trailing square (`control-md`), the text
padded past them: an `Icon` carrying its own ink (`text-muted`, or
`text-form-disabled-text` on a disabled field) or a `soft` `sm` `IconButton`.
Fixed-width content only, never a prefix text. With a slot, `className` lands
on the frame around the input, the box the parent lays out.

```tsx
<InputPassword autoComplete="new-password" toggleLabel="Afficher le mot de passe" />
<InputText placeholder="Search" startSlot={<Icon icon={<MagnifyingGlassRegularIcon />} className="text-muted" />} />
<InputText endSlot={<IconButton variant="soft" size="sm" icon={<CalendarBlankRegularIcon />} aria-label="Pick a date" onPress={openPicker} />} />
```

### TextArea, Switch, disabled

```tsx
<TextArea value={notes} onChangeText={setNotes} placeholder="Notes" />

<Switch checked={on} onValueChange={setOn} />   {/* controlled */}
<Switch onValueChange={(v) => log(v)} />        {/* uncontrolled */}

<InputText disabled value={value} />
<Switch disabled checked={on} />
```

### Select, autocomplete and single-select groups

`Select` picks one value from a list without typing; `InputTextAutocomplete` is a
text field backed by a filtered listbox, for narrowing that list by typing. Three
single-select families share one group-owns-the-value API and compose their
children rather than take an options array: `RadioGroup` + `Radio` (circle-dot
list), `RadioButtonGroup` + `RadioButton` (segmented pill bar) and
`RadioCardGroup` + `RadioCard` (icon/label/description cards).
Multi-select: `CheckboxGroup`, `CheckboxCardGroup` (`values: string[]`) and a standalone boolean `Checkbox` for form opt-ins (an immediate setting stays a `Switch`).

`RadioButtonGroup` also takes `variant="icon"` — a pill of square icon-only
chips, each option's `label` staying its accessible name. `ColorModePicker` is
the light/dark control built on it: it reports a `ColorModePreference` and the
app applies it with `useResolvedColorMode` (alouette-theming/SKILL.md).

Props, platform behavior and examples: [references/choice-inputs.md](references/choice-inputs.md).

## Common Mistakes

### MEDIUM Disabling an input with editable={false}

Wrong:

```tsx
<InputText editable={false} />
```

Correct:

```tsx
<InputText disabled />
```

`InputText` exposes a `disabled` prop that sets `editable`, `aria-disabled` and
the disabled styling together; passing `editable` directly skips the disabled
visual state and a11y.

Source: packages/alouette/src/ui/inputs/InputText.tsx

### MEDIUM Setting keyboardType / secureTextEntry by hand

Wrong:

```tsx
<InputText secureTextEntry autoComplete="current-password" />
<InputText keyboardType="email-address" inputMode="email" />
```

Correct:

```tsx
<InputPassword />
<InputText mode="email" />
```

The `mode` prop bundles `inputMode` + `keyboardType` + `autoComplete` +
`secureTextEntry` consistently across platforms; setting them piecemeal is
error-prone. A password also gets its show/hide toggle from `InputPassword`.

Source: packages/alouette/src/ui/inputs/InputText.tsx (MODE_PROPS); ui/inputs/InputPassword.tsx

### MEDIUM Wiring Switch like a web checkbox

Wrong:

```tsx
<Switch value={on} onChange={(e) => setOn(e.target.checked)} />
```

Correct:

```tsx
<Switch checked={on} onValueChange={setOn} />
```

`Switch` is controlled via `checked` and reports through
`onValueChange(value: boolean)`. `value`/`onChange` with `e.target` do nothing
in React Native.

Source: packages/alouette/src/ui/inputs/Switch.tsx

### MEDIUM Picking the wrong single-select family

`RadioGroup` + `Radio`: vertical circle-dot list (longer option lists, labeled
form fields). `RadioButtonGroup` + `RadioButton`: horizontal segmented pill bar
(2–4 compact, equal-weight choices like view mode or time range).
`RadioCardGroup` + `RadioCard`: cards, for a few options that each need an icon
and a line of explanation. None of the three replaces the two components for long
lists: `Select` when the value is picked from the list, `InputTextAutocomplete`
when the user types to narrow it.

The three share one context, so a child must sit inside its own group: a
`RadioCard` under a `RadioGroup` renders, but a `Radio` outside any of the three
throws "Radio, RadioButton and RadioCard must be rendered inside a RadioGroup,
RadioButtonGroup or RadioCardGroup."

Source: packages/alouette/src/ui/inputs/RadioGroup.tsx; ui/inputs/RadioButtonGroup.tsx; ui/inputs/RadioCardGroup.tsx
