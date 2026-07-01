import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "../actions/Button";
import { Box } from "../containers/Box";
import { Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { ConnectionState, type ConnectionStateStatus } from "./ConnectionState";

type ThisStory = StoryObj<typeof ConnectionState>;

// `connected` is a hidden state, so it only ever appears mid-transition: toggling
// away from it turns the pill green as it slides back out.
function InteractiveDemo(): ReactNode {
  const [state, setState] = useState<ConnectionStateStatus>("disconnected");
  const connected = state === "connected";
  return (
    <VStack className="gap-s">
      <Box className="relative h-16 overflow-hidden rounded-sm bg-lowered">
        <ConnectionState state={state}>
          {connected ? "Connected" : "Disconnected"}
        </ConnectionState>
      </Box>
      <Button
        accent={connected ? "danger" : "success"}
        text={connected ? "Disconnect" : "Connect"}
        onPress={() => {
          setState(connected ? "disconnected" : "connected");
        }}
      />
    </VStack>
  );
}

// The banner is absolutely positioned, so anchor each example in its own
// relative frame tall enough to reveal the pill.
function Frame({
  state,
  forceVisible,
  children,
}: {
  state: ConnectionStateStatus | null;
  forceVisible?: boolean;
  children: NonNullable<ReactNode>;
}): ReactNode {
  return (
    <VStack className="gap-xs">
      <Text className="text-muted text-sm">{state ?? "null"}</Text>
      <Box className="relative h-16 overflow-hidden rounded-sm bg-lowered">
        <ConnectionState state={state} forceVisible={forceVisible}>
          {children}
        </ConnectionState>
      </Box>
    </VStack>
  );
}

export default {
  title: "alouette/Feedback/ConnectionState",
  component: ConnectionState,
  parameters: {
    componentSubtitle:
      "Top-pinned banner that surfaces the network connection status",
  },
  argTypes: {
    state: {
      description: "Current connection status",
      control: "select",
      options: ["connected", "connecting", "disconnected", null],
    },
    forceHidden: {
      description: "Force the banner off-screen regardless of state",
      control: "boolean",
    },
    forceVisible: {
      description: "Keep the banner on-screen even when connected",
      control: "boolean",
    },
    children: { description: "Label shown in the pill", control: "text" },
  },
} satisfies Meta<typeof ConnectionState>;

export const ConnectionStatePreviewStory: ThisStory = {
  name: "ConnectionState Preview",
  args: { state: "disconnected", children: "Disconnected" },
  render: (args) => (
    <Box className="relative h-16 overflow-hidden rounded-sm bg-lowered">
      <ConnectionState {...args} />
    </Box>
  ),
};

export const ConnectionStateVariantsStory: ThisStory = {
  name: "ConnectionState Variants",
  render: () => (
    <Story>
      <Story.Section title="States">
        <Frame state="connecting">Reconnecting…</Frame>
        <Frame state="disconnected">Disconnected</Frame>
        <Frame forceVisible state="connected">
          Connected
        </Frame>
        <Frame state={null}>Unknown</Frame>
      </Story.Section>

      <Story.Section title="Interactive">
        <InteractiveDemo />
      </Story.Section>

      <Story.Section title="Force hidden">
        <Box className="relative h-16 overflow-hidden rounded-sm bg-lowered">
          <ConnectionState forceHidden state="disconnected">
            Disconnected
          </ConnectionState>
        </Box>
      </Story.Section>
    </Story>
  ),
};
