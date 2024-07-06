import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import { TextInput } from "react-native";
import * as variants from "../containers/variants";

const StyledInputText = styled(TextInput, {
  variants,

  padding: "$xs",
  borderRadius: "$sm",

  // @ts-expect-error missing prop but seems to work
  color: "$forms.textColor",

  withBorder: true,
  withBackground: true,

  borderWidth: 1,
  borderBottomWidth: 3,

  // reset browser style
  outlineStyle: "none",
});

export const InputText = styled(StyledInputText, {
  name: "InputText",
  interactive: "text",
  theme: "primary",
  // animation: "formElement", // remove all style ?
});

export type InputTextProps = GetProps<typeof InputText>;

export const TextArea = styled(InputText, {
  multiline: true,
});

export type TextAreaProps = GetProps<typeof TextArea>;
