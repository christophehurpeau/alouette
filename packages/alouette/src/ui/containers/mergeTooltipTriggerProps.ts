import type { PressableProps, ViewProps } from "react-native";

/**
 * What the element a `Tooltip` describes spreads onto itself: the description
 * for assistive tech, read whether or not the panel is shown, and on web the
 * hover and focus handlers that open the panel. Spread it last, or merge it
 * with {@link mergeTooltipTriggerProps} to keep the element's own.
 */
export interface TooltipTriggerProps {
  /** Web: the id of the tooltip's description. */
  "aria-describedby"?: string;
  /** Native: the content itself, read after the element's label. */
  accessibilityHint?: string;
  onPointerEnter?: ViewProps["onPointerEnter"];
  onPointerLeave?: ViewProps["onPointerLeave"];
  onFocus?: PressableProps["onFocus"];
  onBlur?: PressableProps["onBlur"];
}

type Handler<Event> = ((event: Event) => void) | null | undefined;

function chainHandlers<Event>(
  own: Handler<Event>,
  tooltip: Handler<Event>,
): Handler<Event> {
  if (!own) return tooltip;
  if (!tooltip) return own;
  return (event) => {
    own(event);
    tooltip(event);
  };
}

function joinDefined(
  separator: string,
  own: string | undefined,
  tooltip: string | undefined,
): string | undefined {
  if (!own) return tooltip;
  if (!tooltip) return own;
  return `${own}${separator}${tooltip}`;
}

/**
 * `props` with `triggerProps` on top, keeping what both set: the descriptions
 * are joined and the handlers both run.
 */
export function mergeTooltipTriggerProps<
  Props extends TooltipTriggerProps,
  TriggerProps extends TooltipTriggerProps,
>(props: Props, triggerProps: TriggerProps): Props & TriggerProps {
  return {
    ...props,
    ...triggerProps,
    "aria-describedby": joinDefined(
      " ",
      props["aria-describedby"],
      triggerProps["aria-describedby"],
    ),
    accessibilityHint: joinDefined(
      ". ",
      props.accessibilityHint,
      triggerProps.accessibilityHint,
    ),
    onPointerEnter: chainHandlers(
      props.onPointerEnter,
      triggerProps.onPointerEnter,
    ),
    onPointerLeave: chainHandlers(
      props.onPointerLeave,
      triggerProps.onPointerLeave,
    ),
    onFocus: chainHandlers(props.onFocus, triggerProps.onFocus),
    onBlur: chainHandlers(props.onBlur, triggerProps.onBlur),
  };
}
