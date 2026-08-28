import type { ReactNode } from "react";
import { type SVGIconElement } from "../primitives/Icon";
export interface RadioCardProps {
    value: string;
    label: string;
    description?: string;
    icon?: SVGIconElement;
    disabled?: boolean;
    className?: string;
}
export declare function RadioCard({ value, label, description, icon, disabled, className, }: RadioCardProps): ReactNode;
//# sourceMappingURL=RadioCard.d.ts.map