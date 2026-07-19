---
name: alouette-forms
description: >
  Forms end to end. Inputs: InputText (mode: password/email/number/tel/url/search),
  TextArea, Switch (checked + onValueChange; use disabled not editable). Single-select:
  RadioGroup + Radio (circle-dot list) and RadioButtonGroup + RadioButton (segmented
  pill bar); controlled/uncontrolled via value/defaultValue/onValueChange + accent/disabled.
  Validation on react-hook-form: Form owns the instance and exposes submit() via render
  prop (no control passing); FormField wires Controller to FormItem label/error/required;
  FormFieldArray wraps useFieldArray with add/remove; FormSubmitButton drives
  loading/success/failed; SimpleVForm is the vertical-stack shortcut. errorToMessage
  required (i18n); FormValidationError distinguishes invalid fields from onSubmit failures.
  Load when building text fields, toggles, radio groups, or a validated form.
type: core
library: alouette
library_version: "20.6.0"
requires:
  - alouette-theming
  - alouette-actions
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/inputs/InputText.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/inputs/TextArea.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/inputs/Switch.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/inputs/RadioGroup.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/inputs/Radio.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/inputs/RadioButtonGroup.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/inputs/RadioButton.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/Form.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/FormField.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/FormItem.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/FormFieldArray.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/FormSubmitButton.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/SimpleVForm.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/FormField.stories.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/SimpleVForm.stories.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/FormFieldArray.stories.tsx"
---

This skill builds on alouette-theming (token model) and alouette-actions (the
ActionButton lifecycle the submit button reuses). Read them first.

# alouette — Forms

