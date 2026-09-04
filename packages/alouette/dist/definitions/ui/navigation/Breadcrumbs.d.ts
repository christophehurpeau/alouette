import { type ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { type SVGIconElement } from "../primitives/Icon";
export interface BreadcrumbsProps {
    "aria-label"?: string;
    /** Icon drawn between two crumbs. Defaults to a caret. */
    separator?: SVGIconElement;
    /**
     * Called with the pressed crumb's `href`, for an app that routes in JS: the
     * crumb then cancels the anchor's own navigation. Without it — and without an
     * item `onPress` — the `<a>` navigates on web and native does nothing.
     */
    onNavigate?: (href: string) => void;
    accent?: Accent;
    disabled?: boolean;
    /** `BreadcrumbItem`s, from the root down to the page being viewed. */
    children: ReactNode;
    className?: string;
}
/**
 * Trail of the path to the current page. Each `BreadcrumbItem` is a link to an
 * ancestor except the last one, which the trail marks as the current page.
 */
export declare function Breadcrumbs({ "aria-label": ariaLabel, separator, onNavigate, accent, disabled, children, className, }: BreadcrumbsProps): ReactNode;
//# sourceMappingURL=Breadcrumbs.d.ts.map