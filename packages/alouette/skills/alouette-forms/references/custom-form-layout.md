# alouette — Custom layout with Form

When the layout isn't a plain vertical stack (`SimpleVForm`), use `Form`
directly and place a `FormSubmitButton` (or call `submit` yourself). `render`
receives `{ control, submit }`.

```tsx
import { Form, FormSubmitButton } from "alouette";

<Form<Values>
  defaultValues={{ name: "", email: "" }}
  onSubmit={async (values) => saveToServer(values)}
  render={({ control, submit }) => (
    <>
      {/* fields */}
      <FormSubmitButton
        label="Save"
        errorToMessage={submitErrorToMessage}
        onPress={submit}
      />
    </>
  )}
/>;
```

To split the fields into their own component, give it a
`control: Control<Values>` prop rather than reaching for `useFormContext`. The
form instance is still in context — `setFocus` (to move focus between fields)
only lives there — but `control` is what carries the types.
