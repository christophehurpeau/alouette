import type { ReactNode } from "react";
import { DensityContext } from "../../core/DensityContext";
import type { DensityScopeProps } from "./DensityScope";

export function DensityScope({
  density,
  children,
}: DensityScopeProps): ReactNode {
  return (
    <DensityContext value={density}>
      <div className={`density-${density}`} style={{ display: "contents" }}>
        {children}
      </div>
    </DensityContext>
  );
}
