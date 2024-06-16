import { useConfiguration } from "@tamagui/core";
import type { ReactNode } from "react";

export interface WithTamaguiConfigProps {
  render: (
    config: ReturnType<typeof useConfiguration>,
  ) => NonNullable<ReactNode>;
}

export function WithTamaguiConfig({
  render,
}: WithTamaguiConfigProps): ReactNode {
  const config = useConfiguration();
  return render(config);
}
