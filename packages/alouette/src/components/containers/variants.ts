import type { SizeTokens, VariantSpreadExtras, ViewStyle } from "@tamagui/core";
import type { InternalPseudoState } from "../primitives/createVariants";
import {
  getBackgroundAdditionalInteraction,
  getBorderAdditionalInteraction,
} from "../primitives/createVariants";

export const internalForcedPseudoState = (val: InternalPseudoState) => ({});

export const withBorder = (
  val: SizeTokens | boolean,
  { props }: VariantSpreadExtras<any>,
) => {
  return {
    borderWidth: typeof val === "number" ? val : 1,
    borderColor: "$borderColor",

    ...(props.interactive ? getBorderAdditionalInteraction(props) : undefined),
  } as const;
};

export const withBackground = (
  val: boolean,
  { props }: VariantSpreadExtras<any>,
) => {
  const variant =
    props.interactive === "text" ? "text" : props.variant || "contained";

  if (!val) return {} as const;

  if (!props.role && !props.outlineStyle && props.interactive) {
    throw new Error("A role prop is required while using interactive");
  }

  return {
    backgroundColor: props.interactive
      ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `$interactive.${variant}.backgroundColor`
      : "$mainColor",

    ...(props.interactive
      ? getBackgroundAdditionalInteraction(props)
      : undefined),
  } as const;
};

const circularStyle = {
  borderRadius: 100_000,
  padding: 0,
};

export const size = (val: number) => {
  return { width: val, height: val } as const;
};

export const circular = {
  true: (val: boolean, { props, tokens }: { props: any; tokens: any }) => {
    if (!("size" in props)) {
      return circularStyle;
    }
    const sizePropValue: keyof typeof tokens.size = props.size;
    const sizeValue = tokens.size[sizePropValue];
    return {
      ...circularStyle,
      width: sizeValue,
      height: sizeValue,
      maxWidth: sizeValue,
      maxHeight: sizeValue,
      minWidth: sizeValue,
      minHeight: sizeValue,
    };
  },
} as const;

export const interactive = (
  isInteractiveOrInteractiveCursorType: ViewStyle["cursor"] | boolean,
  { props }: VariantSpreadExtras<any>,
) => {
  if (!isInteractiveOrInteractiveCursorType) return null;
  if (props.disabled) {
    return { cursor: "not-allowed" } as const;
  }
  return {
    cursor:
      isInteractiveOrInteractiveCursorType === true
        ? "pointer"
        : isInteractiveOrInteractiveCursorType,
  } as const;
};

export const centered = {
  true: {
    alignItems: "center",
    justifyContent: "center",
  },
} as const;
