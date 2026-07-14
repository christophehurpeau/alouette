---
name: storybook
description: Provides Storybook guidelines for stories, component vs page stories, and testing with play. Use when creating or modifying .stories.tsx files.
---

Every component must have a `.stories.tsx` file. Key rules:

- Include `componentSubtitle` in the meta
- First story is always `"<ComponentName> Preview"` using args, never wrapped in `<Story>`, showcasing the component in its most basic form
- Set all possible states in "<ComponentName> Variants" story (unlike what is commonly done in storybook), named after the component, unless it requires a fullscreen layout in which case you can create additional stories. Exhaustively cover every prop that changes behavior or appearance, including boundary values (e.g. a `minSize` prop needs unset, `1`, and `2`; empty and non-empty). One `Story.Section` per variant. Do this from the start, not after being asked.
- A `play`/test-only story never substitutes for a variant. Every distinct shape or state you exercise in a test (e.g. an object vs. raw-string data shape) must also appear as its own `Story.Section` in the Variants story so it renders and snapshots. Adding a test does not license skipping the visible variant.
- Exported story functions end with `Story` suffix (e.g. `PreviewStory`, `VariantsStory`). Use the `Story` and `Story.Section` components wrapper for consistent layout
- Do not add variant theme examples in component stories — `themes.stories.tsx` covers that

## Component

A component stories file is typically composed with a "<ComponentName> Preview" and "<ComponentName> Variants" story (unlike what is commonly done in storybook), named after the component.

The preview story should be a simple story showcasing the component in its most basic form, while the variants story should showcase the different variants of the component using `Story` and `Story.Section` components to organize the story in a harmonized way.

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
