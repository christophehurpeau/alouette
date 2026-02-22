import { Text, styled } from "@tamagui/core";
import { TextInput } from "react-native";
import { inputStyle } from "./inputStyle";

export const PlatformInputText = styled(
  TextInput,
  {
    ...inputStyle,
    focusable: true,

    variants: {
      mode: {
        password: {
          secureTextEntry: true,
        },
        number: {
          inputMode: "numeric",
          keyboardType: "numeric",
        },
        tel: {
          inputMode: "tel",
          autoComplete: "tel",
          keyboardType: "phone-pad",
        },
        email: {
          inputMode: "email",
          autoComplete: "email",
          keyboardType: "email-address",
        },
        url: {
          inputMode: "url",
          keyboardType: "url",
        },
        search: {
          inputMode: "search",
        },
        webSearch: {
          inputMode: "search",
          keyboardType: "web-search",
        },
      },
    } as const,
  },
  {
    isInput: true,
    validStyles: Text.staticConfig.validStyles,
  } as const,
);
