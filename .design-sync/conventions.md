# Alouette

Alouette is a React Native + NativeWind (v5) design system. Components render on
web (react-native-web) and native from one source. Style with Tailwind utility
classes via `className`; theme colors come from CSS variables supplied by a theme
wrapper.

## Setup — wrap the app in the theme

Components read theme colors (`bg-surface`, `text-accent`, …) from CSS variables
that a theme scope provides. Without a theme scope, color utilities resolve to
nothing and components render unstyled. Wrap the tree once:

```tsx
import { SafeAreaProvider, AlouetteProvider, ScopedTheme } from "alouette";

<SafeAreaProvider>
  <AlouetteProvider>
    <ScopedTheme theme="light">
      {/* app */}
    </ScopedTheme>
  </AlouetteProvider>
</SafeAreaProvider>;
```

`theme` is `"light"` or `"dark"`. To switch an accent for a subtree, nest another
`<ScopedTheme theme="light_brand">` (accents: `brand`, `info`, `danger`,
`success` — as `light_<accent>` / `dark_<accent>`). Children always use base
tokens (`bg-surface`, `text-accent`, …) and inherit the nearest scope's values.

## Styling idiom — className with Tailwind utilities

There are no style props or variant props; everything is a `className`.

- **Font family + weight** (one combined utility — never standalone `font-bold`):
  `font-body` · `font-body-bold` · `font-body-extrabold` · `font-heading` ·
  `font-heading-bold` · `font-heading-extrabold` · `font-mono` · `font-mono-bold`.
  Text defaults to `font-body`.
- **Font size** (standard Tailwind): `text-xs` `text-sm` `text-base` `text-lg`
  `text-xl` `text-2xl` `text-3xl` `text-4xl` `text-5xl` `text-6xl`.
- **Text color**: `text-sharp` `text-muted` `text-accent` `text-on-accent`
  (+ `-muted` / disabled variants).
- **Surfaces / borders**: `bg-surface` `bg-lowered` `bg-highlight`,
  `border-muted`, plus radius/shadow like `rounded-full` `shadow-lowered`.

```tsx
import { Text } from "alouette";
<Text className="font-heading-extrabold text-4xl text-sharp">Title</Text>
<Text className="text-base">Body</Text>           {/* font-body is default */}
```

## Form controls (this kit's synced surface)

```tsx
import { InputText, TextArea, Switch } from "alouette";

<InputText placeholder="Email" mode="email" />
<InputText placeholder="Password" mode="password" />
<TextArea placeholder="Message" />
<Switch checked={on} onValueChange={setOn} aria-labelledby="notify-label" />
```

`InputText` props: `placeholder`, `value`, `mode`
(`text`|`password`|`email`|`tel`|`number`|`url`|`search`), `disabled`,
`autoCorrect`, `autoCapitalize`. `TextArea` is the multiline variant.
`Switch` props: `checked`, `onValueChange(value)`, `disabled`, `aria-labelledby`.
These are uncontrolled-capable (omit `value`/`checked` to let them self-manage).

## Where the truth lives

- Styling source: the synced `styles.css` and its `@import` closure (the compiled
  utility classes + theme variables).
- Per-component API + examples: each component's `.d.ts` and `.prompt.md`.
- Layout glue uses the same Tailwind utilities (`flex`, `gap-*`, padding/margin);
  the synced `styles.css` is statically compiled, so prefer utilities already
  used by the shipped components. Compose Alouette components for the controls.
