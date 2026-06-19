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
        component: `### Features
- Surface backgrounds for elevation and layering
- Variant: \`size\` controls padding + radius (sm | md | lg)
- Variant: \`shadow\` controls elevation (s | m | l)
- Variant: \`lowered\` pairs layer="lowered" with shadow="lowered"

### Usage
~~~tsx
<Surface>Primary content</Surface>
<Surface size="lg" shadow="m">Larger surface</Surface>
<Surface lowered>Sunken surface</Surface>
~~~`,
      },
    },
  },
} satisfies Meta<typeof Surface>;

export const PreviewSurfaceStory: ThisStory = {
  name: "Surface Preview",
  parameters: {
    layout: "padded",
  },
  render: () => (
    <Surface>
      <Text>Surface content</Text>
    </Surface>
  ),
};

export const VariantsSurfaceStory: ThisStory = {
  name: "Variants",
  render: () => (
    <Story>
      <Story.Section title="Variants">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col>
            <Surface>
              <Text>Default surface</Text>
            </Surface>
          </StoryGrid.Col>
          <StoryGrid.Col>
            <Surface variant="highlight">
              <Text>Highlighted surface</Text>
            </Surface>
          </StoryGrid.Col>
          <StoryGrid.Col>
            <Surface variant="lowered">
              <Text>Lowered surface</Text>
            </Surface>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>
      <Story.Section title="Elevation">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="Small">
            <Surface shadow="s">
              <Text>shadow=&quot;s&quot;</Text>
            </Surface>
          </StoryGrid.Col>
          <StoryGrid.Col title="Medium">
            <Surface shadow="m">
              <Text>shadow=&quot;m&quot;</Text>
            </Surface>
          </StoryGrid.Col>
          <StoryGrid.Col title="Large">
            <Surface shadow="l">
              <Text>shadow=&quot;l&quot;</Text>
            </Surface>
          </StoryGrid.Col>
          <StoryGrid.Col title="Lowered">
            <Surface variant="lowered">
              <Text>lowered</Text>
            </Surface>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>
      <Story.Section title="Sizes">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="sm">
            <Surface size="sm">
              <Text>size=&quot;sm&quot;</Text>
            </Surface>
          </StoryGrid.Col>
          <StoryGrid.Col title="md">
            <Surface size="md">
              <Text>size=&quot;md&quot;</Text>
            </Surface>
          </StoryGrid.Col>
          <StoryGrid.Col title="lg">
            <Surface size="lg">
              <Text>size=&quot;lg&quot;</Text>
            </Surface>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>
    </Story>
  ),
};
