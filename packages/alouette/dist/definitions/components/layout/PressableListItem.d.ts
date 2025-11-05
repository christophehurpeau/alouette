import type { PressableBoxProps } from "alouette";
import type { ReactNode } from "react";
export interface PressableListItemProps {
    theme?: PressableBoxProps["theme"];
    variant?: PressableBoxProps["variant"];
    borderRadius?: PressableBoxProps["borderRadius"];
    withBackground?: PressableBoxProps["withBackground"];
    role?: PressableBoxProps["role"];
    children: ReactNode;
    onPress: () => void;
}
export declare function PressableListItem({ theme, variant, withBackground, borderRadius, role, children, onPress, }: PressableListItemProps): ReactNode;
//# sourceMappingURL=PressableListItem.d.ts.map