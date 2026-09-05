import type { ReactNode } from "react";
import { type ScrollViewProps } from "../primitives/ScrollView";
export interface AppLayoutProps extends Omit<ScrollViewProps, "children"> {
    /**
     * Top chrome — typically an `AppHeader`. It owns its safe-area top inset, and
     * the shell takes the `bar` header's ground for its own, so a pull past the
     * top of the scroll goes on showing the bar rather than baring the screen.
     */
    header?: ReactNode;
    /** Bottom chrome — a `contentinfo` bar closing the scrolled page. */
    footer?: ReactNode;
    /**
     * Left rail beside the screen, composed by the caller — typically a
     * `<NavBar orientation="vertical" className="w-[220px] grow">`: the width
     * fixes the rail and `grow` fills the height the layout stretches it to. It
     * carries no landmark of its own, the composed navigation is the landmark.
     */
    sidebar?: ReactNode;
    /** The screen itself, in a `main` landmark. */
    children?: ReactNode;
}
/**
 * Application shell: a header, an optional left sidebar beside the screen and a
 * footer, scrolling together as one page. Every slot is composed by the caller —
 * the layout places them, sizes the screen to whatever is left, and applies the
 * safe-area insets around the body (the header pads its own top), so the screen
 * inside needs no scroll container and no insets of its own.
 */
export declare function AppLayout({ header, footer, sidebar, children, className, contentContainerClassName, contentContainerStyle, ...props }: AppLayoutProps): ReactNode;
//# sourceMappingURL=AppLayout.d.ts.map