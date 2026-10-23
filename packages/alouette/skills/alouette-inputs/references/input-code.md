# InputCode — a fixed-length one-time code

For the code the user copies from an SMS, an e-mail or an authenticator: a row
of cells, one character each. It is **one** `TextInput` behind the cells, not
one per cell — so pasting a whole code, the OS autofill (`one-time-code`), the
caret moving on and Backspace moving back all fall out of the single value, and
a screen reader hears one field holding the code.

```tsx
import { InputCode } from "alouette";

<InputCode aria-label="Verification code" onComplete={verify} />;
```

- `length` defaults to 6; `mode` is `"numeric"` (digit keypad) or
  `"alphanumeric"` (uppercased, `[0-9A-Z]`). Anything else typed or pasted is
  dropped, and a longer paste is cut to `length` — never set `maxLength`, it
  would cut `"123 456"` before its space is removed.
- `onComplete(code)` fires each time the last cell is filled; `onValueChange`
  on every change. Controlled through `value` / `defaultValue` /
  `onValueChange`.
- It renders no label: give it `aria-label` or `aria-labelledby`.
- The caret stays at the end of the code: a tap in the middle of a cell edits
  the end, not that cell. Backspace clears the last cell.

## In a form

The same wiring as `InputText`, with `onValueChange` in place of
`onChangeText`:

```tsx
<FormField
  control={control}
  name="code"
  label="Verification code"
  required="Enter the 6-digit code."
  validate={(code) =>
    code.length === 6 ? undefined : "The code has 6 digits."
  }
  render={({ field, labelId, describedBy, invalid, required }) => (
    <InputCode
      ref={field.ref}
      value={field.value}
      onValueChange={field.onChange}
      onBlur={field.onBlur}
      aria-labelledby={labelId}
      aria-describedby={describedBy}
      aria-required={required}
      invalid={invalid}
    />
  )}
/>
```

`invalid` turns the cells to the danger accent and marks the input
`aria-invalid`, like every alouette field.

## Platform notes

- The input is transparent over the cells, so a tap anywhere on the row focuses
  it from a real gesture (the virtual keyboard opens on iOS Safari too) and a
  long-press on native opens the system paste menu.
- `mode="numeric"` sets `inputMode="numeric"` + `keyboardType="number-pad"`;
  `"alphanumeric"` sets `autoCapitalize="characters"` and no autocorrect. Both
  carry `autoComplete="one-time-code"`, which react-native maps to iOS
  `textContentType="oneTimeCode"` and Android `sms-otp`.
- The drawn caret blinks through the `--animate-caret-blink` token, so reduced
  motion stops it on both platforms with no extra code.

## Common Mistakes

### HIGH A row of InputTexts for a code

Wrong:

```tsx
{
  digits.map((d, i) => (
    <InputText
      key={i}
      ref={refs[i]}
      maxLength={1}
      value={d}
      onChangeText={(v) => {
        setDigit(i, v);
        refs[i + 1]?.current?.focus();
      }}
      onKeyPress={(e) => {
        if (e.nativeEvent.key === "Backspace" && !d)
          refs[i - 1]?.current?.focus();
      }}
    />
  ));
}
```

Correct:

```tsx
<InputCode aria-label="Verification code" onComplete={verify} />
```

Six fields break what the user relies on: a paste lands in one cell, the SMS
autofill fills the first cell only, Backspace on an empty cell is not reported
by every Android keyboard, `FormField`'s `field.ref` can focus one input, and a
screen reader announces six unnamed fields. `InputCode` holds the code in one
input and only draws the cells.

Source: packages/alouette/src/ui/inputs/InputCode.tsx

### MEDIUM Reading the code from onValueChange to detect completion

Wrong:

```tsx
<InputCode
  onValueChange={(code) => {
    if (code.length === 6) verify(code);
  }}
/>
```

Correct:

```tsx
<InputCode onComplete={verify} />
```

`onComplete` already fires once per completion, with the sanitized code, and
not on a controlled `value` set to a full code from outside (a form reset).

Source: packages/alouette/src/ui/inputs/InputCode.tsx
