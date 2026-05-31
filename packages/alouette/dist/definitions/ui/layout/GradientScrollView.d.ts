import { type ReactNode } from "react";
import { ScrollView as RNScrollView, type ScrollViewProps as RNScrollViewProps } from "react-native";
import type { SemanticRole } from "../../core/AlouetteConfig";
export interface GradientScrollViewProps extends RNScrollViewProps {
    children?: ReactNode;
    semanticRole: SemanticRole;
}
export declare const GradientScrollView: import("react").ForwardRefExoticComponent<GradientScrollViewProps & import("react").RefAttributes<RNScrollView>>;
//# sourceMappingURL=GradientScrollView.d.ts.map