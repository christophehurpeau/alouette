import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { type ColorModePreference } from "../../core/useColorMode";
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
export declare function ColorModePicker({ value, defaultValue, onValueChange, variant, accent, disabled, "aria-label": ariaLabel, lightLabel, darkLabel, systemLabel, followingSystemLabel, }: ColorModePickerProps): ReactNode;
//# sourceMappingURL=ColorModePicker.d.ts.map