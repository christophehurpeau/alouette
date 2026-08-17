# alouette — Field arrays & edit-in-a-modal rows

The two composed form patterns, in full. Both take `control` from the enclosing
`Form`'s `render` params (see alouette-forms/SKILL.md).

## Repeatable item lists with FormFieldArray

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

`render` on the inner `FormField` is an `InputText` wired exactly as in the
skill. The leading `minSize` items are padded in on mount and cannot be removed,
and each row tints to the danger accent on hover over its remove button via
`StableAccentScope` (alouette-theming) — built in, not caller-wired.

Source: packages/alouette/src/ui/forms/FormFieldArray.tsx

## Edit-in-a-modal rows with FormEditableItem

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
    /* the fields — an InputText FormField, wired as in the skill */
    <FormField control={control} name="displayName" label="Name"
      required="A name is required." render={...} />
  )}
/>
```

`render` supplies the fields (the modal body) and hands them the **inner** Form's
`control` — they are not children, precisely because they must bind to that form
and not to the screen's. The Cancel / Save footer is built for you. It takes the
row props (`label`, `summary`, `details`, `editAriaLabel`, `editIcon`, `variant`,
`accent`, `disabled` — see alouette-data/SKILL.md) plus `Form`'s `defaultValues` /
`mode` / `onSubmit`, and the modal's `title` (defaults to `label`), `size` and
`closeButtonAriaLabel`. The modal closes only once `onSubmit` resolves: a
rejection (or a `FormValidationError` from invalid fields) keeps it open with the
error on the submit button.

Source: packages/alouette/src/ui/forms/FormEditableItem.tsx
