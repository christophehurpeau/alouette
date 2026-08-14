import type { ReactNode } from "react";
export interface RadioIndicatorProps {
    selected: boolean;
    disabled?: boolean;
    /** Set on a filled surface (accent, or the disabled fill), where the accent
     * dot and the outlined tokens have no contrast. */
    onAccent?: boolean;
}
/**
 * Circle-dot indicator shared by Radio and RadioCard. Its hover/active colors
 * are driven by the `group` on the pressable row that contains it.
 */
export declare function RadioIndicator({ selected, disabled, onAccent, }: RadioIndicatorProps): ReactNode;
//# sourceMappingURL=RadioIndicator.d.ts.map