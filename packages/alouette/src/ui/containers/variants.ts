import type { SizeTokens, VariantSpreadExtras, ViewProps } from "@tamagui/core";
import { absoluteFillStyle } from "../stacks/utils/absoluteFillStyle";
import { getInteractionStyles } from "./createVariants";

export const absoluteFill = {
  true: absoluteFillStyle,
} as const;

export const center = {
  true: {
    justifyContent: "center",
    alignItems: "center",
  },
} as const;

export const tint = {
  accent: {}, // used in interactive variant
} as const;

export function interactive(
  isInteractiveOrInteractiveCursorType: ViewProps["cursor"] | boolean,
  { props }: VariantSpreadExtras<any>,
) {
  if (!isInteractiveOrInteractiveCursorType) return null;

  if (isInteractiveOrInteractiveCursorType === true) {
    return {
      cursor: "pointer",

      pressStyle: {
        transform: [{ scale: 0.975 }],
      },

      disabledStyle: {
        cursor: "not-allowed",
        opacity: "$opacity.disabled",
        transform: [{ scale: 1 }],
      },
    };
  }

  return {
    cursor: isInteractiveOrInteractiveCursorType,

    disabledStyle: {
      cursor: "not-allowed",
      opacity: "$opacity.disabled",
    },
  } as const;
}

export const layer = {
  surface: {
    backgroundColor: "$bg-surface",
  },
  highlight: {
    backgroundColor: "$bg-highlight",
  },
  "highlight-accent": {
    backgroundColor: "$bg-highlight-accent",
  },
  lowered: {
    backgroundColor: "$bg-lowered",
  },
  translucent: {
    backgroundColor: "$bg-translucent",
  },
} as const;

export const shadow = {
  none: {
    boxShadow: "none",
    elevationAndroid: 0,
  },
  s: {
    boxShadow:
      "inset 0 1px 2px #ffffff40, 0 1px 2px #00000040, 0 2px 4px #00000025",
    elevationAndroid: 2,
  },

  m: {
    boxShadow:
      "inset 0 1px 2px #ffffff40, 0 2px 4px #00000040, 0 4px 8px #00000025",
    elevationAndroid: 4,
  },

  l: {
    boxShadow:
      "inset 0 1px 2px #ffffff40, 0 4px 6px #00000040, 0 6px 10px #00000025",
    elevationAndroid: 6,
  },

  lowered: {
    boxShadow: "inset 0 1px 2px #00000040, inset 0 -2px 2px #ffffff15",
  },
} as const;

export const square = (val: number) => {
  return { width: val, height: val };
};

export const withBorder = (
  val: SizeTokens,
  { props }: VariantSpreadExtras<any>,
) => {
  if (props.shadow && props.shadow !== "lowered") {
    throw new Error("Cannot use border with shadow variant");
  }

  return {
    borderWidth: val,

    ...(props.interactive
      ? getInteractionStyles("borderColor", props)
      : { borderColor: "$border-sharp" }),
  } as const;
};

export const withFocusVisibleOutline = (
  val: boolean,
  { props }: VariantSpreadExtras<any>,
) => {
  if (!val) return null;
  return {
    ...(props.interactive
      ? getInteractionStyles("outlineColor", props)
      : { outlineColor: "$outlineColor" }),

    disabledStyle: {
      outlineWidth: 0,
    },
  } as const;
};

export const withBackground = (
  val: "highlight" | "interactive" | "surface",
  { props }: VariantSpreadExtras<any>,
) => {
  return props.interactive && val === "interactive"
    ? getInteractionStyles("backgroundColor", props)
    : ({
        backgroundColor: val === "surface" ? "$bg-surface" : "$bg-highlight",
      } as const);
};
