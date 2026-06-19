import type { ReactNode } from "react";
import { type PressableBoxProps } from "./PressableBox";
export interface PressableListItemProps {
    variant?: PressableBoxProps["variant"];
    accent?: PressableBoxProps["accent"];
    role?: PressableBoxProps["role"];
    children: ReactNode;
    onPress: () => void;
}
export declare function PressableListItem({ variant, role, accent, children, onPress, }: PressableListItemProps): ReactNode;
//# sourceMappingURL=PressableListItem.d.ts.map