import type { ReactNode } from "react";
export interface RingCircleProps {
    center: number;
    radius: number;
    strokeWidth: number;
    strokeDasharray?: number;
    strokeDashoffset?: number;
    /** Injected by the native `Icon` via `cloneElement`, resolved from a `useColorToken` string. */
    color?: string;
    /** Injected by the web `Icon` via `cloneElement` — the `text-*` class itself, resolved through CSS `currentColor`. */
    className?: string;
    width?: number;
    height?: number;
}
export declare function RingCircle({ center, radius, strokeWidth, strokeDasharray, strokeDashoffset, color, width, height, }: RingCircleProps): ReactNode;
//# sourceMappingURL=RingCircle.d.ts.map