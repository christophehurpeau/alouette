import { type ReactNode } from "react";
import { type VariantProps } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { type SVGIconElement } from "../primitives/Icon";
declare const panelVariants: import("tailwind-variants").TVReturnType<{
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "w-full max-h-full", {
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "w-full max-h-full", unknown, unknown, undefined>>;
type PanelVariantProps = VariantProps<typeof panelVariants>;
interface ModalBaseProps {
    /** Whether the modal is shown. */
    visible: boolean;
    /**
     * Called when the user dismisses the modal — backdrop press, close button, the
     * Android back button, or the Escape key (web).
     */
    onClose: () => void;
    children: ReactNode;
    /** Accent-tinted icon rendered before the title in the header. */
    icon?: SVGIconElement;
    /** Actions row rendered below the body (e.g. Cancel/Confirm buttons). */
    footer?: ReactNode;
    accent?: Accent;
    size?: PanelVariantProps["size"];
    /** Hide the header close button (the modal stays dismissible otherwise). */
    hideCloseButton?: boolean;
    /** Accessible label for the close button. */
    closeButtonAriaLabel?: string;
    /**
     * `alertdialog` for interruptions that require an explicit response
     * (destructive confirmation, errors). Defaults to `dialog`.
     */
    role?: "alertdialog" | "dialog";
    /** ID of the element describing the dialog (announced by assistive tech). */
    "aria-describedby"?: string;
    testID?: string;
}
interface ModalWithTitleProps extends ModalBaseProps {
    /** Heading rendered in the header; also labels the dialog for assistive tech. */
    title: string;
    "aria-label"?: string;
}
interface ModalWithoutTitleProps extends ModalBaseProps {
    title?: undefined;
    /** Required when there is no `title`, so the dialog is still labelled. */
    "aria-label": string;
}
export type ModalProps = ModalWithoutTitleProps | ModalWithTitleProps;
export declare function Modal({ visible, onClose, children, icon, footer, accent, size, title, hideCloseButton, closeButtonAriaLabel, role, "aria-describedby": ariaDescribedby, testID, "aria-label": ariaLabel, }: ModalProps): ReactNode;
export {};
//# sourceMappingURL=Modal.d.ts.map