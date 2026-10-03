import { type ReactNode, useId } from "react";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";

export interface SidebarNavSectionProps {
  /**
   * Visible heading, which also names the group for assistive tech. Leave it
   * out for the first, untitled group of a sidebar's primary destinations.
   */
  title?: string;
  /** `SidebarNavItem`s. */
  children: ReactNode;
}

export function SidebarNavSection({
  title,
  children,
}: SidebarNavSectionProps): ReactNode {
  const titleId = useId();

  if (title === undefined) {
    return <View className="gap-xxs">{children}</View>;
  }

  return (
    <View role="group" aria-labelledby={titleId} className="gap-xxs">
      <Text
        nativeID={titleId}
        className="select-none px-sm pt-xs font-body-bold text-sm text-muted"
      >
        {title}
      </Text>
      {children}
    </View>
  );
}
