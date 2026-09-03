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

const blockquoteVariants = tv({
  slots: {
    // The accent rule is the whole affordance: no fill, so a quote reads as a
    // quote wherever it sits (screen, Surface, Message).
    frame: "gap-xs border-l-4 border-accent pl-m",
    quote: "text-sharp",
  },
  variants: {
    size: {
      sm: { quote: "text-base" },
      md: { quote: "text-lg" },
    },
  },
  defaultVariants: { size: "md" },
});

type BlockquoteVariantProps = VariantProps<typeof blockquoteVariants>;

export interface BlockquoteProps extends BlockquoteVariantProps {
  /** The quoted text. */
  children?: ReactNode;
  /** Attribution rendered under the quote — usually a `<Citation>`. */
  citation?: ReactNode;
  accent?: Accent;
  className?: string;
}

/**
 * A quoted excerpt, set off by an accent rule on its leading edge.
 *
 * `role="blockquote"` renders a `<blockquote>` element on web; native keeps a
 * plain View.
 */
export function Blockquote({
  children,
  citation,
  accent,
  size,
  className,
}: BlockquoteProps): ReactNode {
  const styles = blockquoteVariants({ size });
  return (
    <Box
      accent={accent}
      role={blockquoteRole}
      className={styles.frame({ className })}
    >
      <Paragraph className={styles.quote()}>{children}</Paragraph>
      {citation}
    </Box>
  );
}
