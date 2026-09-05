export interface UseControllableValueParams<TValue extends string> {
    value: TValue | undefined;
    defaultValue: TValue | undefined;
    onValueChange?: (value: TValue) => void;
}
export declare function useControllableValue<TValue extends string = string>({ value: controlledValue, defaultValue, onValueChange, }: UseControllableValueParams<TValue>): readonly [
    TValue | undefined,
    (next: TValue) => void
];
//# sourceMappingURL=useControllableValue.d.ts.map