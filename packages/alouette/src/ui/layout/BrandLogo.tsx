import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Box } from "../containers/Box";
import { Icon, type SVGIconElement } from "../primitives/Icon";

export interface BrandLogoProps {
  icon: SVGIconElement;
  /** Accent of the disc. Defaults to `brand`. */
  accent?: Accent;
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
