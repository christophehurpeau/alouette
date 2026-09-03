import type { ReactNode } from "react";
import { type VariantProps } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
declare const blockquoteVariants: import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            quote: string;
        };
        md: {
            quote: string;
        };
    };
}, {
    frame: string;
    quote: string;
}, undefined, {
    size: {
        sm: {
            quote: string;
        };
        md: {
            quote: string;
        };
    };
}, {
    frame: string;
    quote: string;
}, import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            quote: string;
        };
        md: {
            quote: string;
        };
    };
}, {
    frame: string;
    quote: string;
}, undefined, unknown, unknown, undefined>>;
type BlockquoteVariantProps = VariantProps<typeof blockquoteVariants>;
export interface BlockquoteProps extends BlockquoteVariantProps {
    /** The quoted text. */
    children?: ReactNode;
    /** Attribution rendered under the quote — usually a `<Citation>`. */
    citation?: ReactNode;
    accent?: Accent;
    className?: string;
}
/**
 * A quoted excerpt, set off by an accent rule on its leading edge.
 *
 * `role="blockquote"` renders a `<blockquote>` element on web; native keeps a
 * plain View.
 */
export declare function Blockquote({ children, citation, accent, size, className, }: BlockquoteProps): ReactNode;
export {};
//# sourceMappingURL=Blockquote.d.ts.map