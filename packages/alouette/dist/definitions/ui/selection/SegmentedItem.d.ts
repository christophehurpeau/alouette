import type { ReactNode } from "react";
import type { AccentScopeProps } from "../containers/AccentScope";
import { type InteractiveBoxProps } from "../containers/Box";
import { type SVGIconElement } from "../primitives/Icon";
import type { SegmentedOrientation, SegmentedVariant } from "./SelectionContext";
export interface SegmentedItemProps extends Omit<InteractiveBoxProps, "aria-label" | "children" | "className" | "withFocusVisibleOutline"> {
    label: string;
    icon?: SVGIconElement;
    /**
     * Replaces `icon` while the item is hovered, focused or pressed, and for as
     * long as it is selected.
     */
    activeIcon?: SVGIconElement;
    /** Accent tinting `activeIcon`, so the glyph changes color as well as weight. */
    activeAccent?: AccentScopeProps["accent"];
    /**
     * Badge glyph pinned over the chip's top-right, in the foreground's own
     * color: a secondary state the item's `label` spells out (following the
     * system, unread changes). It adds to `icon`, it never replaces it, and it
     * renders in `variant="icon"` only — a text chip has no room for it.
     */
    indicator?: SVGIconElement;
    selected: boolean;
    /** Tighter horizontal padding, set by a compact group. */
    compact?: boolean;
    /** Set by a vertical group: the item stretches to the bar's width. */
    orientation?: SegmentedOrientation;
    /** Set by a stretched group: the item takes an equal share of the bar. */
    stretch?: boolean;
    /**
     * Set by the group. `icon` hides the label — it stays the accessible name —
     * so an item in an icon group must carry an `icon` to render anything.
     */
    variant?: SegmentedVariant;
    /**
     * react-native's types have no `aria-current` / `aria-controls` / `href`, but
     * react-native-web forwards all three (an `href` makes it render an `<a>`) and
     * native ignores unknown props — declared here for `NavBarItem` and `Tab`.
     */
    "aria-current"?: "page";
    "aria-controls"?: string;
    href?: string;
}
export declare function SegmentedItem({ label, icon, activeIcon, activeAccent, indicator, selected, disabled, compact, orientation, stretch, variant, ...props }: SegmentedItemProps): ReactNode;
//# sourceMappingURL=SegmentedItem.d.ts.map