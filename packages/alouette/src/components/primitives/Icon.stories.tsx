import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowUpLeftRegularIcon } from "alouette-icons/phosphor-icons/ArrowUpLeftRegularIcon";
import { Box } from "../containers/Box";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { Icon } from "./Icon";

export default {
  title: "alouette/Primitives/Icon",
  component: Icon,
  parameters: {
    componentSubtitle:
      "A wrapper component for icons from alouette-icons, providing consistent sizing and theming",
    docs: {
      description: {
        component: `
### Features
- Consistent sizing across the application
- Theme support for color inheritance
- Compatible with all icons from alouette-icons
- Proper accessibility attributes
- Automatic color contrast handling

### Variants
- \`size\`: Icon dimensions in pixels
- \`contrast\`: High contrast version
- \`icon\`: Icon component from alouette-icons

### Guidelines
- Use icons from alouette-icons package
- Ensure icons have proper aria-label when meaning isn't obvious
- Keep icons at consistent sizes within similar contexts
- Consider using IconButton for clickable icons
- Avoid using icons without labels in navigation

### Usage
~~~tsx
<Icon
  icon={<ArrowUpLeftRegularIcon />}
  size={24}
  aria-label="Go back"
/>
~~~`,
      },
    },
  },
  argTypes: {
    icon: {
      description: "The icon component from alouette-icons",
      control: "object",
    },
    size: {
      description: "Size of the icon in pixels",
      control: "number",
      table: {
        defaultValue: { summary: "24" },
      },
    },
  },
} satisfies Meta<typeof Icon>;

export const PreviewIconStory: StoryObj<typeof Icon> = {
  args: {
    icon: <ArrowUpLeftRegularIcon />,
    size: 24,
  },
  render: (args) => <Icon {...args} />,
};

export const VariantsIconStory: StoryObj<typeof Icon> = {
  name: "Variants",
  render: () => (
    <Story>
      <Story.Section title="Size">
        <StoryGrid.Row>
          <StoryGrid.Col title="24">
            <Icon icon={<ArrowUpLeftRegularIcon />} size={24} />
          </StoryGrid.Col>
          <StoryGrid.Col title="40">
            <Icon icon={<ArrowUpLeftRegularIcon />} size={40} />
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section title="Color">
        <StoryGrid.Row>
          <StoryGrid.Col title="Default">
            <Icon icon={<ArrowUpLeftRegularIcon />} size={24} />
          </StoryGrid.Col>
          <StoryGrid.Col title="Disabled">
            <Icon disabled icon={<ArrowUpLeftRegularIcon />} size={24} />
          </StoryGrid.Col>
          <StoryGrid.Col title="Primary">
            <Box theme="primary">
              <Icon accent icon={<ArrowUpLeftRegularIcon />} size={24} />
            </Box>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>
    </Story>
  ),
};
