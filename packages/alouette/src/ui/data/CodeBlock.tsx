import type { ReactNode } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import { Surface } from "../containers/Surface";
import { ScrollView } from "../primitives/ScrollView";
import { Text } from "../primitives/Text";

const codeBlockVariants = tv({
  slots: {
    frame: "gap-xs",
    title: "font-mono text-xs text-muted",
    // web:whitespace-pre so a long line scrolls instead of wrapping; native
    // already keeps the line intact inside the horizontal ScrollView, which
    // gives the Text an unconstrained width.
    code: "font-mono text-sharp select-auto web:whitespace-pre",
  },
  variants: {
    size: {
      sm: { code: "text-xs" },
      md: { code: "text-sm" },
    },
  },
  defaultVariants: { size: "md" },
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
 * `role="code"` renders a `<code>` element on web; native keeps a plain Text.
 */
export function CodeBlock({
  title,
  size,
  className,
  children,
}: CodeBlockProps): ReactNode {
  const styles = codeBlockVariants({ size });
  return (
    <Surface
      variant="lowered"
      size="sm"
      className={styles.frame({ className })}
    >
      {title === undefined ? null : (
        <Text className={styles.title()}>{title}</Text>
      )}
      <ScrollView horizontal>
        <Text role="code" className={styles.code()}>
          {children}
        </Text>
      </ScrollView>
    </Surface>
  );
}
