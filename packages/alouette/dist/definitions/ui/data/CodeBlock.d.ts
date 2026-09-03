import type { ReactNode } from "react";
import { type VariantProps } from "tailwind-variants";
declare const codeBlockVariants: import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            code: string;
        };
        md: {
            code: string;
        };
    };
}, {
    frame: string;
    title: string;
    code: string;
}, undefined, {
    size: {
        sm: {
            code: string;
        };
        md: {
            code: string;
        };
    };
}, {
    frame: string;
    title: string;
    code: string;
}, import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            code: string;
        };
        md: {
            code: string;
        };
    };
}, {
    frame: string;
    title: string;
    code: string;
}, undefined, unknown, unknown, undefined>>;
type CodeBlockVariantProps = VariantProps<typeof codeBlockVariants>;
export interface CodeBlockProps extends CodeBlockVariantProps {
    /** Label above the code — typically a file name or a language. */
    title?: ReactNode;
    className?: string;
    children?: ReactNode;
}
/**
 * A block of code on the lowered layer: an inset track holding mono text that
 * scrolls horizontally rather than wrapping. Display-only — never wrap it in a
 * pressable to make it copyable, put an IconButton beside it instead.
 *
 * `role="code"` renders a `<code>` element on web; native keeps a plain Text.
 */
export declare function CodeBlock({ title, size, className, children, }: CodeBlockProps): ReactNode;
export {};
//# sourceMappingURL=CodeBlock.d.ts.map