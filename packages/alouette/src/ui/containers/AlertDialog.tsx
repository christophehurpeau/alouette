import { CheckRegularIcon } from "alouette-icons/phosphor-icons/Check";
import { InfoRegularIcon } from "alouette-icons/phosphor-icons/Info";
import { QuestionRegularIcon } from "alouette-icons/phosphor-icons/Question";
import { WarningRegularIcon } from "alouette-icons/phosphor-icons/Warning";
import { type ReactNode, useId } from "react";
import type { GestureResponderEvent } from "react-native";
import type { Accent } from "../../core/AlouetteConfig";
import { Button, type ButtonState } from "../actions/Button";
import { CollapsibleErrorMessage } from "../actions/CollapsibleErrorMessage";
import { usePressAsync } from "../actions/usePressAsync";
import type { SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Modal, type ModalProps } from "./Modal";

function noop(): void {
  // Intentionally empty.
}

interface AsyncActionProps {
  /**
   * Called when the user takes the action. Returning a promise puts the button
   * in its loading state and locks the dialog until it settles — the cancel
   * button is disabled and backdrop / Escape / Android back stop dismissing, so
   * the action can't be cut short and a failure can't be scrolled away.
   */
  onConfirm: () => unknown;
  /**
   * Formats a rejection from {@link onConfirm} into the message shown in the
   * footer. Without it a failure only flips the button to its failed state —
   * the library can't provide a default without hardcoding an English string.
   */
  errorToMessage?: (error: unknown) => string;
}

interface AlertDialogBaseProps extends Pick<ModalProps, "size" | "testID"> {
  visible: boolean;
  /** Heading; also labels the dialog for assistive tech. */
  title: string;
  /** Body copy describing the situation or the consequence of confirming. */
  children?: ReactNode;
  /** Themes the icon and the primary button. Defaults to "danger". */
  accent?: Accent;
  /**
   * Icon shown in the header, signalling the nature of the dialog. Prefer a
   * usage component ({@link QuestionAlertDialog}, {@link WarningAlertDialog},
   * {@link InfoAlertDialog}, {@link SuccessAlertDialog}) which supplies it.
   */
  icon: SVGIconElement;
}

interface ConfirmAlertDialogProps
  extends AlertDialogBaseProps, AsyncActionProps {
  /**
   * "confirm" (default) offers a cancel and a confirm action — for decisions,
   * typically destructive ones.
   */
  variant?: "confirm";
  /**
   * Called when the user rejects the action — cancel button, backdrop, Escape,
   * or the Android back button.
   */
  onCancel: () => void;
  /** Confirm button label. Defaults to "Confirm". */
  confirmText?: ReactNode;
  /** Cancel button label. Defaults to "Cancel". */
  cancelText?: ReactNode;
  confirmDisabled?: boolean;
  /**
   * Which action carries the button material. "confirm" (default) is an
   * accented tonal confirm beside a soft Cancel. "cancel" is a neutral filled
   * Cancel beside a soft confirm — for an irreversible action where backing out
   * is the expected answer. Filled, not tonal: a neutral tonal ground is the
   * white of the panel and would dissolve into it. The order stays Cancel then
   * confirm, so the buttons never trade places.
   */
  primaryAction?: "cancel" | "confirm";
}

interface AcknowledgeAlertDialogProps extends AlertDialogBaseProps {
  /**
   * "alert" offers a single acknowledge action — for interruptions that only
   * need to be read and dismissed.
   */
  variant: "alert";
  /**
   * Called when the user dismisses the dialog — acknowledge button, backdrop,
   * Escape, or the Android back button.
   */
  onClose: () => void;
  /** Acknowledge button label. Defaults to "OK". */
  closeText?: ReactNode;
}

interface RequiredAlertDialogProps
  extends AlertDialogBaseProps, AsyncActionProps {
  /**
   * "required" offers a single action and cannot be dismissed by the backdrop,
   * Escape, or the Android back button — the user must respond (e.g. accept
   * updated terms, a forced sign-out).
   */
  variant: "required";
  /** Action button label. Defaults to "OK". */
  confirmText?: ReactNode;
  confirmDisabled?: boolean;
}

export type AlertDialogProps =
  | AcknowledgeAlertDialogProps
  | ConfirmAlertDialogProps
  | RequiredAlertDialogProps;

interface ResolvedVariant {
  footer: ReactNode;
  /**
   * Handler for the dialog's dismiss affordances (backdrop / Escape / Android
   * back): the rejecting action for confirm/alert, a no-op for required.
   */
  onDismiss: () => void;
}

interface ActionFooterProps {
  children: ReactNode;
  errorToMessage: AsyncActionProps["errorToMessage"];
  error: Error | null;
}

