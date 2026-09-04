import type { ReactNode } from "react";
import { type VariantProps } from "tailwind-variants";
import { type BoxProps } from "../containers/Box";
export type AppHeaderSize = "md" | "sm";
declare const appHeaderVariants: import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            inner: string;
        };
        md: {
            inner: string;
        };
    };
    variant: {
        bar: {
            frame: string;
        };
        transparent: {
            frame: string;
        };
    };
    contentWidth: {
        boxed: {
            inner: string;
        };
        full: {};
    };
    withActions: {
        false: {
            endSlot: string;
        };
        true: {};
    };
}, {
    frame: string;
    inner: string;
    startSlot: string;
    endSlot: string;
    navSlot: string;
}, undefined, {
    size: {
        sm: {
            inner: string;
        };
        md: {
            inner: string;
        };
    };
    variant: {
        bar: {
            frame: string;
        };
        transparent: {
            frame: string;
        };
    };
    contentWidth: {
        boxed: {
            inner: string;
        };
        full: {};
    };
    withActions: {
        false: {
            endSlot: string;
        };
        true: {};
    };
}, {
    frame: string;
    inner: string;
    startSlot: string;
    endSlot: string;
    navSlot: string;
}, import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            inner: string;
        };
        md: {
            inner: string;
        };
    };
    variant: {
        bar: {
            frame: string;
        };
        transparent: {
            frame: string;
        };
    };
    contentWidth: {
        boxed: {
            inner: string;
        };
        full: {};
    };
    withActions: {
        false: {
            endSlot: string;
        };
        true: {};
    };
}, {
    frame: string;
    inner: string;
    startSlot: string;
    endSlot: string;
    navSlot: string;
}, undefined, unknown, unknown, undefined>>;
type AppHeaderVariantProps = Omit<VariantProps<typeof appHeaderVariants>, "size" | "withActions">;
export interface AppHeaderProps extends Omit<BoxProps, "children">, AppHeaderVariantProps {
    size?: AppHeaderSize;
    /** Start slot — typically an `AppHeaderBrand`. */
    brand?: ReactNode;
    /** End slot — typically an `AppHeaderActions`. */
    actions?: ReactNode;
    /**
     * Navigation slot — typically a `NavBar`. It owns the second line while the
     * header is stacked, so give the bar `stretch` to fill that line.
     */
    children?: ReactNode;
    /**
     * Pads the frame with the device's top inset, so the bar clears the status
     * bar while its background bleeds under it. Native-only, and skipped when an
     * ancestor `SafeAreaScope` declares the top edge already consumed.
     */
    withSafeAreaTop?: boolean;
}
/**
 * Application banner: brand, navigation and session actions on one boxed row
 * from `md` on web. Below it — and on native at every width — the brand and the
 * actions share the first line and the navigation spans the second.
 */
export declare function AppHeader({ brand, actions, children, size, variant, contentWidth, withSafeAreaTop, className, ...props }: AppHeaderProps): ReactNode;
export {};
//# sourceMappingURL=AppHeader.d.ts.map