import { styled } from "@tamagui/core";
import type { PressableBoxProps } from "alouette";
import { CaretRightRegularIcon } from "alouette-icons/phosphor-icons/CaretRightRegularIcon";
import type { ReactNode } from "react";
import { Icon } from "../primitives/Icon";
import { View } from "../primitives/View";
import { VStack } from "../stacks/stacks";
import { PressableBox } from "./PressableBox";

const PressableListItemFrame = styled(PressableBox, {
  variant: "contained",
  marginHorizontal: "$0.5",
  marginVertical: "$0.25",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: "$1.0",
  paddingVertical: "$1.0",
});

export interface PressableListItemProps {
  theme?: PressableBoxProps["theme"];
  role?: PressableBoxProps["role"];
  variant?: PressableBoxProps["variant"];
  children: ReactNode;
  onPress: () => void;
}

export function PressableListItem({
  theme,
  role = "button",
  children,
  onPress,
}: PressableListItemProps): ReactNode {
  return (
    <PressableListItemFrame theme={theme} role={role} onPress={onPress}>
      <View flex={1}>{children}</View>
      <VStack justifyContent="center">
        <Icon
          tint="onAccent-muted"
          icon={<CaretRightRegularIcon />}
          size={18}
        />
      </VStack>
    </PressableListItemFrame>
  );
}
