export interface RadioContextValue {
    value: string | undefined;
    onSelect: (value: string) => void;
    disabled?: boolean;
}
export declare const RadioContextProvider: import("react").Provider<RadioContextValue | undefined>;
export declare function useRadioContext(): RadioContextValue;
//# sourceMappingURL=RadioContext.d.ts.map