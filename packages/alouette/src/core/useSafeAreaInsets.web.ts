import type { useSafeAreaInsets as useSafeAreaInsetsImpl } from "react-native-safe-area-context";

export const useSafeAreaInsets: typeof useSafeAreaInsetsImpl = () => ({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});
