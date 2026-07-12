import { AsteriskSimpleRegularIcon } from "alouette-icons/phosphor-icons/AsteriskSimpleRegularIcon";
import { WarningRegularIcon } from "alouette-icons/phosphor-icons/WarningRegularIcon";
import { type ReactNode, useId } from "react";
import { Pressable } from "react-native";
import { AccentScope } from "../containers/AccentScope";
import { Icon } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { HStack, VStack } from "../stacks/stacks";

export interface FormItemProps {
  label: string;
  error?: ReactNode;
  /**
   * True when `error` is caused by the field being left empty, as opposed
   * to some other validation failure. An empty required field just needs
   * its star recolored — a second warning icon would be a redundant cue.
   */
  isRequiredError?: boolean;
  /** true shows the default marker; any other ReactNode replaces it. */
  required?: ReactNode;
  /** Called when the label is pressed, so it can focus the input. */
  onLabelPress?: () => void;
  render: (labelId: string) => ReactNode;
}

/**
 * Label, error message and layout for a single form field. Form-library
 * agnostic — pass the input as a render prop so it can wire
 * aria-labelledby to the generated labelId, and onLabelPress so the label
 * can focus it, matching a native <label for> click.
 */
export function FormItem({
  label,
  error,
  isRequiredError,
  required,
  onLabelPress,
  render,
}: FormItemProps): ReactNode {
  const labelId = useId();
  const hasError = Boolean(error);
  const showWarningIcon = hasError && !isRequiredError;

  // The trailing marker is always the last element after the label text, so
  // the text never shifts position when error/required state changes. The
  // required star is never removed on error — it's only recolored, with the
  // warning icon added alongside it for non-required-emptiness errors.
  const marker = ((): ReactNode => {
    if (required === true) {
      return (
        <HStack className="gap-xxs items-center">
          <Icon
            icon={<AsteriskSimpleRegularIcon />}
            size={12}
            className="text-accent"
          />
          {showWarningIcon ? (
            <Icon
              icon={<WarningRegularIcon />}
              size={16}
              className="text-accent"
            />
          ) : null}
        </HStack>
      );
    }
    if (required) {
      return required;
    }
    if (showWarningIcon) {
      return (
        <Icon icon={<WarningRegularIcon />} size={16} className="text-accent" />
      );
    }
    return null;
  })();

  return (
    <VStack className="gap-xxs">
      <Pressable onPress={onLabelPress}>
        <HStack className="gap-xxs items-center">
          <Text
            nativeID={labelId}
            accent={hasError ? "danger" : undefined}
            className={`font-body-bold text-sm ${hasError ? "text-accent" : ""}`}
          >
            {label}
          </Text>
          {marker ? (
            <View aria-hidden>
              {hasError ? (
                <AccentScope accent="danger">{marker}</AccentScope>
              ) : (
                marker
              )}
            </View>
          ) : null}
        </HStack>
      </Pressable>
      {render(labelId)}
      {error ? (
        <View className="px-m">
          <Text role="alert" accent="danger" className="text-accent text-sm">
            {error}
          </Text>
        </View>
      ) : null}
    </VStack>
  );
}
