import type { TextProps as RNTextProps } from "react-native";
import type { TextProps as WebTextProps } from "react-native-web";

export function webTextRole(role: "code" | "paragraph"): RNTextProps["role"] {
  const webRole: WebTextProps["role"] = role;
  // react-native's Role has no "code" nor "paragraph", which react-native-web
  // renders as <code> / <p>; native ignores the role.
  return webRole as RNTextProps["role"];
}
