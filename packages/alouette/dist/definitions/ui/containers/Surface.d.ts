import type { View as RNView } from "react-native";
import { type VariantProps } from "tailwind-variants";
import type { SemanticRole } from "../../core/AlouetteConfig";
import { type BoxProps } from "./Box";
declare const surfaceVariants: import("tailwind-variants").TVReturnType<{
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "overflow-hidden", {
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
}, undefined, "overflow-hidden", unknown, unknown, undefined>>;
type SurfaceVariantProps = VariantProps<typeof surfaceVariants>;
export interface SurfaceProps extends Omit<BoxProps, "layer">, SurfaceVariantProps {
    variant?: /** Pairs layer="lowered" with shadow="lowered" for a sunken look. */ "lowered" | "translucent";
    semanticRole?: SemanticRole;
}
export declare const Surface: import("react").ForwardRefExoticComponent<SurfaceProps & import("react").RefAttributes<RNView>>;
export {};
//# sourceMappingURL=Surface.d.ts.map