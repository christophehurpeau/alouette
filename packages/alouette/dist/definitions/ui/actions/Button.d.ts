import type { ReactNode } from "react";
import { type VariantProps } from "tailwind-variants";
import type { SemanticRole } from "../../core/AlouetteConfig";
import { type PressableBoxProps } from "../data/PressableBox";
import { type SVGIconElement } from "../primitives/Icon";
export declare const buttonHeight: {
    readonly sm: 38;
    readonly md: 44;
};
declare const buttonFrameVariants: import("tailwind-variants").TVReturnType<{
    size: {
        sm: string;
        md: string;
    };
}, undefined, "flex-row items-center justify-center", {
    size: {
        sm: string;
        md: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    size: {
        sm: string;
        md: string;
    };
}, undefined, "flex-row items-center justify-center", unknown, unknown, undefined>>;
type ButtonSizeProps = VariantProps<typeof buttonFrameVariants>;
export interface ButtonProps extends Omit<PressableBoxProps, "children">, ButtonSizeProps {
    icon?: SVGIconElement;
    semanticRole?: SemanticRole;
    text: ReactNode;
}
export declare function Button({ icon, text, disabled, semanticRole, variant, size, className, ...pressableProps }: ButtonProps): ReactNode;
export interface ExternalLinkButtonProps extends ButtonProps {
    href: string;
}
export declare function ExternalLinkButton({ href, onPress, ...buttonProps }: ExternalLinkButtonProps): ReactNode;
export interface InternalLinkButtonProps extends ButtonProps {
    href: string;
}
export declare function InternalLinkButton({ href: _href, ...buttonProps }: InternalLinkButtonProps): ReactNode;
export {};
//# sourceMappingURL=Button.d.ts.map