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
export declare function useThemeToken(token: TokenName): string | undefined;
export declare function useThemeToken<const T extends readonly TokenName[]>(tokens: T): {
    [K in keyof T]: string | undefined;
};
export {};
//# sourceMappingURL=useThemeToken.d.ts.map