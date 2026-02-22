import { GetProps } from "@tamagui/core";
import { InputTextProps } from "./InputText";
import { FunctionComponent } from "react";
declare const TextAreaFrame: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, unknown, import("@tamagui/web").TamaguiComponentPropsBaseBase & InputTextProps, import("@tamagui/web").StackStyleBase, {}, import("@tamagui/web").StaticConfigPublic>;
export type TextAreaProps = Pick<GetProps<typeof TextAreaFrame>, keyof InputTextProps>;
export declare const TextArea: FunctionComponent<TextAreaProps>;
export {};
//# sourceMappingURL=TextArea.d.ts.map