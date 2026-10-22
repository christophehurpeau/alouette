import { createTV } from "tailwind-variants";
import { twMergeConfig } from "./twMerge";

/**
 * `tv` merging a caller's `className` with alouette's tailwind-merge config, so
 * an override on the named scale (`px-sm` over `px-m`) or of a custom utility
 * replaces the component's class instead of resolving by stylesheet order.
 * Components import it instead of the plain `tv` from `tailwind-variants`.
 */
export const tv = createTV({ twMergeConfig });
