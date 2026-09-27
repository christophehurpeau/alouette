# Alouette

Alouette is a React Native + NativeWind (v5) design system. Components render on
web (react-native-web) and native from one source. Style with Tailwind utility
classes via `className`; theme colors come from CSS variables supplied by a theme
wrapper.

## Setup — wrap the app in the theme

Components read theme colors (`bg-surface`, `text-accent`, …) from CSS variables
that a theme scope provides. Without a theme scope, color utilities resolve to
nothing and components render unstyled. Wrap the tree once, with a `View` as the
layout root:

```tsx
import { SafeAreaProvider, AlouetteProvider, ScopedTheme, View } from "alouette";

<SafeAreaProvider>
  <AlouetteProvider>
    <ScopedTheme theme="light">
      <View>{/* app */}</View>
    </ScopedTheme>
  </AlouetteProvider>
</SafeAreaProvider>;
```

Layout follows React Native: a `View` is a flex column that stretches its
children. Components rely on it (a `Badge` is `self-start`, a `Button` fills a
column), so lay out with `View`, never a bare `div`.

`theme` is `"light"` or `"dark"`. Accents are `brand`, `info`, `danger`,
`success`, `warning`: pass `accent` to a component, or wrap a subtree in
`<AccentScope accent="danger">`. `accent="neutral"` (Button, IconButton, Box,
Badge) is the grayscale palette. Children always use base tokens (`bg-surface`,
`text-accent`, …) and inherit the nearest scope's values.

## Styling idiom — className with Tailwind utilities

`Text` and `View` have no style or variant props: everything is a `className`.
Some components take a `variant` for their material (`Button`, `IconButton`,
`PressableBox`: `tonal` default, `filled`, `outlined`, `soft`).

- **Font family + weight** (one combined utility — never standalone `font-bold`):
  `font-body` · `font-body-bold` · `font-body-extrabold` · `font-heading` ·
  `font-heading-bold` · `font-heading-extrabold` · `font-mono` · `font-mono-bold`.
  Text defaults to `font-body`.
- **Font size**: `text-xs` `text-sm` `text-base` `text-lg` `text-xl` `text-2xl`
  `text-3xl` `text-4xl` `text-5xl` `text-6xl`.
- **Text color**: `text-sharp` `text-muted` `text-accent` `text-on-accent`.
- **Spacing** (named scale): `gap-xxs` `gap-xs` `gap-sm` `gap-m` `gap-l`,
  `p-xs` `p-sm` `p-m` `p-l`.
- **Surfaces**: a card is `<Box className="surface">` (ground, shadow, padding
  and radius in one class); `surface-{xxs,xs,sm,md,lg}` sets its size, `lowered`
  is an inset track. Grounds: `bg-surface` `bg-lowered` `bg-highlight`; borders
  `border-muted`; shadows `shadow-s` `shadow-m` `shadow-lowered`.
- **Rows**: `<View className="flex-row items-center justify-between gap-sm">`.

`HStack`, `VStack`, `Stack` and `Surface` are deprecated: use `View` with
`flex-row` and `<Box className="surface">`.

```tsx
import { Badge, Box, Button, Separator, Text, View } from "alouette";

<Box className="surface">
  <View className="gap-sm">
    <View className="flex-row items-center justify-between">
      <Text className="font-heading-bold text-lg">Project</Text>
      <Badge accent="brand">New</Badge>
    </View>
    <Separator />
    <View className="flex-row justify-end gap-sm">
      <Button accent="neutral" text="Cancel" onPress={close} />
      <Button text="Save" onPress={save} />
    </View>
  </View>
</Box>;
```

Two buttons side by side differ by `accent`, both `tonal`; `variant="filled"`
is for the one action that must dominate. `Button` and `IconButton` take `text`
/ `icon` props, not children.

## Components

Grouped as in the source repo — each has a `.d.ts` and a `.prompt.md`:
actions (`Button`, `ActionButton`, `IconButton`, `LinkText`, `Menu`,
`PressableBox`, `PressableListItem`), containers (`Box`, `AlertDialog`, `Modal`,
`EditableSection`), data (`Avatar`, `Badge`, `Code`, `CodeBlock`,
`EditableItem`), feedback (`Message`, `CircularProgress`, `LinearProgress`),
forms (`Form`, `FormField`, `FormSubmitButton`, `SimpleVForm`), inputs
(`InputText`, `TextArea`, `Select`, `Switch`, `RadioGroup`, `CheckboxGroup`,
`RadioButtonGroup`, `ColorModePicker`), layout (`AppShell`, `AppLayout`,
`AppHeader`, `Separator`), navigation (`NavBar`, `Tabs`, `Breadcrumbs`), and
primitives (`View`, `Text`, `Icon`, `ScrollView`, `FlatList`).

Anything that moves between routes is a `NavBar`/`HeaderNav`, never a
`RadioButtonGroup`. `AlertDialog`/`Modal` own their overlay — don't hand-roll
backdrop markup with `Box`/`View`.

## Where the truth lives

- Styling source: the synced `styles.css` and its `@import` closure (the compiled
  utility classes + theme variables). It is statically compiled, so prefer
  utilities already listed above or used by the shipped components.
- Per-component API + examples: each component's `.d.ts` and `.prompt.md`.
