import type { GetProps } from "@tamagui/core";
import type { FunctionComponent } from "react";
declare const NativeInputText: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("react-native").TextInput, import("@tamagui/web").TamaguiComponentPropsBaseBase & import("react-native").TextInputProps, import("@tamagui/web").TextStylePropsBase, {
    disabled?: boolean | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    tint?: "accent" | undefined;
    center?: boolean | undefined;
    absoluteFill?: boolean | undefined;
    layer?: "highlight" | "surface" | "lowered" | "highlight-accent" | "translucent" | undefined;
    shadow?: "none" | "lowered" | "s" | "m" | "l" | undefined;
    square?: number | undefined;
    withBorder?: import("@tamagui/web").SizeTokens | undefined;
    withFocusVisibleOutline?: boolean | undefined;
    withBackground?: "interactive" | "highlight" | "surface" | undefined;
    mode?: "number" | "search" | "tel" | "email" | "url" | "password" | "webSearch" | undefined;
}, {
    readonly isInput: true;
    readonly validStyles: {
        [key: string]: boolean;
    } | undefined;
} & import("@tamagui/web").StaticConfigPublic>;
export type InputTextProps = Pick<GetProps<typeof NativeInputText>, "aria-labelledby" | "autoCapitalize" | "autoCorrect" | "defaultValue" | "disabled" | "forceStyle" | "id" | "mode"
/** @internal use Textarea */
 | "multiline" | "onChange" | "placeholder" | "readOnly" | "theme" | "value">;
export declare const InputText: FunctionComponent<InputTextProps>;
export {};
//# sourceMappingURL=InputText.d.ts.map