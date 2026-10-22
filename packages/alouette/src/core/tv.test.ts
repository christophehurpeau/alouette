import { createTV } from "tailwind-variants";
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

  it("merges a tv built with extend", () => {
    const parent = tv({ base: "flex-row px-m" });
    const child = tv({ extend: parent, base: "py-m" });

    expect(child({ className: "px-sm py-xs" })).toBe("flex-row px-sm py-xs");
  });

  it("keeps merging on the named scale once another tv config exists", () => {
    const variants = tv({ base: "flex-row px-m" });
    createTV({ twMergeConfig: { extend: { theme: { spacing: ["app"] } } } })({
      base: "px-app",
    })({ className: "px-4" });

    expect(variants({ className: "px-sm" })).toBe("flex-row px-sm");
  });
});