Two layers. **Inputs** are the raw controls: `InputText` wraps react-native
`TextInput` with alouette styling and a `mode` prop, `TextArea` is a multiline
`InputText`, and `Switch` wraps the native switch with themed colors.
**Composition** wraps [react-hook-form](https://react-hook-form.com): `Form`
owns the form instance and hands `submit()` to its subtree, `FormField` binds
one field to a labelled, error-aware row and renders any input, and the submit
button reuses the async-action lifecycle. You do not touch `control` — it flows
through context.

## Inputs

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

```tsx
<InputText mode="password" value={pw} onChangeText={setPw} />
<InputText mode="number" value={qty} onChangeText={setQty} />
```

### Multiline / TextArea

```tsx
import { TextArea } from "alouette";

<TextArea value={notes} onChangeText={setNotes} placeholder="Notes" />;
```

### Switch (controlled or uncontrolled)

```tsx
import { Switch } from "alouette";

// Controlled
<Switch checked={on} onValueChange={setOn} />

// Uncontrolled (manages its own state)
<Switch onValueChange={(v) => log(v)} />
```

### Disabled

```tsx
<InputText disabled value={value} />
<Switch disabled checked={on} />
```

### RadioGroup — circle-dot single-select list

`RadioGroup` owns the selected value; `Radio` children read it via context.
Controlled/uncontrolled via `value` / `defaultValue` + `onValueChange`. `accent`
and `disabled` propagate to all options; `disabled` on an individual `Radio`
disables only that option. Label the group via `aria-labelledby`.

```tsx
import { RadioGroup, Radio } from "alouette";

<RadioGroup
  defaultValue="week"
  onValueChange={setRange}
  aria-labelledby={labelId}
>
  <Radio value="day" label="Day" />
  <Radio value="week" label="Week" />
  <Radio value="month" label="Month" disabled />
</RadioGroup>
```

### RadioButtonGroup — segmented pill bar

Same API as `RadioGroup` / `Radio`, but rendered as a pill-style segmented
control. The track is a `Surface variant="lowered"` with no vertical padding
(44 px); each `RadioButton` pressable fills the full 44 px tap target while
centering a shorter visible chip.

```tsx
import { RadioButtonGroup, RadioButton } from "alouette";

<RadioButtonGroup defaultValue="week" accent="brand">
  <RadioButton value="day" label="Day" />
  <RadioButton value="week" label="Week" />
  <RadioButton value="month" label="Month" />
</RadioButtonGroup>
```

Use `RadioButtonGroup` inside a `FormField` `render` prop to get label/error
wiring:

```tsx
<FormField<Values>
  name="range"
  label="Date range"
  required
  render={({ field, labelId }) => (
    <RadioButtonGroup
      value={field.value}
      onValueChange={field.onChange}
      aria-labelledby={labelId}
    >
      <RadioButton value="day" label="Day" />
      <RadioButton value="week" label="Week" />
    </RadioButtonGroup>
  )}
/>
```

## Validated forms

`SimpleVForm` is the common case: a vertical stack of fields plus a trailing
submit button.

```tsx
import { SimpleVForm, FormField, FormValidationError } from "alouette";
import { InputText } from "alouette";

interface Values { name: string; email: string }

function submitErrorToMessage(error: unknown): string {
  if (error instanceof FormValidationError) return "Please fix the errors above.";
  return error instanceof Error ? error.message : "Something went wrong.";
}

<SimpleVForm<Values>
  defaultValues={{ name: "", email: "" }}
  submitLabel="Submit"
  submitErrorToMessage={submitErrorToMessage}
  onSubmit={async (values) => saveToServer(values)}
  render={() => (
    <>
      <FormField<Values>
        name="name"
        label="Name"
        required="Name is required."
        render={({ field, labelId }) => (
          <InputText
            ref={field.ref}
            value={field.value}
            aria-labelledby={labelId}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />
      {/* more FormFields */}
    </>
  )}
/>;
```

### FormField wiring

`FormField` renders any input through `render` — it is not tied to `InputText`.
The rendered input must spread the three `field` bindings and the label:

- `ref={field.ref}` — lets pressing the label focus the input (via
  react-hook-form `setFocus`).
- `value={field.value}` / `onChangeText={field.onChange}` / `onBlur={field.onBlur}`.
- `aria-labelledby={labelId}` — ties the input to `FormItem`'s generated label.

`required` doubles as the empty-field message: `true` shows the marker with no
message; any other `ReactNode` is the message shown once the field is left empty.
`validate` takes a react-hook-form validator (returns an error string or
`undefined`). For rich/non-string error content, use `renderError`.

```tsx
<FormField<Values>
  name="email"
  label="Email"
  validate={(v) => (/^[^@]+@[^@]+$/.test(v) ? undefined : "Enter a valid email.")}
  render={({ field, labelId }) => (
    <InputText ref={field.ref} mode="email" value={field.value}
      aria-labelledby={labelId} onChangeText={field.onChange} onBlur={field.onBlur} />
  )}
/>
```

### Custom layout with Form

When the layout isn't a plain vertical stack, use `Form` directly and place a
`FormSubmitButton` (or call `submit` yourself). `render` receives `{ submit }`.

```tsx
import { Form, FormSubmitButton } from "alouette";

<Form<Values>
  defaultValues={{ name: "", email: "" }}
  onSubmit={async (values) => saveToServer(values)}
  render={({ submit }) => (
    <>
      {/* fields */}
      <FormSubmitButton label="Save" errorToMessage={submitErrorToMessage} onPress={submit} />
    </>
  )}
/>;
```

### Repeatable item lists with FormFieldArray

`FormFieldArray` wraps react-hook-form's `useFieldArray` and owns the array
label, add/remove buttons, and padding to a minimum count. It is agnostic
about item shape — `render` gets the item's path prefix (e.g. `"guests.0"`)
and composes its own `FormField`(s) from it, bound directly for a raw value
or via `${name}.fieldName` for an object item:

```tsx
<FormFieldArray<Values>
  name="guests"
  label="Guests"
  emptyValue={{ value: "" }}
  minSize={1}
  addLabel="Add guest"
  render={({ name, label }) => (
    <FormField<Values>
      name={`${name}.value` as `guests.${number}.value`}
      label={label}
      required="Guest name is required."
      render={({ field, labelId }) => (
        <InputText ref={field.ref} value={field.value as string}
          aria-labelledby={labelId} onChangeText={field.onChange} onBlur={field.onBlur} />
      )}
    />
  )}
/>
```

The leading `minSize` items are padded in on mount and cannot be removed.
Each row tints to the danger accent on hover over its remove button via
`StableAccentScope` (see alouette-theming) — that's built in, not something
callers wire up themselves.

### Submit lifecycle

`FormSubmitButton` is built on `ActionButton`, so submitting shows the spinner /
success / failed overlay and an inline error automatically. `submit()` rejects
with `FormValidationError` when fields are invalid (nothing was submitted), so
`errorToMessage` can render "fix the errors above" distinctly from a real
`onSubmit` failure.

`mode` defaults to `"onTouched"`. By default an exception thrown from `onSubmit`
propagates (consumed by `FormSubmitButton`); pass `onSubmitError` to `Form` only
if you need to observe it elsewhere.

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
```

Correct:

```tsx
<InputText mode="password" />
```

The `mode` prop bundles `inputMode` + `keyboardType` + `autoComplete` +
`secureTextEntry` consistently across platforms; setting them piecemeal is
error-prone.

Source: packages/alouette/src/ui/inputs/InputText.tsx (MODE_PROPS)

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

### HIGH Passing control / register to FormField

Wrong:

```tsx
<FormField control={control} name="name" ... />
```

Correct:

```tsx
<Form render={() => <FormField name="name" ... />} />
```

`Form` provides the react-hook-form instance through context; `FormField` reads
`control` and `setFocus` itself via `useFormContext`. There is no `control` prop —
just render `FormField` inside `Form`.

Source: packages/alouette/src/ui/forms/FormField.tsx; ui/forms/Form.tsx

### HIGH Naming FormField's input function `children` instead of `render`

Wrong:

```tsx
<FormField name="name" label="Name">{({ field }) => <InputText ... />}</FormField>
```

Correct:

```tsx
<FormField name="name" label="Name" render={({ field, labelId }) => <InputText ... />} />
```

The input is supplied through the `render` prop, not children — a function child
is ignored.

Source: packages/alouette/src/ui/forms/FormField.tsx

### HIGH Forgetting field.ref / aria-labelledby on the input

Wrong:

```tsx
render={({ field }) => <InputText value={field.value} onChangeText={field.onChange} />}
```

Correct:

```tsx
render={({ field, labelId }) => (
  <InputText ref={field.ref} value={field.value} aria-labelledby={labelId}
    onChangeText={field.onChange} onBlur={field.onBlur} />
)}
```

Without `field.ref`, pressing the label can't focus the input and
react-hook-form's `setFocus` no-ops; without `aria-labelledby={labelId}` the
input has no accessible name.

Source: packages/alouette/src/ui/forms/FormField.tsx; ui/forms/FormItem.tsx

### MEDIUM Omitting errorToMessage or hardcoding an English default

Wrong:

```tsx
<FormSubmitButton label="Save" onPress={submit} /> {/* errorToMessage missing */}
```

Correct:

```tsx
<FormSubmitButton label="Save" onPress={submit} errorToMessage={submitErrorToMessage} />
```

`errorToMessage` is required (not defaulted) because a library default could only
be a hardcoded, untranslatable string. Handle `FormValidationError` inside it to
distinguish invalid fields from a genuine submit failure.

Source: packages/alouette/src/ui/forms/FormSubmitButton.tsx; ui/forms/Form.tsx

### MEDIUM Reimplementing the submit button's loading state

Wrong: a raw `Button` with manual `isSubmitting` + `disabled` around `submit`.

Correct: `FormSubmitButton` (or `SimpleVForm`, which adds it for you) — it derives
loading/success/failed from the submit promise like any `ActionButton`.

Source: packages/alouette/src/ui/forms/FormSubmitButton.tsx

### MEDIUM Mapping a data array of fields instead of FormFieldArray

Wrong:

```tsx
{fields.map((f, i) => <FormField key={i} name={`guests.${i}.value`} ... />)}
<Button text="Add" onPress={() => setFields([...fields, {}])} />
```

Correct:

```tsx
<FormFieldArray<Values>
  name="guests"
  label="Guests"
  emptyValue={{ value: "" }}
  render={({ name, label }) => <FormField name={`${name}.value`} label={label} ... />}
/>
```

Hand-rolled array state drifts from react-hook-form's own field array (stale
indices on remove, no stable `key`, no built-in add/remove affordances).
`FormFieldArray` wraps `useFieldArray` and supplies the label, indentation,
and add/remove buttons; `render` only supplies each item's own fields.

Source: packages/alouette/src/ui/forms/FormFieldArray.tsx

### MEDIUM Confusing RadioGroup with RadioButtonGroup

`RadioGroup` + `Radio`: vertical circle-dot list (longer option lists, labeled
form fields). `RadioButtonGroup` + `RadioButton`: horizontal segmented pill bar
(2–4 compact, equal-weight choices like view mode or time range). Neither
replaces `Select` — use `Select` for large option lists.

Source: packages/alouette/src/ui/inputs/RadioGroup.tsx; ui/inputs/RadioButtonGroup.tsx
