import type { ReactNode } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import type { AccentOrNeutral } from "../../core/AlouetteConfig";
import { Box } from "../containers/Box";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";

const badgeVariants = tv(
  {
    slots: {
      frame: "border flex-row items-center self-start rounded-full",
      text: "font-body-bold",
      icon: "",
    },
    variants: {
      size: {
        sm: { frame: "gap-xxs px-xs py-xxs", text: "text-xs", icon: "" },
        md: { frame: "gap-xs px-sm py-xxs", text: "text-sm", icon: "" },
      },
      variant: {
        solid: {
          frame: "bg-emphasis border-emphasis",
          text: "text-on-emphasis",
          icon: "text-on-emphasis",
        },
        "solid.enabled": {
          frame: "bg-enabled border-enabled",
          text: "text-on-accent",
          icon: "text-on-accent",
        },
        outlined: {
          frame: "bg-highlight-accent border-accent",
          text: "text-accent",
          icon: "text-accent",
        },
      },
    },
    defaultVariants: { size: "md", variant: "solid" },
  },
  { twMerge: false },
);

type BadgeVariantProps = VariantProps<typeof badgeVariants>;
type BadgeSize = NonNullable<BadgeVariantProps["size"]>;

const ICON_SIZE: Record<BadgeSize, number> = { sm: 12, md: 16 };

export interface BadgeProps {
  accent?: AccentOrNeutral;
  size?: BadgeSize;
  variant?: BadgeVariantProps["variant"];
  icon?: SVGIconElement;
  children?: ReactNode;
}

export function Badge({
  accent = "brand",
  size = "md",
  variant = "solid",
  icon,
  children,
}: BadgeProps): ReactNode {
  const styles = badgeVariants({ size, variant });
  return (
    <Box accent={accent} className={styles.frame()}>
      {icon ? (
        <Icon icon={icon} size={ICON_SIZE[size]} className={styles.icon()} />
      ) : null}
      <Text className={styles.text()}>{children}</Text>
    </Box>
  );
}
