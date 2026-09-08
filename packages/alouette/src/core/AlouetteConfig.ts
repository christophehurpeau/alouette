export type Accent = "brand" | "danger" | "info" | "success" | "warning";
export type AccentOrNeutral = Accent | "neutral";
export type AlouetteModeTheme = "dark" | "light";
export type AlouetteTheme = "dark" | "light" | `${"dark" | "light"}_${Accent}`;
