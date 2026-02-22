import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import type { ReactNode } from "react";
import { Box } from "../containers/Box";

const CardFrame = styled(Box, {
  name: "Card",
  shadow: "m",
  borderRadius: "$sm",
  overflow: "hidden",

  variants: {
    withHeader: {
      true: {
        layer: "highlight", // keep background here to make sure inset shadow is visible
      },
      false: {
        layer: "surface",
      },
    },
  },

  defaultVariants: {
    withHeader: false,
  },
});

const CardHeaderFrame = styled(Box, {
  name: "CardHeader",
  padding: "$1.0",

  // same as CardFrame to have proper effect
  borderTopLeftRadius: "$sm",
  borderTopRightRadius: "$sm",
});
const CardFooterFrame = styled(Box, {
  name: "CardFooter",
  layer: "highlight",
  padding: "$1.0",
});

const CardBodyFrame = styled(Box, {
  name: "CardBody",
  padding: "$1.0",

  variants: {
    withHeader: {
      true: {
        layer: "surface",
      },
    },
  },
});

export const Card = CardFrame.styleable<{
  header?: ReactNode;
  footer?: ReactNode;
}>(({ header, footer, children, ...frameProps }) => {
  return (
    <CardFrame {...frameProps} withHeader={!!header}>
      {header ? <CardHeaderFrame>{header}</CardHeaderFrame> : null}

      <CardBodyFrame withHeader={!!header}>{children}</CardBodyFrame>

      {footer ? <CardFooterFrame>{footer}</CardFooterFrame> : null}
    </CardFrame>
  );
});

export type CardProps = GetProps<typeof Card>;
