import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import { AccentScope } from "../containers/AccentScope";
import { View } from "../primitives/View";
import {
  type MultiSelectionGroupProps,
  useMultiSelectionValue,
} from "../selection/MultiSelectionContext";
import { CheckboxContextProvider } from "./CheckboxContext";

const checkboxCardGroupVariants = tv({
  base: "gap-xs",
  variants: {
    layout: {
      list: "flex-col",
      stack: "flex-row flex-wrap",
    },
  },
  defaultVariants: { layout: "list" },
});

type CheckboxCardGroupVariantProps = VariantProps<
  typeof checkboxCardGroupVariants
>;

export type CheckboxCardGroupLayout = NonNullable<
  CheckboxCardGroupVariantProps["layout"]
>;

export type CheckboxCardGroupVariant = "contained" | "outlined";

interface CheckboxCardGroupAppearance {
  layout: CheckboxCardGroupLayout;
  variant: CheckboxCardGroupVariant;
}

const CheckboxCardGroupAppearanceContext =
  createContext<CheckboxCardGroupAppearance>({
    layout: "list",
    variant: "contained",
  });

/** Lets a card size itself for the row it flows in and take the group's material. */
export function useCheckboxCardGroupAppearance(): CheckboxCardGroupAppearance {
  return useContext(CheckboxCardGroupAppearanceContext);
}

export interface CheckboxCardGroupProps
  extends MultiSelectionGroupProps, CheckboxCardGroupVariantProps {
  /** The material every card shares: a checked card takes the accent, the
   * others the neutral theme. */
  variant?: CheckboxCardGroupVariant;
  className?: string;
}

export function CheckboxCardGroup({
  values,
  defaultValues,
  onValuesChange,
  accent,
  disabled,
  layout,
  variant,
  className,
  children,
  ...props
}: CheckboxCardGroupProps): ReactNode {
  const context = useMultiSelectionValue({
    values,
    defaultValues,
    onValuesChange,
    disabled,
  });
  const appearance = useMemo(
    () => ({ layout: layout ?? "list", variant: variant ?? "contained" }),
    [layout, variant],
  );

  return (
    <AccentScope accent={accent}>
      <CheckboxContextProvider value={context}>
        <CheckboxCardGroupAppearanceContext value={appearance}>
          <View
            role="group"
            className={checkboxCardGroupVariants({ layout, className })}
            {...props}
          >
            {children}
          </View>
        </CheckboxCardGroupAppearanceContext>
      </CheckboxContextProvider>
    </AccentScope>
  );
}
