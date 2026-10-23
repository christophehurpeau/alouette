export type Accent = "brand" | "danger" | "info" | "success" | "warning";
export type AccentOrNeutral = Accent | "neutral";
export type AlouetteModeTheme = "dark" | "light";
export type AlouetteTheme =
  | AlouetteModeTheme
  | `${AlouetteModeTheme}_${Accent}`;
/** A stored color-mode choice: an explicit mode, or follow the system. */
export type ColorModePreference = AlouetteModeTheme | "system";
/**
 * A theme `ScopedTheme` applies. A `system` one follows the OS setting: in CSS
 * on web (`prefers-color-scheme`), so the prerendered HTML already matches it.
 */
export type AlouetteScopedTheme =
  | ColorModePreference
  | `${ColorModePreference}_${Accent}`;
