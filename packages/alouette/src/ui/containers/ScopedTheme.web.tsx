import type { ReactNode } from "react";
import { ThemeContext } from "../../core/ThemeContext";
import type { ScopedThemeProps } from "./ScopedTheme";

export function ScopedTheme({ theme, children }: ScopedThemeProps): ReactNode {
  return (
    <ThemeContext.Provider value={theme}>
      <div data-theme={theme} className={theme} style={{ display: "contents" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
