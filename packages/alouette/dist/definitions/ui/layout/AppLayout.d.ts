import type { ReactNode } from "react";
import { type AppShellProps } from "./AppShell";
export interface AppLayoutProps extends Omit<AppShellProps, "children"> {
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
 *
 * The whole shell is decided here, at one call site. When the shell is rendered
 * once for a whole app but the rail belongs to a section of it, compose
 * `AppShell` with a per-route `AppShellSidebar` / `AppShellMain` instead.
 */
export declare function AppLayout({ sidebar, children, ...props }: AppLayoutProps): ReactNode;
//# sourceMappingURL=AppLayout.d.ts.map