import { type ReactNode } from "react";
import type { Accent, AccentOrNeutral, AlouetteModeTheme } from "../../core/AlouetteConfig";
export interface StorySectionProps {
    title: ReactNode;
    children: ReactNode;
    level?: 1 | 2;
    modeTheme?: AlouetteModeTheme;
    accent?: AccentOrNeutral;
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
    export { StorySection as Section };
    export { StorySubSection as SubSection };
}
export declare const accentsWithoutNeutral: Accent[];
export declare const neutralAndAccents: AccentOrNeutral[];
export {};
//# sourceMappingURL=Story.d.ts.map