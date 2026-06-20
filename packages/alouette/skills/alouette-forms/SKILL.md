---
name: alouette-forms
description: >
  Form inputs: InputText (mode: password/email/number/tel/url/search), TextArea
  (multiline InputText), and Switch (controlled via checked + onValueChange, or
  uncontrolled). Use the disabled prop (not editable); the mode prop bundles
  keyboardType/inputMode/autoComplete/secureTextEntry. Load when building text
  fields, text areas, or toggles.
type: core
library: alouette
library_version: "19.0.0-beta.4"
requires:
  - alouette-theming
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/inputs/InputText.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/inputs/TextArea.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/inputs/Switch.tsx"
---

This skill builds on alouette-theming. Read it first for the token model.

# alouette — Forms

`InputText` wraps react-native `TextInput` with alouette styling and a `mode`
prop. `TextArea` is a multiline `InputText`. `Switch` wraps the native switch
with themed colors.

## Setup

```tsx
import { InputText } from "alouette";

<InputText
  mode="email"
  value={email}
  onChangeText={setEmail}
  placeholder="you@example.com"
/>;
```

## Core Patterns

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
