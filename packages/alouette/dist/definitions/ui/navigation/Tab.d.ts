import type { ReactNode } from "react";
import type { SVGIconElement } from "../primitives/Icon";
import { type SegmentedItemProps } from "../selection/SegmentedItem";
export interface TabProps {
    value: string;
    label: string;
    icon?: SVGIconElement;
    disabled?: boolean;
    "aria-controls"?: string;
    id?: string;
    /**
     * Runs instead of the group's `onValueChange`. Tabs whose items carry
     * `onPress` must be controlled: the internal value never updates.
     */
    onPress?: SegmentedItemProps["onPress"];
}
export declare function Tab({ value, label, icon, disabled, onPress, ...props }: TabProps): ReactNode;
//# sourceMappingURL=Tab.d.ts.map