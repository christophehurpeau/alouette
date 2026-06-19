import { useContext } from "react";
import { themeVariables } from "../themeVariables";
import { ThemeContext } from "./ThemeContext";

type TokenName = `--${string}`;

/**
 * Reads theme token values in JS for the few props that can't take a className
 * (gradient stops, `placeholderTextColor`, native Switch track/thumb, the Expo
 * browser chrome, SVG icon tint). Values come from the generated `themeVariables`
 * map keyed by the active `ThemeContext`, so they stay in sync with `global.css`.
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
  const vars = themeVariables[theme];
  if (Array.isArray(tokenOrTokens)) {
    return tokenOrTokens.map((token) => vars[token]);
  }
  return vars[tokenOrTokens as TokenName];
}
