import type { ReactNode } from "react";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { HStack } from "../stacks/stacks";

export interface BulletProps {
  /** Leading icon, tinted with the current accent. */
  icon: SVGIconElement;
  children?: ReactNode;
}

export function Bullet({ icon, children }: BulletProps): ReactNode {
  return (
    <HStack className="gap-sm items-start">
      <Icon icon={icon} className="text-accent" />
      <Text className="shrink">{children}</Text>
    </HStack>
  );
}
