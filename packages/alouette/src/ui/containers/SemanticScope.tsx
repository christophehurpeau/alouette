import type { ReactNode } from "react";
import { ScopedTheme, useUniwind } from "uniwind";
import type { SemanticRole } from "../../core/AlouetteConfig";

export interface SemanticScopeProps {
  mode?: "dark" | "light";
  semanticRole?: SemanticRole;
  children?: ReactNode;
}

export function SemanticScope({
  mode: forcedMode,
  semanticRole,
  children,
}: SemanticScopeProps): ReactNode {
  const { theme } = useUniwind();
  if (!semanticRole) {
    return children;
  }
  const mode = theme.startsWith("dark") ? "dark" : "light";

  if (forcedMode && forcedMode !== mode) {
    return (
      // we need to set the mode first to initialize the correct shared variables
      <ScopedTheme theme={forcedMode}>
        <ScopedTheme theme={`${forcedMode}_${semanticRole}`}>
          {children}
        </ScopedTheme>
      </ScopedTheme>
    );
  }
  return (
    <ScopedTheme theme={`${mode}_${semanticRole}`}>{children}</ScopedTheme>
  );
}
