import type { ColorTokens, GetProps, Variable } from "@tamagui/core";
import type { ReactElement, ReactNode } from "react";
import type { OpaqueColorValue } from "react-native";
import type { BoxProps } from "../containers/Box";
import { Box } from "../containers/Box";
export interface IconProps extends Exclude<GetProps<typeof Box>, "alignSelf" | "style"> {
    icon: ReactElement;
    color?: ColorTokens | OpaqueColorValue | Variable<any> | undefined;
    align?: BoxProps["alignSelf"];
    size?: number;
}
export declare function Icon({ icon, size, align, disabled, color, ...props }: IconProps): ReactNode;
//# sourceMappingURL=Icon.d.ts.map