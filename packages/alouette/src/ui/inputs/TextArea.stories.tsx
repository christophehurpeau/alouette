import type { Meta, StoryObj } from "@storybook/react-vite";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { TextArea } from "./TextArea";

export default {
  title: "alouette/Inputs/TextArea",
  component: TextArea,
  parameters: {
    componentSubtitle: "A text area field for multi-line input",
  },
  argTypes: {
    theme: {
      description: "The semantic theme of the input",
      control: "select",
      options: ["brand", "danger", "success"],
      table: {
        defaultValue: { summary: "brand" },
      },
    },
    placeholder: {
      description: "Placeholder text when input is empty",
      control: "text",
    },
    disabled: {
      description: "Whether the input is disabled",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    value: {
      description: "The current value of the input",
      control: "text",
    },
  },
} satisfies Meta<typeof TextArea>;

export const PreviewTextAreaStory: StoryObj<typeof TextArea> = {
  args: {
    theme: "brand",
    placeholder: "Enter text...",
  },
  render: (args) => <TextArea {...args} />,
};

export const Variants: StoryObj<typeof TextArea> = {
  render: () => (
    <Story>
      <Story.Section title="Variants">
        {([undefined, "brand", "danger", "success"] as const).map((theme) => (
          <Story.SubSection
            key={theme}
            withSurface
            title={theme ?? "Default"}
            theme={theme}
          >
            <StoryGrid.Row flexWrap>
              {(
                [undefined, "hover", "focus", "press", "disabled"] as const
              ).map((state) => (
                <StoryGrid.Col
                  key={state || "default"}
                  title={state || "default"}
                >
                  <TextArea
                    {...(theme ? { theme } : {})}
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
                <StoryGrid.Col
                  key={state || "default"}
                  title={state || "default"}
                >
                  <TextArea
                    {...(theme ? { theme } : {})}
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
                <StoryGrid.Col
                  key={state || "default"}
                  title={state || "default"}
                >
                  <TextArea
                    {...(theme ? { theme } : {})}
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
