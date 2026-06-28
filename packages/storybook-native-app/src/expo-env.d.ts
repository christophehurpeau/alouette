/// <reference types="expo/types" />

// expo declares window.$$EXPO_INITIAL_PROPS via a module-scoped `declare global`
// in this file, but nothing in the build imports it, so the augmentation is not
// applied (and expo/types does not re-export it). Pull it in explicitly.
import "expo/build/dom/webview-bridge";
