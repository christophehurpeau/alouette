import type { ReactNode } from "react";
import { type SVGIconElement } from "../primitives/Icon";
export interface BulletProps {
    /** Leading icon, tinted with the current accent. */
    icon: SVGIconElement;
    children?: ReactNode;
}
export declare function Bullet({ icon, children }: BulletProps): ReactNode;
//# sourceMappingURL=Bullet.d.ts.map