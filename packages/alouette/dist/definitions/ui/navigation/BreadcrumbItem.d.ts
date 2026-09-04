import type { ReactNode } from "react";
import { type LinkTextProps } from "../actions/LinkText";
import { type SVGIconElement } from "../primitives/Icon";
export interface BreadcrumbItemProps {
    /**
     * Destination of the crumb. Renders a real `<a href>` on web (native ignores
     * it); expo Router's `<Link asChild>` injects it, so it does not have to be
     * written twice. The last crumb is the current page — give it its own href
     * anyway, it is rendered as plain text.
     */
    href?: string;
    label: string;
    /** Leading icon, typically on the root crumb. */
    icon?: SVGIconElement;
    disabled?: boolean;
    /**
     * Handles the press instead of the trail's `onNavigate` — this is what
     * `<Link asChild>` injects. A handler that navigates on web must call
     * `event.preventDefault()`, as routers do.
     */
    onPress?: LinkTextProps["onPress"];
}
/**
 * One crumb of a `Breadcrumbs` trail: a link to an ancestor. The last one is the
 * current page instead — plain text carrying `aria-current="page"`.
 */
export declare function BreadcrumbItem({ href, label, icon, disabled, onPress, }: BreadcrumbItemProps): ReactNode;
//# sourceMappingURL=BreadcrumbItem.d.ts.map