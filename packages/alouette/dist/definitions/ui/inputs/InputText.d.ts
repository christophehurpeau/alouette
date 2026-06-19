import { TextInput as RNTextInput, type TextInputProps as RNTextInputProps } from "react-native";
import { type VariantProps } from "tailwind-variants";
declare const inputVariants: import("tailwind-variants").TVReturnType<{
    multiline: {
        false: string;
        true: string;
    };
    forceStyle: {
        undefined: string;
        hover: string;
        focus: string;
        press: string;
    };
}, undefined, string, {
    multiline: {
        false: string;
        true: string;
    };
    forceStyle: {
        undefined: string;
        hover: string;
        focus: string;
        press: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    multiline: {
        false: string;
        true: string;
    };
    forceStyle: {
        undefined: string;
        hover: string;
        focus: string;
        press: string;
    };
}, undefined, string, unknown, unknown, undefined>>;
type InputVariantProps = VariantProps<typeof inputVariants>;
declare const MODE_PROPS: {
    readonly password: {
        readonly secureTextEntry: true;
        readonly autoComplete: "current-password";
    };
    readonly number: {
        readonly inputMode: "numeric";
        readonly keyboardType: "numeric";
    };
    readonly tel: {
        readonly inputMode: "tel";
        readonly autoComplete: "tel";
        readonly keyboardType: "phone-pad";
    };
    readonly email: {
        readonly inputMode: "email";
        readonly autoComplete: "email";
        readonly keyboardType: "email-address";
    };
    readonly url: {
        readonly inputMode: "url";
        readonly keyboardType: "url";
    };
    readonly search: {
        readonly inputMode: "search";
    };
    readonly webSearch: {
        readonly inputMode: "search";
        readonly keyboardType: "web-search";
    };
};
export type InputTextMode = keyof typeof MODE_PROPS;
export interface InputTextProps extends Omit<RNTextInputProps, "editable">, InputVariantProps {
    className?: string;
    disabled?: boolean;
    mode?: InputTextMode;
}
export declare const InputText: import("react").ForwardRefExoticComponent<InputTextProps & import("react").RefAttributes<RNTextInput>>;
export {};
//# sourceMappingURL=InputText.d.ts.map