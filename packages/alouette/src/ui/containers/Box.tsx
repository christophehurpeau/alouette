import type { GetProps } from "@tamagui/core";
import { View, styled } from "@tamagui/core";
import { useSafeAreaInsets } from "../../core/useSafeAreaInsets";
import * as variants from "./variants";

const BoxFrame = styled(View, {
  // never apply overflow hidden here, as it will break shadows

  flexShrink: 1, // allow to shrink by default, as Box is often used in VSTack and HStack. See button for an example.

  variants,
});

export type BoxProps = GetProps<typeof BoxFrame>;

export const Box =
  process.env.NODE_ENV !== "production"
    ? BoxFrame.styleable((props) => {
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
      })
    : BoxFrame;

export const InteractiveBox = styled(BoxFrame, {
  interactive: true,
  tabIndex: 0,
  transition: "fast",
  variants: {
    disabled: {
      true: {
        tabIndex: -1 as const,
      },
    },
  } as const,
});

export type InteractiveBoxProps = GetProps<typeof InteractiveBox>;

export const SafeAreaBox = BoxFrame.styleable<{
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

export type SafeAreaBoxProps = GetProps<typeof SafeAreaBox>;
