import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { type SVGIconElement } from "../primitives/Icon";
export interface BrandLogoProps {
    icon: SVGIconElement;
    /** Accent of the disc. Defaults to `brand`. */
    accent?: Accent;
}
/** Product mark: an icon on an accent disc, for an `AppHeaderBrand`. */
export declare function BrandLogo({ icon, accent, }: BrandLogoProps): ReactNode;
//# sourceMappingURL=BrandLogo.d.ts.map