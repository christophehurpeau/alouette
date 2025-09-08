import type { ThemeName } from "@tamagui/core";
import { Theme, useTheme } from "@tamagui/core";
import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { StyleSheet } from "react-native";

export interface GradientBackgroundProps {
  theme?: ThemeName;
  children: ReactNode;
}

export function GradientBackground({
  theme: themeName,
  children,
}: GradientBackgroundProps) {
  const theme = useTheme({ name: themeName });

  const colors = [
    theme["gradientColor:start"]?.get("web"),
    theme["gradientColor:middle"]?.get("web"),
    theme["gradientColor:end"]?.get("web"),
  ] as [string, string, string];

  return (
    <Theme name={themeName}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.2, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      >
        {children}
      </LinearGradient>
    </Theme>
  );
}
