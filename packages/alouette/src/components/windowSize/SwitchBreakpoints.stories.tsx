import type { Meta, StoryObj } from "@storybook/react";
import { BreakpointNameEnum } from "../../config/Breakpoints";
import { StoryGrid } from "../story-components/StoryGrid";
import { Story } from "../story-components/Story";
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
        [SwitchBreakpointsUsingDisplayNone, SwitchBreakpointsUsingNull] as const
      ).map((SwitchBreakpointsComponent) => (
        <Story.Section
          key={SwitchBreakpointsComponent.name}
          title={`Mode "${SwitchBreakpointsComponent.name}"`}
        >
          <Story.SubSection title="Current breakpoint">
            <SwitchBreakpointsComponent
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
                  <SwitchBreakpointsComponent
                    base={<Typography>no</Typography>}
                    {...{ [name]: <Typography>yes</Typography> }}
                    {...(array[index + 1]
                      ? {
                          [array[index + 1]]: <Typography>no</Typography>,
                        }
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
