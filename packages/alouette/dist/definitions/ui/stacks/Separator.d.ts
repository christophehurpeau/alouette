import { View as RNView, type ViewProps as RNViewProps } from "react-native";
import { type VariantProps } from "tailwind-variants";
declare const separatorVariants: import("tailwind-variants").TVReturnType<{
    vertical: {
        true: string;
        false: string;
    };
}, undefined, "border-border-sharp", {
    vertical: {
        true: string;
        false: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    vertical: {
        true: string;
        false: string;
    };
}, undefined, "border-border-sharp", unknown, unknown, undefined>>;
type SeparatorVariantProps = VariantProps<typeof separatorVariants>;
export interface SeparatorProps extends RNViewProps, SeparatorVariantProps {
}
export declare const Separator: import("react").ForwardRefExoticComponent<SeparatorProps & import("react").RefAttributes<RNView>>;
export {};
//# sourceMappingURL=Separator.d.ts.map