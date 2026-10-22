import type { ReactNode } from "react";
import type { ViewProps as RNViewProps } from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { Box } from "../containers/Box";
import { Paragraph } from "../primitives/Text";

// react-native-web turns role="blockquote" into a real <blockquote> element,
// but react-native's own Role union predates those document roles — native
// simply ignores a role it does not know.
const blockquoteRole = "blockquote" as NonNullable<RNViewProps["role"]>;

// The accent rule is the whole affordance: no fill, so a quote reads as a quote
// wherever it sits (screen, surface, Message).
const blockquoteFrame = tv({ base: "gap-xs border-l-4 border-accent pl-m" });

const blockquoteQuote = tv({
  base: "text-sharp",
  variants: {
    size: {
      sm: "text-base",
      md: "text-lg",
    },
  },
  defaultVariants: { size: "md" },
});

export interface BlockquoteFrameProps {
  /**
   * The quoted block content, rendered as is: paragraphs, a list, a
   * `CodeBlock`. A quote that is only text is a `Blockquote`.
   */
  children?: ReactNode;
  /** Attribution rendered under the quote — usually a `<Citation>`. */
  citation?: ReactNode;
  accent?: Accent;
  className?: string;
}

/**
 * The frame of a `Blockquote` around block content, laid out by the caller.
 *
 * `role="blockquote"` renders a `<blockquote>` element on web; native keeps a
 * plain View.
 */
export function BlockquoteFrame({
  children,
  citation,
  accent,
  className,
}: BlockquoteFrameProps): ReactNode {
  return (
    <Box
      accent={accent}
      role={blockquoteRole}
      className={blockquoteFrame({ className })}
    >
      {children}
      {citation}
    </Box>
  );
}

type BlockquoteVariantProps = VariantProps<typeof blockquoteQuote>;

export interface BlockquoteProps
  extends Omit<BlockquoteFrameProps, "children">, BlockquoteVariantProps {
  /** The quoted text: inline content only, it renders a `<p>` on web. */
  children?: ReactNode;
}

/**
 * A quoted excerpt, set off by an accent rule on its leading edge. Its text
 * goes in a `Paragraph`; block content goes in a `BlockquoteFrame` instead.
 */
export function Blockquote({
  children,
  size,
  ...frameProps
}: BlockquoteProps): ReactNode {
  return (
    <BlockquoteFrame {...frameProps}>
      <Paragraph className={blockquoteQuote({ size })}>{children}</Paragraph>
    </BlockquoteFrame>
  );
}
