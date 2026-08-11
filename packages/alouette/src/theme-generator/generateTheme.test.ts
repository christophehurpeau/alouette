import Color from "colorjs.io";
import { describe, expect, it, vi } from "vitest";
import type { AlouetteTheme } from "../core/AlouetteConfig.ts";
import { themeVariables as defaultThemeVariables } from "../defaultThemeVariablesSrgb.ts";
import { generateTheme } from "./generateTheme.ts";

// mock Platform.OS from "react-native" to "ios" so that the default themeVariables are generated for iOS
vi.mock("react-native", async () => {
  const actual = await vi.importActual("react-native");
  return {
    ...(actual as Record<string, unknown>),
    Platform: {
      ...((actual as Record<string, unknown>).Platform as Record<
        string,
        unknown
      >),
      OS: "ios",
    },
  };
});

describe("generateTheme", () => {
  it("reproduces the committed default themeVariables exactly", () => {
    const { themeVariables } = generateTheme();
    expect(themeVariables).toStrictEqual(defaultThemeVariables);
  });

  it("emits the @theme color defaults plus the twelve theme blocks", () => {
    const { css, oklchCss } = generateTheme();
    expect(css).toContain("@theme {");
    expect(css.match(/^\s+\.[a-z_]+ \{$/gm) ?? []).toHaveLength(12);
    expect(oklchCss.match(/^\s+\.[a-z_]+ \{$/gm) ?? []).toHaveLength(12);
  });

  it("keeps the theme blocks behind a web-only feature query", () => {
    // The blocks are a className mechanism native never uses; the query is what
    // drops them from the native bundle (see nativeCompile.test.ts).
    const { css } = generateTheme();
    const [beforeSupports, insideSupports] = css.split(
      "@supports (display: contents) {",
    );

    expect(insideSupports).toBeDefined();
    expect(beforeSupports).not.toMatch(/^\s+\.[a-z_]+ \{$/m);
    expect(insideSupports!.match(/^\s+\.[a-z_]+ \{$/gm) ?? []).toHaveLength(12);
  });

  it("scopes each theme block to the themed element, never its descendants", () => {
    // Proximity must come from custom-property inheritance: a descendant
    // selector makes every themed ancestor match a nested element at the same
    // specificity, so file order decides instead of the closest theme.
    const { css, oklchCss } = generateTheme();
    expect(css).not.toMatch(/^\s+\.[a-z_]+(,| [^{]).*\{$/m);
    expect(oklchCss).not.toMatch(/^\s+\.[a-z_]+(,| [^{]).*\{$/m);
  });

  it("keeps oklch out of the base palette, and behind @supports in the overlay", () => {
    const { css, oklchCss } = generateTheme();
    expect(css).not.toContain("oklch(");
    expect(oklchCss).toContain("@supports (color: oklch(0 0 0)) {");
    expect(oklchCss).not.toContain("@theme {");
  });

  it("gives the oklch palette more chroma at the same lightness", () => {
    const { themeVariables, oklchThemeVariables } = generateTheme();
    const hex = themeVariables.light_success["--color-accent"]!;
    const oklch = oklchThemeVariables.light_success["--color-accent"]!;
    const [, lightness, chroma] =
      /^oklch\(([\d.]+) ([\d.]+) /.exec(oklch) ?? [];

    expect(Number(lightness)).toBeCloseTo(0.42, 5);
    expect(Number(chroma)).toBeGreaterThan(
      new Color(hex).to("oklch").coords[1]!,
    );
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
