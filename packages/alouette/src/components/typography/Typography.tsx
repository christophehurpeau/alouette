import type { GetProps } from "@tamagui/core";
import { Text, styled } from "@tamagui/core";

export const Typography = styled(Text, {
  name: "Typography",
  fontFamily: "$body",
  color: "$textColor",

  variants: {
    inherit: {
      false: {
        size: "$md",
        weight: "$regular",
        family: "$body",
      },
    },
    size: {
      "...fontSize": (size) => ({
        fontSize: size,
        lineHeight: size,
      }),
    },
    weight: {
      $regular: { fontWeight: "$regular" },
      $bold: { fontWeight: "$bold" },
      $black: { fontWeight: "$black" },
    },
    family: {
      $heading: { fontFamily: "$heading" },
      $body: { fontFamily: "$body" },
    },
    accent: {
      true: {
        color: "$accentTextColor",
      },
    },
    disabled: {
      true: {
        color: "$textColor:disabled",
      },
    },
  },

  defaultVariants: {
    inherit: false,
    // contrast: false,
  },
} as const);

export type TypographyProps = GetProps<typeof Typography>;

export const TypographyParagraph = styled(Typography, {
  name: "TypographyParagraph",
  tag: "p",
  userSelect: "auto",
  family: "$body",
} as const);

export type TypographyParagraphProps = GetProps<typeof TypographyParagraph>;
