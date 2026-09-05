---
name: alouette-icons
description: >
  Use Phosphor icons with alouette. Import each icon from
  alouette-icons/phosphor-icons/IconName, then render via the Icon component or
  pass it to Button / IconButton / Message icon props. Tint with a text-*
  className (resolved to a color token); size with the numeric size prop. Load
  when adding icons to alouette UI.
type: composition
library: alouette
library_version: "22.10.0"
requires:
  - alouette-theming
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/primitives/Icon.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/actions/Button.stories.tsx"
  - "christophehurpeau/alouette:CLAUDE.md"
---

This skill builds on alouette-theming. Read it first for color tokens.

# alouette + alouette-icons

Icons come from the `alouette-icons` package (auto-generated Phosphor icons).
Import each icon individually, then render it through alouette's `Icon` component
or pass the element to a component's `icon` prop. `Icon` resolves a `text-*`
className to a concrete color token and applies it as the SVG color.

## Setup

```tsx
import { Icon } from "alouette";
import { HeartRegularIcon } from "alouette-icons/phosphor-icons/HeartRegularIcon";

<Icon icon={<HeartRegularIcon />} size={24} className="text-accent" />;
```

## Core Patterns

### Icons inside alouette components

`Button`, `IconButton` and `Message` take an `icon` element directly — they size
and tint it for you.

```tsx
import { Button, IconButton } from "alouette";
import { ArrowLeftRegularIcon } from "alouette-icons/phosphor-icons/ArrowLeftRegularIcon";
import { XRegularIcon } from "alouette-icons/phosphor-icons/XRegularIcon";

<Button text="Back" icon={<ArrowLeftRegularIcon />} />
<IconButton icon={<XRegularIcon />} aria-label="Close" onPress={close} />
```

### Duotone on interaction

`activeIcon` is the interaction twin of `icon`: it replaces it while the
pressable is hovered, focused or pressed, and stays for as long as the item is
selected (`NavBarItem` on the current page, the selected `Tab`, the checked
`RadioButton`). The duotone weight of the same glyph is the intended pairing.
Available on `Button`, `IconButton`, `MenuItem`, `NavBarItem`, `Tab` and
`RadioButton`; a disabled control never swaps.

```tsx
import { HouseDuotoneIcon } from "alouette-icons/phosphor-icons/HouseDuotoneIcon";
import { HouseRegularIcon } from "alouette-icons/phosphor-icons/HouseRegularIcon";

<NavBarItem
  href="/home"
  label="Home"
  icon={<HouseRegularIcon />}
  activeIcon={<HouseDuotoneIcon />}
/>;
```

`NavBarItem`, `Tab` and `RadioButton` also take `activeAccent`, tinting the
swapped-in glyph with an accent of its own so it changes color as well as weight.
It reaches the icon through `text-accent`, the only token an accent theme
redeclares for a foreground glyph — an accent scope around an icon that keeps its
base tint (`text-sharp`, `text-muted`) does nothing.

```tsx
<NavBarItem
  href="/archive"
  label="Archive"
  icon={<TrashRegularIcon />}
  activeIcon={<TrashDuotoneIcon />}
  activeAccent="danger"
/>
```

`InteractiveIcon` is the exported primitive behind both, for a pressable you
build yourself out of `PressableBox` — it cross-fades the two layers off the
pressable's `group`, so it only works inside one.

### Tinting

Tint follows the current accent when you use `text-accent`:

```tsx
<Icon icon={<HeartRegularIcon />} className="text-muted" />
<Box accent="danger">
  <Icon icon={<HeartRegularIcon />} className="text-accent" />
</Box>
```

## Common Mistakes

### MEDIUM Barrel-importing the icon set

Wrong:

```tsx
import { ArrowLeftRegularIcon } from "alouette-icons";
```

Correct:

```tsx
import { ArrowLeftRegularIcon } from "alouette-icons/phosphor-icons/ArrowLeftRegularIcon";
```

Icons are individually importable modules; a barrel import pulls in the entire
generated set and bloats the bundle.

Source: packages/alouette/src/ui/actions/Button.stories.tsx; CLAUDE.md (Icons)

### MEDIUM Tinting an icon with a color prop

Wrong:

```tsx
<Icon icon={<InfoRegularIcon />} color="#888" />
```

Correct:

```tsx
<Icon icon={<InfoRegularIcon />} className="text-muted" />
```

`Icon` resolves a `text-*` className to a `--color-*` token and passes it as the
SVG color; a raw `color` bypasses theming and breaks mode/accent adaptation.

Source: packages/alouette/src/ui/primitives/Icon.tsx

### MEDIUM Sizing an icon with width/height classes

Wrong:

```tsx
<Icon icon={<InfoRegularIcon />} className="w-6 h-6" />
```

Correct:

```tsx
<Icon icon={<InfoRegularIcon />} size={24} />
```

`Icon` takes a numeric `size` prop (px) applied as the SVG width/height; `w-*` /
`h-*` classes are not how alouette sizes icons.

Source: packages/alouette/src/ui/primitives/Icon.tsx

### MEDIUM Swapping the icon weight with local hover state

Wrong:

```tsx
const [hovered, setHovered] = useState(false);

<Button
  icon={hovered ? <HouseDuotoneIcon /> : <HouseRegularIcon />}
  onHoverIn={() => setHovered(true)}
  onHoverOut={() => setHovered(false)}
  text="Home"
/>;
```

Correct:

```tsx
<Button
  icon={<HouseRegularIcon />}
  activeIcon={<HouseDuotoneIcon />}
  text="Home"
/>
```

`activeIcon` cross-fades the two glyphs in CSS off the pressable's `group`, so it
covers focus and press as well as hover and never re-renders the row. A JS hover
state covers hover only, re-renders on every pointer move in and out, and has no
keyboard equivalent.

Source: packages/alouette/src/ui/primitives/InteractiveIcon.tsx
