import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../containers/Box";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import type { Separator } from "./Separator";
import { HStack, Stack } from "./stacks";

export default {
  title: "alouette/layout/Flex",
  tags: ["!autodocs"],
} satisfies Meta<typeof Separator>;

export const Documentation: StoryObj = {
  render: () => (
    <Story noDarkTheme>
      <Story.Section title="grow vs fixed size">
        <HStack>
          <View flexGrow={1}>
            <Text>grow</Text>
          </View>
          <View flexBasis={100}>
            <Text>100px</Text>
          </View>
        </HStack>

        <HStack>
          <View flexBasis={100}>
            <Text>100px</Text>
          </View>
          <View flexGrow={1} flexShrink={1}>
            <Text>
              grow but the long text overflows without `flexShrink` / lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>
        </HStack>
      </Story.Section>

      <Story.Section title="identical sizes">
        <HStack>
          <View flexGrow={1} flexBasis={0}>
            <Text>same size</Text>
          </View>
          <View flexGrow={1} flexBasis={0}>
            <Text>
              even if this has a longer text, this will have the same size
            </Text>
          </View>
        </HStack>
      </Story.Section>

      <Story.Section title="multiple items">
        <Stack>
          <Box square={100} layer="highlight">
            <Text>one item</Text>
          </Box>
        </Stack>

        <Stack gap="$1.0">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <Box key={i} square={100} layer="highlight">
              <Text>item {i}</Text>
            </Box>
          ))}
        </Stack>
      </Story.Section>
    </Story>
  ),
};
