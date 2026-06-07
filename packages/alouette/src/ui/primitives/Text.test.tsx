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

// AccentScope pulls in the NativeWind runtime (nativewind → react-native
// internals), which can't be parsed here. Stub it to a passthrough so the test
// stays focused on className merging.
vi.mock("../containers/AccentScope", () => ({
  AccentScope: ({ children }: { children?: ReactNode }) => children,
}));

const { Text } = await import("./Text.tsx");

afterEach(cleanup);

describe("Text", () => {
  it("renders default classes when no className given", () => {
    render(createElement(Text, { testID: "t" }));
    expect(screen.getByTestId("t").className).toBe("font-body text-sharp");
  });

  it("passes a size class through alongside defaults", () => {
    render(createElement(Text, { className: "text-base", testID: "t" }));
    expect(screen.getByTestId("t").className).toBe(
      "font-body text-sharp text-base",
    );
  });

  it("overrides font-family group: font-heading-bold replaces font-body", () => {
    render(
      createElement(Text, { className: "font-heading-bold", testID: "t" }),
    );
    const cls = screen.getByTestId("t").className;
    expect(cls).toContain("font-heading-bold");
    expect(cls).not.toContain("font-body");
  });

  it("last font-family utility wins when two are passed", () => {
    render(
      createElement(Text, {
        className: "font-heading text-2xl font-heading-extrabold text-4xl",
        testID: "t",
      }),
    );
    const cls = screen.getByTestId("t").className;
    expect(cls).toContain("font-heading-extrabold");
    expect(cls).not.toContain("font-heading ");
    expect(cls).toContain("text-4xl");
    expect(cls).not.toContain("text-2xl");
  });

  it("preserves unrelated classes alongside font-family and size", () => {
    render(
      createElement(Text, {
        className: "font-body-bold text-base text-muted",
        testID: "t",
      }),
    );
    const cls = screen.getByTestId("t").className;
    expect(cls).toContain("font-body-bold");
    expect(cls).toContain("text-base");
    expect(cls).toContain("text-muted");
  });
});
