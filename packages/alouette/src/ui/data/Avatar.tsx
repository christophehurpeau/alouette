import type { ReactNode } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { Box } from "../containers/Box";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";

const avatarVariants = tv({
  slots: {
    frame: "flex-center shrink-0 rounded-full bg-enabled",
    label: "font-body-bold text-on-accent",
  },
  variants: {
    size: {
      sm: { frame: "size-[28px]", label: "text-xs" },
      md: { frame: "size-[32px]", label: "text-sm" },
      lg: { frame: "size-[40px]", label: "text-base" },
    },
  },
  defaultVariants: { size: "md" },
});

type AvatarVariantProps = VariantProps<typeof avatarVariants>;

const avatarIconSize = { sm: 16, md: 18, lg: 22 };

function initialsFromName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.slice(0, 1))
    .join("")
    .toUpperCase();
}

export interface AvatarProps extends AvatarVariantProps {
  /** Rendered as up to two initials, unless {@link icon} replaces them. */
  name?: string;
  icon?: SVGIconElement;
  /** Accent of the disc. Defaults to `brand`. */
  accent?: Accent;
  className?: string;
}

/**
 * Accent disc standing for a person or an account: their initials, or an icon.
 * Display-only — a pressable one is a `PressableBox` wrapped around it.
 */
export function Avatar({
  name,
  icon,
  accent = "brand",
  size,
  className,
}: AvatarProps): ReactNode {
  const styles = avatarVariants({ size });

  return (
    <Box accent={accent} className={styles.frame({ className })}>
      {icon ? (
        <Icon
          icon={icon}
          size={avatarIconSize[size ?? "md"]}
          className="text-on-accent"
        />
      ) : (
        <Text className={styles.label()}>
          {name === undefined ? "" : initialsFromName(name)}
        </Text>
      )}
    </Box>
  );
}