// Modal lays the footer out as a right-aligned row; a single full-width child
// turns it into a column so the failure message spans the dialog instead of
// being squeezed to the width of the button that triggered it.
function ActionFooter({
  children,
  errorToMessage,
  error,
}: ActionFooterProps): ReactNode {
  const errorMessage =
    errorToMessage === undefined ? null : (
      // The dialog panel is already a raised surface, so the message is flat.
      <CollapsibleErrorMessage
        error={error}
        errorToMessage={errorToMessage}
        variant="flat"
      />
    );
  return (
    <View className="w-full gap-sm">
      <View className="flex-row items-center justify-end gap-m">
        {children}
      </View>
      {errorMessage}
    </View>
  );
}

interface ResolveVariantParams {
  accent: Accent;
  buttonState: ButtonState | undefined;
  error: Error | null;
  isPending: boolean;
  handleConfirm: (event: GestureResponderEvent) => void;
}

// Resolves the variant-specific footer and dismiss handler outside the
// component so its discriminated props can be narrowed by destructuring.
function resolveVariant(
  props: AlertDialogProps,
  {
    accent,
    buttonState,
    error,
    isPending,
    handleConfirm,
  }: ResolveVariantParams,
): ResolvedVariant {
  switch (props.variant) {
    case "alert": {
      const { onClose, closeText } = props;
      return {
        onDismiss: onClose,
        footer: (
          <Button accent={accent} text={closeText ?? "OK"} onPress={onClose} />
        ),
      };
    }
    case "required": {
      const { confirmText, confirmDisabled, errorToMessage } = props;
      return {
        onDismiss: noop,
        footer: (
          <ActionFooter error={error} errorToMessage={errorToMessage}>
            <Button
              accent={accent}
              text={confirmText ?? "OK"}
              state={buttonState}
              disabled={confirmDisabled}
              onPress={handleConfirm}
            />
          </ActionFooter>
        ),
      };
    }
    case "confirm":
    case undefined:
    default: {
      const {
        onCancel,
        confirmText,
        cancelText,
        confirmDisabled,
        errorToMessage,
        primaryAction = "confirm",
      } = props;
      const isCancelPrimary = primaryAction === "cancel";
      return {
        onDismiss: isPending ? noop : onCancel,
        footer: (
          <ActionFooter error={error} errorToMessage={errorToMessage}>
            <Button
              accent="neutral"
              variant={isCancelPrimary ? "filled" : "soft"}
              text={cancelText ?? "Cancel"}
              disabled={isPending}
              onPress={onCancel}
            />
            <Button
              accent={accent}
              variant={isCancelPrimary ? "soft" : "tonal"}
              text={confirmText ?? "Confirm"}
              state={buttonState}
              disabled={confirmDisabled}
              onPress={handleConfirm}
            />
          </ActionFooter>
        ),
      };
    }
  }
}

// The alert variant has no confirm action; its single button closes the dialog
// synchronously and never drives the async state.
function resolveConfirmHandler(props: AlertDialogProps): () => unknown {
  return props.variant === "alert" ? noop : props.onConfirm;
}

export function AlertDialog(props: AlertDialogProps): ReactNode {
  const {
    visible,
    title,
    children,
    accent = "danger",
    icon,
    size = "md",
    testID,
  } = props;
  const descriptionId = useId();
  const { buttonState, error, handlePress } = usePressAsync(
    resolveConfirmHandler(props),
  );
  const isPending = buttonState === "loading";
  const { footer, onDismiss } = resolveVariant(props, {
    accent,
    buttonState,
    error,
    isPending,
    handleConfirm: handlePress,
  });

  return (
    <Modal
      hideCloseButton
      visible={visible}
      role="alertdialog"
      accent={accent}
      size={size}
      title={title}
      icon={icon}
      aria-describedby={children === undefined ? undefined : descriptionId}
      testID={testID}
      footer={footer}
      onClose={onDismiss}
    >
      {children === undefined ? null : (
        <Text nativeID={descriptionId} className="text-base text-muted">
          {children}
        </Text>
      )}
    </Modal>
  );
}

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

export type AlertDialogUsageProps = DistributiveOmit<AlertDialogProps, "icon">;

export function QuestionAlertDialog(props: AlertDialogUsageProps): ReactNode {
  return <AlertDialog {...props} icon={<QuestionRegularIcon />} />;
}

export function WarningAlertDialog(props: AlertDialogUsageProps): ReactNode {
  return <AlertDialog {...props} icon={<WarningRegularIcon />} />;
}

export function InfoAlertDialog(props: AlertDialogUsageProps): ReactNode {
  return <AlertDialog {...props} icon={<InfoRegularIcon />} />;
}

export function SuccessAlertDialog(props: AlertDialogUsageProps): ReactNode {
  return <AlertDialog {...props} icon={<CheckRegularIcon />} />;
}
