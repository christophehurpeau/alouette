import type { VariantSpreadExtras } from "@tamagui/core";

export const fullscreenStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as const;

export type InternalPseudoState = "focus" | "hover" | "press";

export const getBorderAdditionalInteraction = ({
  internalForcedPseudoState,
  disabled,
  interactive,
}: VariantSpreadExtras<any>["props"]) => {
  const prefix = interactive === "text" ? "interactive.forms" : "interactive";

  if (disabled) {
    return {
      borderColor: `$${prefix}.borderColor:disabled`,
    } as const;
  }

  if (process.env.STORYBOOK && internalForcedPseudoState) {
    switch (internalForcedPseudoState) {
      case "hover":
        return {
          borderColor: `$${prefix}.borderColor:hover`,
        };
      case "press":
        return {
          borderColor: `$${prefix}.borderColor:press`,
        };
      case "focus":
        return {
          borderColor: `$${prefix}.borderColor:focus`,
        };
      default:
        break;
    }
  }

  return {
    borderColor: `$${prefix}.borderColor`,

    hoverStyle: {
      borderColor: `$${prefix}.borderColor:hover`,
    },
    pressStyle: {
      borderColor: `$${prefix}.borderColor:press`,
    },
    focusStyle: {
      borderColor: `$${prefix}.borderColor:focus`,
    },
  } as const;
};

// eslint-disable-next-line complexity
export const getBackgroundAdditionalInteraction = ({
  internalForcedPseudoState,
  disabled,
  interactive,
  variant,
}: VariantSpreadExtras<any>["props"]) => {
  const prefix =
    interactive === "text"
      ? "interactive.forms"
      : // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `interactive.${variant || "contained"}`;

  if (disabled) {
    return {
      backgroundColor: `$${prefix}.backgroundColor:disabled`,
    } as const;
  }

  if (process.env.STORYBOOK && internalForcedPseudoState) {
    switch (internalForcedPseudoState) {
      case "hover":
        return {
          backgroundColor: `$${prefix}.backgroundColor:hover`,
        };
      case "press":
        return {
          backgroundColor: `$${prefix}.backgroundColor:press`,
        };
      case "focus":
        return {
          backgroundColor: `$${prefix}.backgroundColor:focus`,
        };
      default:
        break;
    }
  }

  return {
    backgroundColor: `$${prefix}.backgroundColor`,

    hoverStyle: {
      backgroundColor: `$${prefix}.backgroundColor:hover`,
    },
    pressStyle: {
      backgroundColor: `$${prefix}.backgroundColor:press`,
    },
    focusStyle: {
      backgroundColor: `$${prefix}.backgroundColor:focus`,
    },
  } as const;
};
