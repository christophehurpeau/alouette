import { type ReactNode } from "react";
import type { Accent, AlouetteModeTheme } from "../../core/AlouetteConfig";
export interface StorySectionProps {
    title: ReactNode;
    children: ReactNode;
    level?: 1 | 2;
    modeTheme?: AlouetteModeTheme;
    accent?: Accent;
    withSurface?: boolean;
}
declare function StorySection({ title, children, level, modeTheme, accent, withSurface, }: StorySectionProps): ReactNode;
declare function StorySubSection({ title, children, modeTheme, accent, withSurface, }: StorySectionProps): ReactNode;
export interface StoryProps {
    documentation?: NonNullable<ReactNode>;
    children?: NonNullable<ReactNode>;
    noDarkMode?: boolean;
}
export declare function Story({ documentation, children, noDarkMode, }: StoryProps): ReactNode;
export declare namespace Story {
    var Section: typeof StorySection;
    var SubSection: typeof StorySubSection;
}
export declare const accents: Accent[];
export {};
//# sourceMappingURL=Story.d.ts.map