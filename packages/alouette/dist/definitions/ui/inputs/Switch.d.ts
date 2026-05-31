import { type ReactNode } from "react";
import { type SemanticScopeProps } from "../containers/SemanticScope";
export interface SwitchProps {
    semanticRole?: SemanticScopeProps["semanticRole"];
    checked?: boolean;
    disabled?: boolean;
    onValueChange?: (value: boolean) => void;
    "aria-labelledby"?: string;
    testID?: string;
}
export declare function Switch({ semanticRole, ...rest }: SwitchProps): ReactNode;
//# sourceMappingURL=Switch.d.ts.map