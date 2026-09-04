export interface MenuContextValue {
    /** Dismisses the menu — an item runs it after its own handler. */
    close: () => void;
}
export declare const MenuContextProvider: import("react").Provider<MenuContextValue | undefined>;
export declare function useMenuContext(): MenuContextValue;
//# sourceMappingURL=MenuContext.d.ts.map