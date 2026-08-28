import {
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type { PopoverProps } from "./Popover";
import { PortalAccentScope } from "./PortalAccentScope";

// Above react-native-web's `Modal`, which positions its own portal at
// `zIndex: 9999` — a popover inside a Modal/AlertDialog would otherwise open
// behind the dialog it belongs to.
const aboveModalClassName = "z-[10000]";

interface AnchorPosition {
  top: number;
  left: number;
  width: number;
}

function readAnchorPosition(anchor: HTMLElement): AnchorPosition {
  const rect = anchor.getBoundingClientRect();
  // Page coordinates rather than viewport ones: the portal lands in `body`, so
  // an absolutely positioned popover then follows the page as it scrolls and
  // only needs recomputing when the anchor itself moves.
  return {
    top: rect.bottom + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
  };
}

export function Popover({
  open,
  onClose,
  anchorRef,
  placement = "center",
  accent,
  "aria-label": ariaLabel,
  children,
}: PopoverProps): ReactNode {
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<AnchorPosition>();

  useLayoutEffect(() => {
    const anchor = anchorRef?.current as HTMLElement | null | undefined;
    if (!open || !anchor) return undefined;
    const update = (): void => {
      setPosition(readAnchorPosition(anchor));
    };
    update();
    // Capture phase, so the popover also follows a nested scroll container
    // between the anchor and the page — those events do not bubble to window.
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [anchorRef, open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };
    const onPointerDown = (event: PointerEvent): void => {
      const target = event.target as Node;
      const anchor = anchorRef?.current as HTMLElement | null | undefined;
      // A press on the anchor is the trigger's own business — closing here
      // would fight the toggle that press is about to run.
      if (contentRef.current?.contains(target) || anchor?.contains(target)) {
        return;
      }
      onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  const content = (
    <PortalAccentScope accent={accent}>{children}</PortalAccentScope>
  );

  if (!anchorRef) {
    // Nothing to measure against: present the overlay native renders, rather
    // than rendering nothing at all. The fill is click-through, so a press
    // outside the content still reaches the page and closes the popover.
    return createPortal(
      <div
        ref={contentRef}
        aria-label={ariaLabel}
        className={`pointer-events-none fixed inset-0 flex flex-col px-xl ${aboveModalClassName} ${
          placement === "top" ? "justify-start pt-xl" : "justify-center"
        }`}
      >
        <div className="pointer-events-auto">{content}</div>
      </div>,
      document.body,
    );
  }

  if (!position) return null;

  return createPortal(
    <div
      ref={contentRef}
      aria-label={ariaLabel}
      className={`absolute ${aboveModalClassName}`}
      style={{ top: position.top, left: position.left, width: position.width }}
    >
      {content}
    </div>,
    document.body,
  );
}
