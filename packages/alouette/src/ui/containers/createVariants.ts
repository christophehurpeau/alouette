import type { VariantSpreadExtras } from "@tamagui/core";

export const absoluteFillStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as const;

export type InternalPseudoState = "focus" | "hover" | "press";

export const getInteractionStyles = (
  name: "backgroundColor" | "borderColor" | "outlineColor" | "shadowColor",
  {
    disabled,
    interactive,
    variant = name === "borderColor" ? "outlined" : "contained",
    tint,
  }: VariantSpreadExtras<any>["props"],
) => {
  const isGhost = variant?.startsWith("ghost-");
  const prefix =
    interactive === "text"
      ? "interactive.forms"
      : // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `interactive${tint === "accent" ? "-accent" : ""}.${isGhost ? variant.slice(6) : variant}`;

  if (disabled) {
    return { [name]: `$${prefix}.${name}:disabled` } as const;
  }

  if (name === "shadowColor") {
    // no need to add :hover, :focus, :press, and causes issues because all of the box-shadow is set and resets width etc
    return { [name]: `$${prefix}.${name}` } as const;
  }

  if (name === "outlineColor") {
    return {
      focusVisibleStyle: {
        outlineWidth: interactive === "text" ? 0 : 2,
        outlineStyle: "solid",
        outlineOffset:
          variant === "outlined" || variant === "ghost-outlined" ? 2 : 0,
        outlineColor: `$${prefix}.${name}:focus`,
      },
    } as const;
  }

  return {
    [name]: isGhost ? "transparent" : `$${prefix}.${name}`,
    hoverStyle: { [name]: `$${prefix}.${name}:hover` },
    focusStyle: { [name]: `$${prefix}.${name}:focus` },
    pressStyle: { [name]: `$${prefix}.${name}:press` },
    disabledStyle: { [name]: `$${prefix}.${name}:disabled` },
  } as const;
};
