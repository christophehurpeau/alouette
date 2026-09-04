import type { ReactNode } from "react";
import { type HStackProps } from "../stacks/stacks";
export interface AppHeaderActionsProps extends HStackProps {
    children: ReactNode;
}
/**
 * End slot of an `AppHeader`: session controls, notifications, a settings
 * button. The header aligns the slot itself, so this only spaces its children.
 */
export declare function AppHeaderActions({ className, ...props }: AppHeaderActionsProps): ReactNode;
//# sourceMappingURL=AppHeaderActions.d.ts.map