import type { ReactNode } from "react";
import { type VariantProps } from "tailwind-variants";
import { type SelectionGroupProps } from "../selection/SelectionContext";
declare const radioCardGroupVariants: import("tailwind-variants").TVReturnType<{
    variant: {
        list: string;
        stack: string;
    };
}, undefined, "gap-xs", {
    variant: {
        list: string;
        stack: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    variant: {
        list: string;
        stack: string;
    };
}, undefined, "gap-xs", unknown, unknown, undefined>>;
type RadioCardGroupVariantProps = VariantProps<typeof radioCardGroupVariants>;
export type RadioCardGroupVariant = NonNullable<RadioCardGroupVariantProps["variant"]>;
/** Lets a card size itself for the row it flows in. */
export declare function useRadioCardGroupVariant(): RadioCardGroupVariant;
export interface RadioCardGroupProps extends SelectionGroupProps, RadioCardGroupVariantProps {
    className?: string;
}
export declare function RadioCardGroup({ value, defaultValue, onValueChange, accent, disabled, variant, className, children, ...props }: RadioCardGroupProps): ReactNode;
export {};
//# sourceMappingURL=RadioCardGroup.d.ts.map