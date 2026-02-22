import type { ThemeProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import type { ReactNode } from "react";
import { Box } from "../containers/Box";

export interface GradientBackgroundProps {
  theme?: ThemeProps["name"];
  children?: ReactNode;
}

export const GradientBackground = styled(Box, {
  absoluteFill: true,
  backgroundImage:
    "linear-gradient(0deg, $bg-screen-gradient-end 5%, $bg-screen-gradient-middle 80%, $bg-screen-gradient-start 98%)",
  position: "absolute", // needed to override "static" position for backgroundImage tamagui
});
