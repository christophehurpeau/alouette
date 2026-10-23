---
name: alouette-layout
description: >
  Build a screen's structure. A raised card is a Box with the surface
  utilities, never the removed Surface component; a View with flex classes
  plus Separator arranges children. page-container is
  the boxed column of a page; SectionTitle heads a section standing on the
  screen ground, where a list of pressable rows goes instead of inside a card.
  ScreenScrollView, ScreenFlatList and ScreenSectionList are a screen's
  scrollable body, padding the safe-area edges no SafeAreaScope has consumed;
  ScreenCenterLayout frames a sign-in or splash screen. GradientBackground and
  GradientScrollView tint the ground, GlowBackground bleeds soft accent glows
  over it. Spacing, radius and shadow come from the alouette scale, never raw
  Tailwind numbers. The shell around every screen is alouette-app-shell. Load when building screen structure, cards, a section
  heading, spacing, a scrollable screen, or a background.
sources:
  - packages/alouette/src/ui/containers/Box.tsx
  - packages/alouette/scripts/build-css.ts
  - packages/alouette/src/ui/stacks/Separator.tsx
  - packages/alouette/src/ui/layout/SectionTitle.tsx
  - packages/alouette/src/ui/layout/GradientBackground.tsx
  - packages/alouette/src/ui/layout/GradientScrollView.tsx
  - packages/alouette/src/ui/layout/GlowBackground.tsx
  - packages/alouette/src/ui/layout/ScreenCenterLayout.tsx
  - packages/alouette/src/ui/layout/ScreenScrollView.tsx
  - packages/alouette/src/ui/layout/ScreenFlatList.tsx
  - packages/alouette/src/ui/layout/ScreenSectionList.tsx
  - packages/alouette/src/core/SafeAreaEdgesContext.tsx
  - packages/alouette/src/config/tokens.stories.tsx
---

This skill builds on alouette-theming. Read it first for the token model.

# alouette — Layout

Compose structure from `View`/`Box`, stacks and `Separator`, raised with the
`surface` utilities and sized with the alouette spacing/radius/shadow scale (not
the raw Tailwind numeric scale).

## Setup

```tsx
import { Box, View, Text } from "alouette";

<Box className="surface">
  <View className="gap-m">
    <Text className="font-heading-bold text-xl">Card title</Text>
    <Text>Body</Text>
  </View>
</Box>;
```

## Core Patterns

### Rows and columns

Arrange children with a `View` and flex classes. A `View` is already a column
on React Native and react-native-web, so a column needs no direction class; a
row is `flex-row`, a wrapping row `flex-row flex-wrap`. Add `gap-*` for spacing,
and switch direction at a breakpoint with a prefix.

```tsx
<View className="gap-xs">…</View>
<View className="flex-row items-center gap-m">…</View>
<View className="flex-col md:flex-row gap-m">…</View>
```

`HStack`, `VStack` and `Stack` were removed in 23.0.0;
`npx alouette-codemod surface-and-stacks src` rewrites them.

### Surfaces (raised containers)

A raised card is a `Box` with the `surface` utility —
`overflow-hidden bg-surface shadow-s surface-md transition-colors duration-fast` — plus `accent` on the `Box`
when it takes one. Every class written after `surface` overrides its own part
(the utility sorts ahead of them), and every class takes a breakpoint prefix:

- size (padding + radius, one class): `surface-xxs` (8px / 8px) · `surface-xs`
  (12 / 8) · `surface-sm` (16 / 16) · `surface-md` (32 / 16, default) ·
  `surface-lg` (48 / 32)
- ground: `bg-surface` · `bg-highlight` · `bg-highlight-accent` · `bg-translucent`
  · `lowered` (utility: the lowered ground **and** its inset shadow, never split)
- elevation: `shadow-s` · `shadow-m` · `shadow-l`
- roles, used **instead of** `surface`: `surface-flat` — the card with no
  elevation, a `border-border-muted` hairline in place of the shadow (same
  ground, clip, size and transition), for a card inside a card, where a second
  shadow reads as a card stacked on a card, and for a dense grid of cards ·
  `surface-popover` — the panel a popover list opens in (overflow, ground,
  shadow, padding and radius together)

