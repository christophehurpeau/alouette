import type { ReactNode } from "react";
import type { SemanticRole } from "../../core/AlouetteConfig";
export interface SemanticScopeProps {
    mode?: "dark" | "light";
    semanticRole?: SemanticRole;
    children?: ReactNode;
}
export declare function SemanticScope({ mode: forcedMode, semanticRole, children, }: SemanticScopeProps): ReactNode;
//# sourceMappingURL=SemanticScope.d.ts.map