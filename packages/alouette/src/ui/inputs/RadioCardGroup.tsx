import type { ReactNode } from "react";
import { createContext, useContext } from "react";
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
    variant: {
      list: "flex-col",
      stack: "flex-row flex-wrap",
    },
  },
  defaultVariants: { variant: "list" },
});

type RadioCardGroupVariantProps = VariantProps<typeof radioCardGroupVariants>;

export type RadioCardGroupVariant = NonNullable<
  RadioCardGroupVariantProps["variant"]
>;

const RadioCardGroupVariantContext =
  createContext<RadioCardGroupVariant>("list");

/** Lets a card size itself for the row it flows in. */
export function useRadioCardGroupVariant(): RadioCardGroupVariant {
  return useContext(RadioCardGroupVariantContext);
}

export interface RadioCardGroupProps
  extends SelectionGroupProps, RadioCardGroupVariantProps {
  className?: string;
}

export function RadioCardGroup({
  value,
  defaultValue,
  onValueChange,
  accent,
  disabled,
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

  return (
    <AccentScope accent={accent}>
      <RadioContextProvider value={context}>
        <RadioCardGroupVariantContext value={variant ?? "list"}>
          <View
            role="radiogroup"
            className={radioCardGroupVariants({ variant, className })}
            {...props}
          >
            {children}
          </View>
        </RadioCardGroupVariantContext>
      </RadioContextProvider>
    </AccentScope>
  );
}
