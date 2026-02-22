import type { PressableBoxProps } from "alouette";
import type { ReactNode } from "react";
export interface PressableListItemProps {
    theme?: PressableBoxProps["theme"];
    role?: PressableBoxProps["role"];
    variant?: PressableBoxProps["variant"];
    children: ReactNode;
    onPress: () => void;
}
export declare function PressableListItem({ theme, role, children, onPress, }: PressableListItemProps): ReactNode;
//# sourceMappingURL=PressableListItem.d.ts.map