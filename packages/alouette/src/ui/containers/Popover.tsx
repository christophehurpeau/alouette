import type { ReactNode, RefObject } from "react";
import { Modal, Pressable, type View as RNView } from "react-native";
import { SafeAreaProvider } from "../../core/SafeAreaProvider";
import { useSafeAreaInsets } from "../../core/useSafeAreaInsets";
import { View } from "../primitives/View";
import type { PortalAccentScopeProps } from "./PortalAccentScope";
import { PortalAccentScope } from "./PortalAccentScope";

// Gap between the status bar / notch and the first row of a `top` popover. The
// inset itself is a device value read at runtime, so it cannot be a `pt-*`.
const statusBarGap = 8; // spacing-xs

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

interface PopoverOverlayProps extends Pick<
  PopoverProps,
  "aria-label" | "children" | "onClose"
> {
  placement: "center" | "top";
}

// Split out of `Popover` so the insets are read *under* the Modal's own
// SafeAreaProvider — see the comment on it below.
function PopoverOverlay({
  placement,
  "aria-label": ariaLabel,
  onClose,
  children,
}: PopoverOverlayProps): ReactNode {
  const insets = useSafeAreaInsets();
  return (
    <View
      className={
        placement === "top"
          ? "flex-1 justify-start px-xl"
          : "flex-1 justify-center px-xl"
      }
      style={
        placement === "top"
          ? { paddingTop: insets.top + statusBarGap }
          : undefined
      }
    >
      {/* Backdrop is an absolutely-filled sibling behind the content, so it
          catches outside presses without wrapping it — a `Pressable` around
          the content is `accessible` by default and would collapse the whole
          popover into one element for assistive tech (the listbox rows, the
          sheet's input). aria-hidden + focusable={false} keep this dismiss
          target out of the accessibility tree and the tab order. */}
      <Pressable
        aria-hidden
        focusable={false}
        className="absolute inset-0 bg-translucent"
        onPress={onClose}
      />
      <View aria-label={ariaLabel} className="w-full">
        {children}
      </View>
    </View>
  );
}

/**
 * Renders `children` above everything, outside the clipping of any
 * `overflow-hidden` ancestor (`Surface` is one by design). Web portals into
 * `document.body` and anchors to `anchorRef`; native uses a transparent `Modal`.
 */
export function Popover({
  open,
  onClose,
  placement = "center",
  accent,
  "aria-label": ariaLabel,
  children,
}: PopoverProps): ReactNode {
  return (
    <Modal
      transparent
      visible={open}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* A Modal is its own window: insets measured by an app-level provider
          describe the app's view, not this overlay — they are wrong whenever
          that provider is itself inset (the on-device Storybook renders the
          story below its own header, so it reports top: 0) and on Android,
          where the modal window has its own insets. A provider nested inside
          the Modal measures the overlay itself. It seeds from the parent
          insets, so there is no unmeasured first frame. */}
      <SafeAreaProvider>
        <PortalAccentScope accent={accent}>
          <PopoverOverlay
            placement={placement}
            aria-label={ariaLabel}
            onClose={onClose}
          >
            {children}
          </PopoverOverlay>
        </PortalAccentScope>
      </SafeAreaProvider>
    </Modal>
  );
}
