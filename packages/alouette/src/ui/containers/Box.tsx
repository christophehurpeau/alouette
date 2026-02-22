import type { GetProps } from "@tamagui/core";
import { View, styled } from "@tamagui/core";
import type { ComponentType } from "react";
import { useSafeAreaInsets } from "../../core/useSafeAreaInsets";
import * as variants from "./variants";

const BoxFrame = styled(View, {
  // never apply overflow hidden here, as it will break shadows

  flexShrink: 1, // allow to shrink by default, as Box is often used in VSTack and HStack. See button for an example.

  variants,
});

type BoxFrameProps = GetProps<typeof BoxFrame>;

const InteractiveBoxFrame = styled(BoxFrame, {
  interactive: true,
  tabIndex: 0,
  transition: "fast",
  variants: {
    disabled: {
      true: {
        tabIndex: -1 as const,
      },
    },
  },
});

export type BoxProps = Pick<
  BoxFrameProps,
  "absoluteFill" | "children" | "layer" | "shadow"
>;

export const Box: ComponentType<BoxFrameProps> =
  process.env.NODE_ENV !== "production"
    ? (props) => {
        if (
          process.env.NODE_ENV !== "production" &&
          props.shadow === "lowered" &&
          props.layer !== "lowered"
        ) {
          throw new Error(
            'shadow="lowered" must only be used with layer="lowered"',
          );
        }

        return <BoxFrame {...props} />;
      }
    : BoxFrame;

export const InteractiveBox: ComponentType<BoxFrameProps> = InteractiveBoxFrame;

export const SafeAreaBoxFrame = BoxFrame.styleable<{
  padding?: never;
  paddingTop?: never;
  paddingBottom?: never;
  paddingLeft?: never;
  paddingRight?: never;
}>((props) => {
  const insets = useSafeAreaInsets();
  return (
    <Box
      {...props}
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingLeft={insets.left}
      paddingRight={insets.right}
    />
  );
});

type SafeAreaBoxFrameProps = GetProps<typeof SafeAreaBoxFrame>;

export type SafeAreaBoxProps = Pick<
  SafeAreaBoxFrameProps,
  "children" | "layer" | "shadow"
>;

export const SafeAreaBox: ComponentType<SafeAreaBoxProps> = SafeAreaBoxFrame;
