import { CaretRightRegularIcon } from "alouette-icons/phosphor-icons/CaretRight";
import { type ReactNode, useId, useState } from "react";
import { tv } from "tailwind-variants";
import { animationDurationsMs } from "../../animationDurationsMs";
import { twMergeConfig } from "../../core/twMerge";
import { useControllableChecked } from "../../core/useControllableChecked";
import { PressableBox } from "../actions/PressableBox";
import { Icon } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { PresenceList } from "./Presence";

const disclosureVariants = tv(
  {
    slots: {
      root: "",
      trigger:
        "flex-row items-center gap-xs self-start rounded-sm px-xs min-h-[44px]",
      // Icon reads only the tint from its className, so the rotation sits on a
      // wrapping view.
      caretFrame: "transition-transform duration-disclose ease-in-out",
      caret: "",
      label: "text-sm",
      // Clips for the height animation, and carries no padding: a box cannot
      // be shorter than its padding, so the height would start and end on it.
      clip: "overflow-hidden",
      // Indented by the trigger's padding, caret and gap (8 + 16 + 8) to line
      // up with the label; the other sides leave room inside the clip for the
      // shadow and focus ring of a surface in the content.
      content: "pl-xl pr-xs pt-xxs pb-sm",
    },
    variants: {
      expanded: {
        true: { caretFrame: "rotate-90" },
        false: { caretFrame: "rotate-0" },
      },
      disabled: {
        true: { caret: "text-disabled-muted", label: "text-disabled-muted" },
        false: { caret: "text-muted", label: "text-muted" },
      },
    },
    defaultVariants: { expanded: false, disabled: false },
  },
  { twMergeConfig },
);

export interface DisclosureProps {
  /** The trigger's text, which stays visible in both states. */
  label: string;
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
  const styles = disclosureVariants({ expanded, disabled });

  return (
    <View className={styles.root({ className })}>
      <PressableBox
        variant="soft"
        className={styles.trigger()}
        disabled={disabled}
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
        <Text className={styles.label()}>{label}</Text>
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
