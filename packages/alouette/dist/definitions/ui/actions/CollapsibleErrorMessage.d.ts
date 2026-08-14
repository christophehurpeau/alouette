import type { ReactNode } from "react";
import { type MessageVariant } from "../feedback/Message";
export interface CollapsibleErrorMessageProps {
    error: Error | null;
    errorToMessage: (error: unknown) => string;
    /** Forwarded to the message: "flat" when the caller is inside a surface. */
    variant?: MessageVariant;
}
export declare function CollapsibleErrorMessage({ error, errorToMessage, variant, }: CollapsibleErrorMessageProps): ReactNode;
//# sourceMappingURL=CollapsibleErrorMessage.d.ts.map