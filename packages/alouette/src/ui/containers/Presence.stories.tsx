import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useRef, useState } from "react";
import { animationDurationsMs } from "../../animationDurationsMs";
import { Button } from "../actions/Button";
import { InfoMessage } from "../feedback/Message";
import { Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { Box } from "./Box";
import { PresenceList, PresenceOne } from "./Presence";

// Pure NativeWind v5 CSS animations — no animation library. Presence keeps the
// outgoing child mounted for `exitDurationMs` (the framework's
// `animationDurationsMs.slide`, matching the slide-in / slide-out keyframes) so
// the previous content slides out to the right while the new one slides in from
// the left with a rotateY flip.

// PresenceOne merges the animation classes onto a single style-forwarding child
// via cloneElement — no wrapper View. The cloned card is `absolute inset-0`, so
// the outgoing and incoming cards overlap inside the sized, clipped container and
// cross over each other during the swap.
function PresenceOneDemo(): ReactNode {
  const [gameNumber, setGameNumber] = useState(1);
  return (
    <VStack className="items-start gap-m">
      <Box className="relative h-24 w-64  rounded-md">
        <PresenceOne
          activeKey={gameNumber}
          exitDurationMs={animationDurationsMs.slide}
          enterClassName="animate-slide-in"
          exitClassName="animate-slide-out"
          className="flex-center bg-surface absolute inset-0 rounded-md"
        >
          <Box>
            <Text className="font-heading-bold text-2xl">
              Game {gameNumber}
            </Text>
          </Box>
        </PresenceOne>
      </Box>

      <Button
        text="Next game"
        onPress={() => {
          setGameNumber((n) => n + 1);
        }}
      />
    </VStack>
  );
}

// PresenceList animates each keyed child independently. Every item is an
// InfoMessage with its own dismiss button (Message's built-in onDismiss): adding
// fades + expands a new message in while the others stay put, dismissing one
// fades + collapses only that message out (animate-collapse-*, so the items below
// rise to fill the gap). Several items are present at once — a list, not a swap.
function PresenceListDemo(): ReactNode {
  const nextIdRef = useRef(4);
  const [ids, setIds] = useState([1, 2, 3]);
  return (
    <VStack className="items-start gap-m">
      <Box className="bg-lowered w-80 rounded-md p-m">
        <PresenceList
          exitDurationMs={animationDurationsMs.collapse}
          enterClassName="animate-collapse-in"
          exitClassName="animate-collapse-out"
          className="overflow-hidden pb-xs"
        >
          {ids.map((id) => (
            <InfoMessage
              key={id}
              size="sm"
              dismissIconAriaLabel={`Dismiss item ${id}`}
              onDismiss={() => {
                setIds((current) => current.filter((itemId) => itemId !== id));
              }}
            >
              Item {id}
            </InfoMessage>
          ))}
        </PresenceList>
      </Box>
      <Button
        text="Add"
        onPress={() => {
          const id = nextIdRef.current;
          nextIdRef.current += 1;
          setIds((current) => [...current, id]);
        }}
      />
    </VStack>
  );
}

const meta = {
  title: "alouette/Containers/Presence",
  parameters: {
    componentSubtitle:
      "Animate presence with pure CSS — PresenceOne swaps a single child, PresenceList animates add/remove across a keyed list.",
  },
} satisfies Meta<unknown>;

export default meta;

export const PreviewStory: StoryObj<unknown> = {
  name: "Presence Preview",
  parameters: {
    layout: "padded",
  },
  render: () => <PresenceOneDemo />,
};

export const VariantsStory: StoryObj<unknown> = {
  name: "Presence Variants",
  render: () => (
    <Story>
      <Story.Section title="PresenceOne (swap a single child)">
        <PresenceOneDemo />
      </Story.Section>
      <Story.Section title="PresenceList (animated add/remove list)">
        <PresenceListDemo />
      </Story.Section>
    </Story>
  ),
};
