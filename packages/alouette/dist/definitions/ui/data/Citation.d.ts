import type { ReactNode } from "react";
import { type VariantProps } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { type ExternalOpenLinkBehavior } from "../../expo/ExternalLink.shared";
declare const citationVariants: import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            text: string;
        };
        md: {
            text: string;
        };
    };
}, {
    frame: string;
    text: string;
}, undefined, {
    size: {
        sm: {
            text: string;
        };
        md: {
            text: string;
        };
    };
}, {
    frame: string;
    text: string;
}, import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            text: string;
        };
        md: {
            text: string;
        };
    };
}, {
    frame: string;
    text: string;
}, undefined, unknown, unknown, undefined>>;
type CitationVariantProps = VariantProps<typeof citationVariants>;
export interface CitationProps extends CitationVariantProps {
    /** The source being credited — an author, a work, a publication. */
    children?: ReactNode;
    /** When set, the source is rendered as a link to it. */
    href?: string;
    /** How the link opens. Defaults to an in-app browser sheet / a new tab. */
    openLinkBehavior?: ExternalOpenLinkBehavior;
    accent?: Accent;
    className?: string;
}
/**
 * Attribution for a quote or an excerpt: an em dash followed by the source,
 * optionally linked. Pass it to `Blockquote`'s `citation` prop, or render it
 * under any excerpt that needs crediting.
 */
export declare function Citation({ children, href, openLinkBehavior, accent, size, className, }: CitationProps): ReactNode;
export {};
//# sourceMappingURL=Citation.d.ts.map