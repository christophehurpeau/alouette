import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import { AccentScope } from "../containers/AccentScope";
import { View } from "../primitives/View";
import {
  type SelectionGroupProps,
  useSelectionValue,
} from "../selection/SelectionContext";
import { RadioContextProvider } from "./RadioContext";

const radioCardGroupVariants = tv({
  base: "gap-xs",
  variants: {
    layout: {
      list: "flex-col",
      stack: "flex-row flex-wrap",
    },
  },
  defaultVariants: { layout: "list" },
});

type RadioCardGroupVariantProps = VariantProps<typeof radioCardGroupVariants>;

export type RadioCardGroupLayout = NonNullable<
  RadioCardGroupVariantProps["layout"]
>;

export type RadioCardGroupVariant = "contained" | "outlined";

interface RadioCardGroupAppearance {
  layout: RadioCardGroupLayout;
  variant: RadioCardGroupVariant;
}

const RadioCardGroupAppearanceContext = createContext<RadioCardGroupAppearance>(
  { layout: "list", variant: "contained" },
);

/** Lets a card size itself for the row it flows in and take the group's material. */
export function useRadioCardGroupAppearance(): RadioCardGroupAppearance {
  return useContext(RadioCardGroupAppearanceContext);
}

export interface RadioCardGroupProps
  extends SelectionGroupProps, RadioCardGroupVariantProps {
  /** The material every card shares: the selected card takes the accent, the
   * others the neutral theme. */
  variant?: RadioCardGroupVariant;
  className?: string;
}

export function RadioCardGroup({
  value,
  defaultValue,
  onValueChange,
  accent,
  disabled,
  layout,
  variant,
  className,
  children,
  ...props
}: RadioCardGroupProps): ReactNode {
  const context = useSelectionValue({
    value,
    defaultValue,
    onValueChange,
    disabled,
  });
  const appearance = useMemo(
    () => ({ layout: layout ?? "list", variant: variant ?? "contained" }),
    [layout, variant],
  );

  return (
    <AccentScope accent={accent}>
      <RadioContextProvider value={context}>
        <RadioCardGroupAppearanceContext value={appearance}>
          <View
            role="radiogroup"
            className={radioCardGroupVariants({ layout, className })}
            {...props}
          >
            {children}
          </View>
        </RadioCardGroupAppearanceContext>
      </RadioContextProvider>
    </AccentScope>
  );
}
