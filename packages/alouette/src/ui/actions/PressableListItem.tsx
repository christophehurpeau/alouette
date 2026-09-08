import { CaretRightRegularIcon } from "alouette-icons/phosphor-icons/CaretRightRegularIcon";
import type { ReactNode } from "react";
import { View } from "react-native";
import { Icon } from "../primitives/Icon";
import { PressableBox, type PressableBoxProps } from "./PressableBox";

export interface PressableListItemProps {
  variant?: PressableBoxProps["variant"];
  accent?: PressableBoxProps["accent"];
  role?: PressableBoxProps["role"];
  children: ReactNode;
  onPress: () => void;
}

export function PressableListItem({
  variant = "list",
  role = "button",
  accent,
  children,
  onPress,
}: PressableListItemProps): ReactNode {
  return (
    <PressableBox
      variant={variant}
      role={role}
      accent={accent}
      className="flex-row items-center justify-between mx-xs my-xxs px-m py-m"
      onPress={onPress}
    >
      <View className="flex-1">{children}</View>
      <View className="justify-center">
        <Icon
          className={(() => {
            if (variant === "contained") return "text-on-accent-muted";
            if (variant === "list") return "text-on-list";
            return "text-muted";
          })()}
          icon={<CaretRightRegularIcon />}
          size={18}
        />
      </View>
    </PressableBox>
  );
}
