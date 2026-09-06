---
name: alouette-layout
description: >
  Compose layout with Box / InteractiveBox / SafeAreaBox, Surface
  (variant/size/shadow), Stack / HStack / VStack, Separator, ScreenCenterLayout,
  the screen scroll containers (ScreenScrollView / ScreenFlatList /
  ScreenSectionList, with safe-area edges declared through SafeAreaScope),
  the application shell (AppLayout + AppHeader, AppHeaderBrand / BrandLogo /
  AppHeaderActions / AppHeaderAccount signed in / AppHeaderSignIn signed out /
  a ColorModePicker in the actions slot),
  and gradients (GradientBackground / GradientScrollView). Use the alouette
  spacing (xxs..4xl), radius (xs..lg) and shadow (s/m/l/lowered) scale via
  p-*/gap-*/rounded-*/shadow-* classes. Load when building screen structure, an
  app header or shell, cards, spacing, or backgrounds.
type: core
library: alouette
library_version: "22.10.0"
requires:
  - alouette-theming
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/Box.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/containers/Surface.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/stacks/stacks.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/stacks/Separator.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/GradientBackground.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/GradientScrollView.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/ScreenScrollView.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/ScreenFlatList.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/ScreenSectionList.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/core/SafeAreaEdgesContext.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/AppLayout.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/AppHeader.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/AppHeaderBrand.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/AppHeaderActions.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/AppHeaderAccount.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/AppHeaderSignIn.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/layout/BrandLogo.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/config/tokens.stories.tsx"
---

This skill builds on alouette-theming. Read it first for the token model.

# alouette — Layout

Compose structure from `View`/`Box`, `Surface`, stacks and `Separator`, sized
with the alouette spacing/radius/shadow scale (not the raw Tailwind numeric
scale).

## Setup

```tsx
import { Surface, VStack, Text } from "alouette";

<Surface>
  <VStack className="gap-m">
    <Text className="font-heading-bold text-xl">Card title</Text>
    <Text>Body</Text>
  </VStack>
</Surface>;
```

## Core Patterns

### Stacks

`Stack` is `flex-row flex-wrap`; `HStack` is `flex-row`; `VStack` is `flex-col`.
They are thin `View` wrappers — add `gap-*` for spacing.

```tsx
<VStack className="gap-xs">…</VStack>
<HStack className="gap-m items-center">…</HStack>
```

### Surface (elevated container)

`variant`: `surface` (default) · `lowered` · `translucent` · `highlight` ·
`highlight-accent`. `size`: `xxs` · `xs` · `sm` · `md` (default) · `lg` (padding + radius).
`shadow`: `s` (default) · `m` · `l` · `lowered`; defaults to `lowered` when
`variant="lowered"`.

```tsx
<Surface size="lg" shadow="m">Elevated</Surface>
<Surface variant="lowered">Sunken</Surface>
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

### Application shell

`AppLayout` is the shell around a screen: a header, an optional left sidebar
beside the screen, and a footer, all scrolling together as one page — the bar
comes back by scrolling up rather than being pinned chrome. Every slot is
composed by the caller; the layout places them, puts the screen in a `main`
landmark sized to what is left, and applies the safe-area insets around the body,
so the screen inside needs **no scroll container and no insets of its own**.

```tsx
import {
  AppHeader,
  AppHeaderBrand,
  AppLayout,
  NavBar,
  NavBarItem,
} from "alouette";

<AppLayout
  header={
    <AppHeader brand={<AppHeaderBrand title="Alouette" href="/" />}>
      <NavBar
        stretch
        aria-label="Main"
        value={pathname}
        onValueChange={router.push}
      >
        <NavBarItem href="/home" label="Home" />
      </NavBar>
    </AppHeader>
  }
  sidebar={
    <NavBar
      orientation="vertical"
      className="w-[220px] grow"
      aria-label="Sections"
      value={section}
      onValueChange={setSection}
    >
      …
    </NavBar>
  }
  footer={<Footer />}
>
  {screen}
