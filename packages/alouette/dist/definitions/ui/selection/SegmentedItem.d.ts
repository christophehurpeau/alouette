import type { ReactNode } from "react";
import { type InteractiveBoxProps } from "../containers/Box";
import { type SVGIconElement } from "../primitives/Icon";
import type { SegmentedOrientation } from "./SelectionContext";
export interface SegmentedItemProps extends Omit<InteractiveBoxProps, "aria-label" | "children" | "className" | "withFocusVisibleOutline"> {
    label: string;
    icon?: SVGIconElement;
    selected: boolean;
    /** Tighter horizontal padding, set by a compact group. */
    compact?: boolean;
    /** Set by a vertical group: the item stretches to the bar's width. */
    orientation?: SegmentedOrientation;
    /**
     * react-native's types have no `aria-current` / `aria-controls` / `href`, but
     * react-native-web forwards all three (an `href` makes it render an `<a>`) and
     * native ignores unknown props — declared here for `NavBarItem` and `Tab`.
     */
    "aria-current"?: "page";
    "aria-controls"?: string;
    href?: string;
}
export declare function SegmentedItem({ label, icon, selected, disabled, compact, orientation, ...props }: SegmentedItemProps): ReactNode;
//# sourceMappingURL=SegmentedItem.d.ts.map