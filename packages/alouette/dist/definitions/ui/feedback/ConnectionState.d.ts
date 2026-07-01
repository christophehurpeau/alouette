import type { ReactNode } from "react";
export type ConnectionStateStatus = "connected" | "connecting" | "disconnected";
export interface ConnectionStateProps {
    /** Current connection status, or `null` when unknown (renders nothing). */
    state: ConnectionStateStatus | null;
    /** Force the banner off-screen regardless of `state`. */
    forceHidden?: boolean;
    /** Keep the banner on-screen even when `connected` (for demos/showcases). */
    forceVisible?: boolean;
    /** Label shown in the pill (e.g. "Reconnecting…"). */
    children: NonNullable<ReactNode>;
}
/**
 * Thin status banner pinned to the top of the screen. It stays hidden while
 * connected and slides down to surface a red pill when connecting or
 * disconnected. On reconnection it turns green and holds for `connectedHoldMs`
 * so the confirmation is legible, then slides back out.
 */
export declare function ConnectionState({ state, forceHidden, forceVisible, children, }: ConnectionStateProps): ReactNode;
//# sourceMappingURL=ConnectionState.d.ts.map