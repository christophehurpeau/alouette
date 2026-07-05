import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";

export type ConnectionStateStatus = "connected" | "connecting" | "disconnected";

// How long the green "connected" pill stays fully visible before sliding out.
const connectedHoldMs = 1200;

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
export function ConnectionState({
  state,
  forceHidden,
  forceVisible,
  children,
}: ConnectionStateProps): ReactNode {
  const connected = state === "connected";

  // While `connected`, keep the pill visible for a pause, then slide it out.
  const [hideAfterHold, setHideAfterHold] = useState(false);
  useEffect(() => {
    if (!connected || forceVisible) {
      setHideAfterHold(false);
      return undefined;
    }
    const timer = setTimeout(() => {
      setHideAfterHold(true);
    }, connectedHoldMs);
    return () => {
      clearTimeout(timer);
    };
  }, [connected, forceVisible]);

  const hidden =
    forceHidden || (!forceVisible && (!state || (connected && hideAfterHold)));
  const accent: Accent = connected ? "success" : "danger";

  return (
    <AccentScope accent={accent}>
      <View
        className={`absolute inset-x-0 top-0 z-9 h-0.5 bg-interactive-contained-pressable shadow-m transition-transform duration-slide ease-in-out ${hidden ? "-translate-y-6" : "translate-y-0"}`}
      >
        {state ? (
          <Text className="absolute left-1/2 top-0.5 h-5.5 w-50 -translate-x-1/2 rounded-b-sm bg-interactive-contained-pressable text-center leading-5.5 text-on-accent transition-colors duration-fast">
            {children}
          </Text>
        ) : null}
      </View>
    </AccentScope>
  );
}
