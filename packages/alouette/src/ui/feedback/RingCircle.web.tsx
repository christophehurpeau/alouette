import type { ReactNode } from "react";
import type { RingCircleProps } from "./RingCircle";

export function RingCircle({
  center,
  radius,
  strokeWidth,
  strokeDasharray,
  strokeDashoffset,
  className,
  width,
  height,
}: RingCircleProps): ReactNode {
  // Same viewBox as Phosphor icons (e.g. CheckCircleRegularIcon, viewBox
  // "0 0 256 256"), whose glyph is a 208-diameter circle inset within it.
  // Rendering into the same viewBox at the same glyph diameter gives the ring
  // the same padding, so it keeps a consistent visual weight when swapped for
  // a Phosphor icon in the same slot (Button's overlay spinner → success check).
  const scale = 208 / (center * 2);

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 256 256"
    >
      <circle
        cx={128}
        cy={128}
        r={radius * scale}
        stroke="currentColor"
        strokeWidth={strokeWidth * scale}
        strokeDasharray={
          strokeDasharray == null ? undefined : strokeDasharray * scale
        }
        strokeDashoffset={
          strokeDashoffset == null ? undefined : strokeDashoffset * scale
        }
        strokeLinecap={strokeDasharray == null ? undefined : "round"}
        transform={strokeDasharray == null ? undefined : "rotate(-90 128 128)"}
        className={
          strokeDasharray == null
            ? undefined
            : "transition-[stroke-dashoffset] duration-progress ease-out"
        }
        fill="none"
      />
    </svg>
  );
}
