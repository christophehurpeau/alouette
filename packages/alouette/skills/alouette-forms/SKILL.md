---
name: alouette-forms
description: >
  Validated forms over react-hook-form. Form owns the instance and passes its
  control down, so the form type is written once and every field's value type
  is inferred; FormField labels one field, renders any input through render and
  reports its error; FormFieldArray repeats a group of fields with its own add
  and remove; FormSubmitButton drives the submit lifecycle (spinner, success,
  inline error) and sits in a DecisionBar beside Cancel; SimpleVForm is the
  vertical-stack shortcut. FormEditableItem and FormEditableSection edit a row
  or a section in a modal owning its own Form, so cancelling is an unmount,
  never a restore. The controls themselves are alouette-inputs. Load when
  building a form with validation or a submit button, a repeatable list of
  fields, or an edit-in-a-modal row.
sources:
  - packages/alouette/src/ui/forms/Form.tsx
  - packages/alouette/src/ui/forms/FormField.tsx
  - packages/alouette/src/ui/forms/FormItem.tsx
  - packages/alouette/src/ui/forms/FormFieldArray.tsx
  - packages/alouette/src/ui/forms/FormSubmitButton.tsx
  - packages/alouette/src/ui/forms/SimpleVForm.tsx
  - packages/alouette/src/ui/forms/FormEditableItem.tsx
  - packages/alouette/src/ui/forms/FormEditableSection.tsx
  - packages/alouette/src/ui/forms/useFormEditorModal.tsx
  - packages/alouette/src/ui/forms/FormField.stories.tsx
  - packages/alouette/src/ui/forms/SimpleVForm.stories.tsx
  - packages/alouette/src/ui/forms/FormFieldArray.stories.tsx
  - packages/alouette/src/ui/forms/FormEditableItem.stories.tsx
  - packages/alouette/src/ui/forms/FormEditableSection.stories.tsx
---

This skill builds on alouette-inputs (the controls a field renders) and
alouette-actions (the ActionButton lifecycle the submit button reuses). Read
them first.

# alouette — Forms

[react-hook-form](https://react-hook-form.com) underneath: `Form` owns the
form instance and hands `{ control, submit }` to its subtree, `FormField` binds
one field to a labelled, error-aware row and renders any input — the controls
of alouette-inputs/SKILL.md — and the submit button reuses the async-action
lifecycle.

`control` is how the types flow, exactly as in react-hook-form's own
`Controller`: write the form type **once** on `<Form<Values>>`, then pass its
`control` to each field. The field infers the form type from the control and its
own value type from `name`, so `field.value` is that one field's type — never a
union of every field, and never a per-field type argument.

```tsx
<Form<Values> … render={({ control }) => <FormField control={control} name="age" … />} />
//                                       field.value is Values["age"], inferred
```

## Validated forms

`SimpleVForm` is the common case: a vertical stack of fields plus a trailing
submit button.

```tsx
import {
  SimpleVForm,
  FormField,
  InputText,
  FormValidationError,
} from "alouette";

interface Values {
  name: string;
  email: string;
}

function submitErrorToMessage(error: unknown): string {
  if (error instanceof FormValidationError)
    return "Please fix the errors above.";
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
      render={({ field, labelId, describedBy, invalid, required }) => (
        <InputText
          ref={field.ref}
          value={field.value}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          aria-required={required}
          invalid={invalid}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
        />
      )}
    />
  )}
/>;
```

### FormField wiring

`FormField` renders any input through `render` — it is not tied to `InputText`.
The rendered input must wire the `field` bindings and `FormItem`'s state:

- `control={control}` — from the enclosing `Form`'s `render` params; types `name`
  and `field.value`.
- `ref={field.ref}` — lets pressing the label focus the input (via
  react-hook-form `setFocus`).
- `value={field.value}` / `onChangeText={field.onChange}` / `onBlur={field.onBlur}`.
- `aria-labelledby={labelId}`, `aria-describedby={describedBy}`, `invalid={invalid}`
  and `aria-required={required}` — `FormItem`'s state (label, `details` + error
  ids, danger border + `aria-invalid`, required); every alouette field takes them.

