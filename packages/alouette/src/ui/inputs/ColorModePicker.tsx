import { DesktopDuotoneIcon } from "alouette-icons/phosphor-icons/DesktopDuotoneIcon";
import { DesktopRegularIcon } from "alouette-icons/phosphor-icons/DesktopRegularIcon";
import { MoonDuotoneIcon } from "alouette-icons/phosphor-icons/MoonDuotoneIcon";
import { MoonRegularIcon } from "alouette-icons/phosphor-icons/MoonRegularIcon";
import { SunDuotoneIcon } from "alouette-icons/phosphor-icons/SunDuotoneIcon";
import { SunRegularIcon } from "alouette-icons/phosphor-icons/SunRegularIcon";
import type { ReactNode } from "react";
import type { Accent, AlouetteModeTheme } from "../../core/AlouetteConfig";
import {
  type ColorModePreference,
  useSystemColorMode,
} from "../../core/useColorMode";
import { useControllableValue } from "../../core/useControllableValue";
import type { SVGIconElement } from "../primitives/Icon";
import { RadioButton } from "./RadioButton";
import { RadioButtonGroup } from "./RadioButtonGroup";

/**
 * `system-lock` (the default) offers light and dark only, and folds `system`
 * into the chip it resolves to: while the preference is `system` that chip keeps
 * its sun or moon and adds the desktop badge, and pressing it locks the mode
 * (pressing it again follows the system again). Coming back to it from the other
 * chip follows the system instead of locking the same mode by hand. The one the
 * system does not supply has nothing to follow, so it only ever locks.
 *
 * `with-system` offers light, dark and system as three chips instead.
 */
export type ColorModePickerVariant = "system-lock" | "with-system";

interface ColorModeOptionProps {
  mode: AlouetteModeTheme;
  label: string;
  /** Badge marking this chip as the one the system supplies. */
  indicator?: SVGIconElement;
  onPress: () => void;
}

function ColorModeOption({
  mode,
  label,
  indicator,
  onPress,
}: ColorModeOptionProps): ReactNode {
  if (mode === "dark") {
    return (
      <RadioButton
        value="dark"
        label={label}
        icon={<MoonRegularIcon />}
        activeIcon={<MoonDuotoneIcon />}
        indicator={indicator}
        onPress={onPress}
      />
    );
  }
  return (
    <RadioButton
      value="light"
      label={label}
      icon={<SunRegularIcon />}
      activeIcon={<SunDuotoneIcon />}
      indicator={indicator}
      onPress={onPress}
    />
  );
}

interface SystemColorModeOptionProps {
  /** `system` in `with-system`; the mode the system supplies in `system-lock`. */
  value: ColorModePreference;
  label: string;
  onPress: () => void;
}

function SystemColorModeOption({
  value,
  label,
  onPress,
}: SystemColorModeOptionProps): ReactNode {
  return (
    <RadioButton
      value={value}
      label={label}
      icon={<DesktopRegularIcon />}
      activeIcon={<DesktopDuotoneIcon />}
      onPress={onPress}
    />
  );
}

interface ColorModeLockOptionProps {
  mode: AlouetteModeTheme;
  label: string;
  /** This chip is the one the system supplies and the preference is `system`. */
  followsSystem: boolean;
  followingSystemLabel: (modeLabel: string) => string;
  onPress: () => void;
}

function ColorModeLockOption({
  mode,
  label,
  followsSystem,
  followingSystemLabel,
  onPress,
}: ColorModeLockOptionProps): ReactNode {
  // The glyph never changes: following the system only adds the badge, and says
  // so in the accessible name — the badge itself is decorative.
  return (
    <ColorModeOption
      mode={mode}
      label={followsSystem ? followingSystemLabel(label) : label}
      indicator={followsSystem ? <DesktopRegularIcon /> : undefined}
      onPress={onPress}
    />
  );
}

