/* eslint-disable import-x/extensions */
/* eslint-disable import-x/no-extraneous-dependencies */
import { compile } from "react-native-css/compiler";
import { describe, expect, it } from "vitest";
import { generateTheme } from "./generateTheme.ts";

// What metro feeds react-native-css: Tailwind has already turned `@theme` into
// plain `:root` declarations and generated the utilities from those tokens.
const asTailwindOutput = (css: string): string =>
  `${css.replace("@theme {", ":root {")}
.bg-surface { background-color: var(--color-surface); }
`;

const compileForNative = (css: string) =>
  compile(asTailwindOutput(css)).stylesheet();

const themeNames = /^(?:light|dark)(?:_[a-z]+)?$/;

describe("native compilation", () => {
  it("drops the theme blocks from the native stylesheet", () => {
    const { css } = generateTheme();
    const { s: rules } = compileForNative(css);

    expect(rules?.map(([name]) => name)).toEqual(["bg-surface"]);
    expect(rules?.some(([name]) => themeNames.test(name))).toBe(false);
  });

  it("keeps every color token resolvable at runtime", () => {
    // ScopedTheme reads these from VariableContextProvider, so the utilities
    // must still hold a `var()` reference rather than a baked value.
    const { css } = generateTheme();
    const { s: rules, vr: rootVariables } = compileForNative(css);
    const [, backgroundRule] = rules?.[0] ?? [];

    expect(JSON.stringify(backgroundRule)).toContain('"var","color-surface"');
    expect(JSON.stringify(backgroundRule)).not.toContain("#f8f8f8");
    expect(rootVariables).toHaveLength(0);
  });

  it("bakes the light palette in without the inliner exclusion", () => {
    // Why `withAlouetteConfig` passes `inlineVariables.exclude`: with the theme
    // blocks gone each token is declared exactly once, which is the condition
    // react-native-css inlines on — freezing every component on light mode.
    const { css } = generateTheme();
    const { s: rules } = compileForNative(css);
    const [, backgroundRule] = rules?.[0] ?? [];

    expect(JSON.stringify(backgroundRule)).toContain("#f8f8f8");
  });

  it("drops the whole oklch overlay", () => {
    const { oklchCss } = generateTheme();

    expect(compile(oklchCss).stylesheet()).toStrictEqual({});
  });
});
