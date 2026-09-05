import type { ReactNode } from "react";
import type { SVGIconElement } from "../primitives/Icon";
import { type SegmentedItemProps } from "../selection/SegmentedItem";
export interface NavBarItemProps {
    /**
     * Destination, matched against the NavBar's value to mark the item current.
     * Renders a real `<a href>` on web (native ignores it); expo Router's
     * `<Link asChild>` injects it, so it does not have to be written twice.
     */
    href?: string;
    label: string;
    icon?: SVGIconElement;
    /**
     * Replaces `icon` while the item is hovered, focused or pressed, and for as
     * long as it is the current destination — a duotone twin of `icon`, usually.
     */
    activeIcon?: SVGIconElement;
    /** Accent tinting `activeIcon`, so the glyph changes color as well as weight. */
    activeAccent?: SegmentedItemProps["activeAccent"];
    disabled?: boolean;
    /**
     * Handles the press instead of the group's `onValueChange` — this is what
     * `<Link asChild>` injects. A NavBar whose items carry `onPress` must be
     * controlled: its internal value never updates. A handler that navigates on
     * web must call `event.preventDefault()`, as routers do.
     */
    onPress?: SegmentedItemProps["onPress"];
}
export declare function NavBarItem({ href, label, icon, activeIcon, activeAccent, disabled, onPress, }: NavBarItemProps): ReactNode;
//# sourceMappingURL=NavBarItem.d.ts.map