import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import { forwardRef } from "react";
import type { DistributedOmit } from "type-fest";
import { Typography } from "../typography/Typography";

const Anchor = styled(Typography, {
  tag: "a",
  theme: "primary",
  color: "$interactive.linkTextColor",
  textDecorationLine: "underline",
  cursor: "pointer",

  hoverStyle: {
    color: "$interactive.linkTextColor:hover",
  },
  pressStyle: {
    color: "$interactive.linkTextColor:press",
  },

  variants: {
    subtle: {
      true: {
        textDecorationLine: "none",
      },
    },
  },
});

type AnchorProps = GetProps<typeof Anchor>;

export type LinkProps = DistributedOmit<AnchorProps, "href"> & {
  href: string;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  return <Anchor {...props} ref={ref} />;
});
