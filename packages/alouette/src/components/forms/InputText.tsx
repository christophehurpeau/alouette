import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import { TextInput } from "react-native";
import * as variants from "../containers/variants";

const StyledInputText = styled(
  TextInput,
  {
    variants,

    padding: "$xs",
    borderRadius: "$sm",

    color: "$interactive.forms.textColor",
    // currently not working in web unless we use tamagui Input
    // placeholderTextColor: "$interactive.forms.placeholderTextColor",

    // @ts-expect-error missing prop due to isInput but in does exist in variants
    withBorder: true,
    withBackground: true,

    borderWidth: 1,

    // reset browser style
    outlineStyle: "none",
  },
  { isInput: true },
);

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
