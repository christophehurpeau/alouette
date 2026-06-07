import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
export interface AccentScopeProps {
    mode?: "dark" | "light";
    accent?: Accent;
    children?: ReactNode;
}
export declare function AccentScope({ mode: forcedMode, accent, children, }: AccentScopeProps): ReactNode;
//# sourceMappingURL=AccentScope.d.ts.map