---
name: alouette-typography
description: >
  Style alouette Text and Paragraph entirely via className: combined font
  family+weight utilities (font-body, font-body-bold, font-body-extrabold,
  font-heading*, font-mono*), Tailwind text-* sizes, and semantic color tokens
  (text-sharp, text-muted, text-accent, text-on-accent). No variant props. Load
  when rendering any text; avoids font-bold and raw color classes.
type: core
library: alouette
library_version: "19.0.0-beta.4"
requires:
  - alouette-theming
sources:
  - "christophehurpeau/alouette:packages/alouette/src/ui/primitives/Text.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/ui/primitives/Text.stories.tsx"
  - "christophehurpeau/alouette:CLAUDE.md"
---

This skill builds on alouette-theming. Read it first for the color token model.

# alouette — Typography

`Text` and `Paragraph` have no variant props — style them entirely with
`className`. `Text` defaults to `font-body` + `text-sharp`, so plain body text
needs no family or color class. `Paragraph` is `Text` with `role="paragraph"`
(renders a `<p>` on web) and selectable text.

## Setup

```tsx
import { Text, Paragraph } from "alouette";

<Text className="font-heading-extrabold text-4xl">Title</Text>
<Paragraph className="text-base">Body copy.</Paragraph>
```

## Core Patterns

### Family + weight (one combined utility)

Family and weight are a single utility — never a standalone `font-bold`:

- `font-body`, `font-body-bold`, `font-body-extrabold`
- `font-heading`, `font-heading-bold`, `font-heading-extrabold`
- `font-mono`, `font-mono-bold`, `font-mono-extrabold`

```tsx
<Text className="font-body-bold">Bold body</Text>
<Text className="font-heading-extrabold text-2xl">Heading</Text>
<Text className="font-mono text-sm text-muted">code()</Text>
```

### Size (standard Tailwind, font-size only)

`text-xs` 12 · `text-sm` 14 · `text-base` 16 · `text-lg` 18 · `text-xl` 24 ·
`text-2xl` 32 · `text-3xl` 40 · `text-4xl` 48 · `text-5xl` 64 · `text-6xl` 80.

Pair `font-heading*` with `text-xl` (24px) or larger — the heading family is
tuned for display sizes. For smaller emphasis, use `font-body-bold`.

### Color (semantic tokens)

`text-sharp` (default) · `text-muted` · `text-accent` · `text-on-accent`
(+ `-muted` variants). Accent color follows the nearest accent scope:

```tsx
<Text accent="brand" className="text-accent">Brand-colored</Text>
```

## Common Mistakes

### HIGH Using font-bold instead of font-body-bold

Wrong:

```tsx
<Text className="font-bold text-base">Title</Text>
```

Correct:

```tsx
<Text className="font-body-bold text-base">Title</Text>
```

On native, bold/extrabold are separate font files baked into the family utility.
A standalone `font-bold` / `font-extrabold` / `font-normal` has no effect and is
overridden — it only appears to work on web.

Source: CLAUDE.md (Text styling); src/ui/primitives/Text.stories.tsx (Invalid)

### HIGH Using react-native Text instead of alouette Text

Wrong:

```tsx
import { Text } from "react-native";
<Text className="text-muted">Hi</Text>
```

Correct:

```tsx
import { Text } from "alouette";
<Text className="text-muted">Hi</Text>
```

react-native's `Text` has no `font-body` default, no semantic color, and no
`accent` prop, so it doesn't participate in theming. alouette's `Text` applies
`font-body` + `text-sharp` and re-themes via `accent`.

Source: packages/alouette/src/ui/primitives/Text.tsx

### MEDIUM Using a heading font below text-xl

Wrong:

```tsx
<Text className="font-heading-bold text-base">Section</Text>
```

Correct:

```tsx
<Text className="font-heading-bold text-xl">Section</Text>
```

The heading family is tuned for display sizes (`text-xl` / 24px and up). Below
that it looks off — use `font-body-bold` for small emphasized text instead.

Source: scripts/build-css.ts (type scale); src/ui/primitives/Text.stories.tsx

### MEDIUM Coloring text with the raw Tailwind palette

Wrong:

```tsx
<Text className="text-black">Body</Text>
```

Correct:

```tsx
<Text className="text-sharp">Body</Text>
```

`text-black` / `text-gray-500` ignore the theme and break dark mode; semantic
tokens resolve per mode and accent.

Source: CLAUDE.md (Color tokens)
