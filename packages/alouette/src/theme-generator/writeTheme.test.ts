import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { ThemeVariablesMap } from "../core/NativeThemeVariablesContext.ts";
import { generateTheme } from "./generateTheme.ts";
import { writeTheme } from "./writeTheme.ts";

describe("writeTheme", () => {
  let outDir: string;

  beforeEach(() => {
    outDir = mkdtempSync(join(tmpdir(), "alouette-write-theme-"));
  });

  afterEach(() => {
    rmSync(outDir, { recursive: true, force: true });
  });

  it("writes every half from the same generated palette", () => {
    const overrides = { brand: { type: "accent", hue: 300 } } as const;
    const { cssPath, oklchCssPath, themeVariablesPath } = writeTheme({
      outDir,
      overrides,
    });
    const { css, oklchCss, themeVariables } = generateTheme(overrides);

    expect(readFileSync(cssPath, "utf8")).toContain(css);
    expect(readFileSync(oklchCssPath!, "utf8")).toContain(oklchCss);
    const contents = readFileSync(themeVariablesPath, "utf8");
    for (const [theme, themeVars] of Object.entries(themeVariables)) {
      expect(contents).toContain(`  ${theme}: {`);
      for (const [name, value] of Object.entries(themeVars)) {
        expect(contents).toContain(`"${name}": "${value}"`);
      }
    }
  });

  it("writes the themeVariables map in hex only, never oklch", () => {
    const { themeVariablesPath } = writeTheme({ outDir });

    expect(readFileSync(themeVariablesPath, "utf8")).not.toContain("oklch(");
    expect(() => readFileSync(join(outDir, "themeVariables.web.ts"))).toThrow();
  });

  it("keeps oklch out of palette.css, in its own opt-in file", () => {
    const { cssPath, oklchCssPath } = writeTheme({ outDir });

    expect(oklchCssPath).toBe(join(outDir, "palette-oklch.css"));
    expect(readFileSync(cssPath, "utf8")).not.toContain("oklch(");
    expect(readFileSync(oklchCssPath!, "utf8")).toContain("oklch(");
  });

  it("skips the oklch overlay when srgbOnly is set", () => {
    const { oklchCssPath } = writeTheme({ outDir, srgbOnly: true });

    expect(oklchCssPath).toBeUndefined();
    expect(() => readFileSync(join(outDir, "palette-oklch.css"))).toThrow();
  });

  it("emits theme keys unquoted, as a formatter would leave them", () => {
    const { themeVariablesPath } = writeTheme({ outDir });
    const contents = readFileSync(themeVariablesPath, "utf8");

    expect(contents).toContain("  light_brand: {");
    expect(contents).not.toContain('"light_brand"');
    expect(contents).toContain("/* eslint-disable camelcase */");
  });

  it("names the files palette.css and themeVariables.ts by default", () => {
    const { cssPath, themeVariablesPath } = writeTheme({ outDir });

    expect(cssPath).toBe(join(outDir, "palette.css"));
    expect(themeVariablesPath).toBe(join(outDir, "themeVariables.ts"));
  });

  it("emits a themeVariables module typed against the public map type", () => {
    // The emitted file annotates the map as ThemeVariablesMap; that annotation
    // only holds if the generated value is assignable to it.
    const map: ThemeVariablesMap = generateTheme().themeVariables;
    expect(Object.keys(map)).toContain("light_brand");

    const { themeVariablesPath } = writeTheme({ outDir });
    const contents = readFileSync(themeVariablesPath, "utf8");

    expect(contents).toContain(
      'import type { ThemeVariablesMap } from "alouette";',
    );
    expect(contents).toContain(
      "export const themeVariables: ThemeVariablesMap = {",
    );
    expect(contents).toContain("DO NOT EDIT");
  });

  it("creates a missing outDir", () => {
    const nested = join(outDir, "generated", "theme");
    const { cssPath } = writeTheme({ outDir: nested });

    expect(readFileSync(cssPath, "utf8")).toContain("@theme {");
  });
});
