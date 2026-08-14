---
name: alouette-navigation
description: >
  Segmented navigation. NavBar + NavBarItem move between destinations
  (role="navigation" + role="link" + aria-current="page"); Tabs + Tab switch
  views on one screen (role="tablist" + role="tab" + aria-selected). Both are
  compose-children groups (no options array) sharing the RadioButtonGroup
  material: a lowered 44px bar with a raised chip per item, optional leading
  icon, accent + disabled, controlled value or defaultValue + onValueChange, and
  a per-item href + onPress (a real anchor on web, and what expo Router
  <Link asChild> injects) that wins over the group callback. Load when building
  a tab bar, a section switcher, or navigation between routes.
type: core
library: alouette
library_version: "22.4.0"
requires:
  - alouette-theming
  - alouette-actions
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/navigation/NavBar.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/navigation/NavBarItem.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/navigation/Tabs.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/navigation/Tab.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/selection/SelectionContext.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/selection/SegmentedBar.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/selection/SegmentedItem.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/navigation/NavBar.stories.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/navigation/Tabs.stories.tsx"
---

This skill builds on alouette-theming. Read it first for the accent model.

# alouette — Navigation

Two segmented groups over one shared base (`src/ui/selection/`): a lowered 44px
bar whose selected item raises a chip. `NavBar` navigates between destinations,
`Tabs` switches views on the same screen. They differ only in accessibility
semantics — pick by what the press does, not by how it looks.

| | `NavBar` / `NavBarItem` | `Tabs` / `Tab` |
| --- | --- | --- |
| use for | routes, destinations | views on the current screen |
| container role | `navigation` | `tablist` |
| item role | `link` | `tab` |
| selected marker | `aria-current="page"` | `aria-selected` |

## Setup

```tsx
import { Tabs, Tab } from "alouette";

<Tabs aria-label="Period" defaultValue="week" onValueChange={setPeriod}>
  <Tab value="day" label="Day" />
  <Tab value="week" label="Week" />
  <Tab value="month" label="Month" />
</Tabs>;
```

## Core Patterns

### Controlled vs uncontrolled

Both groups own the value: `defaultValue` for uncontrolled, `value` +
`onValueChange` for controlled. A `NavBar` backed by a router is controlled — its
value is the current route, matched against each item's `href`.

```tsx
<NavBar aria-label="Main" value={pathname} onValueChange={(href) => router.push(href)}>
  <NavBarItem href="/home" label="Home" />
  <NavBarItem href="/reports" label="Reports" />
</NavBar>
```

`NavBarItem` has no `value`: `href` is its identity. On web it renders a real
`<a href>` (native ignores it), and the item cancels the browser's own
navigation — routing stays the app's job, through `onValueChange` or `onPress`.
A disabled item drops its `href`, since a disabled pressable never sees the
press that would cancel it.

### Per-item onPress, and expo Router links

An item may navigate itself; its `onPress` then replaces the group's
`onValueChange` for that item. The group must be controlled in that case — its
internal value is never updated. A custom handler that routes must call
`event.preventDefault()` on web, or the anchor reloads the page under it.

`<Link asChild>` injects exactly those two props (`href` and a `preventDefault`
ing `onPress`), so it composes without repeating the route:

```tsx
import { Link } from "expo-router";

<NavBar aria-label="Main" value={pathname}>
  <Link href="/home" asChild>
    <NavBarItem label="Home" />
  </Link>
</NavBar>;
```

### Leading icon

`icon` takes a rendered icon element and is auto-sized and auto-tinted from the
item's selected/disabled state.

```tsx
import { HouseRegularIcon } from "alouette-icons/phosphor-icons/HouseRegularIcon";

<NavBarItem href="/home" label="Home" icon={<HouseRegularIcon />} />;
```

### Accent and disabled

`accent` themes the whole bar (the group wraps itself in the accent theme);
`disabled` on the group disables every item, `disabled` on an item disables just
that one.

