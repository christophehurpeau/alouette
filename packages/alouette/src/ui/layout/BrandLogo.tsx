import type { ReactNode } from "react";
import type { AccentOrNeutral } from "../../core/AlouetteConfig";
import { Box } from "../containers/Box";
import { Icon, type SVGIconElement } from "../primitives/Icon";

export interface BrandLogoProps {
  icon: SVGIconElement;
  /**
   * Accent of the disc. Defaults to `brand`. Over a ground of the same accent
   * (a `bg-highlight-accent` hero), pass `neutral`: the brand disc is two steps
   * off that ground in dark mode, the neutral one is its opposite end.
   */
  accent?: AccentOrNeutral;
}

/** Product mark: an icon on an accent disc, for an `AppHeaderBrand`. */
export function BrandLogo({
  icon,
  accent = "brand",
}: BrandLogoProps): ReactNode {
  return (
    <Box
      accent={accent}
      // `shrink-0` cancels `Box`'s own `shrink`, so the disc keeps its size.
      className="flex-center shrink-0 size-[32px] rounded-full bg-enabled"
    >
      <Icon icon={icon} size={22} className="text-on-accent" />
    </Box>
  );
}