</AppLayout>;
```

`AppHeader` is the `banner`: `brand` in the start slot, `actions` in the end
slot, and its children are the navigation slot. From `md` on web the three sit on
one boxed line with the navigation centered; below that — and on native at every
width — brand and actions share the first line and the navigation spans the
second (hence `stretch` on the bar). `size` is `"xs" | "sm" | "md"`, `variant` is
`"bar"` (default, its own ground plus a downward shadow) or `"transparent"` (for
a landing hero), `contentWidth` is `"boxed"` (default, max 1200px) or `"full"`. It
pads its own top safe-area inset unless an ancestor `SafeAreaScope` already
consumed the edge (`withSafeAreaTop={false}` opts out).

The slot components: `AppHeaderBrand` (`title`, optional `subtitle` and
`brandLogo`; given `href` or `onPress` it becomes a real pressable instead of a
row wrapped in a link), `BrandLogo` (an icon on an accent disc),
`AppHeaderActions` (spaces the end-slot controls) and `AppHeaderAccount` — the
signed-in account as one `Avatar` trigger opening a `Menu` of `MenuItem`s, which
is where session actions belong rather than in the bar itself.

Signed out, the session is `AppHeaderSignIn` instead: a `Button` with the bar's
sizing, in the bar itself, because a visitor has exactly one action and it must
stay one press away. Pass it straight as `actions`, or beside a secondary
`variant="outlined"` "Sign up" inside an `AppHeaderActions`. It takes the `Button`
props (`label` in place of `text`, `icon`, `accent`, `variant`, `disabled`) plus
`href`, the in-app destination — a real `<a>` on web, ignored on native, where
expo Router's `<Link asChild>` supplies the `onPress`. A destination outside the
app on native takes an `ExternalLinkButton` (alouette-external-links/SKILL.md) in
the slot instead.

```tsx
<AppHeader
  brand={<AppHeaderBrand title="Alouette" href="/" />}
  actions={<AppHeaderSignIn label="Log in" href="/login" />}
>
  {navigation}
</AppHeader>
```

A light/dark switch goes in the same actions slot as a `ColorModePicker`
(alouette-forms/SKILL.md) — one pill of icon-only chips, never two loose
`IconButton`s. It reports the stored `ColorModePreference` only; the app applies
it with `useResolvedColorMode` + `ScopedTheme` (alouette-theming/SKILL.md) and
persists it.

```tsx
<AppHeader
  brand={
    <AppHeaderBrand
      title="Alouette"
      brandLogo={<BrandLogo icon={<BirdRegularIcon />} />}
      href="/"
    />
  }
  actions={
    <AppHeaderActions>
      <ColorModePicker value={preference} onValueChange={setPreference} />
      <IconButton
        icon={<BellRegularIcon />}
        aria-label="Notifications"
        variant="ghost"
      />
      <AppHeaderAccount name="Ada Lovelace">
        <MenuItem label="Profile" onPress={openProfile} />
        <MenuItem label="Log out" accent="danger" onPress={logout} />
      </AppHeaderAccount>
    </AppHeaderActions>
  }
>
  {navigation}
</AppHeader>
```

## Common Mistakes

### HIGH Surface lowered/shadow passed as the wrong prop shape

Wrong:

```tsx
<Surface lowered>Sunken</Surface>
```

Correct:

```tsx
<Surface variant="lowered">Sunken</Surface>
```

`Surface` takes `variant` and `shadow` enum props; there is no boolean `lowered`
prop. `shadow` defaults to `"s"`, or `"lowered"` when `variant="lowered"`.

Source: packages/alouette/src/ui/containers/Surface.tsx

### MEDIUM Using the raw Tailwind numeric scale instead of tokens

Wrong:

```tsx
<VStack className="gap-2 p-4 rounded-lg">…</VStack>
```

Correct:

```tsx
<VStack className="gap-xs p-m rounded-sm">…</VStack>
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

### MEDIUM Treating Stack as a column / a navigation Stack

Wrong:

```tsx
<Stack className="flex-col">…</Stack>
```

Correct:

```tsx
<VStack className="gap-m">…</VStack>
```

alouette `Stack` is `flex-row flex-wrap`. For a column use `VStack`; for a row
use `HStack`. It is unrelated to navigation stacks.

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
  <VStack className="p-m gap-m">{content}</VStack>
</AppLayout>
```

`AppLayout` is itself the scroll container — the header and footer scroll with
the page — and it declares every safe-area edge consumed for its body. A nested
scroll container gives a second scrollable inside the first and pads insets that
are already applied.

Source: packages/alouette/src/ui/layout/AppLayout.tsx

## References

- [Spacing, radius & shadow scale](references/spacing-radius-shadow.md)

See also: alouette-responsive/SKILL.md — switch between layout variants by breakpoint.
