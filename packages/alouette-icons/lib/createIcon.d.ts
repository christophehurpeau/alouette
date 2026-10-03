import type { FunctionComponent, SVGProps } from "react";

export type IconComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

export declare function createIcon(...paths: string[]): IconComponent;

/** `backgroundPath` is drawn under `paths` at 20% opacity. */
export declare function createDuotoneIcon(
  backgroundPath: string,
  ...paths: string[]
): IconComponent;
