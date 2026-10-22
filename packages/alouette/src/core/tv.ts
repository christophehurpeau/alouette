import { type TV, createTV } from "tailwind-variants";
import { twMerge } from "./twMerge";

type ClassFn = (props?: object) => string | undefined;

const tvWithoutMerge = createTV({ twMerge: false }) as unknown as (
  options: object,
  config?: object,
) => ClassFn;

function mergeOutput(component: ClassFn): ClassFn {
  return (props) => {
    const result = component(props) as
      | string
      | Record<string, ClassFn>
      | undefined;
    if (typeof result !== "object") return twMerge(result);
    return Object.fromEntries(
      Object.entries(result).map(([slot, slotFn]) => [
        slot,
        (slotProps?: object) => twMerge(slotFn(slotProps)),
      ]),
    ) as never;
  };
}

/**
 * `tv` merging a caller's `className` with alouette's tailwind-merge, so an
 * override on the named scale (`px-sm` over `px-m`) or of a custom utility
 * replaces the component's class instead of resolving by stylesheet order.
 *
 * tailwind-variants keeps one merge function for the whole process, rebuilt
 * from the `twMergeConfig` of the last `tv()` created, so `createTV({
 * twMergeConfig })` would depend on what else is loaded (an app's own config
 * included). Merging is disabled there and done here with alouette's instance.
 */
export const tv = ((options: object, config?: object) => {
  const component = tvWithoutMerge(options, config);
  // Keeps `base`, `slots`, `variants`… readable, for `extend`.
  return Object.assign(mergeOutput(component), component);
}) as unknown as TV;
