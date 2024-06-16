import type { ColorTokens, GetProps, Variable } from "@tamagui/core";
import type { ReactElement, ReactNode } from "react";
import type { OpaqueColorValue } from "react-native";
import type { FrameProps } from "../containers/Frame";
import { Frame } from "../containers/Frame";
export interface IconProps extends Exclude<GetProps<typeof Frame>, "alignSelf" | "style"> {
    icon: ReactElement;
    color?: ColorTokens | OpaqueColorValue | Variable<any> | undefined;
    align?: FrameProps["alignSelf"];
    contrast?: boolean;
    size?: number;
}
export declare function Icon({ icon, size, align, contrast, color, ...props }: IconProps): ReactNode;
//# sourceMappingURL=Icon.d.ts.map