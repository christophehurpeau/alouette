import type { Provider, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { useControllableValue } from "../../core/useControllableValue";

/** Row of chips (the default) or a column of full-width ones. */
export type SegmentedOrientation = "horizontal" | "vertical";

export interface SelectionContextValue {
  value: string | undefined;
  onSelect: (value: string) => void;
  disabled?: boolean;
  /** Tighter horizontal padding, for a group holding many options. */
  compact?: boolean;
  orientation?: SegmentedOrientation;
  /** The bar fills its container and its items share that width. */
  stretch?: boolean;
}

export interface SelectionGroupProps {
  /** Controlled selected value. */
  value?: string;
  /** Initial value for uncontrolled usage. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  accent?: Accent;
  disabled?: boolean;
  "aria-labelledby"?: string;
  children: ReactNode;
}

interface SelectionContext {
  SelectionContextProvider: Provider<SelectionContextValue | undefined>;
  useSelection: () => SelectionContextValue;
}

/** One context per group family, so a misplaced child gets a precise error. */
export function createSelectionContext(
  missingProviderMessage: string,
): SelectionContext {
  const Context = createContext<SelectionContextValue | undefined>(undefined);
  return {
    SelectionContextProvider: Context.Provider,
    useSelection: () => {
      const context = useContext(Context);
      if (!context) {
        throw new Error(missingProviderMessage);
      }
      return context;
    },
  };
}

export interface SelectionValueProps extends Pick<
  SelectionGroupProps,
  "defaultValue" | "disabled" | "onValueChange" | "value"
> {
  compact?: boolean;
  orientation?: SegmentedOrientation;
  stretch?: boolean;
}

export function useSelectionValue({
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled,
  compact,
  orientation,
  stretch,
}: SelectionValueProps): SelectionContextValue {
  const [value, onSelect] = useControllableValue({
    value: controlledValue,
    defaultValue,
    onValueChange,
  });
  return useMemo(
    () => ({ value, onSelect, disabled, compact, orientation, stretch }),
    [value, onSelect, disabled, compact, orientation, stretch],
  );
}
