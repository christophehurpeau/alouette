import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import type { FunctionComponent } from "react";
import * as containerVariants from "../containers/variants";
import { PlatformInputText } from "./PlatformInputText";

const NativeInputText = styled(PlatformInputText, {
  render: "input",
  theme: "brand",

  variants: {
    ...containerVariants,

    disabled: {
      true: {
        color: "$text-disabled-muted",
        cursor: "not-allowed",
        opacity: "$opacity.disabled",
      },
    },
  } as const,

  // @ts-expect-error -- variants not working when isInput is true
  interactive: "text",
  withBackground: "interactive",
  withBorder: 1,

  outlineWidth: 1,
  outlineOffset: 0,
  outlineStyle: "solid",
  outlineColor: "transparent",

  focusVisibleStyle: {
    outlineWidth: 1,
    outlineOffset: 0,
    outlineStyle: "solid",
    outlineColor: "$interactive.forms.outlineColor:focus",
  },

  focusStyle: {
    outlineWidth: 1,
    outlineOffset: 0,
    outlineStyle: "solid",
    outlineColor: "$interactive.forms.outlineColor:focus",
  },
});

export type InputTextProps = Pick<
  GetProps<typeof NativeInputText>,
  | "aria-labelledby"
  | "autoCapitalize"
  | "autoCorrect"
  | "defaultValue"
  | "disabled"
  | "forceStyle"
  | "id"
  | "mode"
  /** @internal use Textarea */
  | "multiline"
  | "onChange"
  | "placeholder"
  | "readOnly"
  | "testID"
  | "theme"
  | "value"
>;

export const InputText: FunctionComponent<InputTextProps> = NativeInputText;
