import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { View } from "react-native";
import { useCSSVariable } from "uniwind";

export interface GradientBackgroundProps {
  children?: ReactNode;
}

export function GradientBackground({
  children,
}: GradientBackgroundProps): ReactNode {
  const [start, middle, end] = useCSSVariable([
    "--color-screen-gradient-start",
    "--color-screen-gradient-middle",
    "--color-screen-gradient-end",
  ]);
  return (
    <View className="absolute inset-0">
      <LinearGradient
        colors={[end as string, middle as string, start as string]}
        locations={[0.05, 0.8, 0.98]}
        style={{ flex: 1 }}
      />
      {children}
    </View>
  );
}
