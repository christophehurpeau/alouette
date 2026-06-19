import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../primitives/Text";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { Box } from "./Box";

const meta = {
  title: "alouette/Containers/Box",
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
    <Box className="p-m">
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
            <Box className="p-m">
              <Text>Default Box</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col>
            <Box className="bg-surface p-m">
              <Text>Surface Box</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col>
            <Box className="bg-highlight p-m">
              <Text>Highlight Box</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col>
            <Box className="bg-lowered p-m">
              <Text>Lowered Box</Text>
            </Box>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>
      <Story.Section title="Elevation">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="Small">
            <Box className="shadow-s p-m">
              <Text>shadow=&quot;s&quot;</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="Medium">
            <Box className="shadow-m p-m">
              <Text>shadow=&quot;m&quot;</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="Large">
            <Box className="shadow-l p-m">
              <Text>shadow=&quot;l&quot;</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="Lowered (depth lowered)">
            <Box className="bg-lowered shadow-lowered m-xs p-m">
              <Text>
                shadow=&quot;lowered&quot; + layer=&quot;lowered&quot;
              </Text>
            </Box>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>
    </Story>
  ),
};
