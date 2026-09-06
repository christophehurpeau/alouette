# alouette — Field arrays & edit-in-a-modal rows and sections

The composed form patterns, in full. `FormFieldArray` takes `control` from the
enclosing `Form`'s `render` params (see alouette-forms/SKILL.md); the two
editable displays own their form and take none.

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
`accent`, `disabled` — see alouette-data/SKILL.md) plus the editor props
(`FormEditorProps`, exported): `Form`'s `defaultValues` / `mode` / `onSubmit`,
the required `cancelLabel` / `submitLabel` / `submitErrorToMessage`, and the
modal's `title` (defaults to `label`), `size` and `closeButtonAriaLabel`. The
modal closes only once `onSubmit` resolves: a rejection (or a
`FormValidationError` from invalid fields) keeps it open with the error on the
submit button.

Source: packages/alouette/src/ui/forms/FormEditableItem.tsx

## Edit-in-a-modal sections with FormEditableSurface

`FormEditableSurface` is the same editor over an `EditableSurface` (see
alouette-data/SKILL.md): use it when the value is a titled section of several
lines rather than a summary that fits beside a label. The read-only body stays
`children` — only the fields go through `render`.

```tsx
<FormEditableSurface<Values>
  title="Event details"
  titleBadge={<Badge accent="brand">{date}</Badge>}
  details="The date, and what guests see before coming."
  editAriaLabel="Edit event details"
  cancelLabel="Cancel"
  submitLabel="Save"
  submitErrorToMessage={submitErrorToMessage}
  defaultValues={{ date, notes }}
  onSubmit={async (values) => saveToServer(values)}
  render={({ control }) => (
    <VStack className="gap-m">
      <FormField control={control} name="date" label="Date"
        required="A date is required." render={...} />
      <FormField control={control} name="notes" label="Before you come" render={...} />
    </VStack>
  )}
>
  <Paragraph className="text-muted text-sm">{notes}</Paragraph>
</FormEditableSurface>
```

Two names collide between the section and its modal, so the modal's are
prefixed: `size` / `title` are the `Surface`'s, `modalSize` / `modalTitle` (which
defaults to `title`) are the `Modal`'s. Everything else is as above — the same
`FormEditorProps`, the same per-open `Form`, the same close-on-resolve.

Source: packages/alouette/src/ui/forms/FormEditableSurface.tsx;
ui/forms/useFormEditorModal.tsx
