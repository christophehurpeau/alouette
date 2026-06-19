import { type ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
export interface SwitchProps {
    accent?: Accent;
    checked?: boolean;
    disabled?: boolean;
    forceStyle?: "focus" | "hover" | "press";
    onValueChange?: (value: boolean) => void;
    "aria-labelledby"?: string;
    testID?: string;
}
export declare function Switch({ accent, ...rest }: SwitchProps): ReactNode;
//# sourceMappingURL=Switch.web.d.ts.map