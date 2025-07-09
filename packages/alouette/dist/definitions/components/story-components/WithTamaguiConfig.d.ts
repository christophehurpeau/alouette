import type { ReactNode } from "react";
import type { AlouetteProviderProps } from "../../core/AlouetteProvider";
export interface WithTamaguiConfigProps {
    render: (config: AlouetteProviderProps["tamaguiConfig"]) => NonNullable<ReactNode>;
}
export declare function WithTamaguiConfig({ render, }: WithTamaguiConfigProps): ReactNode;
//# sourceMappingURL=WithTamaguiConfig.d.ts.map