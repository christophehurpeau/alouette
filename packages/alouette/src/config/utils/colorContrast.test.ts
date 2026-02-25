import assert from "node:assert/strict";
import { test } from "node:test";
import { checkContrast, getContrastRatio } from "./colorContrast.ts";

test("colorContrast", async (t) => {
  await t.test("getContrastRatio", async (t) => {
    await t.test("should calculate correct contrast ratios", () => {
      // Black and white should have maximum contrast
      assert.equal(Math.round(getContrastRatio("#000000", "#FFFFFF")), 21);

      // Same colors should have minimum contrast
      assert.equal(Math.round(getContrastRatio("#444444", "#444444")), 1);

      // Known ratio for specific colors
      assert.equal(
        Math.round(getContrastRatio("#1E88E5", "#FFFFFF") * 100) / 100,
        3.68,
      );
    });
  });

  await t.test("checkContrast", async (t) => {
    await t.test("should correctly evaluate WCAG AA compliance", () => {
      const blackOnWhite = checkContrast("#000000", "#FFFFFF", "AA");
      assert.equal(blackOnWhite.passes, true);

      const lowContrast = checkContrast("#777777", "#999999", "AA");
      assert.equal(lowContrast.passes, false);
    });

    await t.test("should be stricter for AAA level", () => {
      // Using a color that meets AA (ratio > 4.5) but fails AAA (ratio < 7)
      const mediumContrast = checkContrast("#767676", "#FFFFFF", "AA");
      assert.equal(mediumContrast.passes, true);

      const sameContrastAAA = checkContrast("#767676", "#FFFFFF", "AAA");
      assert.equal(sameContrastAAA.passes, false);
    });
  });
});
