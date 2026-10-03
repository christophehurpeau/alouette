import { AsteriskSimpleRegularIcon } from "alouette-icons/phosphor-icons/AsteriskSimple";
import { WarningRegularIcon } from "alouette-icons/phosphor-icons/Warning";
import { type ReactNode, useId } from "react";
import { Pressable } from "react-native";
import { AccentScope } from "../containers/AccentScope";
import { Icon } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";

export interface FormItemProps {
  label: string;
  /** Muted helper text shown between the label and the input. */
  details?: ReactNode;
  error?: ReactNode;
  /**
   * True when `error` is caused by the field being left empty, as opposed
   * to some other validation failure. An empty required field just needs
   * its star recolored — a second warning icon would be a redundant cue.
   */
  isRequiredError?: boolean;
  /** true shows the default marker; any other ReactNode replaces it. */
  required?: ReactNode;
  /**
   * Wraps the rendered content in a left border + padding to visually nest it
   * inside a group. The label stays at full width above the rail.
   */
  indented?: boolean;
  /** Called when the label is pressed, so it can focus the input. */
  onLabelPress?: () => void;
  render: (params: FormItemRenderParams) => ReactNode;
}

/**
 * What the input rendered by `FormItem` wires to its ARIA attributes, so the
 * field announces and shows the same state as the label and message around it.
 */
export interface FormItemRenderParams {
  /** For `aria-labelledby`. */
  labelId: string;
  /**
   * For `aria-describedby`: the ids of `details` and `error`, whichever are
   * rendered. `undefined` when there is neither.
   */
  describedBy: string | undefined;
  /** True while `error` is shown. For `invalid` on the input. */
  invalid: boolean;
  /** For `aria-required`. */
  required: boolean;
}

/**
 * Label, error message and layout for a single form field. Form-library
 * agnostic — pass the input as a render prop so it can wire aria-labelledby,
 * aria-describedby, invalid and aria-required to the generated state, and
 * onLabelPress so the label can focus it, matching a native <label for> click.
 */
export function FormItem({
  label,
  details,
  error,
  isRequiredError,
  required,
  indented,
  onLabelPress,
  render,
}: FormItemProps): ReactNode {
  const labelId = useId();
  const detailsId = useId();
  const errorId = useId();
  const hasError = Boolean(error);
  const showWarningIcon = hasError && !isRequiredError;
  const describedBy =
    [details ? detailsId : null, hasError ? errorId : null]
      .filter((id) => id !== null)
      .join(" ") || undefined;
  const content = render({
    labelId,
    describedBy,
    invalid: hasError,
    required: Boolean(required),
  });

  // The trailing marker is always the last element after the label text, so
  // the text never shifts position when error/required state changes. The
  // required star is never removed on error — it's only recolored, with the
  // warning icon added alongside it for non-required-emptiness errors.
  const marker = ((): ReactNode => {
    if (required === true) {
      return (
        <View className="flex-row gap-xxs items-center">
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
        </View>
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
    <View className="gap-xxs">
      <Pressable tabIndex={-1} onPress={onLabelPress}>
        <View>
          <View className="flex-row gap-xxs items-center">
            <Text
              nativeID={labelId}
              accent={hasError ? "danger" : undefined}
              className={`font-body-bold text-base ${hasError ? "text-accent" : ""}`}
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
          </View>
          {details ? (
            <Text nativeID={detailsId} className="text-muted text-sm">
              {details}
            </Text>
          ) : null}
        </View>
      </Pressable>
      {indented ? (
        <View className="border-l border-border-muted pl-m">{content}</View>
      ) : (
        content
      )}
      {error ? (
        <View className="px-m">
          <Text
            nativeID={errorId}
            role="alert"
            accent="danger"
            className="text-accent text-sm"
          >
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
