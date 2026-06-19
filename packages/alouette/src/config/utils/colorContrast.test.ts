import { describe, expect, it } from "vitest";
import { checkContrast, getContrastRatio } from "./colorContrast.ts";

describe("colorContrast", () => {
  describe("getContrastRatio", () => {
    it("should calculate correct contrast ratios", () => {
      // Black and white should have maximum contrast
      expect(Math.round(getContrastRatio("#000000", "#FFFFFF"))).toBe(21);

      // Same colors should have minimum contrast
      expect(Math.round(getContrastRatio("#444444", "#444444"))).toBe(1);

      // Known ratio for specific colors
      expect(
        Math.round(getContrastRatio("#1E88E5", "#FFFFFF") * 100) / 100,
      ).toBe(3.68);
    });
  });

  describe("checkContrast", () => {
    it("should correctly evaluate WCAG AA compliance", () => {
      expect(checkContrast("#000000", "#FFFFFF", "AA").passes).toBe(true);
      expect(checkContrast("#777777", "#999999", "AA").passes).toBe(false);
    });

    it("should be stricter for AAA level", () => {
      // Using a color that meets AA (ratio > 4.5) but fails AAA (ratio < 7)
      expect(checkContrast("#767676", "#FFFFFF", "AA").passes).toBe(true);
      expect(checkContrast("#767676", "#FFFFFF", "AAA").passes).toBe(false);
    });
  });
});
