import type { ReactNode } from "react";
import { View } from "react-native";
import type { Accent } from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";

export interface GradientBackgroundProps {
  children?: ReactNode;
  accent?: Accent;
}

export function GradientBackground({
  accent,
  children,
}: GradientBackgroundProps): ReactNode {
  return (
    <AccentScope accent={accent}>
      <View className="absolute inset-0 bg-linear-to-t from-screen-gradient-end from-5% via-screen-gradient-middle via-80% to-screen-gradient-start to-98%">
        {children}
      </View>
    </AccentScope>
  );
}
