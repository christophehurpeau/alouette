import { Text, View, styled } from "@tamagui/core";
import { inputStyle } from "./inputStyle";

const PlatformInputTextFrame = styled(
  View,
  {
    ...inputStyle,
    transition: "formElement", // crash on native ?
    tabIndex: 0 as const,

    variants: {
      disabled: {
        true: {
          tabIndex: -1 as const,
        },
      },
      multiline: {
        true: {
          rows: 3,
        },
      },
      mode: {
        password: {
          type: "password",
        },
        number: {
          type: "number",
        },
        tel: {
          type: "tel",
        },
        email: {
          type: "email",
        },
        search: {
          type: "search",
        },
      },
    },
  },
  {
    isInput: true,
    validStyles: Text.staticConfig.validStyles,
  },
);

export const PlatformInputText = PlatformInputTextFrame.styleable<{
  autoCorrect?: boolean;
  autoCapitalize?: "characters" | "none" | "sentences" | "words";
  onChangeText?: (value: string) => void;
}>(({ autoCorrect, onChangeText, onChange, ...rest }) => (
  <PlatformInputTextFrame
    {...({
      autoCorrect: autoCorrect ? "on" : "off",
    } as any)}
    {...rest}
    onChange={(e) => {
      if (onChangeText) {
        onChangeText((e.target as HTMLInputElement).value);
      }
      onChange?.(e);
    }}
  />
));
