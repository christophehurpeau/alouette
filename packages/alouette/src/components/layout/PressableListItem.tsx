import type { PressableBoxProps } from "alouette";
import { CaretRightRegularIcon } from "alouette-icons/phosphor-icons/CaretRightRegularIcon";
import type { ReactNode } from "react";
import { PressableBox } from "../containers/PressableBox";
import { Icon } from "../primitives/Icon";
import { View } from "../primitives/View";
import { HStack, VStack } from "../primitives/stacks";

export interface PressableListItemProps {
  theme?: PressableBoxProps["theme"];
  variant?: PressableBoxProps["variant"];
  borderRadius?: PressableBoxProps["borderRadius"];
  withBackground?: PressableBoxProps["withBackground"];
  role?: PressableBoxProps["role"];
  children: ReactNode;
  onPress: () => void;
}
export function PressableListItem({
  theme,
  variant,
  withBackground,
  borderRadius,
  role = "button",
  children,
  onPress,
}: PressableListItemProps): ReactNode {
  return (
    <PressableBox
      theme={theme}
      variant={variant}
      withBackground={withBackground}
      borderRadius={borderRadius}
      role={role}
      marginHorizontal="$4"
      marginVertical="$1"
      onPress={onPress}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal="$4"
        paddingVertical="$4"
      >
        <View flex={1}>{children}</View>
        <VStack justifyContent="center">
          <Icon accent icon={<CaretRightRegularIcon />} size={18} />
        </VStack>
      </HStack>
    </PressableBox>
  );
}
