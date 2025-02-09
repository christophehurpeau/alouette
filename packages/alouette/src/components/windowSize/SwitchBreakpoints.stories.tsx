import type { Meta, StoryObj } from "@storybook/react";
import { BreakpointNameEnum } from "../../config/Breakpoints";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { Typography } from "../typography/Typography";
import {
  SwitchBreakpointsUsingDisplayNone,
  SwitchBreakpointsUsingNull,
} from "./SwitchBreakpoints";

type ThisStory = StoryObj<typeof SwitchBreakpointsUsingDisplayNone>;

export default {
  title: "alouette/Window Size/SwitchBreakpoints",
  component: SwitchBreakpointsUsingDisplayNone,
} satisfies Meta<typeof SwitchBreakpointsUsingDisplayNone>;

export const SwitchBreakpointsStory: ThisStory = {
  name: "SwitchBreakpoints",

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
