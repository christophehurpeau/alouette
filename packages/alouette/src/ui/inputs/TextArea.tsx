import type { ReactNode } from "react";
import { InputText, type InputTextProps } from "./InputText";

export type TextAreaProps = Omit<InputTextProps, "multiline">;

export function TextArea(props: TextAreaProps): ReactNode {
  return <InputText multiline {...props} />;
}
