import type { ReactNode } from "react";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";

export interface BulletProps {
  /** Leading icon, tinted with the current accent. */
  icon: SVGIconElement;
  children?: ReactNode;
}

export function Bullet({ icon, children }: BulletProps): ReactNode {
  return (
    <View className="flex-row gap-sm items-start">
      {/* One text-base line tall (--text-base × --text-base--line-height): the
          icon centers on the first line, and when a small root font makes the
          line shorter than the icon, it overflows above the line, not below. */}
      <View className="h-[1.4rem] justify-end">
        <View className="grow justify-center">
          <Icon icon={icon} className="text-accent" />
        </View>
      </View>
      <Text className="shrink text-base">{children}</Text>
    </View>
  );
}