```tsx
<Box className="surface shadow-m surface-sm md:surface-lg">Elevated</Box>
<Box className="surface lowered surface-sm">Sunken</Box>
<Box accent="info" className="surface">Info card</Box>
<Box className="surface">
  <Box className="surface-flat surface-sm">Card inside a card</Box>
</Box>
<Box className="surface-popover">{menuRows}</Box>
```

Never write `shadow-none border border-border-muted` after `surface` by hand:
that is `surface-flat`. The hairline is 1px inside the box, so a flat card and a
raised one of the same content differ by 2px.

Size a surface with a `surface-*` class, not a hand-picked `p-*` + `rounded-*`,
so every surface of a size matches. Override one side after it when a layout
needs it (`surface-sm py-0`). The `Surface` component was removed in 23.0.0: it
was this utility behind props that cannot take a breakpoint prefix.

A read-only section behind one edit button is `EditableSection`
(alouette-data/SKILL.md), not a hand-built heading row on a bare surface.

### Sections on the screen ground

Never nest raised material: a `surface` card and a `PressableListItem` /
`PressableBox` row each carry their own ground, shadow and radius, so one inside
the other reads as a double elevation. A list of pressable rows therefore stands
on the screen ground, headed by a `SectionTitle` — a heading (`level` 2 by
default) with an optional `icon`, tinted by `accent`. Keep `surface` for static
content.

```tsx
import { SectionTitle } from "alouette";

<View className="gap-xs">
  <SectionTitle icon={<EyeRegularIcon />} accent="info">
    Waiting for your review
  </SectionTitle>
  {rows}
</View>;
```

### Boxes

`Box` is a themed `View` (accepts `accent`). `InteractiveBox` adds press/hover
transitions. `SafeAreaBox` pads by the device safe-area insets.

```tsx
import { Box, SafeAreaBox } from "alouette";

<SafeAreaBox>
  <Box accent="brand">…</Box>
</SafeAreaBox>;
```

### Separator

```tsx
import { Separator } from "alouette";

<Separator />            {/* horizontal */}
<Separator vertical />   {/* vertical */}
```

### Background gradient

```tsx
import { GradientBackground, GradientScrollView } from "alouette";

<GradientBackground accent="brand" />

<GradientScrollView accent="brand">
  {content}
</GradientScrollView>;
```

`GlowBackground` keeps the `bg-screen` ground and bleeds radial glows from the
top corners instead: `accent` from the top-left, the optional `secondaryAccent`
from the top-right. It is an absolute, non-interactive overlay, so it goes first
inside a `relative` (or full-height) container, before the content.

```tsx
import { GlowBackground } from "alouette";

<View className="h-screen bg-screen">
  <GlowBackground accent="brand" secondaryAccent="info" />
  <ScrollView className="flex-1">{content}</ScrollView>
</View>;
```

### Page column

`page-container` is the boxed column of a page: full width up to
`max-w-page` (1200px), centered, with the `px-m md:px-l` gutter of `AppHeader`'s
boxed row at its default size — so the content starts under the brand at every
width. Never rewrite it as `mx-auto max-w-[1200px] px-…`: the copy drifts the
day the header changes. `max-w-page` alone is the width without the gutter.

```tsx
<AppLayout header={<AppHeader brand={brand} />}>
  <View className="page-container gap-l py-l">{screen}</View>
</AppLayout>
```

### Screen scroll containers

`ScreenScrollView`, `ScreenFlatList` and `ScreenSectionList` are the scrollable
body of a screen: a `bg-screen min-h-full` frame, a `grow` content container
(both extendable — the incoming `className` / `contentContainerClassName` are
merged with tailwind-merge), and the safe-area insets applied to the **content**,
so the background bleeds under the system bars while the content clears them.

```tsx
import { ScreenScrollView, ScreenFlatList } from "alouette";

<ScreenScrollView contentContainerClassName="p-m gap-m">{content}</ScreenScrollView>

<ScreenFlatList<Contact>
  data={contacts}
  contentContainerClassName="p-m gap-xxs"
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ContactRow {...item} />}
/>
```

Which edges get padded is decided by context, not by each call site: they pad
every edge an ancestor `SafeAreaScope` has not declared consumed. Chrome that
already applies an inset declares it once, and nesting scopes merge:

