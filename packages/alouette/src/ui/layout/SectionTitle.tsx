import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { tv } from "../../core/tv";
import { AccentScope } from "../containers/AccentScope";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";

const sectionTitleVariants = tv({
  slots: {
    frame: "flex-row items-center gap-xs",
    icon: "text-muted",
    title: "font-heading-bold text-lg",
  },
  variants: {
    accented: {
      true: { icon: "text-accent", title: "text-accent" },
      false: {},
    },
  },
  defaultVariants: { accented: false },
});

export interface SectionTitleProps {
  children: string;
  /** Rendered before the title, in the accent's ink or muted without one. */
  icon?: SVGIconElement;
  /** Tints the icon and the title. */
  accent?: Accent;
  /** Heading level announced to assistive tech (an `<h2>` on web by default). */
  level?: 2 | 3 | 4 | 5 | 6;
  className?: string;
}

/**
 * The heading of a section of the screen, standing on the screen ground with no
 * material of its own: above a list of pressable rows, which are raised on
 * their own, or above a group of cards.
 */
export function SectionTitle({
  children,
  icon,
  accent,
  level = 2,
  className,
}: SectionTitleProps): ReactNode {
  const styles = sectionTitleVariants({ accented: accent !== undefined });

  return (
    <AccentScope accent={accent}>
      <View className={styles.frame({ className })}>
        {icon ? <Icon icon={icon} size={20} className={styles.icon()} /> : null}
        <Text role="heading" aria-level={level} className={styles.title()}>
          {children}
        </Text>
      </View>
    </AccentScope>
  );
}
