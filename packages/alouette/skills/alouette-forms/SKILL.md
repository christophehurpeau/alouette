---
name: alouette-forms
description: >
  Inputs: InputText (mode: password/email/number/tel/url/search), TextArea, Switch
  (checked + onValueChange; use disabled not editable). Single-select groups,
  controlled or not via value/defaultValue/onValueChange + accent/disabled:
  RadioGroup + Radio (circle-dot list), RadioButtonGroup + RadioButton (segmented
  pill bar), RadioCardGroup + RadioCard (icon/label/description cards, list|stack).
  Validation on react-hook-form: Form owns the instance and hands { control, submit } to
  its render prop, and every field takes that control — so the form type is written once
  on Form and each field's value type comes from its own name. FormField wires Controller
  to FormItem label/error/required; FormFieldArray wraps useFieldArray with add/remove;
  FormSubmitButton drives loading/success/failed; SimpleVForm is the vertical-stack
  shortcut; FormEditableItem edits a row in a modal owning its own Form (mounted per
  open, so cancel is an unmount, and its fields come through render, not children).
  errorToMessage required (i18n); FormValidationError distinguishes invalid fields from
  onSubmit failures. Load when building text fields, toggles, radio groups, a validated
  form, or an edit-in-a-modal row.
type: core
library: alouette
library_version: "22.6.0"
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
  - "christophehurpeau/alouette:packages/alouette/src/ui/inputs/RadioCardGroup.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/inputs/RadioCard.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/inputs/RadioCardGroup.stories.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/Form.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/FormField.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/FormItem.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/FormFieldArray.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/FormSubmitButton.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/SimpleVForm.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/FormEditableItem.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/FormField.stories.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/SimpleVForm.stories.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/FormFieldArray.stories.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/forms/FormEditableItem.stories.tsx"
---

This skill builds on alouette-theming (token model) and alouette-actions (the
ActionButton lifecycle the submit button reuses). Read them first.

# alouette — Forms

