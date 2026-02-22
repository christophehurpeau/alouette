import type { GetProps } from "@tamagui/core";
import { Text as CoreText, styled } from "@tamagui/core";
import type { FunctionComponent } from "react";

export const TextStyled = styled(CoreText, {
  variants: {
    inherit: {
      false: {
        size: "$md",
        weight: "$regular",
        fontFamily: "$body",
        tint: "sharp",
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
      $extraBold: { fontWeight: "$extraBold" },
    },
    family: {
      $heading: { fontFamily: "$heading" },
      $body: { fontFamily: "$body" },
      "$body-monospace": { fontFamily: "$body-monospace" },
    },
    tint: {
      sharp: {
        color: "$text-sharp",

        disabledStyle: {
          color: "$text-disabled-muted",
        },
      },
      muted: {
        color: "$text-muted",

        disabledStyle: {
          color: "$text-disabled-muted",
        },
      },
      accent: {
        color: "$text-accent",
      },
      onAccent: {
        color: "$text-onAccent",
      },
    },
    disabledSharp: {
      true: {
        disabledStyle: {
          color: "$text-disabled-sharp",
        },
      },
    },
  },

  defaultVariants: {
    inherit: false,
  },
} as const);

export type TextProps = Pick<
  GetProps<typeof TextStyled>,
  | "children"
  | "disabledSharp"
  | "family"
  | "inherit"
  | "numberOfLines"
  | "size"
  | "textAlign"
  | "theme"
  | "tint"
  | "weight"
>;
export const Text: FunctionComponent<TextProps> = TextStyled;

const ParagraphStyled = styled(TextStyled, {
  render: "p",
  userSelect: "auto",
  inherit: false,
});

export type ParagraphProps = Pick<
  GetProps<typeof ParagraphStyled>,
  "children" | "size" | "theme" | "tint"
>;

export const Paragraph: FunctionComponent<ParagraphProps> = ParagraphStyled;
