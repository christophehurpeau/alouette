import type { ReactNode, RefObject } from "react";
import { type View as RNView } from "react-native";
import type { PortalAccentScopeProps } from "./PortalAccentScope";
export interface PopoverProps {
    open: boolean;
    onClose: () => void;
    /**
     * The popover is anchored under this element and matches its width. Native
     * ignores it and presents an overlay instead, because a `Modal` resigns the
     * keyboard of whatever is behind it — an anchored dropdown over a focused
     * input is not something the platform can render. Web falls back to the same
     * overlay when no anchor is given.
     */
    anchorRef?: RefObject<RNView | null>;
    /**
     * Which edge of the anchor the panel lines up with. Anchored web only, like
     * {@link anchorRef} — `end` is what a menu hanging off a small trigger near
     * the right edge needs.
     */
    align?: "end" | "start";
    /**
     * `anchor` (the default) makes the panel as wide as the anchor, which is what
     * a field dropdown wants; `content` lets it size to its own content, for a
     * menu whose trigger is narrower than its items. Anchored web only.
     */
    width?: "anchor" | "content";
    /**
     * Placement of the overlay presentation (native, and web without an anchor).
     * `top` keeps it pinned below the status bar so its first row stays put while
     * its content resizes; `center` (the default) suits content whose height does
     * not change while it is open.
     */
    placement?: "center" | "top";
    accent?: PortalAccentScopeProps["accent"];
    "aria-label"?: string;
    children: ReactNode;
}
/**
 * Renders `children` above everything, outside the clipping of any
 * `overflow-hidden` ancestor (`Surface` is one by design). Web portals into
 * `document.body` and anchors to `anchorRef`; native uses a transparent `Modal`.
 */
export declare function Popover({ open, onClose, placement, accent, "aria-label": ariaLabel, children, }: PopoverProps): ReactNode;
//# sourceMappingURL=Popover.d.ts.map