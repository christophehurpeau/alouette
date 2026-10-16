import { VariableContextProvider } from "nativewind";
import type { ReactNode } from "react";
import type { Density } from "../../controlSizes";
import { densityVariables } from "../../controlSizes";
import { DensityContext } from "../../core/DensityContext";

export interface DensityScopeProps {
  /**
   * `comfortable` keeps every control at the 44px touch target. `compact`
   * (32px) is for an interface driven by a mouse or a trackpad only: below 44px
   * a control is no longer a comfortable touch target.
   */
  density: Density;
  children?: ReactNode;
}

/**
 * Sets the size of every control in its subtree, by swapping the
 * `--spacing-control-*` tokens: pushed through NativeWind's
 * `VariableContextProvider` here, a `.density-*` class on web (see
 * `DensityScope.web.tsx`). Nests: the nearest scope wins.
 */
export function DensityScope({
  density,
  children,
}: DensityScopeProps): ReactNode {
  return (
    <DensityContext.Provider value={density}>
      <VariableContextProvider value={densityVariables[density]}>
        {children}
      </VariableContextProvider>
    </DensityContext.Provider>
  );
}
