import { type ReactNode } from "react";
import { type AccentScopeProps } from "../containers/AccentScope";
export interface SwitchProps {
    accent?: AccentScopeProps["accent"];
    checked?: boolean;
    disabled?: boolean;
    onValueChange?: (value: boolean) => void;
    "aria-labelledby"?: string;
    testID?: string;
}
export declare function Switch({ accent, ...rest }: SwitchProps): ReactNode;
//# sourceMappingURL=Switch.d.ts.map