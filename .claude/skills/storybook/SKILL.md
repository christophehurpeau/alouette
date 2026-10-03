---
name: storybook
description: Provides Storybook guidelines for stories, component vs page stories, and testing with play. Use when creating or modifying .stories.tsx files.
---

Every component must have a `.stories.tsx` file. Key rules:

- Include `componentSubtitle` in the meta
- First story is always `"<ComponentName> Preview"` using args, never wrapped in `<Story>`, showcasing the component in its most basic form
- The Preview story sets `layout: "padded"` in its `parameters` — the global default is `fullscreen`, which suits the Variants story (`<Story>` pads itself) but leaves a bare Preview flush against the frame edge. Only a component that fills the screen (`AppHeader`, `AppLayout`, `AppShell`, `GradientBackground`, the `Screen*` lists) keeps the fullscreen default.
- The Preview story sets `parameters: { chromatic: { disableSnapshot: true } }`: it only feeds the docs page and the controls, and the Variants story snapshots what it shows. A component with a Preview therefore always has a Variants story, and whatever the Preview renders must also appear there — a Preview is never the only place a state is snapshotted. `packages/alouette/src/ui/story-components/storyConventions.test.ts` (root `pnpm test`) enforces both, keyed on the export names containing `Preview` / `Variants`.
- Set all possible states in "<ComponentName> Variants" story (unlike what is commonly done in storybook), named after the component, unless it requires a fullscreen layout in which case you can create additional stories. Exhaustively cover every prop that changes behavior or appearance, including boundary values (e.g. a `minSize` prop needs unset, `1`, and `2`; empty and non-empty). One `Story.Section` per variant. Do this from the start, not after being asked.
- A `play`/test-only story never substitutes for a variant. Every distinct shape or state you exercise in a test (e.g. an object vs. raw-string data shape) must also appear as its own `Story.Section` in the Variants story so it renders and snapshots. Adding a test does not license skipping the visible variant.
- Exported story functions end with `Story` suffix (e.g. `PreviewStory`, `VariantsStory`). Use the `Story` and `Story.Section` components wrapper for consistent layout
- Do not add variant theme examples in component stories — `themes.stories.tsx` covers that

## Component

A component stories file is typically composed with a "<ComponentName> Preview" and "<ComponentName> Variants" story (unlike what is commonly done in storybook), named after the component.

The preview story should be a simple story showcasing the component in its most basic form, while the variants story should showcase the different variants of the component using `Story` and `Story.Section` components to organize the story in a harmonized way.

```tsx
export const BadgePreviewStory: ThisStory = {
  name: "Badge Preview",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  args: { accent: "brand", children: "New" },
  render: (args) => <Badge {...args} />,
};

export const BadgeVariantsStory: ThisStory = {
  name: "Badge Variants",
  render: () => (
    <Story>
      <Story.Section title="Accents">…</Story.Section>
    </Story>
  ),
};
```

## Use `fn` instead of fake callbacks

```tsx
import { fn } from "storybook";

export const ActionButtonStory: StoryObj = {
  name: "ActionButton",
  render: () => (
    <Story>
      <Story.Section title="Pressable">
        <ActionButton onPress={fn()}>Click Me</ActionButton>
      </Story.Section>
    </Story>
  ),
};
```
