import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { ThemeVariablesContext } from "./ThemeVariablesContext";

type TokenName = `--${string}`;

/**
 * Reads theme token values in JS for the few props that can't take a className
 * (gradient stops, `placeholderTextColor`, native Switch track/thumb, the Expo
 * browser chrome, SVG icon tint). Values come from the active `themeVariables`
 * map (`ThemeVariablesContext`) keyed by the active `ThemeContext`, so they stay
 * in sync with the palette CSS (default or the app's own).
 *
 * Replaces Uniwind's `useCSSVariable`. Unlike NativeWind's
 * `useUnstableNativeVariable` this works on web and native alike and is stable.
 */
export function useThemeToken(token: TokenName): string | undefined;
export function useThemeToken<const T extends readonly TokenName[]>(
  tokens: T,
): { [K in keyof T]: string | undefined };
export function useThemeToken(
  tokenOrTokens: TokenName | readonly TokenName[],
): (string | undefined)[] | string | undefined {
  const theme = useContext(ThemeContext);
  const themeVariables = useContext(ThemeVariablesContext);
  const vars = themeVariables[theme];
  if (Array.isArray(tokenOrTokens)) {
    return tokenOrTokens.map((token) => vars[token]);
  }
  return vars[tokenOrTokens as TokenName];
}
