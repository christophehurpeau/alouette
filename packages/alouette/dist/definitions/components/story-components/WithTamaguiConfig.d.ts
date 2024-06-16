import { useConfiguration } from "@tamagui/core";
import type { ReactNode } from "react";
export interface WithTamaguiConfigProps {
    render: (config: ReturnType<typeof useConfiguration>) => NonNullable<ReactNode>;
}
export declare function WithTamaguiConfig({ render, }: WithTamaguiConfigProps): ReactNode;
//# sourceMappingURL=WithTamaguiConfig.d.ts.map