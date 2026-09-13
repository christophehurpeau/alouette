import type { Provider, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { useControllableValues } from "../../core/useControllableValues";
import type { SegmentedVariant } from "./SelectionContext";

export interface MultiSelectionContextValue {
  values: readonly string[];
  onToggle: (value: string) => void;
  disabled?: boolean;
  /** Tighter horizontal padding, for a group holding many options. */
  compact?: boolean;
  variant?: SegmentedVariant;
}

export interface MultiSelectionGroupProps {
  /** Controlled checked values. */
  values?: readonly string[];
  /** Initial checked values for uncontrolled usage. */
  defaultValues?: readonly string[];
  onValuesChange?: (values: string[]) => void;
  accent?: Accent;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
}

interface MultiSelectionContext {
  MultiSelectionContextProvider: Provider<
    MultiSelectionContextValue | undefined
  >;
  useMultiSelection: () => MultiSelectionContextValue;
  /** For a child that also renders outside any group (a standalone Checkbox). */
  useOptionalMultiSelection: () => MultiSelectionContextValue | undefined;
}

/** One context per group family, so a misplaced child gets a precise error. */
export function createMultiSelectionContext(
  missingProviderMessage: string,
): MultiSelectionContext {
  const Context = createContext<MultiSelectionContextValue | undefined>(
    undefined,
  );
  return {
    MultiSelectionContextProvider: Context.Provider,
    useMultiSelection: () => {
      const context = useContext(Context);
      if (!context) {
        throw new Error(missingProviderMessage);
      }
      return context;
    },
    useOptionalMultiSelection: () => useContext(Context),
  };
}

export interface MultiSelectionValueProps extends Pick<
  MultiSelectionGroupProps,
  "defaultValues" | "disabled" | "onValuesChange" | "values"
> {
  compact?: boolean;
  variant?: SegmentedVariant;
}

export function useMultiSelectionValue({
  values: controlledValues,
  defaultValues,
  onValuesChange,
  disabled,
  compact,
  variant,
}: MultiSelectionValueProps): MultiSelectionContextValue {
  const [values, onToggle] = useControllableValues({
    values: controlledValues,
    defaultValues,
    onValuesChange,
  });
  return useMemo(
    () => ({ values, onToggle, disabled, compact, variant }),
    [values, onToggle, disabled, compact, variant],
  );
}
