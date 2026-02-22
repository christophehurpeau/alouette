import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../primitives/Text";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { Box } from "./Box";

const meta = {
  title: "alouette/containers/Box",
  parameters: {
    componentSubtitle:
      "Box is a high-level container that has depth and elevation.",
  },
} satisfies Meta<unknown>;

export default meta;

export const PreviewStory: StoryObj<unknown> = {
  name: "Box Preview",
  parameters: {
    layout: "padded",
  },
  render: () => (
    <Box>
      <Text>Box content</Text>
    </Box>
  ),
};

export const VariantsStory: StoryObj<unknown> = {
  name: "Box Variants",
  render: () => (
    <Story>
      <Story.Section title="Depths">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col>
            <Box>
              <Text>Default Box</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col>
            <Box layer="surface">
              <Text>Surface Box</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col>
            <Box layer="highlight">
              <Text>Highlight Box</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col>
            <Box layer="lowered">
              <Text>Lowered Box</Text>
            </Box>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>
      <Story.Section title="Elevation">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="Small">
            <Box shadow="s">
              <Text>shadow="s"</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="Medium">
            <Box shadow="m">
              <Text>shadow="m"</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="Large">
            <Box shadow="l">
              <Text>shadow="l"</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="Lowered (depth lowered)">
            <Box layer="lowered" shadow="lowered" margin="$2">
              <Text>shadow="lowered" + layer="lowered"</Text>
            </Box>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>
    </Story>
  ),
};
