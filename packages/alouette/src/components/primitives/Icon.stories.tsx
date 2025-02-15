import type { Meta, StoryObj } from "@storybook/react";
import * as AllPhosphorIcons from "alouette-icons/phosphor-icons";
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
    icon: <AllPhosphorIcons.ArrowUpLeftRegularIcon />,
    size: 24,
  },
  render: (args) => <Icon {...args} />,
};
