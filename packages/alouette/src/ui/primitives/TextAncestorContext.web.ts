import { createContext } from "react";

/**
 * react-native-web does not export its context. Never reset by a `View`: CSS
 * inheritance crosses it, so a Text below one still inherits.
 */
export const TextAncestorContext = createContext(false);
