import type { ReactNode } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import {
  type ExternalOpenLinkBehavior,
  defaultExternalOpenLinkBehavior,
} from "../../expo/ExternalLink.shared";
import { ExternalLinkText } from "../actions/ExternalLinkText";
import { Box } from "../containers/Box";
import { Text } from "../primitives/Text";

const citationVariants = tv({
  slots: {
    frame: "flex-row items-center gap-xxs",
    text: "text-muted select-auto",
  },
  variants: {
    size: {
      sm: { text: "text-xs" },
      md: { text: "text-sm" },
    },
  },
  defaultVariants: { size: "md" },
});

type CitationVariantProps = VariantProps<typeof citationVariants>;

export interface CitationProps extends CitationVariantProps {
  /** The source being credited — an author, a work, a publication. */
  children?: ReactNode;
  /** When set, the source is rendered as a link to it. */
  href?: string;
  /** How the link opens. Defaults to an in-app browser sheet / a new tab. */
  openLinkBehavior?: ExternalOpenLinkBehavior;
  accent?: Accent;
  className?: string;
}

/**
 * Attribution for a quote or an excerpt: an em dash followed by the source,
 * optionally linked. Pass it to `Blockquote`'s `citation` prop, or render it
 * under any excerpt that needs crediting.
 */
export function Citation({
  children,
  href,
  openLinkBehavior = defaultExternalOpenLinkBehavior,
  accent,
  size,
  className,
}: CitationProps): ReactNode {
  const styles = citationVariants({ size });
  return (
    <Box accent={accent} className={styles.frame({ className })}>
      <Text className={styles.text()}>—</Text>
      {href === undefined ? (
        <Text className={styles.text()}>{children}</Text>
      ) : (
        <ExternalLinkText
          href={href}
          openLinkBehavior={openLinkBehavior}
          size="sm"
          text={children}
        />
      )}
    </Box>
  );
}
