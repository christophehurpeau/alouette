import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import type { FunctionComponent } from "react";
import type { InputTextProps } from "./InputText";
import { InputText } from "./InputText";

const TextAreaFrame = styled(InputText, {
  render: "textarea",
  multiline: true,

  height: "auto",
  minHeight: 80,
  borderRadius: "$1.0",
  paddingHorizontal: "$0.75",
});

export type TextAreaProps = Pick<
  GetProps<typeof TextAreaFrame>,
  keyof InputTextProps
>;

export const TextArea: FunctionComponent<TextAreaProps> = TextAreaFrame;
