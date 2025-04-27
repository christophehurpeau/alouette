import type { Meta, StoryObj } from "@storybook/react";
import { BreakpointNameEnum } from "../../config/Breakpoints.ts";
import { Story } from "../story-components/Story.tsx";
import { StoryGrid } from "../story-components/StoryGrid.tsx";
import { Typography } from "../typography/Typography.tsx";
import {
  SwitchBreakpointsUsingDisplayNone,
  SwitchBreakpointsUsingNull,
} from "./SwitchBreakpoints.tsx";

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
    base: <Typography>base</Typography>,
    small: <Typography>small</Typography>,
    medium: <Typography>medium</Typography>,
    large: <Typography>large</Typography>,
    wide: <Typography>wide</Typography>,
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
              base={<Typography>base</Typography>}
              small={<Typography>small</Typography>}
              medium={<Typography>medium</Typography>}
              large={<Typography>large</Typography>}
              wide={<Typography>wide</Typography>}
            />
          </Story.SubSection>
          <Story.SubSection title="In Breakpoint">
            <StoryGrid.Row>
              {Object.values(BreakpointNameEnum).map((name, index, array) => (
                <StoryGrid.Col key={name} title={name}>
                  <Component
                    base={<Typography>no</Typography>}
                    {...{ [name]: <Typography>yes</Typography> }}
                    {...(array[index + 1]
                      ? { [array[index + 1]!]: <Typography>no</Typography> }
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
