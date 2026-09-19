# alouette — Application shell

The shell around every screen, in full: `AppLayout` at one call site, or
`AppShell` + `AppShellSidebar` + `AppShellMain` composed per route.

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

The navigation slot takes either material. `AppHeaderNav` + `AppHeaderNavItem`
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
  <AppHeaderNav aria-label="Main" value={pathname} onValueChange={router.push}>
    <AppHeaderNavItem href="/home" label="Home" />
    <AppHeaderNavItem
      href="/inbox"
      label="Inbox"
      aria-label="Inbox, 3 unread"
      badge={<Badge size="sm">3</Badge>}
    />
  </AppHeaderNav>
</AppHeader>
```

`AppHeaderNav` owns the value like every other selection group (`value` +
`onValueChange`, or `defaultValue`) and its items match it against their own
`href` — the same `link` + `aria-current="page"` semantics as `NavBarItem`, with
the same `icon` / `activeIcon` / `activeAccent`, plus a `badge` rendered after
the label. A badge is not part of the accessible name, so name the item with
`aria-label` when the label alone no longer does. Every item is a 44px tap target
whose affordance is the bar's `soft` fill; the underline is state, never the
affordance.

The slot components: `AppHeaderBrand` (`title`, optional `subtitle` and
`brandLogo`; given `href` or `onPress` it becomes a real pressable instead of a
row wrapped in a link), `BrandLogo` (an icon on an accent disc),
`AppHeaderActions` (spaces the end-slot controls) and `AppHeaderAccount` — the
signed-in account as one `Avatar` trigger opening a `Menu` of `MenuItem`s, which
is where session actions belong rather than in the bar itself.

Signed out, the session is `AppHeaderSignIn` instead: a `Button` with the bar's
sizing, in the bar itself, because a visitor has exactly one action and it must
stay one press away. Pass it straight as `actions`, or beside a secondary
`accent="neutral"` "Sign up" inside an `AppHeaderActions`. It takes the `Button`
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
