import type { Ref } from "react";
import type { View as RNView } from "react-native";
import type { PressableBoxVariant } from "./PressableBox";

export interface TonalGroundWarningParams {
  variant: PressableBoxVariant | undefined;
  disabled: boolean;
  forced: boolean;
}

/** Web-only: native exposes no computed style to compare grounds with. */
export function useTonalGroundWarningRef(
  ref: Ref<RNView> | undefined,
  _params: TonalGroundWarningParams,
): Ref<RNView> | undefined {
  return ref;
}
