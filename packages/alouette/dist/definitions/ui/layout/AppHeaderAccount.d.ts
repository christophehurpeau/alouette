import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { type SVGIconElement } from "../primitives/Icon";
export interface AppHeaderAccountProps {
    /** Account name: drives the initials and labels the trigger. */
    name: string;
    /** Replaces the initials in the disc. */
    icon?: SVGIconElement;
    /** Accent of the disc. Defaults to `brand`. */
    accent?: Accent;
    /** Rendered above the items — typically the signed-in identity. */
    header?: ReactNode;
    /** `MenuItem`s, and `Separator`s between groups. */
    children: ReactNode;
}
/**
 * End slot of an `AppHeader`: the signed-in account, as one avatar trigger
 * opening a menu. Session actions belong in there rather than in the bar —
 * logging out is the rarest thing a header offers and the only destructive one.
 */
export declare function AppHeaderAccount({ name, icon, accent, header, children, }: AppHeaderAccountProps): ReactNode;
//# sourceMappingURL=AppHeaderAccount.d.ts.map