```tsx
{
  /* header applies insets.top itself */
}
<SafeAreaScope consumedEdges={["top"]}>
  {/* bottom bar applies insets.bottom */}
  <SafeAreaScope consumedEdges={["bottom"]}>
    {/* pads left/right only */}
    <ScreenScrollView>…</ScreenScrollView>
  </SafeAreaScope>
</SafeAreaScope>;
```

`edges` overrides the scope for one screen (`edges={["bottom"]}`, `edges={[]}`),
and `useScreenSafeAreaPadding(edges?)` exposes the same resolution for a custom
container. Insets are native-only — `useSafeAreaInsets` is stubbed to zeros on
web — and are only passed as `contentContainerStyle` when non-zero, because on
native an inline style wins over the className, so an inset edge would override a
same-edge padding class.

### Centered single-purpose screens

`ScreenCenterLayout` is the sign-in / splash / empty-state frame: three slots in
a full-height column, `content` centered in the space the other two leave.

```tsx
import { ScreenCenterLayout } from "alouette";

<ScreenCenterLayout
  header={<BrandLogo icon={<BirdRegularIcon />} />}
  content={<SignInForm />}
  footer={<Text className="text-sm text-muted">v2.4.0</Text>}
/>;
```

All three slots are required — pass `null` for one that has nothing in it. It
scrolls nothing and applies no insets, so put it inside a screen scroll
container or a `SafeAreaBox` when it has to clear the system bars.

### Inside the application shell

The header, rail and footer around every screen — `AppLayout`, `AppShell`,
`AppSidebarLayout`, `AppHeader` and its slots — are alouette-app-shell/SKILL.md.
Each of them is the scroll container and applies the insets itself, so the
screen inside is a plain `View` (`page-container` for its column), never a
screen scroll container.

## Common Mistakes

### HIGH Reaching for the removed Surface component

Wrong:

```tsx
<Surface variant="lowered">Sunken</Surface>
<Surface variant="highlight" shadow="l" size="sm" className="py-xs">…</Surface>
```

Correct:

```tsx
<Box className="surface lowered">Sunken</Box>
<Box className="surface bg-highlight shadow-l surface-sm py-xs">…</Box>
```

`Surface` was removed in 23.0.0: its `variant` / `shadow` / `size` props could
not take a breakpoint prefix. Write the utilities on a `Box`: `surface` is the card,
`lowered` carries the lowered ground with its inset shadow (`bg-lowered` alone
loses the shadow), and `surface-sm` is the old `size="sm"` padding + radius as
one class. A popover list panel is `surface-popover`, not the classes rebuilt.

Source: packages/alouette/scripts/build-css.ts

### MEDIUM Using the raw Tailwind numeric scale instead of tokens

Wrong:

```tsx
<View className="gap-2 p-4 rounded-lg">…</View>
```

Correct:

```tsx
<View className="gap-xs p-m rounded-sm">…</View>
```

`p-4` / `gap-2` use the default Tailwind scale, not the alouette spacing/radius
scale, so layouts drift from the design-system rhythm.

Source: src/config/tokens.stories.tsx (see references/spacing-radius-shadow.md)

### MEDIUM Reaching for expo-linear-gradient for backgrounds

Wrong:

```tsx
import { LinearGradient } from "expo-linear-gradient";
<LinearGradient colors={["#fff", "#eee"]} />;
```

Correct:

```tsx
import { GradientBackground } from "alouette";
<GradientBackground accent="brand" />;
```

alouette gradients are pure NativeWind classes; `GradientBackground` /
`GradientScrollView` need no gradient library, and expo-linear-gradient is not a
dependency.

Source: packages/alouette/src/ui/layout/GradientBackground.tsx

### MEDIUM Reaching for the removed stacks

Wrong:

```tsx
<VStack className="gap-m">…</VStack>
<HStack className="items-center">…</HStack>
<Stack className="gap-m">…</Stack>
```

Correct:

```tsx
<View className="gap-m">…</View>
<View className="flex-row items-center">…</View>
<View className="flex-row flex-wrap gap-m">…</View>
```

`HStack`, `VStack` and `Stack` were wrappers around those classes, removed in
23.0.0. A navigation `Stack` (expo-router) is unrelated.

Source: packages/alouette/src/ui/primitives/View.tsx

## References

- [Spacing, radius & shadow scale](references/spacing-radius-shadow.md)

See also: alouette-responsive/SKILL.md — switch between layout variants by breakpoint.
