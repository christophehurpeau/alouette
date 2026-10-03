import {
  EyeDuotoneIcon,
  EyeRegularIcon,
} from "alouette-icons/phosphor-icons/Eye";
import {
  EyeSlashDuotoneIcon,
  EyeSlashRegularIcon,
} from "alouette-icons/phosphor-icons/EyeSlash";
import type { ReactNode } from "react";
import { useControllableChecked } from "../../core/useControllableChecked";
import { IconButton } from "../actions/IconButton";
import { InputText, type InputTextProps } from "./InputText";

export interface InputPasswordProps extends Omit<
  InputTextProps,
  "endSlot" | "mode" | "multiline" | "secureTextEntry"
> {
  /** Controlled: the password shows in clear. */
  visible?: boolean;
  /** Initial state for uncontrolled usage. Defaults to hidden. */
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  /**
   * Accessible name of the eye toggle. It never changes: the toggle is
   * `aria-pressed` while the password shows. Defaults to "Show password".
   */
  toggleLabel?: string;
}

/**
 * `InputText` in `password` mode with an eye toggle in its `endSlot` to show
 * what was typed. `autoComplete` is `current-password` from the mode; pass
 * `autoComplete="new-password"` on a sign-up form.
 */
export function InputPassword({
  visible: controlledVisible,
  defaultVisible,
  onVisibleChange,
  toggleLabel = "Show password",
  disabled,
  ...props
}: InputPasswordProps): ReactNode {
  const [visible, setVisible] = useControllableChecked({
    checked: controlledVisible,
    defaultChecked: defaultVisible,
    onValueChange: onVisibleChange,
  });
  // react-native's types have no `aria-pressed` (its accessibilityState has no
  // pressed), but react-native-web forwards it and native ignores it.
  const ariaPressedProps = { "aria-pressed": visible };
  return (
    <InputText
      mode="password"
      secureTextEntry={!visible}
      // A revealed password is still a password: no capitalization, and no
      // autocorrect rewriting it.
      autoCapitalize="none"
      autoCorrect={false}
      disabled={disabled}
      endSlot={
        <IconButton
          variant="soft"
          size="sm"
          icon={visible ? <EyeSlashRegularIcon /> : <EyeRegularIcon />}
          activeIcon={visible ? <EyeSlashDuotoneIcon /> : <EyeDuotoneIcon />}
          aria-label={toggleLabel}
          {...ariaPressedProps}
          disabled={disabled}
          onPress={() => {
            setVisible(!visible);
          }}
        />
      }
      {...props}
    />
  );
}
