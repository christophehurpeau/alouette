import type { ReactNode } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import { Box } from "../containers/Box";
import { ScrollView } from "../primitives/ScrollView";
import { Text } from "../primitives/Text";

const codeBlockVariants = tv({
  slots: {
    frame: "surface lowered surface-sm gap-xs",
    title: "font-mono text-xs text-muted",
    code: "font-mono text-sharp select-auto",
  },
  variants: {
    size: {
      sm: { code: "text-xs" },
      md: { code: "text-sm" },
    },
    wrap: {
      // web:whitespace-pre so a long line scrolls instead of wrapping; native
      // already keeps the line intact inside the horizontal ScrollView, which
      // gives the Text an unconstrained width.
      false: { code: "web:whitespace-pre" },
      // wrap-anywhere breaks a token longer than the line (a URL, a path);
      // native Text already breaks it.
      true: { code: "web:whitespace-pre-wrap web:wrap-anywhere" },
    },
  },
  defaultVariants: { size: "md", wrap: false },
});

type CodeBlockVariantProps = VariantProps<typeof codeBlockVariants>;

export interface CodeBlockProps extends CodeBlockVariantProps {
  /** Label above the code — typically a file name or a language. */
  title?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/**
 * A block of code on the lowered layer: an inset track holding mono text that
 * scrolls horizontally rather than wrapping. Display-only — never wrap it in a
 * pressable to make it copyable, put an IconButton beside it instead.
 *
 * `wrap` wraps long lines instead, for content read end to end rather than
 * scanned by column — a shell command. Line breaks and indentation are kept.
 *
 * `role="code"` renders a `<code>` element on web; native keeps a plain Text.
 */
export function CodeBlock({
  title,
  size,
  wrap = false,
  className,
  children,
}: CodeBlockProps): ReactNode {
  const styles = codeBlockVariants({ size, wrap });
  const code = (
    <Text role="code" className={styles.code()}>
      {children}
    </Text>
  );
  return (
    <Box className={styles.frame({ className })}>
      {title === undefined ? null : (
        <Text className={styles.title()}>{title}</Text>
      )}
      {wrap ? code : <ScrollView horizontal>{code}</ScrollView>}
    </Box>
  );
}