```tsx
<Tabs aria-label="Period" accent="brand" defaultValue="week">
  <Tab value="week" label="Week" />
  <Tab disabled value="month" label="Month" />
</Tabs>
```

### Wiring tab panels

`Tab` passes `id` and `aria-controls` through; render the panel yourself and
point it back at the tab. `Tabs` renders no panel.

```tsx
<Tabs aria-label="Ranges" value={range} onValueChange={setRange}>
  <Tab id="tab-week" aria-controls="panel-week" value="week" label="Week" />
</Tabs>
<Surface role="tabpanel" id="panel-week" aria-labelledby="tab-week">…</Surface>
```

## Common Mistakes

### HIGH Passing an options array instead of children

Wrong:

```tsx
<Tabs options={[{ value: "day", label: "Day" }]} />
```

Correct:

```tsx
<Tabs aria-label="Period" defaultValue="day">
  <Tab value="day" label="Day" />
</Tabs>
```

These are compose-children groups, like `RadioButtonGroup`. There is no
`options` prop; each child reads the selected value from the group's context.

Source: packages/alouette/src/ui/navigation/Tabs.tsx

### HIGH Using Tabs for route navigation (or NavBar for in-page views)

Wrong:

```tsx
<Tabs value={pathname} onValueChange={router.push}>…</Tabs>
```

Correct:

```tsx
<NavBar aria-label="Main" value={pathname} onValueChange={router.push}>…</NavBar>
```

The two render the same material but expose different semantics: `tab` promises
a panel on the same screen, `link` + `aria-current="page"` promises a
destination. Assistive tech announces them differently.

Source: packages/alouette/src/ui/navigation/NavBar.tsx; ui/navigation/Tabs.tsx

### MEDIUM Item onPress on an uncontrolled group

Wrong:

```tsx
<NavBar aria-label="Main" defaultValue="/home">
  <NavBarItem href="/settings" label="Settings" onPress={handlePress} />
</NavBar>
```

Correct:

```tsx
<NavBar aria-label="Main" value={pathname}>
  <NavBarItem href="/settings" label="Settings" onPress={handlePress} />
</NavBar>
```

`onPress` replaces the group's selection callback, so the uncontrolled internal
value stays where it was and the bar never moves its chip.

Source: packages/alouette/src/ui/navigation/NavBarItem.tsx

### MEDIUM Navigating from an item onPress without preventDefault

Wrong:

```tsx
<NavBarItem href="/settings" label="Settings" onPress={() => router.push("/settings")} />
```

Correct:

```tsx
<Link href="/settings" asChild>
  <NavBarItem label="Settings" />
</Link>
```

An item with an `href` is a real anchor on web, so a handler that routes in JS
must cancel the browser default or the page reloads on top of the JS
navigation. The built-in handler does it; a custom one must too.

Source: packages/alouette/src/ui/navigation/NavBarItem.tsx

### MEDIUM Hand-rolling the bar with PressableBox

Wrong:

```tsx
<Surface variant="lowered" className="flex-row">
  <PressableBox variant="ghost">…</PressableBox>
</Surface>
```

Correct: use `NavBar` / `Tabs`. The shared `SegmentedBar` / `SegmentedItem`
already give the 44px tap target inside a 44px bar, the chip cross-fade, the
`focus-visible` outline and the hover/active border — a hand-rolled bar drifts
from all four.

Source: packages/alouette/src/ui/selection/SegmentedBar.tsx; ui/selection/SegmentedItem.tsx

### LOW Omitting aria-label on the group

`NavBar` renders a navigation landmark and `Tabs` a tab list; both should be
named, especially when a screen has more than one.

Source: packages/alouette/src/ui/navigation/NavBar.tsx

See also: alouette-forms/SKILL.md for `RadioButtonGroup`, the same material with
`radiogroup` semantics; alouette-icons/SKILL.md for importing icon elements.
