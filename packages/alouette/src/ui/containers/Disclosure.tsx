import { CaretRightRegularIcon } from "alouette-icons/phosphor-icons/CaretRight";
import { type ReactNode, useId, useState } from "react";
import type { VariantProps } from "tailwind-variants";
import { animationDurationsMs } from "../../animationDurationsMs";
import { tv } from "../../core/tv";
import { useControllableChecked } from "../../core/useControllableChecked";
import { PressableBox } from "../actions/PressableBox";
import { Icon } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { PresenceList } from "./Presence";

const disclosureVariants = tv({
  slots: {
    root: "",
    trigger: "flex-row items-center gap-xs self-start rounded-sm px-xs",
    // Icon reads only the tint from its className, so the rotation sits on a
    // wrapping view.
    caretFrame: "transition-transform duration-disclose ease-in-out",
    caret: "",
    label: "text-sm text-muted",
    // Clips for the height animation, and carries no padding: a box cannot
    // be shorter than its padding, so the height would start and end on it.
    clip: "overflow-hidden",
    // The sides leave room inside the clip for the shadow and focus ring of a
    // surface in the content.
    content: "pr-xs pt-xxs pb-sm",
  },
  variants: {
    size: {
      sm: { trigger: "py-xxs" },
      md: { trigger: "min-h-control-md" },
    },
    // Both line the content up with the label, past the trigger's padding,
    // caret and gap (8 + 16 + 8); the guide is drawn under the caret's center.
    guide: {
      true: { content: "ml-[15px] border-l border-border-muted pl-md" },
      false: { content: "pl-xl" },
    },
    expanded: {
      true: { caretFrame: "rotate-90" },
      false: { caretFrame: "rotate-0" },
    },
    disabled: {
      true: { caret: "text-disabled-muted" },
      false: { caret: "text-muted" },
    },
  },
  defaultVariants: {
    size: "md",
    guide: false,
    expanded: false,
    disabled: false,
  },
});

type DisclosureVariantProps = VariantProps<typeof disclosureVariants>;

export interface DisclosureProps {
  /**
   * The trigger's text, which stays visible in both states. Inline text
   * content only — strings and nested `Text` / `Code` runs — as it renders
   * inside a `Text` and names the trigger: never a link or another pressable
   * (an interactive element inside a button). Content without text needs an
   * `aria-label`.
   */
  label: ReactNode;
  /**
   * Classes for the label's `Text`, which defaults to `text-sm text-muted`.
   * The disabled color is applied after them, so a color set here still dims.
   */
  labelClassName?: string;
  /** Accessible name of the trigger, when its label carries no text. */
  "aria-label"?: string;
  /**
   * `"md"` (default) holds the trigger at the control height (the 44px touch
   * target). `"sm"` sizes it to a line of text, for a disclosure inside running
   * content (a markdown `<details>`), like a text link: a line plus its
   * padding still clears the 24px of WCAG 2.5.8.
   */
  size?: DisclosureVariantProps["size"];
  /**
   * Draws a line down the content's leading edge, under the caret, to show
   * where long or nested content ends. Leave it off when the content is a
   * surface, whose own edge already frames it.
   */
  guide?: boolean;
  children: ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * A caret row that shows or hides the content below it — the WAI-ARIA
 * disclosure pattern. The content mounts only while expanded and animates with
 * the `disclose-*` tokens.
 */
export function Disclosure({
  label,
  labelClassName,
  "aria-label": ariaLabel,
  size,
  guide,
  children,
  expanded: controlledExpanded,
  defaultExpanded,
  onExpandedChange,
  disabled = false,
  className,
}: DisclosureProps): ReactNode {
  const contentId = useId();
  const [expanded, setExpanded] = useControllableChecked({
    checked: controlledExpanded,
    defaultChecked: defaultExpanded,
    onValueChange: onExpandedChange,
  });
  // Content open on the first render is already in place: it animates in only
  // once it has been closed.
  const [enterAnimated, setEnterAnimated] = useState(!expanded);
  if (!enterAnimated && !expanded) setEnterAnimated(true);
  const styles = disclosureVariants({ size, guide, expanded, disabled });

  return (
    <View className={styles.root({ className })}>
      <PressableBox
        variant="soft"
        className={styles.trigger()}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={expanded}
        // Spread, not written as a prop: react-native's types have no
        // `aria-controls`, which react-native-web forwards.
        {...{ "aria-controls": contentId }}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <View className={styles.caretFrame()}>
          <Icon
            icon={<CaretRightRegularIcon />}
            size={16}
            className={styles.caret()}
          />
        </View>
        <Text
          className={styles.label({
            className: [labelClassName, disabled && "text-disabled-muted"],
          })}
        >
          {label}
        </Text>
      </PressableBox>
      {/* Mounted in both states, so `aria-controls` always resolves. */}
      <View id={contentId}>
        <PresenceList
          exitDurationMs={animationDurationsMs.disclose}
          enterClassName={enterAnimated ? "animate-disclose-in" : undefined}
          exitClassName="animate-disclose-out"
          className={styles.clip()}
        >
          {expanded ? (
            <View key="content" className={styles.content()}>
              {children}
            </View>
          ) : null}
        </PresenceList>
      </View>
    </View>
  );
}
