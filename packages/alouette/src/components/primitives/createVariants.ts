import type { VariantSpreadExtras } from "@tamagui/core";

export const fullscreenStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as const;

export type InternalPseudoState = "focus" | "hover" | "press";

export const getInteractionStyles = (
  name: "backgroundColor" | "borderColor" | "shadowColor",
  { disabled, interactive, variant }: VariantSpreadExtras<any>["props"],
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

  return {
    [name]: isGhost ? "transparent" : `$${prefix}.${name}`,
    hoverStyle: { [name]: `$${prefix}.${name}:hover` },
    pressStyle: { [name]: `$${prefix}.${name}:press` },
    focusStyle: { [name]: `$${prefix}.${name}:focus` },
  } as const;
};
