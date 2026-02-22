import type { Meta, StoryObj } from "@storybook/react-vite";
import { BreakpointNameEnum } from "../config/Breakpoints";
import { Text } from "../ui/primitives/Text";
import { Story } from "../ui/story-components/Story";
import { StoryGrid } from "../ui/story-components/StoryGrid";
import {
  SwitchBreakpointsUsingDisplayNone,
  SwitchBreakpointsUsingNull,
} from "./SwitchBreakpoints";

type ThisStory = StoryObj<typeof SwitchBreakpointsUsingDisplayNone>;

export default {
  title: "alouette/Window Size/SwitchBreakpoints",
  component: SwitchBreakpointsUsingDisplayNone,
  parameters: {
    componentSubtitle:
      "A utility component for rendering different content based on screen size breakpoints",
    docs: {
      description: {
        component: `
### Features
- Two implementation strategies: display:none and null rendering
- Support for all breakpoints (base, small, medium, large, wide)
- Efficient re-rendering with breakpoint changes
- Type-safe breakpoint props
- Zero content shift during transitions
- SSR compatibility with display:none strategy

### Variants
- \`SwitchBreakpointsUsingDisplayNone\`: Uses CSS display:none (SSR friendly)
- \`SwitchBreakpointsUsingNull\`: Uses conditional rendering (client-side only)
- Breakpoint props: \`base\`, \`small\`, \`medium\`, \`large\`, \`wide\`

### Guidelines
- Choose implementation based on content type and performance needs
- Use display:none for SSR and simple content switches
- Use null rendering for heavy components in client-side only apps
- Ensure content is provided for base breakpoint
- Consider content hierarchy across breakpoints
- Prefer SwitchBreakpointsUsingDisplayNone for SSR applications

### Usage
~~~tsx
// Using display:none (SSR friendly, better for simple content)
<SwitchBreakpointsUsingDisplayNone
  base={<MobileNav />}
  medium={<DesktopNav />}
/>

// Using null rendering (client-side only, better for heavy components)
<SwitchBreakpointsUsingNull
  base={<MobileLayout />}
  medium={<TabletLayout />}
  wide={<DesktopLayout />}
/>
~~~`,
      },
    },
  },
} satisfies Meta<typeof SwitchBreakpointsUsingDisplayNone>;

export const PreviewSwitchBreakpointsStory: ThisStory = {
  args: {
    base: <Text>base</Text>,
    small: <Text>small</Text>,
    medium: <Text>medium</Text>,
    large: <Text>large</Text>,
    wide: <Text>wide</Text>,
  },
  render: (args) => <SwitchBreakpointsUsingDisplayNone {...args} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      {(
        [
          {
            name: "UsingDisplayNone",
            component: SwitchBreakpointsUsingDisplayNone,
          },
          { name: "UsingNull", component: SwitchBreakpointsUsingNull },
        ] as const
      ).map(({ name, component: Component }) => (
        <Story.Section key={name} title={`Mode "${name}"`}>
          <Story.SubSection title="Current breakpoint">
            <Component
              base={<Text>base</Text>}
              small={<Text>small</Text>}
              medium={<Text>medium</Text>}
              large={<Text>large</Text>}
              wide={<Text>wide</Text>}
            />
          </Story.SubSection>
          <Story.SubSection title="In Breakpoint">
            <StoryGrid.Row>
              {Object.values(BreakpointNameEnum).map((name, index, array) => (
                <StoryGrid.Col key={name} title={name}>
                  <Component
                    base={<Text>no</Text>}
                    {...{ [name]: <Text>yes</Text> }}
                    {...(array[index + 1]
                      ? { [array[index + 1]!]: <Text>no</Text> }
                      : {})}
                  />
                </StoryGrid.Col>
              ))}
            </StoryGrid.Row>
          </Story.SubSection>
        </Story.Section>
      ))}
    </Story>
  ),
};
