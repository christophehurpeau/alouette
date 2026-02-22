import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import { InteractiveBox } from "../containers/Box";

export const PressableBox = styled(InteractiveBox, {
  role: "button",
  overflow: "hidden",

  withFocusVisibleOutline: true,

  variants: {
    variant: {
      contained: {
        withBackground: "interactive",
        shadow: "s",
        borderRadius: "$sm",
      },
      outlined: {
        // withBackground: "highlight",
        withBorder: 1,
      },
      "ghost-contained": {
        withBackground: "interactive",
        backgroundColor: "transparent",
      },
      "ghost-outlined": {
        // withBackground: "surface",
        withBorder: 1,
        backgroundColor: "transparent",
        borderColor: "transparent",
      },
    },
  } as const,

  defaultVariants: {
    variant: "contained",
  },
});

export type PressableBoxProps = GetProps<typeof PressableBox>;
