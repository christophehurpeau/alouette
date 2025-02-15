import type { VariantSpreadExtras } from "@tamagui/core";

export const fullscreenStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as const;

export type InternalPseudoState = "focus" | "hover" | "press";

// eslint-disable-next-line complexity
export const getInteractionStyles = (
  name: "backgroundColor" | "borderColor" | "shadowColor",
  {
    internalForcedPseudoState,
    disabled,
    interactive,
    variant,
  }: VariantSpreadExtras<any>["props"],
) => {
  const isGhost = variant?.startsWith("ghost-");
  const prefix =
    interactive === "text"
      ? "interactive.forms"
      : // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `interactive.${(isGhost ? variant.slice(6) : variant) || "contained"}`;

  if (disabled) {
    return { [name]: `$${prefix}.${name}:disabled` } as const;
  }

  if (name === "shadowColor") {
    // no need to add :hover, :focus, :press, and causes issues because all of the box-shadow is set and resets width etc
    return { [name]: `$${prefix}.${name}` } as const;
  }

  if (process.env.STORYBOOK && internalForcedPseudoState) {
    switch (internalForcedPseudoState) {
      case "hover":
        return { [name]: `$${prefix}.${name}:hover` } as const;
      case "press":
        return { [name]: `$${prefix}.${name}:press` } as const;
      case "focus":
        return { [name]: `$${prefix}.${name}:focus` } as const;
      default:
        break;
    }
  }

  return {
    [name]: isGhost ? "transparent" : `$${prefix}.${name}`,
    hoverStyle: { [name]: `$${prefix}.${name}:hover` },
    pressStyle: { [name]: `$${prefix}.${name}:press` },
    focusStyle: { [name]: `$${prefix}.${name}:focus` },
  } as const;
};
