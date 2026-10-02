# alouette — Application shell

The shell around every screen, in full: `AppLayout` at one call site, or
`AppShell` + `AppShellSidebar` + `AppShellMain` composed per route; and
`AppSidebarLayout` for an application whose navigation lives in a fixed
sidebar.

## AppLayout

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

## AppHeader and its slots

`AppHeader` is the `banner`: `brand` in the start slot, `actions` in the end
slot, and its children are the navigation slot. From `md` on web the three sit on
one boxed line in reading order, the navigation packed against the brand and the
free space left on the actions side; below that — and on native at every width —
brand and actions share the first line and the navigation spans the second (hence
`stretch` on a `NavBar`). `navAlign="center"` is the alternative single-line
layout: the start slot grows too, so the navigation lands in the middle, and it
stays centered even without `actions` (the end slot is rendered empty to balance
it). `size` is `"xs" | "sm" | "md"`, `variant` is `"bar"` (default, its own ground
plus a downward shadow) or `"transparent"` (for a landing hero), `contentWidth` is
`"boxed"` (default, max 1200px) or `"full"`. It pads its own top safe-area inset
unless an ancestor `SafeAreaScope` already consumed the edge
(`withSafeAreaTop={false}` opts out).

The navigation slot takes either material. `HeaderNav` + `HeaderNavItem`
is the bar's own: text destinations sitting directly on it, the current one
underlined in the group's accent, so it fits beside the brand — which is what
the default `navAlign="start"` is for. `NavBar` (alouette-navigation/SKILL.md) is
the segmented bar, a control of its own, so a header carrying one takes
`navAlign="center"` — the alignment follows the material, never the design's
mood.

```tsx
<AppHeader
  brand={<AppHeaderBrand title="Alouette" href="/" />}
  actions={<AppHeaderSignIn label="Log in" href="/login" />}
>
  <HeaderNav aria-label="Main" value={pathname} onValueChange={router.push}>
    <HeaderNavItem href="/home" label="Home" />
    <HeaderNavItem
      href="/inbox"
      label="Inbox"
      aria-label="Inbox, 3 unread"
      badge={<Badge size="sm">3</Badge>}
    />
  </HeaderNav>
</AppHeader>
```

`HeaderNav` owns the value like every other selection group (`value` +
`onValueChange`, or `defaultValue`) and its items match it against their own
`href` — the same `link` + `aria-current="page"` semantics as `NavBarItem`, with
the same `icon` / `activeIcon` / `activeAccent`, plus a `badge` rendered after
the label. A badge is not part of the accessible name, so name the item with
`aria-label` when the label alone no longer does. Every item is a 44px tap target
whose affordance is the bar's `soft` fill; the underline is state, never the
affordance.

