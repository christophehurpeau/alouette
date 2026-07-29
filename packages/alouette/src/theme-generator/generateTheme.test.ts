import { describe, expect, it } from "vitest";
import type { AlouetteTheme } from "../core/AlouetteConfig.ts";
import { themeVariables as defaultThemeVariables } from "../defaultThemeVariables.ts";
import { generateTheme } from "./generateTheme.ts";

describe("generateTheme", () => {
  it("reproduces the committed default themeVariables exactly", () => {
    const { themeVariables } = generateTheme();
    expect(themeVariables).toStrictEqual(defaultThemeVariables);
  });

  it("emits the @theme color defaults plus the twelve theme blocks", () => {
    const { css } = generateTheme();
    expect(css).toContain("@theme {");
    const whereBlocks = css.match(/:where\(\.[a-z_]+,/g) ?? [];
    expect(whereBlocks).toHaveLength(12);
  });

  it("re-colors only the overridden accent, leaving the rest identical", () => {
    const { themeVariables } = generateTheme({
      brand: { type: "accent", hue: 300 },
    });
    const themes = Object.keys(defaultThemeVariables) as AlouetteTheme[];

    for (const theme of themes) {
      if (theme.includes("brand")) {
        expect(
          themeVariables[theme],
          `${theme} should change`,
        ).not.toStrictEqual(defaultThemeVariables[theme]);
      } else {
        expect(
          themeVariables[theme],
          `${theme} should be unchanged`,
        ).toStrictEqual(defaultThemeVariables[theme]);
      }
    }
  });

  it("leaves grayscale base tokens untouched when an accent is overridden", () => {
    const { themeVariables } = generateTheme({
      brand: { type: "accent", hue: 300 },
    });
    // The base light/dark themes carry only grayscale-sourced tokens.
    expect(themeVariables.light).toStrictEqual(defaultThemeVariables.light);
    expect(themeVariables.dark).toStrictEqual(defaultThemeVariables.dark);
  });
});
