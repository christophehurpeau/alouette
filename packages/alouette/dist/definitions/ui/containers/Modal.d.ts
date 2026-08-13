import { type ReactNode } from "react";
import { type VariantProps } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { type SVGIconElement } from "../primitives/Icon";
declare const modalVariants: import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            panel: string;
            inset: string;
            header: string;
            scrollContent: string;
            footer: string;
        };
        md: {
            panel: string;
            inset: string;
            header: string;
            scrollContent: string;
            footer: string;
        };
        lg: {
            panel: string;
            inset: string;
            header: string;
            scrollContent: string;
            footer: string;
        };
    };
    withFooter: {
        true: {
            scrollContent: string;
        };
    };
    detachedFooter: {
        true: {};
    };
    stuck: {
        true: {
            footer: string;
        };
    };
}, {
    panel: string;
    inset: string;
    header: string;
    scrollContent: string;
    footer: string;
}, undefined, {
    size: {
        sm: {
            panel: string;
            inset: string;
            header: string;
            scrollContent: string;
            footer: string;
        };
        md: {
            panel: string;
            inset: string;
            header: string;
            scrollContent: string;
            footer: string;
        };
        lg: {
            panel: string;
            inset: string;
            header: string;
            scrollContent: string;
            footer: string;
        };
    };
    withFooter: {
        true: {
            scrollContent: string;
        };
    };
    detachedFooter: {
        true: {};
    };
    stuck: {
        true: {
            footer: string;
        };
    };
}, {
    panel: string;
    inset: string;
    header: string;
    scrollContent: string;
    footer: string;
}, import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            panel: string;
            inset: string;
            header: string;
            scrollContent: string;
            footer: string;
        };
        md: {
            panel: string;
            inset: string;
            header: string;
            scrollContent: string;
            footer: string;
        };
        lg: {
            panel: string;
            inset: string;
            header: string;
            scrollContent: string;
            footer: string;
        };
    };
    withFooter: {
        true: {
            scrollContent: string;
        };
    };
    detachedFooter: {
        true: {};
    };
    stuck: {
        true: {
            footer: string;
        };
    };
}, {
    panel: string;
    inset: string;
    header: string;
    scrollContent: string;
    footer: string;
}, undefined, unknown, unknown, undefined>>;
type ModalVariantProps = VariantProps<typeof modalVariants>;
export interface ModalProps {
    /** Whether the modal is shown. */
    visible: boolean;
    /**
     * Called when the user dismisses the modal — backdrop press, close button, the
     * Android back button, or the Escape key (web).
     */
    onClose: () => void;
    children: ReactNode;
    /**
     * Heading rendered in the fixed header; also labels the dialog for assistive
     * tech.
     */
    title: string;
    /** Accent-tinted icon rendered before the title in the header. */
    icon?: SVGIconElement;
    /** Actions row rendered below the body (e.g. Cancel/Confirm buttons). */
    footer?: ReactNode;
    accent?: Accent;
    size?: ModalVariantProps["size"];
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
export declare function Modal({ visible, onClose, children, icon, footer, accent, size, title, hideCloseButton, closeButtonAriaLabel, role, "aria-describedby": ariaDescribedby, testID, }: ModalProps): ReactNode;
export {};
//# sourceMappingURL=Modal.d.ts.map