The slot components: `AppHeaderBrand` (`title`, optional `subtitle` and
`brandLogo`; given `href` or `onPress` it becomes a real pressable instead of a
row wrapped in a link), `BrandLogo` (an icon on an accent disc;
`accent="neutral"` over a ground of its own accent, such as a `transparent`
header's hero, where the accented disc fades in dark mode),
`AppHeaderActions` (spaces the end-slot controls) and `AppHeaderAccount` — the
signed-in account as one `Avatar` trigger opening a `Menu` of `MenuItem`s, which
is where session actions belong rather than in the bar itself.

Signed out, the session is `AppHeaderSignIn` instead: a `Button` with the bar's
sizing, in the bar itself, because a visitor has exactly one action and it must
stay one press away. Pass it straight as `actions`, or beside a secondary
neutral `soft` "Sign up" (`accent="neutral" variant="soft"`: a neutral `tonal`
ground is the bar's own white) inside an `AppHeaderActions`. It takes the `Button`
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
        variant="soft"
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

## Shell composed per route

`AppLayout` decides the whole shell at one call site. When the shell is rendered
**once** for a whole app — a root layout around a router outlet — but the rail
belongs to one section of it, compose the same shell from its parts instead:
`AppShell` (scroll container, header, footer, and the row the body sits in) plus
a per-route `AppShellSidebar` and `AppShellMain`.

```tsx
// app/_layout.tsx — the shell, once
<AppShell header={<AppHeader … />} footer={<Footer />}>
  <Slot />
</AppShell>

// app/(reports)/_layout.tsx — this section, and only it, owns a rail
<>
  <AppShellSidebar>
    <NavBar
      orientation="vertical"
      className="w-[220px] grow"
      aria-label="Sections"
      value={pathname}
    >
      <NavBarItem href="/reports/weekly" label="Weekly" />
    </NavBar>
  </AppShellSidebar>
  <AppShellMain>
    <Slot />
  </AppShellMain>
</>

// a route with no rail
<AppShellMain>{screen}</AppShellMain>
```

`AppShell` renders **no landmark of its own**: each route composing the body
brings its own `AppShellMain`, one per rendered shell. The rail is a sibling
placed **before** the main, never inside it — inside would put the navigation in
the `main` landmark. Everything else is what `AppLayout` does, since that is the
same component underneath: one scroll container, every safe-area edge declared
consumed for the body, and a `web:sticky` rail slot.

Source: packages/alouette/src/ui/layout/AppLayout.tsx; ui/layout/AppShell.tsx;
ui/layout/AppHeader.tsx

## AppSidebarLayout — an application with a sidebar

For an application rather than a site: from `md` the frame is fixed to the
viewport, the `sidebar` stands on its lowered ground, and the screen sits in a
raised `bg-screen` panel inset in it — the one scroll container, so the
sidebar never moves. Below `md` the sidebar is hidden and `header` takes over,
scrolling with the screen exactly as in an `AppShell`, so phones keep the page
they have. Both are one tree switched by `md:` classes: crossing the breakpoint
keeps the screen mounted.

```tsx
import {
  AppHeader,
  AppHeaderAccount,
  AppHeaderActions,
  AppHeaderBrand,
  AppSidebar,
  AppSidebarAccount,
  AppSidebarLayout,
  ColorModePicker,
  IconButton,
  MenuItem,
  NavBar,
  NavBarItem,
  Select,
  SidebarNav,
  Text,
  View,
} from "alouette";

<AppSidebarLayout
  className="h-screen"
  sidebar={
    <AppSidebar
      brand={<AppHeaderBrand href="/" title="Alouette" />}
      actions={<IconButton aria-label="Search" icon={…} size="sm" variant="soft" />}
      header={
        <Select
          variant="tonal"
          aria-label="Club"
          icon={<FeatherRegularIcon />}
          options={clubs}
          value={clubId}
          onValueChange={setClubId}
        />
      }
      footer={
        <AppSidebarAccount
          name={user.name}
          description={user.email}
          header={
            <View className="flex-row items-center justify-between gap-sm">
              <Text className="text-sm text-muted">Color mode</Text>
              <ColorModePicker value={preference} onValueChange={setPreference} />
            </View>
          }
        >
          <MenuItem label="Log out" accent="danger" onPress={logOut} />
        </AppSidebarAccount>
      }
    >
      <SidebarNav aria-label="Main" value={pathname} onValueChange={router.push}>
        …
      </SidebarNav>
    </AppSidebar>
  }
  header={
    <AppHeader
      brand={…}
      actions={
        <AppHeaderActions>
          <ColorModePicker value={preference} onValueChange={setPreference} />
          <AppHeaderAccount name={user.name}>…</AppHeaderAccount>
        </AppHeaderActions>
      }
    >
      <NavBar stretch aria-label="Primary" value={pathname} onValueChange={router.push}>
        …
      </NavBar>
    </AppHeader>
  }
>
  <View className="gap-l p-m md:p-l">{screen}</View>
</AppSidebarLayout>;
```

- `children` is plain content in the `main` landmark, on the screen ground, so
  a screen written for `AppLayout` renders unchanged — never a
  `ScreenScrollView` inside, which would nest a second scroll view. The layout
  applies every safe-area inset.
- The frame fills its parent (`flex-1`): a web root with no height of its own
  passes `className="h-screen"`.
- `header` is the phone's navigation: give its `NavBar` the primary
  destinations, since the sidebar's are out of reach there.
- `AppSidebar` pins `brand` + `actions` (one row) and `header` at the top,
  `footer` at the bottom, and scrolls only `children`. Its width is 280px;
  `className` overrides it.
- What the navigation applies to (a team, a site) is a `Select`
  `variant="tonal"` with a leading `icon` in `header` — a pill lifted off the
  sidebar rather than a form field (alouette-forms/SKILL.md).
- `AppSidebarAccount` is the signed-in footer row: avatar, name and a second
  line, opening its `MenuItem`s above it, as wide as the row.
- The light/dark switch is a `ColorModePicker` in each tree: from `md` in the
  `header` of the `AppSidebarAccount` menu (the brand row has no room for it
  beside its actions), below `md` in the `AppHeader` actions as in `AppLayout`.
  Only the visible one is exposed. Both take the same stored preference, which
  the app applies with `useResolvedColorMode` + a `ScopedTheme` around the
  layout (alouette-theming/SKILL.md). A press in the menu's header does not
  close the menu. Keyboard users reach the picker with Shift+Tab from the first
  item, since the menu takes the focus as it opens.

Source: packages/alouette/src/ui/layout/AppSidebarLayout.tsx
