# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm storybook          # Start Storybook dev server (main development workflow)
pnpm build              # Build all packages (rollup + type definitions)
pnpm watch              # Rebuild on changes
pnpm lint               # Prettier + ESLint
pnpm test               # Run tests (Node.js native runner with --experimental-strip-types)
pnpm tsc                # TypeScript check
```

**Never start Storybook itself** (`pnpm storybook`, `storybook dev`, `expo start`, etc.) or any other long-running dev server — verifying stories/UI in the running app is the user's job. Running the Storybook **test suite** (which executes story `play` functions headlessly) is fine and encouraged to verify story changes.

The play-function suite lives in the Storybook app, not the root `pnpm test` (root runs the Node/vitest unit tests under `packages/alouette`). Run it from that package in browser mode:

```bash
cd packages/storybook-native-app && npx vitest run --project=storybook   # all stories
cd packages/storybook-native-app && npx vitest run --project=storybook Radio   # filter by file
```

You can't visually validate rendering — only behavior via `play`. Styling/material looks are the user's to confirm.

Verify with one deliberate pass: `pnpm tsc`, then `eslint` scoped to the files you changed, then the single relevant test. Don't re-run a check to re-confirm a pass or to isolate output you could have parsed the first time.

Run a single test file:

```bash
node --experimental-strip-types --test packages/alouette/src/config/utils/colorContrast.test.ts
```

## Architecture

pnpm workspaces monorepo with 3 packages:

- `packages/alouette` — Core design system library
- `packages/alouette-icons` — Auto-generated Phosphor icons integration
- `packages/storybook-native-app` — Development playground / documentation

### Styling stack

This project uses **NativeWind v5**. Tailwind classes via `className`; animations are CSS `@keyframes` + `--animate-*` tokens, run on native via Reanimated. Define tokens/keyframes in `packages/alouette/scripts/build-css.ts`, then regenerate with `pnpm --filter alouette build:css` — never edit `global.css` directly.

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

- **Family + weight** (one combined utility — do NOT use standalone `font-bold` / `font-extrabold` / `font-normal`):
  - `font-body`, `font-body-bold`, `font-body-extrabold`
  - `font-heading`, `font-heading-bold`, `font-heading-extrabold`
  - `font-mono`, `font-mono-bold`, `font-mono-extrabold`

  `<Text>` defaults to `font-body`, so plain body text needs no family class. On React Native, bold/extrabold are distinct font files (e.g. `SoraBold`) — a standalone `font-weight` has no effect, which is why weight is baked into the family utility.

- **Size** (standard Tailwind `text-*`, font-size only):
  `text-xs` 12px · `text-sm` 14px · `text-base` 16px · `text-lg` 18px · `text-xl` 24px · `text-2xl` 32px · `text-3xl` 40px · `text-4xl` 48px · `text-5xl` 64px · `text-6xl` 80px

- **Color**: `text-sharp`, `text-muted`, `text-accent`, `text-on-accent` (+ `-muted`, `text-disabled-*` variants)

```tsx
<Text className="text-base">Body</Text>                           {/* font-body is the default */}
<Text className="font-heading-extrabold text-4xl">Title</Text>
<Text className="font-mono text-xs text-muted">Code</Text>
```

Color tokens: edit `packages/alouette/scripts/build-css.ts`, then run `pnpm --filter alouette build:css`. Do not edit `global.css` directly.

# Theming and accents

Themes are sets of CSS variables (for the `light`, `dark`, `light_brand`, `dark_info`, etc. theme names) applied by Alouette's `ScopedTheme` (`src/ui/containers/ScopedTheme.tsx`), which pushes the theme's resolved variables through NativeWind's `VariableContextProvider`. CSS custom properties cascade through the tree — child components always use **base tokens** (`bg-surface`, `text-accent`, `border-muted`, etc.) and inherit the correct values from the nearest `ScopedTheme`. The variable maps live in the generated `src/themeVariables.ts` (single source of truth shared with `global.css`).

## Sub-theme roots

A component that introduces an accent wraps its children in `<AccentScope accent={accent}>`. This reads the current light/dark mode from `ThemeContext` (via `useCurrentMode()`) and applies the correct `light_{accent}` or `dark_{accent}` theme through `ScopedTheme`.

```tsx
// Sub-theme root pattern
import { AccentScope } from "../containers/AccentScope";

interface MyComponentProps {
  accent?: Accent;
}

