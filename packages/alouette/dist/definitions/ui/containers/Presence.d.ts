import { type Key, type ReactElement, type ReactNode } from "react";
export interface PresenceBaseProps {
    /**
     * Identity of the current child. When it changes, the previous child is kept
     * mounted (with `exitClassName`) for `exitDurationMs` so it can animate out
     * while the new child animates in — an AnimatePresence-style swap done with
     * pure CSS animations, no animation library.
     */
    activeKey: Key;
    /** How long to keep the exiting child mounted — match the exit animation. */
    exitDurationMs: number;
    /** Animation class applied to the entering (current) child. */
    enterClassName?: string;
    /** Animation class applied to the exiting (previous) child. */
    exitClassName?: string;
    /** Class applied to every item (e.g. `absolute inset-0` to overlap). */
    className?: string;
}
export interface PresenceListProps {
    /** How long to keep a removed child mounted — match the exit animation. */
    exitDurationMs: number;
    /** Animation class applied to entering children. */
    enterClassName?: string;
    /** Animation class applied to exiting children. */
    exitClassName?: string;
    /** Class applied to every item's wrapper `<View>`. */
    className?: string;
    /**
     * A list of keyed elements — each child must have a stable `key`. Adding a key
     * animates that item in while the others stay put; removing a key animates only
     * that item out.
     */
    children: ReactNode;
}
/**
 * Keyed-list presence (AnimatePresence-style). Renders a list of keyed children,
 * each wrapped in its own `<View>`, and animates individual add/remove: added
 * keys mount with `enterClassName`, removed keys stay mounted with `exitClassName`
 * for `exitDurationMs` before unmounting. For swapping a single child, use
 * {@link PresenceOne}.
 */
export declare function PresenceList({ exitDurationMs, enterClassName, exitClassName, className, children, }: PresenceListProps): ReactNode;
type StyledElement = ReactElement<{
    className?: string;
}>;
export interface PresenceOneProps extends PresenceBaseProps {
    /**
     * A single element that accepts and forwards `className` to its root view.
     * The `className` + enter/exit animation classes are merged onto it directly,
     * so no extra wrapper `<View>` is added to the tree.
     */
    children: StyledElement;
}
/**
 * Keyed-swap presence that merges the animation classes onto the child element
 * itself via `cloneElement` — no wrapper `<View>`. Requires a single element
 * that forwards `className`; for anything else use {@link PresenceList}.
 */
export declare function PresenceOne({ activeKey, exitDurationMs, enterClassName, exitClassName, className, children, }: PresenceOneProps): ReactNode;
export {};
//# sourceMappingURL=Presence.d.ts.map