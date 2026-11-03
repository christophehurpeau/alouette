// Web props that react-native-web forwards but react-native's types lack.
// @types/react-native-web no longer adds them to "react-native" (react-native
// 0.87 declares these props as type aliases, which cannot be augmented), so
// alouette declares the ones it uses, with the types react-native-web gives them.
import type { AriaRole, MouseEventHandler } from "react";

declare module "react-native" {
  interface ViewProps {
    href?: string;
    onClick?: MouseEventHandler;
  }

  interface TextProps {
    role?:
      | "button"
      | "header"
      | "heading"
      | "label"
      | "link"
      | "listitem"
      | "none"
      | "text"
      | "paragraph"
      | AriaRole;
  }

  interface TextInputProps {
    disabled?: boolean;
    onClick?: MouseEventHandler;
  }
}