function MyComponent({ accent }: MyComponentProps) {
  return (
    <AccentScope accent={accent}>
      {/* children use base tokens — bg-surface, text-accent, etc. */}
    </AccentScope>
  );
}
```

Existing roots: `Button`, `Message`, `Surface` (when `accent` prop is set), `GradientScrollView`.

## Native constraint: no CSS variable chains

On native, NativeWind resolves CSS variables at render time from a lookup table — it cannot follow `var(--color-x)` references inside another variable's value. Sub-theme classes therefore use **hardcoded hex values** (not `var()` references). This is why sub-themes are `light_info`/`dark_info` (two separate entries per mode) rather than a single `accent-info` theme with `var()` indirections. The `build-css.ts` script enforces this.

## CSS token changes

Edit `packages/alouette/scripts/build-css.ts`, then run `pnpm --filter alouette build:css`. Never edit `global.css` directly.

# Interactive controls and depth

## Draw pressable states from the `interactive-*` tokens — prefer composing `PressableBox`

A pressable/interactive surface must source its rest/hover/focus/press/disabled
appearance from the `interactive-*` token families, never from static tokens like
`bg-surface` / `border-muted` (those give no affordance). Prefer composing
`PressableBox` (`src/ui/data/PressableBox.tsx`) — it wires the full state set plus
a colored `focus-visible` outline and `AccentScope`. This is how `Button` and
`IconButton` are built, so use its `variant`:

- `contained` → `bg-interactive-contained-{pressable,hover,focus,active,disabled}` + `shadow-s`, text `text-on-accent`.
- `outlined` / `ghost` → `border-interactive-outlined-{pressable,hover,focus,active,disabled}`, text `text-sharp`.

Pass `role`/`aria-*` through `PressableBox` (they override its default
`role="button"`). When a child indicator must react to the row's state and can't
be a `PressableBox` (e.g. the ring inside a labeled radio row), apply the same
`border-interactive-outlined-*` classes to the child and drive them with a `group`
on the pressable (`group-hover:` / `group-active:` on the child).

The neutral `interactive-{hover,active,pressable,muted}` tokens are **foreground**
(icon/text) colors, not backgrounds; the accent `interactive-contained-*` tokens
are the fills.

## Depth: inset track + raised element

Build depth by pairing a lowered container with a raised child, as `Switch` does:
track = `bg-lowered` + `shadow-lowered`; raised element (thumb / selected segment)
= `bg-surface` or `contained` + `shadow-s`. Reach for this material for segmented
controls, toggles and selection surfaces instead of a bordered box with a flat
fill.

## Touch targets: 44px accessible height, not the named spacing scale

An interactive control's minimum height is an accessibility constant (44px), not a
padding choice — write it explicitly as `min-h-[44px]` (matches `Button`) so the
value reads as the accessibility minimum it is. Do **not** reach for the named
`--spacing-*` tokens (`min-h-9`, `p-xs`, …) for a touch-target height: those are
the layout spacing scale and `min-h-9` is only 36px, below the minimum. (ESLint
will suggest collapsing `min-h-[44px]` to `min-h-11`; ignore that here — the
explicit px keeps the intent legible.)

### Compact visual chip, full-height tap target

When a control's segment should _look_ shorter than 44px, keep the full 44px on
the tap target and shrink only the visible chip inside it — don't shrink the
pressable. `RadioButtonGroup` does this with the design-system `Surface` as the
in-flow flex container: the lowered `Surface` is a real 44px bar with **zero
vertical padding** (`py-0` overriding the `size` padding, `min-h-[44px]`), so
each `RadioButton` pressable (`min-h-[44px]`) fills the full height as the tap
target, and centers a shorter visible chip (`h-[32px]`) — leaving ~6px of the
lowered Surface showing above/below each chip as the inset frame. No absolute
track, no z-order tricks, no inline `style`. A `play` test measures both the
`radiogroup` (== 44) and each `radio` (>= 44) so the geometry can't regress.

## Radius scale is large — `rounded-md` is a stadium

`rounded-xs` 8px · `rounded-sm` 16px · `rounded-md` 32px · `rounded-lg` 48px
(`--radius-*` in `build-css.ts`). At control heights (~44px) `rounded-md`/`-lg`
render as a full pill. Use `rounded-sm` for control containers and `rounded-xs`
for nested segments (matches `Button`).

# React

## Map enum-like props to classes with tailwind-variants

When a prop selects between a fixed set of classes (e.g. `variant`, `shadow`, `size`), express it as a `tv()` variant — not a `Record`/object lookup map (`LAYER_CLASS[variant]`). The variant keys become the prop's type automatically (via `VariantProps`), and `defaultVariants` handles defaults. Only resolve a value in component code when one variant's default depends on another prop.

```tsx
// Preferred
const surfaceVariants = tv({
  variants: { variant: { surface: "bg-surface", lowered: "bg-lowered" } },
  defaultVariants: { variant: "surface" },
});

