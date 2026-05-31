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
    <View
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(0deg, ${end as string} 5%, ${middle as string} 80%, ${start as string} 98%)`,
      }}
    >
      {children}
    </View>
  );
}
