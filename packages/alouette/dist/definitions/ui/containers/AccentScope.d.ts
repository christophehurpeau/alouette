import type { ReactNode } from "react";
import type { AccentOrNeutral } from "../../core/AlouetteConfig";
export interface AccentScopeProps {
    mode?: "dark" | "light";
    accent?: AccentOrNeutral;
    children?: ReactNode;
}
export declare function AccentScope({ mode: forcedMode, accent, children, }: AccentScopeProps): ReactNode;
//# sourceMappingURL=AccentScope.d.ts.map