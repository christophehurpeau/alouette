import type { ReactNode } from "react";
import { twMerge } from "../../core/twMerge";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Paragraph, Text } from "../primitives/Text";
import { View } from "../primitives/View";

export interface EmptyStateProps {
  icon: SVGIconElement;
  title: string;
  /** Muted prose under the title: why there is nothing, or what would fill it. */
  children?: string;
  className?: string;
}

/**
 * Stands in for a list or a section with nothing to show, centered on the
 * screen ground: a muted icon, a title and an optional explanation.
 */
export function EmptyState({
  icon,
  title,
  children,
  className,
}: EmptyStateProps): ReactNode {
  return (
    <View className={twMerge("items-center gap-sm py-xl", className)}>
      <Icon icon={icon} size={48} className="text-muted" />
      <Text className="text-center font-heading-bold text-lg">{title}</Text>
      {children ? (
        <Paragraph className="text-center text-muted">{children}</Paragraph>
      ) : null}
    </View>
  );
}
