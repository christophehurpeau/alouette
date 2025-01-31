import type { GetProps } from "@tamagui/core";
import { Text, styled } from "@tamagui/core";
import { createContext, useContext } from "react";

export const Typography = styled(Text, {
  name: "Typography",
  fontFamily: "$body",
  color: "$textColor",
  fontWeight: "$regular",

  variants: {
    size: {
      xl: { fontSize: "$xl", lineHeight: "$xl" },
      lg: { fontSize: "$lg", lineHeight: "$lg" },
      md: { fontSize: "$md", lineHeight: "$md" },
      sm: { fontSize: "$sm", lineHeight: "$sm" },
      xs: { fontSize: "$xs", lineHeight: "$xs" },
    },
    weight: {
      regular: { fontWeight: "$regular" },
      bold: { fontWeight: "$bold" },
      black: { fontWeight: "$black" },
    },
    family: {
      heading: { fontFamily: "$heading" },
      body: { fontFamily: "$body" },
    },
    contrast: {
      true: {
        color: "$contrastTextColor",
      },
      false: {
        color: "$textColor",
      },
    },
  },

  defaultVariants: {
    size: "md",
    weight: "regular",
    family: "body",
  },
} as const);

export type TypographyProps = GetProps<typeof Typography>;

export const TypographyParagraph = styled(Typography, {
  name: "TypographyParagraph",
  tag: "p",
  userSelect: "auto",
  family: "body",
} as const);

export type TypographyParagraphProps = GetProps<typeof TypographyParagraph>;

const TypographySizeContext = createContext<TypographyProps["size"]>(undefined);

export const TypographyWithContext = Typography.styleable(
  ({ size, ...props }, ref) => {
    const ancestorSize = useContext(TypographySizeContext);
    const sizeOrAncestorSizeOrDefaultSize = size || ancestorSize;
    if (sizeOrAncestorSizeOrDefaultSize !== size) {
      return (
        <TypographySizeContext.Provider value={sizeOrAncestorSizeOrDefaultSize}>
          <Typography ref={ref} size={size} {...props} />
        </TypographySizeContext.Provider>
      );
    }
    return <Typography ref={ref} size={size} {...props} />;
  },
);

export const TypographyParagraphWithContext = TypographyParagraph.styleable(
  ({ size, ...props }, ref) => {
    const ancestorSize = useContext(TypographySizeContext);
    const sizeOrAncestorSizeOrDefaultSize = size || ancestorSize;
    return (
      <TypographySizeContext.Provider value={sizeOrAncestorSizeOrDefaultSize}>
        <Typography ref={ref} size={size} {...props} />
      </TypographySizeContext.Provider>
    );
  },
);
