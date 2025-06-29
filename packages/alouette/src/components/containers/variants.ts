import type { SizeTokens, VariantSpreadExtras, ViewStyle } from "@tamagui/core";
import { getInteractionStyles } from "../primitives/createVariants";

export const withBorder = (
  val: SizeTokens | boolean,
  { props }: VariantSpreadExtras<any>,
) => {
  return {
    borderWidth: typeof val !== "boolean" ? val : 1,

    ...(props.interactive
      ? getInteractionStyles("borderColor", props)
      : { borderColor: "$borderColor" }),
  } as const;
};

export const withBackground = (
  val: boolean,
  { props }: VariantSpreadExtras<any>,
) => {
  if (!val) return {} as const;

  if (!props.role && !props.outlineStyle && props.interactive) {
    throw new Error("A role prop is required while using interactive");
  }

  return {
    ...(props.interactive
      ? getInteractionStyles("backgroundColor", props)
      : { backgroundColor: "$mainColor" }),
  } as const;
};

export const withElevation = (
  val: boolean,
  { props }: VariantSpreadExtras<any>,
) => {
  if (!val) return {} as const;

  return {
    ...(props.disabled
      ? {}
      : {
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.65,
          shadowRadius: 6,
          elevation: 5,
        }),
    ...(props.interactive
      ? getInteractionStyles("shadowColor", props)
      : { shadowColor: "$shadowColor" }),
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
