import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../containers/Box";
import { Story } from "../story-components/Story";
import { Link } from "./Link";
import { VStack } from "./stacks";

type ThisStory = StoryObj<typeof Link>;

export default {
  title: "alouette/primitives/Link",
  component: Link,
  parameters: {
    componentSubtitle:
      "A consistent hyperlink component that provides consistent styling and behavior across your application",
    docs: {
      description: {
        component: `
### Features
- Consistent link styling with theme support
- Hover and press states for better interactivity
- Support for external links with target="_blank"
- Optional subtle variant for less prominent links
- Accessible focus states and keyboard navigation
- Automatic external link handling

### Variants
- \`target\`: Link target (_self | _blank)
- \`disabled\`: Disables link interaction
- \`contrast\`: High contrast version for dark backgrounds

### Guidelines
- Use target="_blank" for external links
- Provide clear and descriptive link text
- Avoid using "click here" or "read more"
- Consider the context when using contrast variant
- Group related links together

### Usage
~~~tsx
// Basic usage
<Link href="/dashboard">
  Go to Dashboard
</Link>
~~~

### Accessibility
- Links use proper HTML semantics with \`<a>\` tags
- External links automatically get proper aria attributes
- Focus states are clearly visible
- Color contrast meets WCAG guidelines`,
      },
    },
  },
  argTypes: {
    href: {
      description: "The URL that the hyperlink points to",
      control: "text",
      table: {
        defaultValue: { summary: "#" },
      },
    },
    target: {
      description: "Where to open the linked URL",
      control: "select",
      options: ["_self", "_blank"],
      table: {
        defaultValue: { summary: "_self" },
      },
    },
  },
} satisfies Meta<typeof Link>;

export const PreviewLinkStory: ThisStory = {
  args: {
    href: "https://example.com",
    target: "_blank",
    children: "Example Link",
  },
  render: (args) => <Link {...args} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="External Links">
        <Link href="https://example.com" target="_blank">
          External Link
        </Link>
      </Story.Section>

      <Story.Section title="High Contrast">
        <Box withBackground theme="primary" padding="$4">
          <Link href="#">Settings</Link>
        </Box>
      </Story.Section>

      <Story.Section title="States">
        <VStack gap="$4">
          <Link disabled href="#">
            Disabled Link
          </Link>
        </VStack>
      </Story.Section>
    </Story>
  ),
};
