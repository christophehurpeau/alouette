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

  it("emits the @theme color defaults plus the theme blocks", () => {
    // Twelve explicit themes, then the six system ones twice: light, and dark
    // under the media query.
    const { css, oklchCss } = generateTheme();
    expect(css).toContain("@theme {");
    expect(css.match(/^\s+\.[a-z_]+ \{$/gm) ?? []).toHaveLength(24);
    expect(oklchCss.match(/^\s+\.[a-z_]+ \{$/gm) ?? []).toHaveLength(24);
  });

  it("keeps the theme blocks behind a web-only feature query", () => {
    // The blocks are a className mechanism native never uses; the query is what
    // drops them from the native bundle (see nativeCompile.test-skip.ts).
    const { css } = generateTheme();
    const [beforeSupports, insideSupports] = css.split(
      "@supports (display: contents) {",
    );

    expect(insideSupports).toBeDefined();
    expect(beforeSupports).not.toMatch(/^\s+\.[a-z_]+ \{$/m);
    expect(insideSupports!.match(/^\s+\.[a-z_]+ \{$/gm) ?? []).toHaveLength(24);
  });

  it("resolves the system themes and the root in CSS, leaving explicit ones out of the media query", () => {
    const { css, oklchCss, themeVariables } = generateTheme();
    for (const palette of [css, oklchCss]) {
      const [outsideMedia, insideMedia] = palette.split(
        "@media (prefers-color-scheme: dark) {",
      );
      const selectorsIn = (part: string | undefined): string[] =>
        (part?.match(/^\s+[.:][^\s{]+ \{$/gm) ?? []).map((line) =>
          line.trim().slice(0, -2),
        );

      expect(selectorsIn(insideMedia)).toStrictEqual([
        ":root:has(.system)",
        ".system",
        ".system_brand",
        ".system_info",
        ".system_success",
        ".system_warning",
        ".system_danger",
      ]);
      expect(selectorsIn(outsideMedia)).toContain(".system_brand");
      expect(selectorsIn(outsideMedia)).toContain(".dark_brand");
    }

    const blockOf = (selector: string, part: string): string =>
      part.slice(part.indexOf(`${selector} {`)).split("}")[0]!;
    const [outsideMedia, insideMedia] = css.split(
      "@media (prefers-color-scheme: dark) {",
    );
    const screenOf = (block: string): string | undefined =>
      /--color-screen: (#[\da-f]+);/.exec(block)?.[1];
    expect(screenOf(blockOf(".system", outsideMedia!))).toBe(
      themeVariables.light["--color-screen"]!.toLowerCase(),
    );
    expect(screenOf(blockOf(".system", insideMedia!))).toBe(
      themeVariables.dark["--color-screen"]!.toLowerCase(),
    );
    expect(screenOf(blockOf(":root:has(.system)", insideMedia!))).toBe(
      themeVariables.dark["--color-screen"]!.toLowerCase(),
    );
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

  it("tunes the shadow colors per mode, and accents keep their mode's", () => {
    const { themeVariables } = generateTheme();
    const shadowVars = (theme: AlouetteTheme): Record<string, string> =>
      Object.fromEntries(
        Object.entries(themeVariables[theme]).filter(([name]) =>
          name.includes("shadow"),
        ),
      );

    expect(Object.keys(shadowVars("light"))).not.toHaveLength(0);
    expect(shadowVars("dark")).not.toStrictEqual(shadowVars("light"));
    expect(shadowVars("light_danger")).toStrictEqual(shadowVars("light"));
    expect(shadowVars("dark_danger")).toStrictEqual(shadowVars("dark"));
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
