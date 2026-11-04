import { describe, expect, it } from "vitest";
import { resolveScreenSafeAreaPadding } from "./resolveScreenSafeAreaPadding.ts";

const insets = { top: 62, bottom: 34, left: 0, right: 0 };

describe("resolveScreenSafeAreaPadding", () => {
  it("pads every inset edge by default", () => {
    expect(
      resolveScreenSafeAreaPadding({
        insets,
        consumedEdges: [],
        topOverlayHeight: 0,
      }),
    ).toEqual({ paddingTop: 62, paddingBottom: 34 });
  });

  it("skips consumed edges", () => {
    expect(
      resolveScreenSafeAreaPadding({
        insets,
        consumedEdges: ["top"],
        topOverlayHeight: 0,
      }),
    ).toEqual({ paddingBottom: 34 });
  });

  it("pads the top by a taller overlay, even when the top is consumed", () => {
    expect(
      resolveScreenSafeAreaPadding({
        insets,
        consumedEdges: ["top"],
        topOverlayHeight: 116,
      }),
    ).toEqual({ paddingTop: 116, paddingBottom: 34 });
  });

  it("keeps the top inset when it is taller than the overlay", () => {
    expect(
      resolveScreenSafeAreaPadding({
        insets,
        consumedEdges: [],
        topOverlayHeight: 40,
      }),
    ).toEqual({ paddingTop: 62, paddingBottom: 34 });
  });

  it("drops the overlay when explicit edges leave out the top", () => {
    expect(
      resolveScreenSafeAreaPadding({
        insets,
        consumedEdges: [],
        topOverlayHeight: 116,
        edges: ["bottom"],
      }),
    ).toEqual({ paddingBottom: 34 });
  });

  it("leaves the vertical edges to a native adjustment", () => {
    expect(
      resolveScreenSafeAreaPadding({
        insets: { top: 0, bottom: 21, left: 59, right: 59 },
        consumedEdges: [],
        topOverlayHeight: 0,
        verticalEdgesAdjustedNatively: true,
      }),
    ).toEqual({ paddingLeft: 59, paddingRight: 59 });
  });

  it("returns undefined when nothing is padded", () => {
    expect(
      resolveScreenSafeAreaPadding({
        insets,
        consumedEdges: [],
        topOverlayHeight: 0,
        verticalEdgesAdjustedNatively: true,
      }),
    ).toBeUndefined();
  });
});