interface NextLockPreferenceParams {
  mode: AlouetteModeTheme;
  preference: ColorModePreference;
  resolvedMode: AlouetteModeTheme;
  systemMode: AlouetteModeTheme;
}

function nextLockPreference({
  mode,
  preference,
  resolvedMode,
  systemMode,
}: NextLockPreferenceParams): ColorModePreference {
  // Switching to the other chip: the one the system supplies follows it rather
  // than locking the same mode by hand — locking it is what a second press is
  // for. The other chip locks, having nothing to follow.
  if (mode !== resolvedMode) return mode === systemMode ? "system" : mode;
  // Pressing the chip already in effect toggles the lock, and only on the one
  // the system supplies — the other has nothing to follow.
  if (mode !== systemMode) return mode;
  return preference === "system" ? mode : "system";
}

export interface ColorModePickerProps {
  /** Controlled preference. */
  value?: ColorModePreference;
  /** Initial preference for uncontrolled usage. Defaults to `system`. */
  defaultValue?: ColorModePreference;
  onValueChange?: (value: ColorModePreference) => void;
  variant?: ColorModePickerVariant;
  accent?: Accent;
  disabled?: boolean;
  /** Accessible name of the group. */
  "aria-label"?: string;
  lightLabel?: string;
  darkLabel?: string;
  /** Name of the system chip, in `with-system`. */
  systemLabel?: string;
  /** Name of the chip the system currently supplies, in `system-lock`. */
  followingSystemLabel?: (modeLabel: string) => string;
}

/**
 * Light/dark picker: a pill of icon-only chips over the stored
 * `ColorModePreference`. It only reports the choice — the app applies it, by
 * passing `useResolvedColorMode(preference)` to a `ScopedTheme`.
 */
export function ColorModePicker({
  value,
  defaultValue = "system",
  onValueChange,
  variant = "system-lock",
  accent,
  disabled,
  "aria-label": ariaLabel = "Color mode",
  lightLabel = "Light",
  darkLabel = "Dark",
  systemLabel = "System",
  followingSystemLabel = (modeLabel) => `${modeLabel} (system)`,
}: ColorModePickerProps): ReactNode {
  const [preference = "system", setPreference] =
    useControllableValue<ColorModePreference>({
      value,
      defaultValue,
      onValueChange,
    });
  const systemMode = useSystemColorMode();

  if (variant === "system-lock") {
    const resolvedMode = preference === "system" ? systemMode : preference;
    const pressLock = (mode: AlouetteModeTheme) => () => {
      setPreference(
        nextLockPreference({ mode, preference, resolvedMode, systemMode }),
      );
    };

    return (
      // The group tracks the mode in effect, not the preference: `system` has no
      // chip of its own here, it shows as the chip it resolves to.
      <RadioButtonGroup
        variant="icon"
        aria-label={ariaLabel}
        accent={accent}
        disabled={disabled}
        value={resolvedMode}
      >
        <ColorModeLockOption
          mode="light"
          label={lightLabel}
          followsSystem={preference === "system" && systemMode === "light"}
          followingSystemLabel={followingSystemLabel}
          onPress={pressLock("light")}
        />
        <ColorModeLockOption
          mode="dark"
          label={darkLabel}
          followsSystem={preference === "system" && systemMode === "dark"}
          followingSystemLabel={followingSystemLabel}
          onPress={pressLock("dark")}
        />
      </RadioButtonGroup>
    );
  }

  return (
    <RadioButtonGroup
      variant="icon"
      aria-label={ariaLabel}
      accent={accent}
      disabled={disabled}
      value={preference}
    >
      <ColorModeOption
        mode="light"
        label={lightLabel}
        onPress={() => {
          setPreference("light");
        }}
      />
      <ColorModeOption
        mode="dark"
        label={darkLabel}
        onPress={() => {
          setPreference("dark");
        }}
      />
      <SystemColorModeOption
        value="system"
        label={systemLabel}
        onPress={() => {
          setPreference("system");
        }}
      />
    </RadioButtonGroup>
  );
}
