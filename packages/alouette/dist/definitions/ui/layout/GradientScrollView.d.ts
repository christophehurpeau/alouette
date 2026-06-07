import { type ReactNode } from "react";
import { ScrollView as RNScrollView, type ScrollViewProps as RNScrollViewProps } from "react-native";
import type { Accent } from "../../core/AlouetteConfig";
export interface GradientScrollViewProps extends RNScrollViewProps {
    children?: ReactNode;
    accent: Accent;
}
export declare const GradientScrollView: import("react").ForwardRefExoticComponent<GradientScrollViewProps & import("react").RefAttributes<RNScrollView>>;
//# sourceMappingURL=GradientScrollView.d.ts.map