import {
  type ReactElement,
  type ReactNode,
  type SVGProps,
  cloneElement,
} from "react";
import { useCSSVariable } from "uniwind";

export type SVGIconElement = ReactElement<SVGProps<SVGSVGElement>>;

const TINT_TO_VAR = {
  sharp: "sharp",
  muted: "muted",
  accent: "accent",
  "accent-muted": "accent-muted",
  onAccent: "on-accent",
  "onAccent-muted": "on-accent-muted",
} as const;

export type IconTint = keyof typeof TINT_TO_VAR;

export interface IconProps {
  icon: SVGIconElement;
  /** Square size in px. Defaults to 20. */
  size?: number;
  tint?: IconTint;
  /** Renders in the disabled-text colour instead of the active tint. */
  disabled?: boolean;
  /** When disabled, use the sharp disabled colour rather than the muted one. */
  disabledSharp?: boolean;
}

function pickColorVar(
  tint: IconTint,
  disabled: boolean,
  disabledSharp: boolean,
): string {
  if (disabled) {
    return disabledSharp ? "--color-disabled-sharp" : "--color-disabled-muted";
  }
  return `--color-${TINT_TO_VAR[tint]}`;
}

export function Icon({
  icon,
  size = 20,
  tint = "sharp",
  disabled = false,
  disabledSharp = false,
}: IconProps): ReactNode {
  const color = useCSSVariable(pickColorVar(tint, disabled, disabledSharp));
  return cloneElement(icon, {
    color: color as string,
    width: size,
    height: size,
  });
}
