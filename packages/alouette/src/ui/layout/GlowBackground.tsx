import type { ReactNode } from "react";
import { View } from "react-native";
import type { Accent } from "../../core/AlouetteConfig";
import { Box } from "../containers/Box";

export interface GlowBackgroundProps {
  /** Accent of the glow bleeding from the top-left corner. */
  accent: Accent;
  /** Accent of a second, smaller glow from the top-right corner; omitted, there is none. */
  secondaryAccent?: Accent;
}

/**
 * Soft radial glows over the plain screen ground, a lighter alternative to
 * `GradientBackground`'s full-screen wash. `opacity-*` keeps them subtle in
 * both modes without color-mix, which native lacks.
 */
export function GlowBackground({
  accent,
  secondaryAccent,
}: GlowBackgroundProps): ReactNode {
  return (
    <View className="pointer-events-none absolute inset-0 overflow-hidden">
      <Box
        accent={accent}
        className="absolute -top-[260px] -left-[200px] size-[720px] rounded-full bg-radial from-enabled to-transparent to-70% opacity-30"
      />
      {secondaryAccent ? (
        <Box
          accent={secondaryAccent}
          className="absolute -top-[180px] -right-[240px] size-[640px] rounded-full bg-radial from-enabled to-transparent to-70% opacity-20"
        />
      ) : null}
    </View>
  );
}
