import type { Meta, StoryObj } from "@storybook/react-vite";
import { Story, neutralAndAccents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { TextArea } from "./TextArea";

type ThisStory = StoryObj<typeof TextArea>;

export default {
  title: "alouette/Inputs/TextArea",
  component: TextArea,
  parameters: {
    componentSubtitle: "Multi-line text input.",
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    value: { control: "text" },
  },
} satisfies Meta<typeof TextArea>;

export const PreviewTextAreaStory: ThisStory = {
  args: { placeholder: "Enter text..." },
  render: (args) => <TextArea {...args} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Variants">
        {neutralAndAccents.map((accent) => (
          <Story.SubSection
            key={accent}
            withSurface
            title={accent}
            accent={accent}
          >
            <StoryGrid.Row flexWrap>
              {(
                [undefined, "hover", "focus", "press", "disabled"] as const
              ).map((state) => (
                <StoryGrid.Col key={state} title={state}>
                  <TextArea
                    disabled={state === "disabled"}
                    forceStyle={state === "disabled" ? undefined : state}
                  />
                </StoryGrid.Col>
              ))}
            </StoryGrid.Row>
            <StoryGrid.Row flexWrap>
              {(
                [undefined, "hover", "focus", "press", "disabled"] as const
              ).map((state) => (
                <StoryGrid.Col key={state} title={state}>
                  <TextArea
                    disabled={state === "disabled"}
                    forceStyle={state === "disabled" ? undefined : state}
                    placeholder="Placeholder"
                  />
                </StoryGrid.Col>
              ))}
            </StoryGrid.Row>
            <StoryGrid.Row flexWrap>
              {(
                [undefined, "hover", "focus", "press", "disabled"] as const
              ).map((state) => (
                <StoryGrid.Col key={state} title={state}>
                  <TextArea
                    disabled={state === "disabled"}
                    forceStyle={state === "disabled" ? undefined : state}
                    value="Value"
                  />
                </StoryGrid.Col>
              ))}
            </StoryGrid.Row>
          </Story.SubSection>
        ))}
      </Story.Section>
    </Story>
  ),
};