// Avoid
const LAYER_CLASS = { surface: "bg-surface", lowered: "bg-lowered" } as const;
```

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

## Avoid module-level constants in stories

We're doing React — express variation as components and JSX, not as module-level
data. Don't hoist a presentational magic-value const or a data array
(`const FOLDERS = [...]`) to drive a story. Inline a one-off literal where it's
used, and render variants from a component that switches on a prop. This keeps
the markup the source of truth and avoids data-structure indirection.

But alouette is a framework: a value that belongs to the framework (e.g. an
animation duration that must match the `--animate-*` keyframes) must be **exposed
from the library**, not inlined and not redefined per-story. Add it to
`build-css.ts`, which generates `animationDurationsMs` (camelCase — never
SCREAMING_CASE), and reference that so apps and stories stay in sync when the
framework value changes.

```tsx
// Preferred — framework value referenced from the library; variants from a component
<PresenceOne exitDurationMs={animationDurationsMs.slide} enterClassName="animate-slide-in">…</PresenceOne>

function FolderCard({ index }: { index: number }): ReactNode {
  switch (index % 3) { case 0: return <>…</>; /* … */ }
}

// Avoid — magic value inlined or hoisted into a story-local const, duplicating the framework
<PresenceOne exitDurationMs={600} … />
const CARD_ANIMATION_MS = 600;
const FOLDERS = [{ title: "Inbox", count: 3 }, …];
```

## Name function props `render`, not `children`

A function-as-prop is not readable as JSX children — name it `render` so the call site reads as a function, not markup.

```tsx
// Preferred
interface FormFieldProps {
  render: (params: { field: ControllerRenderProps }) => ReactNode;
}
<FormField name="email" render={({ field }) => <InputText {...field} />} />;

// Avoid
interface FormFieldProps {
  children: (params: { field: ControllerRenderProps }) => ReactNode;
}
<FormField name="email">{({ field }) => <InputText {...field} />}</FormField>;
```

## Never silently swallow unexpected errors

Don't catch-and-log (`console.error`) an error the caller didn't ask to handle — that hides real bugs. Expose an explicit opt-in handler prop; when it's not provided, let the error propagate (e.g. as an unhandled rejection) instead of swallowing it.

```tsx
// Preferred
function submit(): void {
  const result = form.handleSubmit(onSubmit)();
  if (onSubmitError) result.catch(onSubmitError);
}

// Avoid
function submit(): void {
  form
    .handleSubmit(onSubmit)()
    .catch((error) => console.error(error));
}
```

## Flatten a wrapped library's options into direct props

When wrapping a third-party API, don't mirror its nested options shape in your own component's public props — expose the individual options directly at the top level.

```tsx
// Preferred
interface FormFieldProps {
  required?: boolean | string;
  validate?: RegisterOptions["validate"];
}
<Controller rules={{ required, validate }} … />

// Avoid — leaks react-hook-form's internal `rules` shape into our API
interface FormFieldProps {
  rules?: { required?: boolean | string; validate?: RegisterOptions["validate"] };
}
```

## Reuse existing components' accessibility/state handling

Don't reimplement disabled/loading/focus handling that another component in the library already gets right — compose that component instead of duplicating its logic.

```tsx
// Preferred — Button already handles disabled/loading accessibly
function FormSubmitButton({ label, onPress }: FormSubmitButtonProps) {
  const { isSubmitting } = useFormState();
  return (
    <Button
      text={label}
      disabled={isSubmitting}
      state={isSubmitting ? "loading" : undefined}
      onPress={onPress}
    />
  );
}

// Avoid — reimplementing disabled/aria state on a raw Pressable
```

## Single-select input groups: controllable value + context

For a group of options with one selected value (radios, segmented buttons), the
group owns state and children read it via a small React context — compose children
(`<Radio value label />`), don't take an options array. Reuse `useControllableValue`
(exported from `src/ui/inputs/Select.shared.tsx`) for the controlled/uncontrolled
`value` + `defaultValue` + `onValueChange` logic, share `{ value, onSelect, disabled }`
through the context, and wrap the group in `AccentScope`. Container gets
`role="radiogroup"`; each option gets `role="radio"` + `aria-checked`. (Pattern:
`RadioGroup`/`Radio` and `RadioButtonGroup`/`RadioButton` in `src/ui/inputs/`.)

## Test via accessibility queries, not `testID`

Stories' `play` functions should query by label/role (`getByLabelText`, `getByRole`) rather than `testID`/`getByTestId`. This exercises the same accessible names real assistive tech relies on, instead of a test-only hook.

```tsx
// Preferred
const nameInput = canvas.getByLabelText("Name");

// Avoid
const nameInput = canvas.getByTestId("name-input");
```
