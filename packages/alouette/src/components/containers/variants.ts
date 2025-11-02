import { isAndroid } from "@tamagui/core";
import type { SizeTokens, VariantSpreadExtras, ViewStyle } from "@tamagui/core";
import {
  fullscreenStyle,
  getInteractionStyles,
} from "../primitives/createVariants";

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
      ? {
          ...getInteractionStyles("backgroundColor", props),
          ...getInteractionStyles("outlineColor", props),
        }
      : {
          backgroundColor: props.withElevation
            ? "$nonInteractiveBackgroundColor.elevated"
            : "$nonInteractiveBackgroundColor",
        }),
  } as const;
};

export const withScreenBackground = (
  val: boolean | "translucent",
  { props }: VariantSpreadExtras<any>,
) => {
  if (!val) return {} as const;

  if (val === "translucent") {
    if (process.env.NODE_ENV !== "production" && props.withElevation) {
      throw new Error(
        "Cannot use withElevation and translucent screen background together",
      );
    }
    return {
      backgroundColor: "$screenBackgroundColor.translucent",
      backdropFilter: "blur(14px)",
    } as const;
  }

  if (props.withElevation) {
    return {
      backgroundColor: "$screenBackgroundColor.elevated",
    } as const;
  }

  return {
    backgroundColor: "$screenBackgroundColor",
  } as const;
};

export const withElevation = (
  val: boolean,
  { props }: VariantSpreadExtras<any>,
) => {
  if (!val) return {} as const;

  const height = 2;

  return {
    ...(props.disabled
      ? {}
      : {
          shadowOffset: { width: 0, height },
          shadowOpacity: 0.65,
          shadowRadius: 6,
          ...(isAndroid ? { elevationAndroid: height * 2 } : undefined),
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

export const fullscreen = {
  true: fullscreenStyle,
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

    hoverStyle: {
      transform: [{ scale: 1.02 }],
    },

    pressStyle: {
      transform: [{ scale: 0.98 }],
    },
  } as const;
};

export const centered = {
  true: {
    alignItems: "center",
    justifyContent: "center",
  },
} as const;
