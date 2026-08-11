import Color from "colorjs.io";
import { describe, expect, it } from "vitest";
import { createOklchScale, maxChroma } from "./createColorScale.ts";
import { defaultPaletteSpecs } from "./paletteSpecs.ts";

describe("maxChroma", () => {
  it("finds more chroma in display-p3 than in sRGB", () => {
    const params = { lightness: 0.48, hue: 145 };

    expect(maxChroma({ ...params, gamut: "p3" })).toBeGreaterThan(
      maxChroma({ ...params, gamut: "srgb" }),
    );
  });

  it("stays inside the gamut it was asked for", () => {
    for (const gamut of ["srgb", "p3"] as const) {
      const chroma = maxChroma({ lightness: 0.6, hue: 25, gamut });
      const space = gamut === "p3" ? "p3" : "srgb";

      expect(new Color("oklch", [0.6, chroma, 25]).to(space).inGamut()).toBe(
        true,
      );
    }
  });
});

describe("createOklchScale", () => {
  it("keeps the lightness ramp identical across gamuts", () => {
    const srgb = createOklchScale(defaultPaletteSpecs.danger, "light", "srgb");
    const p3 = createOklchScale(defaultPaletteSpecs.danger, "light", "p3");

    for (const step of Object.keys(srgb) as unknown as (keyof typeof srgb)[]) {
      expect(p3[step].lightness).toBe(srgb[step].lightness);
      expect(p3[step].hue).toBe(srgb[step].hue);
      expect(p3[step].chroma).toBeGreaterThan(srgb[step].chroma);
    }
  });

  it("leaves grayscale achromatic in both gamuts", () => {
    for (const gamut of ["srgb", "p3"] as const) {
      const scale = createOklchScale(
        defaultPaletteSpecs.grayscale,
        "dark",
        gamut,
      );

      expect(Object.values(scale).every(({ chroma }) => chroma === 0)).toBe(
        true,
      );
    }
  });
});
