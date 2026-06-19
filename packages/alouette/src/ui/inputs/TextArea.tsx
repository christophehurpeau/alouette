import { forwardRef } from "react";
import type { TextInput as RNTextInput } from "react-native";
import { InputText, type InputTextProps } from "./InputText";

export type TextAreaProps = Omit<InputTextProps, "multiline">;

export const TextArea = forwardRef<RNTextInput, TextAreaProps>((props, ref) => {
  return <InputText ref={ref} multiline {...props} />;
});
