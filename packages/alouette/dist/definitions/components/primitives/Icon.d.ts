import type { ColorTokens, Variable } from "@tamagui/core";
import type { ReactElement, ReactNode, SVGProps } from "react";
import type { OpaqueColorValue } from "react-native";
export type SVGIconElement = ReactElement<SVGProps<SVGSVGElement>>;
export interface IconProps {
    icon: SVGIconElement;
    disabled?: boolean;
    accent?: boolean;
    color?: ColorTokens | OpaqueColorValue | Variable<any> | undefined;
    size?: number;
}
export declare function Icon({ icon, size, disabled, accent, color, }: IconProps): ReactNode;
//# sourceMappingURL=Icon.d.ts.map