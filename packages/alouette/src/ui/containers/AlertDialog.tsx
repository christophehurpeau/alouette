import { CheckRegularIcon } from "alouette-icons/phosphor-icons/CheckRegularIcon";
import { InfoRegularIcon } from "alouette-icons/phosphor-icons/InfoRegularIcon";
import { QuestionRegularIcon } from "alouette-icons/phosphor-icons/QuestionRegularIcon";
import { WarningRegularIcon } from "alouette-icons/phosphor-icons/WarningRegularIcon";
import { type ReactNode, useId } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Button } from "../actions/Button";
import type { SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { Modal, type ModalProps } from "./Modal";

interface AlertDialogBaseProps extends Pick<ModalProps, "size" | "testID"> {
  /** Whether the dialog is shown. */
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

interface ConfirmAlertDialogProps extends AlertDialogBaseProps {
  /**
   * "confirm" (default) offers a cancel and a confirm action — for decisions,
   * typically destructive ones.
   */
  variant?: "confirm";
  /** Called when the user confirms the action. */
  onConfirm: () => void;
  /**
   * Called when the user rejects the action — cancel button, backdrop, Escape,
   * or the Android back button.
   */
  onCancel: () => void;
  /** Confirm button label. Defaults to "Confirm". */
  confirmText?: ReactNode;
  /** Cancel button label. Defaults to "Cancel". */
  cancelText?: ReactNode;
  /** Disables the confirm button (e.g. while an async action is pending). */
  confirmDisabled?: boolean;
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

interface RequiredAlertDialogProps extends AlertDialogBaseProps {
  /**
   * "required" offers a single action and cannot be dismissed by the backdrop,
   * Escape, or the Android back button — the user must respond (e.g. accept
   * updated terms, a forced sign-out).
   */
  variant: "required";
  /** Called when the user takes the required action. */
  onConfirm: () => void;
  /** Action button label. Defaults to "OK". */
  confirmText?: ReactNode;
  /** Disables the action button (e.g. while an async action is pending). */
  confirmDisabled?: boolean;
}

export type AlertDialogProps =
  | AcknowledgeAlertDialogProps
  | ConfirmAlertDialogProps
  | RequiredAlertDialogProps;

interface ResolvedVariant {
  /** Footer buttons for the variant. */
  footer: ReactNode;
  /**
   * Handler for the dialog's dismiss affordances (backdrop / Escape / Android
   * back): the rejecting action for confirm/alert, a no-op for required.
   */
  onDismiss: () => void;
}

// Resolves the variant-specific footer and dismiss handler outside the
// component so its discriminated props can be narrowed by destructuring.
function resolveVariant(
  props: AlertDialogProps,
  accent: Accent,
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
      const { onConfirm, confirmText, confirmDisabled } = props;
      return {
        // Non-dismissible: only the explicit action closes it.
        onDismiss: () => undefined,
        footer: (
          <Button
            accent={accent}
            text={confirmText ?? "OK"}
            disabled={confirmDisabled}
            onPress={onConfirm}
          />
        ),
      };
    }
    case "confirm":
    case undefined:
    default: {
      const { onConfirm, onCancel, confirmText, cancelText, confirmDisabled } =
        props;
      return {
        onDismiss: onCancel,
        footer: (
          <>
            <Button
              variant="outlined"
              text={cancelText ?? "Cancel"}
              onPress={onCancel}
            />
            <Button
              accent={accent}
              text={confirmText ?? "Confirm"}
              disabled={confirmDisabled}
              onPress={onConfirm}
            />
          </>
        ),
      };
    }
  }
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
  const { footer, onDismiss } = resolveVariant(props, accent);

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

// Omit that distributes over the union so each variant keeps its own props.
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

// Icon is fixed by the usage component; the accent stays the caller's choice.
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
