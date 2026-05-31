import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode, Ref } from "react";
import { createElement, forwardRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("react-native", () => ({
  Text: forwardRef(
    (
      {
        className,
        testID,
        children,
      }: { className?: string; testID?: string; children?: ReactNode },
      ref: Ref<HTMLSpanElement>,
    ) =>
      createElement(
        "span",
        { ref, className, "data-testid": testID },
        children,
      ),
  ),
}));

const { Text } = await import("./Text.tsx");

afterEach(cleanup);

describe("Text", () => {
  it("passes className through", () => {
    render(createElement(Text, { className: "body-md", testID: "t" }));
    expect(screen.getByTestId("t").className).toBe("text-sharp body-md");
  });

  it("deduplicates body-* font-size classes", () => {
    render(createElement(Text, { className: "body-xs body-xl", testID: "t" }));
    expect(screen.getByTestId("t").className).toBe("text-sharp body-xl");
  });

  it("deduplicates heading-* font-size classes", () => {
    render(
      createElement(Text, {
        className: "heading-sm heading-3xl",
        testID: "t",
      }),
    );
    expect(screen.getByTestId("t").className).toBe("text-sharp heading-3xl");
  });

  it("deduplicates mono-* font-size classes", () => {
    render(createElement(Text, { className: "mono-md mono-lg", testID: "t" }));
    expect(screen.getByTestId("t").className).toBe("text-sharp mono-lg");
  });

  it("font-size classes conflict across body/heading/mono", () => {
    render(
      createElement(Text, {
        className: "body-md heading-xl",
        testID: "t",
      }),
    );
    expect(screen.getByTestId("t").className).toBe("text-sharp heading-xl");
  });

  it("preserves unrelated classes alongside font-size", () => {
    render(
      createElement(Text, {
        className: "body-md text-sharp font-bold",
        testID: "t",
      }),
    );
    expect(screen.getByTestId("t").className).toBe(
      "body-md text-sharp font-bold",
    );
  });
});
