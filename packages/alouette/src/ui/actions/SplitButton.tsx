import { CaretDownRegularIcon } from "alouette-icons/phosphor-icons/CaretDown";
import { type ReactNode, useMemo } from "react";
import type { AccentOrNeutral } from "../../core/AlouetteConfig";
import { useAccentOrInheritedOrBrand } from "../../core/ThemeContext";
import { tv } from "../../core/tv";
import { useControllableValue } from "../../core/useControllableValue";
import { Icon } from "../primitives/Icon";
import { View } from "../primitives/View";
import {
  Button,
  type ButtonProps,
  type ButtonSize,
  type ButtonState,
} from "./Button";
import { Menu } from "./Menu";
import { PressableBox } from "./PressableBox";
import {
  SplitButtonContextProvider,
  type SplitButtonContextValue,
} from "./SplitButtonContext";

// The radius of each segment's inner edge is dropped after the pill radius
// `Button` and `PressableBox` set: a side utility sorts after the shorthand.
const splitButtonVariants = tv({
  slots: {
    group: "flex-row items-stretch self-start",
    main: "rounded-r-none",
    caret: "flex-center rounded-full rounded-l-none",
    caretIcon: "",
  },
  variants: {
    size: {
      sm: { caret: "pl-xxs pr-xs min-w-control-sm min-h-control-sm" },
      md: { caret: "pl-xxs pr-xs min-w-control-md min-h-control-md" },
      lg: { caret: "pl-xs pr-sm min-w-[48px] min-h-control-lg" },
    },
    // The divider is the caret's left border. An outlined caret leans on the
    // main button's right border instead: two side by side would double it.
    variant: {
      tonal: { caret: "border-l border-border-muted" },
      filled: { caret: "border-l" },
      outlined: { caret: "border-l-0" },
    },
    disabled: { true: {}, false: {} },
  },
  compoundVariants: [
    // One shadow for the whole pill: the segments drop theirs (`raised`),
    // since each one's would fall on the other at the joint.
    {
      variant: "tonal",
      disabled: false,
      class: { group: "rounded-full shadow-s", caretIcon: "text-on-tonal" },
    },
    // The fill carries a light ink, so the divider takes it too.
    {
      variant: "filled",
      disabled: false,
      class: {
        caret: "border-on-accent-muted",
        caretIcon: "text-on-accent",
      },
    },
    {
      variant: "filled",
      disabled: true,
      class: { caret: "border-border-muted" },
    },
    {
      variant: "outlined",
      disabled: false,
      class: { caretIcon: "text-sharp" },
    },
    {
      variant: ["tonal", "filled"],
      disabled: true,
      class: { caretIcon: "text-disabled-sharp" },
    },
    {
      variant: "outlined",
      disabled: true,
      class: { caretIcon: "text-disabled-muted" },
    },
  ],
  defaultVariants: { size: "md", variant: "tonal", disabled: false },
});

const caretIconSize: Record<ButtonSize, number> = { sm: 16, md: 20, lg: 24 };

export type SplitButtonVariant = Exclude<
  NonNullable<ButtonProps["variant"]>,
  "soft"
>;

interface SplitButtonBaseProps {
  /** Names the group, the caret and the menu it opens ("Merge method"). */
  menuLabel: string;
  /** Picking an option in the menu selects it; it does not run it. */
  onValueChange?: (value: string) => void;
  /** Runs the selected option, from the main button. */
  onPress: (value: string) => void;
  /** Defaults to `tonal`. No `soft`: a text button has no ground to split. */
  variant?: SplitButtonVariant;
  size?: ButtonSize;
  /** Defaults to the inherited accent, or `brand` outside an accent scope. */
  accent?: AccentOrNeutral;
  disabled?: boolean;
  /** The main button's state; the caret is disabled while it is set. */
  state?: ButtonState;
  /** `SplitButtonOption`s only: they also render as the main button's label. */
  children: ReactNode;
}

// The main button's label is the selected option's, so there is always one,
// and it must name one of the options.
export interface SplitButtonControlledProps extends SplitButtonBaseProps {
  value: string;
  defaultValue?: never;
}

export interface SplitButtonUncontrolledProps extends SplitButtonBaseProps {
  value?: never;
  defaultValue: string;
}

export type SplitButtonProps =
  | SplitButtonControlledProps
  | SplitButtonUncontrolledProps;

/**
 * A button that runs one of several actions, with a caret opening the menu
 * that picks which: the main button always shows and runs the selected one.
 */
export function SplitButton({
  menuLabel,
  value: controlledValue,
  defaultValue,
  onValueChange,
  onPress,
  variant = "tonal",
  size = "md",
  accent: accentProp,
  disabled,
  state,
  children,
}: SplitButtonProps): ReactNode {
  const accent = useAccentOrInheritedOrBrand(accentProp);
  const [value, onSelect] = useControllableValue({
    value: controlledValue,
    defaultValue,
    onValueChange,
  });
  const labelContext = useMemo<SplitButtonContextValue>(
    () => ({ value, onSelect, slot: "label" }),
    [value, onSelect],
  );
  const menuContext = useMemo<SplitButtonContextValue>(
    () => ({ value, onSelect, slot: "menu" }),
    [value, onSelect],
  );

  const isCaretDisabled = disabled === true || state != null;
  const styles = splitButtonVariants({
    size,
    variant,
    disabled: isCaretDisabled,
  });

  return (
    <View role="group" aria-label={menuLabel} className={styles.group()}>
      <Button
        accent={accent}
        variant={variant}
        size={size}
        disabled={disabled}
        state={state}
        raised={false}
        // An outer ring would pass under the adjoining segment.
        withFocusVisibleOutline="inset"
        className={styles.main()}
        text={
          <SplitButtonContextProvider value={labelContext}>
            {children}
          </SplitButtonContextProvider>
        }
        onPress={() => {
          if (value !== undefined) onPress(value);
        }}
      />
      <Menu
        label={menuLabel}
        render={(trigger) => (
          <PressableBox
            aria-label={menuLabel}
            accent={accent}
            variant={variant}
            disabled={isCaretDisabled}
            raised={false}
            withFocusVisibleOutline="inset"
            className={styles.caret()}
            {...trigger}
          >
            <Icon
              icon={<CaretDownRegularIcon />}
              size={caretIconSize[size]}
              className={styles.caretIcon()}
            />
          </PressableBox>
        )}
      >
        <SplitButtonContextProvider value={menuContext}>
          {children}
        </SplitButtonContextProvider>
      </Menu>
    </View>
  );
}
