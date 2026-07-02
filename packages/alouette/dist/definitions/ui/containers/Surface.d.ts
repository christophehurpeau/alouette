import type { View as RNView } from "react-native";
import { type VariantProps } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { type BoxProps } from "./Box";
declare const surfaceVariants: import("tailwind-variants").TVReturnType<{
    size: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
    };
    variant: {
        surface: string;
        highlight: string;
        "highlight-accent": string;
        lowered: string;
        translucent: string;
    };
    shadow: {
        none: string;
        s: string;
        m: string;
        l: string;
        lowered: string;
    };
}, undefined, "overflow-hidden", {
    size: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
    };
    variant: {
        surface: string;
        highlight: string;
        "highlight-accent": string;
        lowered: string;
        translucent: string;
    };
    shadow: {
        none: string;
        s: string;
        m: string;
        l: string;
        lowered: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    size: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
    };
    variant: {
        surface: string;
        highlight: string;
        "highlight-accent": string;
        lowered: string;
        translucent: string;
    };
    shadow: {
        none: string;
        s: string;
        m: string;
        l: string;
        lowered: string;
    };
}, undefined, "overflow-hidden", unknown, unknown, undefined>>;
type SurfaceVariantProps = VariantProps<typeof surfaceVariants>;
export interface SurfaceProps extends BoxProps, SurfaceVariantProps {
    accent?: Accent;
}
export declare const Surface: import("react").ForwardRefExoticComponent<SurfaceProps & import("react").RefAttributes<RNView>>;
export {};
//# sourceMappingURL=Surface.d.ts.map