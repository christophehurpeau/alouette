---
name: alouette-layout
description: >
  Build screen structure: Box / InteractiveBox / SafeAreaBox for containers,
  raised with the surface utilities (surface, surface-{size}, lowered,
  surface-popover), View with flex classes and Separator to arrange them,
  ScreenCenterLayout and the screen scroll containers (ScreenScrollView /
  ScreenFlatList / ScreenSectionList, whose safe-area edges are declared through
  SafeAreaScope) for the page itself, the application shell around every screen
  (AppLayout + AppHeader and its brand / navigation / actions / account slots,
  or AppShell +
  AppShellSidebar + AppShellMain when the shell is composed per route), and
  GradientBackground / GradientScrollView for a tinted ground. Space, round and
  raise everything with the alouette spacing, radius and shadow scale rather
  than raw Tailwind numbers. Load when building screen structure, an app header
  or shell, cards, spacing, or backgrounds.
type: core
library: alouette
requires:
  - alouette-theming
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/Box.tsx"
  - "christophehurpeau/alouette:packages/alouette/scripts/build-css.ts"
  - "christophehurpeau/alouette:packages/alouette/src/ui/stacks/stacks.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/stacks/Separator.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/GradientBackground.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/GradientScrollView.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/ScreenCenterLayout.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/ScreenScrollView.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/ScreenFlatList.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/ScreenSectionList.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/core/SafeAreaEdgesContext.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/AppLayout.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/AppShell.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/AppHeader.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/AppHeaderBrand.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/AppHeaderNav.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/AppHeaderNavItem.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/AppHeaderActions.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/AppHeaderAccount.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/AppHeaderSignIn.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/BrandLogo.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/config/tokens.stories.tsx"
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

`HStack`, `VStack` and `Stack` are deprecated aliases of those classes;
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
- role: `surface-popover` — the panel a popover list opens in (overflow, ground,
  shadow, padding and radius together), used **instead of** `surface`

```tsx
<Box className="surface shadow-m surface-sm md:surface-lg">Elevated</Box>
<Box className="surface lowered surface-sm">Sunken</Box>
<Box accent="info" className="surface">Info card</Box>
<Box className="surface-popover">{menuRows}</Box>
```

Size a surface with a `surface-*` class, not a hand-picked `p-*` + `rounded-*`,
so every surface of a size matches. Override one side after it when a layout
needs it (`surface-sm py-0`). The `Surface` component is deprecated: it is this
utility behind props that cannot take a breakpoint prefix.

A read-only section behind one edit button is `EditableSection`
(alouette-data/SKILL.md), not a hand-built heading row on a bare surface.

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
  header={<BrandLogo />}
  content={<SignInForm />}
  footer={<Text className="text-sm text-muted">v2.4.0</Text>}
/>;
```

All three slots are required — pass `null` for one that has nothing in it. It
scrolls nothing and applies no insets, so put it inside a screen scroll
container or a `SafeAreaBox` when it has to clear the system bars.

### Application shell

`AppLayout` is the shell around a screen: a header, an optional left sidebar
beside the screen, and a footer, all scrolling together as one page. It puts the
screen in a `main` landmark and applies the safe-area insets around the body, so
the screen inside needs **no scroll container and no insets of its own**.
`AppHeader` is the `banner`, filled from caller-composed slots:
`AppHeaderBrand` (+ `BrandLogo`) at the start, the navigation as children, and
`AppHeaderActions` at the end — a `ColorModePicker`, an `IconButton`, and the
session, which is `AppHeaderAccount` signed in and `AppHeaderSignIn` signed out.
The navigation sits next to the brand by default; `AppHeaderNav` +
`AppHeaderNavItem` is the material made for that spot — text destinations on the
bar itself, the current one underlined — while a segmented `NavBar`
(alouette-navigation/SKILL.md) is the alternative, and always takes
`navAlign="center"`.

When the shell is rendered **once** for a whole app but the sidebar belongs to
one section of it, compose the same shell from `AppShell` + a per-route
`AppShellSidebar` and `AppShellMain` instead of an `AppLayout` per route.

Slots, breakpoints, the signed-out header and the per-route shell:
[references/app-shell.md](references/app-shell.md).

## Common Mistakes

### HIGH Reaching for the deprecated Surface component

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

`Surface` is deprecated, and its `variant` / `shadow` / `size` props cannot take
a breakpoint prefix. Write the utilities on a `Box`: `surface` is the card,
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

### HIGH Signed-out header hidden behind a "Guest" account menu

Wrong:

```tsx
<AppHeaderAccount name="Guest" icon={<UserRegularIcon />}>
  <ExternalLink as={MenuItem} href={`${authOrigin}/login`} label="Login" />
</AppHeaderAccount>
```

Correct:

```tsx
<AppHeaderSignIn label="Login" href="/login" />
```

`AppHeaderAccount` is the signed-in session: an avatar standing for a person,
opening the several actions that person has. A signed-out visitor has one, so
wrapping it in an account menu invents an identity nobody has and buries the
only call to action behind a second press. `AppHeaderSignIn` is the signed-out
counterpart: a button in the bar, one press. When the destination is outside the
app, an `ExternalLinkButton` goes in the slot the same way — still a button in
the bar, never a menu.

Source: packages/alouette/src/ui/layout/AppHeaderSignIn.tsx

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

### MEDIUM Reaching for the deprecated stacks

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

`HStack`, `VStack` and `Stack` are deprecated wrappers around those classes.
alouette's `Stack` is unrelated to navigation stacks.

Source: packages/alouette/src/ui/stacks/stacks.tsx

### MEDIUM Putting a screen scroll container inside AppLayout

Wrong:

```tsx
<AppLayout header={<AppHeader … />}>
  <ScreenScrollView contentContainerClassName="p-m">{content}</ScreenScrollView>
</AppLayout>
```

Correct:

```tsx
<AppLayout header={<AppHeader … />}>
  <View className="p-m gap-m">{content}</View>
</AppLayout>
```

`AppLayout` is itself the scroll container — the header and footer scroll with
the page — and it declares every safe-area edge consumed for its body. A nested
scroll container gives a second scrollable inside the first and pads insets that
are already applied.

Source: packages/alouette/src/ui/layout/AppLayout.tsx

### MEDIUM An AppLayout per route to give one section a sidebar

Wrong:

```tsx
// every route rebuilds the whole shell to change the rail
<AppLayout header={<AppHeader … />} sidebar={<NavBar …/>} footer={<Footer />}>
  {screen}
</AppLayout>
```

Correct:

```tsx
// the shell once, in the root layout
<AppShell header={<AppHeader … />} footer={<Footer />}>
  <Slot />
</AppShell>

// the section that owns a rail composes the body
<>
  <AppShellSidebar>
    <NavBar orientation="vertical" className="w-[220px] grow" …/>
  </AppShellSidebar>
  <AppShellMain>
    <Slot />
  </AppShellMain>
</>
```

A shell per route remounts the scroll container, the header and the footer on
every navigation — the scroll position, the header state and the safe-area
padding all reset. `AppShell` keeps one shell and lets the route decide the body.

Source: packages/alouette/src/ui/layout/AppShell.tsx

## References

- [Spacing, radius & shadow scale](references/spacing-radius-shadow.md)
- [Application shell](references/app-shell.md)

See also: alouette-responsive/SKILL.md — switch between layout variants by breakpoint.
