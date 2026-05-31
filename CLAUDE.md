# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn storybook          # Start Storybook dev server (main development workflow)
yarn build              # Build all packages (rollup + type definitions)
yarn watch              # Rebuild on changes
yarn lint               # Prettier + ESLint
yarn test               # Run tests (Node.js native runner with --experimental-strip-types)
yarn tsc                # TypeScript check
```

Run a single test file:

```bash
node --experimental-strip-types --test packages/alouette/src/config/utils/colorContrast.test.ts
```

## Architecture

Yarn workspaces monorepo with 3 packages:

- `packages/alouette` — Core design system library
- `packages/alouette-icons` — Auto-generated Phosphor icons integration
- `packages/storybook-native-app` — Development playground / documentation

### Component organization

Components live in `packages/alouette/src/ui/` organized by category:

- `actions/` — buttons, clickable elements
- `containers/` — layout containers (Box, Surface)
- `feedback/` — messages, alerts
- `inputs/` — form controls
- `layout/` — page-level layout
- `primitives/` — base components (View, Text, Icon, ScrollView, stacks)
- `stacks/` — HStack, VStack, Separator
- `story-components/` — Story, StoryGrid helpers for Storybook only

### Platform handling

Files with `.web.ts` / `.web.tsx` override the base file on web. Dual build output targets web (ES) and React Native (CJS/ES) via conditional package exports.

### Icons

Import icons from `alouette-icons/phosphor-icons/IconName`. The package is auto-generated via `packages/alouette-icons/scripts/generate-phosphor-icons.mjs` — do not edit generated files manually.

# Text styling

`<Text>` has no variant props — style entirely via `className`.

- **Size+family**: `body-xs`…`body-3xl`, `heading-xs`…`heading-3xl`, `mono-xs`…`mono-3xl`. Never use `font-body`/`font-heading`/`font-mono` alone.
- **Weight**: `font-normal`, `font-bold`, `font-extrabold`
- **Color**: `text-sharp`, `text-muted`, `text-accent`, `text-on-accent` (+ `-muted`, `text-disabled-*` variants)

```tsx
<Text className="body-md text-sharp">Body</Text>
<Text className="heading-xl font-extrabold">Title</Text>
<Text className="mono-xs text-muted">Code</Text>
```

Color tokens: edit `packages/alouette/scripts/build-css.ts`, then run `yarn workspace alouette build:css`. Do not edit `global.css` directly.

# Theming and semantic roles

Themes are CSS classes (`light`, `dark`, `light_brand`, `dark_info`, etc.) applied by `ScopedTheme` from Uniwind. CSS custom properties cascade through the tree — child components always use **base tokens** (`bg-surface`, `text-accent`, `border-muted`, etc.) and inherit the correct values from the nearest `ScopedTheme`.

**Do not use role-prefixed token classes** (`bg-info-surface`, `text-brand-accent`) inside components. Those are only used by the CSS generator (`build-css.ts`) to populate the sub-theme classes.

## Sub-theme roots

A component that introduces a semantic role wraps its children in `<SemanticScope role={semanticRole}>`. This reads the current light/dark mode via `useUniwind()` and applies the correct `light_{role}` or `dark_{role}` class.

```tsx
// Sub-theme root pattern
import { SemanticScope } from "../containers/SemanticScope";

interface MyComponentProps {
  semanticRole?: SemanticRole;
}

function MyComponent({ semanticRole }: MyComponentProps) {
  return (
    <SemanticScope role={semanticRole}>
      {/* children use base tokens — bg-surface, text-accent, etc. */}
    </SemanticScope>
  );
}
```

Existing roots: `Button`, `Message`, `Surface` (when `semanticRole` prop is set), `GradientScrollView`.

## Native constraint: no CSS variable chains

On native, Uniwind resolves CSS variables at render time from a lookup table — it cannot follow `var(--color-x)` references inside another variable's value. Sub-theme classes therefore use **hardcoded hex values** (not `var()` references). This is why sub-themes are `light_info`/`dark_info` (two separate classes per mode) rather than a single `semantic-info` class with `var()` indirections. The `build-css.ts` script enforces this.

## CSS token changes

Edit `packages/alouette/scripts/build-css.ts`, then run `yarn workspace alouette build:css`. Never edit `global.css` directly.

# React

## Always use interface to define props

```tsx
export interface ComponentProps {
  name: string;
}

function Component({ name }: ComponentProps): ReactNode {
```

## Prefer React components over data arrays

When building stories that render groups of items, use React components with children rather than mapping over data arrays:

```tsx
// Preferred
function TokenGroup({ group, children }: { group: string; children: ReactNode }) {
  return <VStack><Text>{group}</Text><StoryGrid.Row>{children}</StoryGrid.Row></VStack>;
}
// then: <TokenGroup group="bg"><TokenSwatch token="bg-screen" />...</TokenGroup>

// Avoid
const GROUPS = [{ group: "bg", tokens: ["bg-screen", ...] }];
GROUPS.map(({ group, tokens }) => ...)
```
