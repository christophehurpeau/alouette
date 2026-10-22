import { describe, expect, it } from "vitest";
import { tv } from "./tv.ts";

describe("tv", () => {
  it("replaces a slot's classes on the named scale with the caller's", () => {
    const slots = tv({
      slots: { row: "flex-row rounded-sm px-m py-m gap-xs" },
    })();

    expect(slots.row({ className: "px-sm py-xs gap-m rounded-lg" })).toBe(
      "flex-row px-sm py-xs gap-m rounded-lg",
    );
  });

  it("replaces a surface utility's padding and radius", () => {
    const variants = tv({ base: "surface surface-sm" });

    expect(variants({ className: "surface-lg" })).toBe("surface surface-lg");
  });
});
