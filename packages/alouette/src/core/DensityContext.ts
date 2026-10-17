import { createContext, useContext } from "react";
import type { Density } from "../controlSizes";

/** Set by `DensityScope`; `comfortable` outside one. */
export const DensityContext = createContext<Density>("comfortable");

/**
 * The nearest `DensityScope`'s density. The control sizes already follow it
 * through the `--spacing-control-*` tokens; read this for a dimension set from
 * JS (a glyph or a spinner sized to the control, `controlHeightsPx`).
 */
export function useDensity(): Density {
  return useContext(DensityContext);
}
