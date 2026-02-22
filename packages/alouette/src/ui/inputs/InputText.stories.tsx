import type { Meta, StoryObj } from "@storybook/react-vite";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { InputText } from "./InputText";

export default {
  title: "alouette/Inputs/InputText",
  component: InputText,
  parameters: {
    componentSubtitle:
      "A consistent and accessible text input field with theme support",
    docs: {
      description: {
        component: `
### Features
- Multiple semantic themes (brand, danger, success)
- Interactive states (hover, focus, press)
- Support for disabled state
- Customizable placeholder text
- Accessible by default
- Controlled and uncontrolled modes

### Variants
- \`theme\`: Semantic theme (brand | danger | success)
- \`disabled\`: Disables input interaction
- \`placeholder\`: Shows placeholder text when empty
- \`value\`: Controls input value (controlled mode)
- \`defaultValue\`: Sets initial value (uncontrolled mode)

### Usage
~~~tsx
<InputText
  theme="brand"
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
} satisfies Meta<typeof InputText>;

export const PreviewInputTextStory: StoryObj<typeof InputText> = {
  args: {
    theme: "brand",
    placeholder: "Enter text...",
  },
  render: (args) => <InputText {...args} />,
};

export const Variants: StoryObj<typeof InputText> = {
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
                  <InputText
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
                  <InputText
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
                  <InputText
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

      <Story.Section title="Mode">
        <Story.SubSection title="Password">
          <InputText mode="password" />
        </Story.SubSection>
        <Story.SubSection title="Email">
          <InputText mode="email" />
        </Story.SubSection>
        <Story.SubSection title="Tel">
          <InputText mode="tel" />
        </Story.SubSection>
        <Story.SubSection title="Number">
          <InputText mode="number" />
        </Story.SubSection>
        <Story.SubSection title="URL">
          <InputText mode="url" />
        </Story.SubSection>
        <Story.SubSection title="Search">
          <InputText mode="search" />
        </Story.SubSection>
      </Story.Section>

      <Story.Section title="Other Props">
        <Story.SubSection title="Auto correct">
          <InputText autoCorrect />
        </Story.SubSection>
        <Story.SubSection title="Auto capitalize">
          <InputText autoCapitalize="none" placeholder="None" />
          <InputText autoCapitalize="words" placeholder="Words" />
          <InputText autoCapitalize="sentences" placeholder="Sentences" />
          <InputText autoCapitalize="characters" placeholder="Characters" />
        </Story.SubSection>
      </Story.Section>

      <Story.Section title="Edge Cases">
        <Story.SubSection title="Very Long text">
          <InputText value="Very very very very very very very very very very very very very very very very very very very very very very very very very very very long text Example" />
        </Story.SubSection>
      </Story.Section>
    </Story>
  ),
};
