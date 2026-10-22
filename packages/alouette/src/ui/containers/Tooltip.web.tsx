import {
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import type { View as RNView } from "react-native";
import { tv } from "../../core/tv";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Popover } from "./Popover";
import type { TooltipProps } from "./Tooltip";
import type { TooltipTriggerProps } from "./mergeTooltipTriggerProps";

// Long enough to cross the gap between the trigger and the panel, so the
// pointer can move onto the panel without closing it (WCAG 1.4.13).
const hoverEndDelayMs = 100;
// Matches the panel's `max-w-[280px]`.
const panelMaxWidth = 280;
// Below this much room above the trigger, the panel opens under it instead.
const minSpaceAbove = 120;

const tooltipPanelVariants = tv({
  base: "surface-popover max-w-[280px]",
  variants: {
    side: {
      top: "mb-xxs",
      bottom: "mt-xxs",
    },
  },
});

interface Placement {
  side: "bottom" | "top";
  align: "end" | "start";
}

function placementFor(trigger: HTMLElement): Placement {
  const rect = trigger.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  return {
    side: rect.top < minSpaceAbove && spaceBelow > rect.top ? "bottom" : "top",
    align: rect.left + panelMaxWidth > window.innerWidth ? "end" : "start",
  };
}

function subscribeNever(): () => void {
  return () => {};
}

// The description is portaled into `body`, which the server cannot render:
// it is added once hydrated.
function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}

export function Tooltip({ content, render }: TooltipProps): ReactNode {
  const descriptionId = useId();
  const isClient = useIsClient();
  const anchorRef = useRef<HTMLElement | null>(null);
  const hoverEndTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [placement, setPlacement] = useState<Placement>({
    side: "top",
    align: "start",
  });

  useEffect(() => {
    return () => {
      clearTimeout(hoverEndTimerRef.current);
    };
  }, []);

  const close = useCallback(() => {
    clearTimeout(hoverEndTimerRef.current);
    setHovered(false);
    setFocused(false);
  }, []);

  function cancelHoverEnd(): void {
    clearTimeout(hoverEndTimerRef.current);
  }

  function scheduleHoverEnd(): void {
    clearTimeout(hoverEndTimerRef.current);
    hoverEndTimerRef.current = setTimeout(() => {
      setHovered(false);
    }, hoverEndDelayMs);
  }

  function anchorTo(trigger: HTMLElement): void {
    cancelHoverEnd();
    anchorRef.current = trigger;
    setPlacement(placementFor(trigger));
  }

  // The handlers sit on the trigger itself rather than on a wrapper: no box
  // added to the layout, and React does not route to them the events of a
  // portal the trigger's parent renders (a `Menu`'s panel). react-native-web
  // hands the DOM event through, hence the casts.
  const triggerProps: TooltipTriggerProps = content
    ? {
        "aria-describedby": descriptionId,
        onPointerEnter: (event) => {
          const { pointerType, currentTarget } =
            event as unknown as PointerEvent<HTMLElement>;
          // A tap fires enter and leave around itself: the panel would flash.
          if (pointerType === "touch") return;
          anchorTo(currentTarget);
          setHovered(true);
        },
        onPointerLeave: scheduleHoverEnd,
        onFocus: (event) => {
          const { currentTarget } = event as unknown as FocusEvent<HTMLElement>;
          // A click leaves the focus behind: only the keyboard focus shows it.
          if (!currentTarget.matches(":focus-visible")) return;
          anchorTo(currentTarget);
          setFocused(true);
        },
        onBlur: () => {
          setFocused(false);
        },
      }
    : {};

  return (
    <>
      {render(triggerProps)}
      {/* Always in the DOM so the description resolves while the panel is
          closed; `hidden` still counts for `aria-describedby`. In `body`, so
          the trigger's parent keeps its children as they were. */}
      {content && isClient
        ? createPortal(
            <span hidden id={descriptionId}>
              {content}
            </span>,
            document.body,
          )
        : null}
      {content ? (
        <Popover
          open={hovered || focused}
          side={placement.side}
          align={placement.align}
          width="content"
          anchorRef={anchorRef as RefObject<RNView | null>}
          onClose={close}
        >
          {/* The trigger already carries the content as its description: the
              panel is its visual twin, hidden so it is not read twice. */}
          <View
            aria-hidden
            role="tooltip"
            className={tooltipPanelVariants({ side: placement.side })}
            onPointerEnter={cancelHoverEnd}
            onPointerLeave={scheduleHoverEnd}
          >
            <Text className="text-sm">{content}</Text>
          </View>
        </Popover>
      ) : null}
    </>
  );
}
