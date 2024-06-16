import { createMedia } from "@tamagui/react-native-media-driver";
import { Breakpoints } from "./Breakpoints";

export const media = createMedia({
  small: { minWidth: Breakpoints.SMALL },
  medium: { minWidth: Breakpoints.MEDIUM },
  large: { minWidth: Breakpoints.LARGE },
  wide: { minWidth: Breakpoints.WIDE },
} as const);
