import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../primitives/Text";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { Surface } from "./Surface";

type ThisStory = StoryObj<typeof Surface>;

export default {
  title: "alouette/Containers/Surface",
  component: Surface,
  parameters: {
    componentSubtitle:
      "A surface container has layer, padding and rounded corners.",
    docs: {
      description: {
        component: `
### Features
- Surface backgrounds for elevation and layering
- Variant: \`layer\` controls the surface tone (default | highlight | lowered)

### Usage
~~~tsx
<Surface>Primary content</Surface>
<Surface layer="highlight">Accent surface</Surface>
<Surface layer="lowered">Lowered surface</Surface>
~~~`,
      },
    },
  },
  argTypes: {
    shadow: {
      description:
        'Optional elevation visual (s | m | l). Use "lowered" only with layer="lowered".',
      control: { type: "select" },
      options: ["s", "m", "l", "lowered"],
      table: { defaultValue: { summary: undefined } },
    },
    children: {
      control: "text",
      description: "Content rendered inside the surface",
    },
  },
} satisfies Meta<typeof Surface>;

export const PreviewSurfaceStory: ThisStory = {
  parameters: {
    layout: "padded",
  },
  args: {
    children: <Text>Surface content</Text>,
  },
  render: (args) => <Surface {...args} />,
};

export const VariantsSurfaceStory: ThisStory = {
  name: "Variants",
  render: () => (
    <Story>
      <Story.Section title="Depths">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col>
            <Surface>
              <Text>Default surface</Text>
            </Surface>
          </StoryGrid.Col>
          <StoryGrid.Col>
            <Surface layer="highlight">
              <Text>Highlight surface</Text>
            </Surface>
          </StoryGrid.Col>
          <StoryGrid.Col>
            <Surface lowered>
              <Text>Lowered surface</Text>
            </Surface>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>
      <Story.Section title="Elevation">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="Small">
            <Surface shadow="s">
              <Text>shadow="s"</Text>
            </Surface>
          </StoryGrid.Col>
          <StoryGrid.Col title="Medium">
            <Surface shadow="m">
              <Text>shadow="m"</Text>
            </Surface>
          </StoryGrid.Col>
          <StoryGrid.Col title="Large">
            <Surface shadow="l">
              <Text>shadow="l"</Text>
            </Surface>
          </StoryGrid.Col>
          <StoryGrid.Col title="Lowered (layer lowered)">
            <Surface lowered>
              <Text>lowered</Text>
            </Surface>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>
    </Story>
  ),
};
