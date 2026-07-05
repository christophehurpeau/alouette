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
  return (
    <svg className={className} width={width} height={height}>
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap={strokeDasharray == null ? undefined : "round"}
        transform={
          strokeDasharray == null
            ? undefined
            : `rotate(-90 ${center} ${center})`
        }
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
