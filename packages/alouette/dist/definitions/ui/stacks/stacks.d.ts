import { View as RNView, type ViewProps as RNViewProps } from "react-native";
import { type VariantProps } from "tailwind-variants";
declare const stackVariants: import("tailwind-variants").TVReturnType<{
    absoluteFill: {
        true: string;
    };
}, undefined, undefined, {
    absoluteFill: {
        true: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    absoluteFill: {
        true: string;
    };
}, undefined, undefined, unknown, unknown, undefined>>;
type StackVariantProps = VariantProps<typeof stackVariants>;
export interface StackProps extends RNViewProps, StackVariantProps {
}
export declare const Stack: import("react").ForwardRefExoticComponent<StackProps & import("react").RefAttributes<RNView>>;
export interface HStackProps extends RNViewProps, StackVariantProps {
}
export declare const HStack: import("react").ForwardRefExoticComponent<HStackProps & import("react").RefAttributes<RNView>>;
export type VStackProps = RNViewProps;
export declare const VStack: import("react").ForwardRefExoticComponent<RNViewProps & import("react").RefAttributes<RNView>>;
export {};
//# sourceMappingURL=stacks.d.ts.map