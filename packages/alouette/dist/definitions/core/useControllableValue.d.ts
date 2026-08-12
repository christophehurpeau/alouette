export interface UseControllableValueParams {
    value: string | undefined;
    defaultValue: string | undefined;
    onValueChange?: (value: string) => void;
}
export declare function useControllableValue({ value: controlledValue, defaultValue, onValueChange, }: UseControllableValueParams): readonly [
    string | undefined,
    (next: string) => void
];
//# sourceMappingURL=useControllableValue.d.ts.map