# Alouette Design System - AI Coding Instructions

## Architecture Overview

Alouette is a React/React Native design system built on **@tamagui/core** (the base style library). It's a monorepo with 3 packages:

- `packages/alouette`: Core design system library
- `packages/alouette-icons`: Phosphor icons integration (auto-generated)
- `packages/storybook-native-app`: Development playground and documentation

### Critical: @tamagui/core vs Tamagui

**Use `@tamagui/core` only** - NOT the full `tamagui` package. Key differences:

- **@tamagui/core**: Base style library with `styled()`, `createTamagui()`, themes, tokens - zero UI components
- **tamagui**: Full package including UI components (Button, Input, etc.) - **incompatible with Alouette**
- Import from `@tamagui/core` for all styling primitives: `styled`, `createTamagui`, `TamaguiProvider`, `GetProps`
- Alouette builds its own components using @tamagui/core primitives, replacing Tamagui's UI kit

## Component Structure

Components follow a strict organizational pattern in `packages/alouette/src/components/`:

- `actions/`: Buttons, clickable elements
- `containers/`: Layout containers (Box, PressableBox)
- `feedback/`: Messages, alerts
- `forms/`: Inputs, form controls
- `layout/`: Page-level layout components
- `primitives/`: Base components (View, Icon, stacks)
- `windowSize/`: Responsive utilities

Each component requires `.tsx` implementation and `.stories.tsx` file.

## Key Configuration Pattern

Alouette uses a custom Tamagui config system:

```tsx
// In consuming apps - tamagui.config.ts
import {
  createAlouetteTamagui,
  createAlouetteThemes,
  createAlouetteTokens,
  defaultColorScales,
} from "alouette/createAlouetteTamagui";

const tokens = createAlouetteTokens(defaultColorScales);
const config = createAlouetteTamagui(
  tokens,
  createAlouetteThemes(tokens),
  options,
);
```

## Component Development Rules

### Documentation (Critical)

Alouette maintains reference documentation in `packages/alouette/docs/` for consuming apps:

- **`guidelines.md`**: Best practices, conventions, and usage guidelines
- **`component_reference.md`**: Complete component API reference
- **`tokens_reference.md`**: Token system and theme configuration reference

**Documentation requirements:**

- **Keep concise**: Optimize for token efficiency - avoid duplication between files
- **Always up-to-date**: Update when adding/modifying/removing components, changing APIs, or updating patterns
- **Clear examples**: Show preferred patterns (e.g., `theme` prop over `<Theme>` component)
- **Reflect reality**: Documentation must match the current codebase state

### Story Files (Critical)

- Every component MUST have `.stories.tsx` file
- Use `componentSubtitle` in meta
- First story should be "Preview" with args
- Story functions must end with `Story` suffix
- Include usage examples in description (covered by real stories)
- No variant themes in descriptions (use `themes.stories.tsx`)
- Use the `Story` wrapper component for variant galleries (e.g., `Variants` stories) to ensure consistent layout and sections, but never for the `Preview` story.

### Component Implementation

- Use `styled()` from `@tamagui/core` for base components
- Export TypeScript props interfaces
- Follow naming: `ComponentFrame` for styled base
- Use `variants` object for style variations
- Import icons from `alouette-icons/phosphor-icons/IconName`

- Patterns and tips:
  - Create a small `Frame` per semantic part (e.g. `CardFrame`, `CardHeaderFrame`, `CardBodyFrame`) using `styled()` so styles are co-located and reusable.
  - When a component needs runtime composition or extra props, expose it via `.styleable` on the Frame to keep the public API stylable while allowing internal logic:

    ```tsx
    const CardFrame = styled(Surface, { name: "Card" });

    export const Card = CardFrame.styleable<{ header?: ReactNode }>((props) => {
      const { header, children, ...rest } = props;
      return (
        <CardFrame {...rest}>
          {header ? (
            <CardHeaderFrame {...rest}>{header}</CardHeaderFrame>
          ) : null}
          {children}
        </CardFrame>
      );
    });
    ```

  - Export prop types using `GetProps<typeof Component>` so consumers receive accurate, Tamagui-aware typings.

  - Keep cross-prop validations and runtime constraints in low-level primitives (for example, `Surface` should validate that `elevation="lowered"` is only used with `depth="lowered"`). This centralizes rules so composed components (like `Card`) inherit correct behavior.

## Build System

- **Build**: `yarn build` (uses Rollup with @pob/rollup-esbuild)
- **Development**: `yarn storybook` (storybook-native-app)
- **Icons**: Auto-generated via `packages/alouette-icons/scripts/generate-phosphor-icons.mjs`
- **Platforms**: Dual build for web and React Native with conditional exports

## Platform Handling

Files with `.web.ts` extensions override base for web platform:

- `reset.web.ts` vs `reset.ts`
- `animations.web.ts` vs `animations.ts`
- Component exports handle platform differences automatically

## Dependencies & Compatibility

- **Node**: Oldest LTS node supported (active and maintenance)
- **Package Manager**: Yarn
- **Icons**: Phosphor icons via automated generation
- **Testing**: Native Node.js test runner with `--experimental-strip-types`

### Why @tamagui/core Only?

Alouette replaces Tamagui's UI component library with its own design system. Using @tamagui/core gives:

- Full control over component design and behavior
- Custom token/theme system via `createAlouetteTamagui()`

## Common Patterns

### Component Export Pattern

```tsx
export type { ComponentProps } from "./components/category/Component";
export { Component } from "./components/category/Component";
```

### Styled Component Pattern

```tsx
const ComponentFrame = styled(BaseComponent, {
  name: "ComponentFrame",
  variants: {
    size: { sm: {...}, md: {...} },
    variant: { contained: {...}, outlined: {...} }
  }
});
```

### Story Pattern

```tsx
export const PreviewComponentStory: ThisStory = {
  name: "Preview",
  args: {
    /* default args */
  },
};
```

When modifying components, always maintain the dual platform build system and include comprehensive Storybook documentation.
