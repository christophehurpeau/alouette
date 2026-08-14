import { type ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import type { SVGIconElement } from "../primitives/Icon";
import { type ModalProps } from "./Modal";
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
interface ConfirmAlertDialogProps extends AlertDialogBaseProps, AsyncActionProps {
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
    /** Disables the confirm button (e.g. while a form is invalid). */
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
interface RequiredAlertDialogProps extends AlertDialogBaseProps, AsyncActionProps {
    /**
     * "required" offers a single action and cannot be dismissed by the backdrop,
     * Escape, or the Android back button — the user must respond (e.g. accept
     * updated terms, a forced sign-out).
     */
    variant: "required";
    /** Action button label. Defaults to "OK". */
    confirmText?: ReactNode;
    /** Disables the action button (e.g. while a form is invalid). */
    confirmDisabled?: boolean;
}
export type AlertDialogProps = AcknowledgeAlertDialogProps | ConfirmAlertDialogProps | RequiredAlertDialogProps;
export declare function AlertDialog(props: AlertDialogProps): ReactNode;
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
export type AlertDialogUsageProps = DistributiveOmit<AlertDialogProps, "icon">;
export declare function QuestionAlertDialog(props: AlertDialogUsageProps): ReactNode;
export declare function WarningAlertDialog(props: AlertDialogUsageProps): ReactNode;
export declare function InfoAlertDialog(props: AlertDialogUsageProps): ReactNode;
export declare function SuccessAlertDialog(props: AlertDialogUsageProps): ReactNode;
export {};
//# sourceMappingURL=AlertDialog.d.ts.map