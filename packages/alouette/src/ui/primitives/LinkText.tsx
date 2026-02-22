import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import type { FunctionComponent } from "react";
import { TextStyled } from "./Text";

const LinkTextStyled = styled(TextStyled, {
  render: "a",
  theme: "brand",
  color: "$interactive.linkTextColor",
  textDecorationLine: "underline",
  cursor: "pointer",

  hoverStyle: {
    color: "$interactive.linkTextColor:hover",
  },
  pressStyle: {
    color: "$interactive.linkTextColor:press",
  },

  focusVisibleStyle: {
    outlineColor: "$interactive.link.outline:focus",
    outlineWidth: 2,
    outlineStyle: "solid",
    outlineOffset: 2,
  },

  disabledStyle: {
    color: "$interactive.linkTextColor:disabled",
    cursor: "not-allowed",
  },

  variants: {
    subtle: {
      true: {
        textDecorationLine: "none",
      },
    },
  } as const,
});

export type LinkTextProps = Pick<
  GetProps<typeof LinkTextStyled>,
  "children" | "disabled" | "subtle" | "theme" | "tint"
>;

export const LinkText: FunctionComponent<LinkTextProps> = LinkTextStyled;