`required` doubles as the empty-field message: `true` shows the marker with no
message; any other `ReactNode` is the message shown once the field is left empty.
`validate` takes a react-hook-form validator (returns an error string or
`undefined`) and sits beside `required` on the same `FormField`; its `v` is the
field's value type, so a `number` field's validator takes a number without a
cast. For rich/non-string error content, use `renderError`.

```tsx
validate={(v) => (/^[^@]+@[^@]+$/.test(v) ? undefined : "Enter a valid email.")}
```

### Custom layout with Form

When the layout isn't a plain vertical stack, use `Form` directly: `render`
receives `{ control, submit }`, and a `FormSubmitButton` takes `submit`. Fields
split into their own component take a `control: Control<Values>` prop, not
`useFormContext`. Example in
[references/custom-form-layout.md](references/custom-form-layout.md).

### Repeatable item lists and edit-in-a-modal rows

`FormFieldArray` wraps `useFieldArray` and owns the array label, add/remove
buttons and `minSize` padding; `render` gets the item's path prefix (typed
`` `${name}.${number}` ``) and composes its own `FormField`s from it.
`FormEditableItem` (an `EditableItem` row) and `FormEditableSection` (an
`EditableSection` section, for a value of several lines) share one editor: a
modal owning **its own** `Form`, mounted per open — so cancelling is an unmount,
not a restore — and one editor prop set, exported as `FormEditorProps`. All
three are detailed in
[references/field-arrays-and-editable-rows.md](references/field-arrays-and-editable-rows.md).

### Submit lifecycle

`FormSubmitButton` is built on `ActionButton`, so submitting shows the spinner /
success / failed overlay and an inline error automatically. `submit()` rejects
with `FormValidationError` when fields are invalid (nothing was submitted), so
`errorToMessage` can render "fix the errors above" distinctly from a real
`onSubmit` failure.

Next to a Cancel, the submit button goes in a `DecisionBar`
(alouette-actions), inline as in a modal, so every form orders its actions the
same way:

```tsx
<DecisionBar
  dismissText="Cancel"
  onDismiss={close}
  primary={
    <FormSubmitButton
      label="Save"
      errorToMessage={toMessage}
      onPress={submit}
    />
  }
/>
```

`mode` defaults to `"onTouched"`. By default an exception thrown from `onSubmit`
propagates (consumed by `FormSubmitButton`); pass `onSubmitError` to `Form` only
if you need to observe it elsewhere.

## Common Mistakes

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

### HIGH Forgetting field.ref or FormItem's render params on the input

Wrong:

```tsx
render={({ field }) => <InputText value={field.value} onChangeText={field.onChange} />}
```

Correct:

```tsx
render={({ field, labelId, describedBy, invalid, required }) => (
  <InputText ref={field.ref} value={field.value} aria-labelledby={labelId}
    aria-describedby={describedBy} aria-required={required} invalid={invalid}
    onChangeText={field.onChange} onBlur={field.onBlur} />
)}
```

Without `field.ref`, pressing the label can't focus the input and `setFocus`
no-ops; without `aria-labelledby` the input has no accessible name; without
`invalid` / `describedBy` a field in error keeps a neutral border under its red
label and a screen reader never links the message to it.

Source: packages/alouette/src/ui/forms/FormField.tsx; ui/forms/FormItem.tsx

### MEDIUM Omitting errorToMessage or hardcoding an English default

Wrong:

```tsx
<FormSubmitButton label="Save" onPress={submit} /> {/* errorToMessage missing */}
```

Correct:

```tsx
<FormSubmitButton
  label="Save"
  onPress={submit}
  errorToMessage={submitErrorToMessage}
/>
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
value with no restore logic. `FormEditableSection` is the same mechanism for a
whole section.

Source: packages/alouette/src/ui/forms/useFormEditorModal.tsx
