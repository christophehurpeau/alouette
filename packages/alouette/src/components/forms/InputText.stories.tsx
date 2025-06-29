import type { Meta, StoryObj } from "@storybook/react-vite";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { InputText } from "./InputText";

export default {
  title: "alouette/forms/InputText",
  component: InputText,
  parameters: {
    componentSubtitle:
      "A consistent and accessible text input field with theme support",
    docs: {
      description: {
        component: `
### Features
- Multiple semantic themes (primary, danger, success)
- Interactive states (hover, focus, press)
- Support for disabled state
- Customizable placeholder text
- Accessible by default
- Controlled and uncontrolled modes

### Variants
- \`theme\`: Semantic theme (primary | danger | success)
- \`disabled\`: Disables input interaction
- \`placeholder\`: Shows placeholder text when empty
- \`value\`: Controls input value (controlled mode)
- \`defaultValue\`: Sets initial value (uncontrolled mode)

### Usage
~~~tsx
<InputText
  theme="primary"
  placeholder="Enter your name..."
  onChange={(e) => console.log(e.target.value)}
/>
~~~`,
      },
    },
  },
  argTypes: {
    theme: {
      description: "The semantic theme of the input",
      control: "select",
      options: ["primary", "danger", "success"],
      table: {
        defaultValue: { summary: "primary" },
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
} satisfies Meta<typeof InputText>;

export const PreviewInputTextStory: StoryObj<typeof InputText> = {
  args: {
    theme: "primary",
    placeholder: "Enter text...",
  },
  render: (args) => <InputText {...args} />,
};

export const Variants: StoryObj<typeof InputText> = {
  render: () => (
    <Story>
      <Story.Section title="Variants">
        {(["primary", "danger", "success"] as const).map((theme) => (
          <Story.SubSection
            key={theme}
            withBackground
            title={theme}
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
                  <InputText
                    theme={theme}
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
                  <InputText
                    theme={theme}
                    disabled={state === "disabled"}
                    forceStyle={state === "disabled" ? undefined : state}
                    placeholder="Placeholder"
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
