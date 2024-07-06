import { CaretRightRegularIcon } from "alouette-icons/phosphor-icons";
import type { ReactNode } from "react";
import { Pressable } from "react-native";
import { Icon } from "../primitives/Icon";
import { View } from "../primitives/View";
import { HStack, Stack } from "../primitives/stacks";

export interface PressableListItemProps {
  children: ReactNode;
  onPress: () => void;
}
export function PressableListItem({
  children,
  onPress,
}: PressableListItemProps): ReactNode {
  return (
    <Pressable onPress={onPress}>
      <HStack
        justifyContent="space-between"
        paddingHorizontal="$4"
        paddingVertical="$3"
      >
        <View>{children}</View>
        <Stack justifyContent="center">
          <Icon icon={<CaretRightRegularIcon />} size={20} />
        </Stack>
      </HStack>
    </Pressable>
  );
}
