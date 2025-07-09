import { useContext } from "react";
import type { ReactNode } from "react";
import { AlouetteTamaguiConfigContext } from "../../core/AlouetteDecorator";
import type { AlouetteProviderProps } from "../../core/AlouetteProvider";

export interface WithTamaguiConfigProps {
  render: (
    config: AlouetteProviderProps["tamaguiConfig"],
  ) => NonNullable<ReactNode>;
}

export function WithTamaguiConfig({
  render,
}: WithTamaguiConfigProps): ReactNode {
  const config = useContext(AlouetteTamaguiConfigContext);
  if (!config) {
    throw new Error(
      "No config found, check that AlouetteDecorator is used in the story",
    );
  }
  return render(config);
}