Two layers. **Inputs** are the raw controls: `InputText` wraps react-native
`TextInput` with alouette styling and a `mode` prop, `TextArea` is a multiline
`InputText`, and `Switch` wraps the native switch with themed colors.
**Composition** wraps [react-hook-form](https://react-hook-form.com): `Form`
owns the form instance and hands `{ control, submit }` to its subtree,
`FormField` binds one field to a labelled, error-aware row and renders any
input, and the submit button reuses the async-action lifecycle.

`control` is how the types flow, exactly as in react-hook-form's own
`Controller`: write the form type **once** on `<Form<Values>>`, then pass its
`control` to each field. The field infers the form type from the control and its
own value type from `name`, so `field.value` is that one field's type — never a
union of every field, and never a per-field type argument.

```tsx
<Form<Values> … render={({ control }) => <FormField control={control} name="age" … />} />
//                                       field.value is Values["age"], inferred
```

## Inputs

```tsx
import { InputText } from "alouette";

<InputText mode="email" value={email} onChangeText={setEmail} placeholder="you@example.com" />;
```

### Input modes

`mode` bundles the right keyboard, input mode, autocomplete and secure entry:
`"password" | "email" | "number" | "tel" | "url" | "search" | "webSearch"`.

```tsx
<InputText mode="password" value={pw} onChangeText={setPw} />
<InputText mode="number" value={qty} onChangeText={setQty} />
```

### TextArea, Switch, disabled

```tsx
<TextArea value={notes} onChangeText={setNotes} placeholder="Notes" />

<Switch checked={on} onValueChange={setOn} />   {/* controlled */}
<Switch onValueChange={(v) => log(v)} />        {/* uncontrolled */}

<InputText disabled value={value} />
<Switch disabled checked={on} />
```

### Single-select groups

Three families share one API: the group owns the value (`value` / `defaultValue`
+ `onValueChange`, plus `accent` and `disabled`), children are composed rather
than passed as an options array, and a child's own `disabled` affects only that
option. Label the group via `aria-labelledby`.

- `RadioGroup` + `Radio` — circle-dot list, for longer or self-evident options.
- `RadioButtonGroup` + `RadioButton` — segmented pill bar: a lowered 44px track,
  each pressable filling the tap target around a shorter visible chip. It is a
  form input; for the same material used to move between destinations or switch
  views use `NavBar` / `Tabs` (alouette-navigation/SKILL.md).
- `RadioCardGroup` + `RadioCard` — cards with `icon`, `label`, `description` and
  a radio indicator, for options that need explaining. The selected card is
  `PressableBox`'s `contained` fill, the rest its `outlined` surface. Group
  `variant` is `"list"` (default, one per row) or `"stack"` (cards wrap and share
  a row from a 240px basis).

```tsx
<RadioGroup defaultValue="week" onValueChange={setRange} aria-labelledby={labelId}>
  <Radio value="day" label="Day" />
  <Radio value="month" label="Month" disabled />
</RadioGroup>

<RadioButtonGroup defaultValue="week" accent="brand">
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

## Validated forms

`SimpleVForm` is the common case: a vertical stack of fields plus a trailing
submit button.

```tsx
import { SimpleVForm, FormField, InputText, FormValidationError } from "alouette";

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
  render={({ control }) => (
    <FormField
      control={control}
      name="name"
      label="Name"
      required="Name is required."
      render={({ field, labelId }) => (
        <InputText ref={field.ref} value={field.value} aria-labelledby={labelId}
          onChangeText={field.onChange} onBlur={field.onBlur} />
      )}
    />
  )}
/>;
```

The type argument goes on `SimpleVForm` / `Form` only — `defaultValues` is a
`DeepPartial`, which infers poorly, so that one stays explicit. Nothing below it
needs one.

### FormField wiring

`FormField` renders any input through `render` — it is not tied to `InputText`.
The rendered input must spread the three `field` bindings and the label:

- `control={control}` — from the enclosing `Form`'s `render` params; types `name`
  and `field.value`.
- `ref={field.ref}` — lets pressing the label focus the input (via
  react-hook-form `setFocus`).
- `value={field.value}` / `onChangeText={field.onChange}` / `onBlur={field.onBlur}`.
- `aria-labelledby={labelId}` — ties the input to `FormItem`'s generated label.

`required` doubles as the empty-field message: `true` shows the marker with no
message; any other `ReactNode` is the message shown once the field is left empty.
`validate` takes a react-hook-form validator (returns an error string or
`undefined`). For rich/non-string error content, use `renderError`.

```tsx
<FormField
  control={control}
  name="email"
  label="Email"
  validate={(v) => (/^[^@]+@[^@]+$/.test(v) ? undefined : "Enter a valid email.")}
  render={({ field, labelId }) => (
    <InputText ref={field.ref} mode="email" value={field.value}
      aria-labelledby={labelId} onChangeText={field.onChange} onBlur={field.onBlur} />
  )}
/>
```

`validate`'s `v` is that field's value type, so a `number` field's validator takes
a number without a cast.

### Custom layout with Form

When the layout isn't a plain vertical stack, use `Form` directly and place a
`FormSubmitButton` (or call `submit` yourself). `render` receives
`{ control, submit }`.

```tsx
import { Form, FormSubmitButton } from "alouette";

<Form<Values>
  defaultValues={{ name: "", email: "" }}
  onSubmit={async (values) => saveToServer(values)}
  render={({ control, submit }) => (
    <>
      {/* fields */}
      <FormSubmitButton label="Save" errorToMessage={submitErrorToMessage} onPress={submit} />
    </>
  )}
/>;
```

To split the fields into their own component, give it a
`control: Control<Values>` prop rather than reaching for `useFormContext`. The
form instance is still in context — `setFocus` (to move focus between fields)
only lives there — but `control` is what carries the types.

### Repeatable item lists with FormFieldArray

`FormFieldArray` wraps react-hook-form's `useFieldArray` and owns the array
label, add/remove buttons, and padding to a minimum count. It is agnostic
about item shape — `render` gets the item's path prefix, typed
`` `${name}.${number}` ``, and composes its own `FormField`(s) from it, bound
directly for a raw value or via `${name}.fieldName` for an object item:

```tsx
<FormFieldArray
  control={control}
  name="guests"
  label="Guests"
  emptyValue={{ value: "" }}
  minSize={1}
  addLabel="Add guest"
  render={({ name, label }) => (
    <FormField
      control={control}
      name={`${name}.value`}
      label={label}
      required="Guest name is required."
      render={...}
    />
  )}
/>
```

No cast on the sub-path: because the item prefix is a template literal type,
`` `${name}.value` `` becomes `` `guests.${number}.value` ``, a real field path.
`emptyValue` is the array's item type, and `name` accepts arrays of primitives
too (`guests: string[]`, `emptyValue=""`) — alouette's own `FormArrayPath` is
used rather than react-hook-form's `ArrayPath`, which excludes them. `render`
also receives `control`, for an item renderer defined away from the call site;
inline, the enclosing `control` is already in scope.

`render` on the inner `FormField` is an `InputText` wired exactly as above. The
leading `minSize` items are padded in on mount and cannot be removed, and each
row tints to the danger accent on hover over its remove button via
`StableAccentScope` (alouette-theming) — built in, not caller-wired.

### Edit-in-a-modal rows with FormEditableItem

`FormEditableItem` is an `EditableItem` row (see alouette-data/SKILL.md) whose
editor is a modal owning **its own** `Form`. The `Form` is mounted only while
editing, so it reseeds from `defaultValues` on every open and cancelling is a
plain unmount — the screen's state is never touched by an abandoned edit.

```tsx
<FormEditableItem<Values>
  label="Display name"
  summary={<Badge accent="brand">{displayName}</Badge>}
  editAriaLabel="Edit display name"
  cancelLabel="Cancel"
  submitLabel="Save"
  submitErrorToMessage={submitErrorToMessage}
  defaultValues={{ displayName }}
  onSubmit={async (values) => saveToServer(values)}
  render={({ control }) => (
    /* the fields — an InputText FormField, wired as above */
    <FormField control={control} name="displayName" label="Name"
      required="A name is required." render={...} />
  )}
/>
```

`render` supplies the fields (the modal body) and hands them the **inner** Form's
`control` — they are not children, precisely because they must bind to that form
and not to the screen's. The Cancel / Save footer is built
for you. It takes the row props (`label`, `summary`, `details`, `editAriaLabel`,
`editIcon`, `variant`, `accent`, `disabled` — see alouette-data/SKILL.md) plus
`Form`'s `defaultValues` / `mode` / `onSubmit`, and the modal's `title`
(defaults to `label`), `size` and `closeButtonAriaLabel`. The modal closes only
once `onSubmit` resolves: a rejection (or a `FormValidationError` from invalid
fields) keeps it open with the error on the submit button.

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

### HIGH Omitting control, or writing the form type on every FormField

Wrong:

```tsx
<Form<Values> render={() => <FormField<Values> name="name" ... />} />
```

Correct:

```tsx
<Form<Values> render={({ control }) => <FormField control={control} name="name" ... />} />
```

`control` is required and is the only inference site: it types `name` against the
form and makes `field.value` that one field's type. Writing `FormField<Values>`
instead is an arity error (`TName` has no default) — deliberately, because an
explicit type argument would block `TName` from ever being inferred from `name`
and degrade `field.value` to a union of every field in the form. Reaching for
`useFormContext` to avoid threading `control` gets you the same union.

Source: packages/alouette/src/ui/forms/FormField.tsx; ui/forms/Form.tsx

### HIGH Naming FormField's input function `children` instead of `render`

Wrong:

```tsx
<FormField control={control} name="name" label="Name">{({ field }) => <InputText ... />}</FormField>
```

Correct:

```tsx
<FormField control={control} name="name" label="Name"
  render={({ field, labelId }) => <InputText ... />} />
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
{fields.map((f, i) => (
  <FormField key={i} control={control} name={`guests.${i}.value`} ... />
))}
<Button text="Add" onPress={() => setFields([...fields, {}])} />
```

Correct: `FormFieldArray` (see above).

Hand-rolled array state drifts from react-hook-form's own field array (stale
indices on remove, no stable `key`, no built-in add/remove affordances).
`FormFieldArray` wraps `useFieldArray` and supplies the label, indentation,
and add/remove buttons; `render` only supplies each item's own fields.

Source: packages/alouette/src/ui/forms/FormFieldArray.tsx

### HIGH Editing a field of the screen's form inside the modal, then restoring on cancel

Wrong:

```tsx
const { field } = useController<Values, "diet">({ name: "diet" });
const [editedFrom, setEditedFrom] = useState(field.value);

<IconButton onPress={() => { setEditedFrom(field.value); setEditing(true); }} … />
<Modal visible={editing} onClose={() => { field.onChange(editedFrom); setEditing(false); }}>
  <DietFields />   {/* FormFields of the *screen's* form */}
</Modal>
```

Correct: `<FormEditableItem defaultValues={{ diet }} onSubmit={save}
render={({ control }) => <DietFields control={control} />} />` (see above) — the
fields bind to the modal Form's own `control`, not to the screen's.

Binding the modal's fields to the surrounding form mutates shared state on every
keystroke, which is why the value then has to be snapshotted on open and restored
on cancel. `FormEditableItem` mounts a **separate** `Form` per open, seeded from
`defaultValues`: cancel is an unmount, and the row keeps showing the last saved
value with no restore logic.

Source: packages/alouette/src/ui/forms/FormEditableItem.tsx

### MEDIUM Picking the wrong single-select family

`RadioGroup` + `Radio`: vertical circle-dot list (longer option lists, labeled
form fields). `RadioButtonGroup` + `RadioButton`: horizontal segmented pill bar
(2–4 compact, equal-weight choices like view mode or time range).
`RadioCardGroup` + `RadioCard`: cards, for a few options that each need an icon
and a line of explanation. None replaces `Select` — use `Select` for large option
lists.

The three share one context, so a child must sit inside its own group: a
`RadioCard` under a `RadioGroup` renders, but a `Radio` outside any of the three
throws "Radio, RadioButton and RadioCard must be rendered inside a RadioGroup,
RadioButtonGroup or RadioCardGroup."

Source: packages/alouette/src/ui/inputs/RadioGroup.tsx; ui/inputs/RadioButtonGroup.tsx; ui/inputs/RadioCardGroup.tsx
