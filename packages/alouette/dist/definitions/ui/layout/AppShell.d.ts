import type { ReactNode } from "react";
import { type ScrollViewProps } from "../primitives/ScrollView";
export declare const appShellVariants: import("tailwind-variants").TVReturnType<{
    withHeader: {
        true: {
            frame: string;
        };
        false: {
            frame: string;
        };
    };
}, {
    frame: string;
    content: string;
    body: string;
    sidebar: string;
    main: string;
}, undefined, {
    withHeader: {
        true: {
            frame: string;
        };
        false: {
            frame: string;
        };
    };
}, {
    frame: string;
    content: string;
    body: string;
    sidebar: string;
    main: string;
}, import("tailwind-variants").TVReturnType<{
    withHeader: {
        true: {
            frame: string;
        };
        false: {
            frame: string;
        };
    };
}, {
    frame: string;
    content: string;
    body: string;
    sidebar: string;
    main: string;
}, undefined, unknown, unknown, undefined>>;
export interface AppShellProps extends Omit<ScrollViewProps, "children"> {
    /**
     * Top chrome — typically an `AppHeader`. It owns its safe-area top inset, and
     * the shell takes the `bar` header's ground for its own, so a pull past the
     * top of the scroll goes on showing the bar rather than baring the screen.
     */
    header?: ReactNode;
    /** Bottom chrome — a `contentinfo` bar closing the scrolled page. */
    footer?: ReactNode;
    /**
     * The body row: an optional `AppShellSidebar` followed by an `AppShellMain`.
     * The shell renders no landmark of its own, so whatever route composes the
     * body brings its own `AppShellMain`.
     */
    children?: ReactNode;
}
/**
 * Application shell without the body: the scroll container, the header, the
 * footer and the row the body sits in. A route composes that row itself, with
 * `AppShellSidebar` and `AppShellMain` — which is how a shell rendered once, in
 * an app's root layout, gets a rail that belongs to one section only. When the
 * whole shell is decided in one place, use `AppLayout` instead: it takes the
 * `sidebar` and the screen as props and composes these three for you.
 */
export declare function AppShell({ header, footer, children, className, contentContainerClassName, contentContainerStyle, ...props }: AppShellProps): ReactNode;
export interface AppShellSidebarProps {
    /**
     * The rail itself, composed by the caller — typically a
     * `<NavBar orientation="vertical" className="w-[220px] grow">`: the width
     * fixes the rail and `grow` fills the height the slot is stretched to. The
     * slot carries no landmark of its own, the composed navigation is the
     * landmark.
     */
    children?: ReactNode;
    className?: string;
}
/**
 * Left rail beside the screen, inside an `AppShell` body and **before** the
 * `AppShellMain` it sits next to. From `md` the two share a row; below it the
 * rail stacks above the screen.
 */
export declare function AppShellSidebar({ children, className, }: AppShellSidebarProps): ReactNode;
export interface AppShellMainProps {
    /** The screen itself. */
    children?: ReactNode;
    className?: string;
}
/**
 * The `main` landmark inside an `AppShell` body, sized to whatever the rail and
 * the chrome leave. One per rendered shell — a route composing the body owns it.
 */
export declare function AppShellMain({ children, className, }: AppShellMainProps): ReactNode;
//# sourceMappingURL=AppShell.d.ts.map