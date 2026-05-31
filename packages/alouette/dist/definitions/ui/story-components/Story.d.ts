import { type ReactNode } from "react";
import type { AlouetteModeTheme, SemanticRole } from "../../core/AlouetteConfig";
export interface StorySectionProps {
    title: ReactNode;
    children: ReactNode;
    level?: 1 | 2;
    /**
     * Optional uniwind theme name to scope this section to (e.g. "light_brand").
     * Full theme name (e.g. "light_brand"). No automatic light/dark composition —
     * consumers must pass the full name.
     */
    modeTheme?: AlouetteModeTheme;
    semanticRole?: SemanticRole;
    withSurface?: boolean;
}
declare function StorySection({ title, children, level, modeTheme, semanticRole, withSurface, }: StorySectionProps): ReactNode;
declare function StorySubSection({ title, children, modeTheme, semanticRole, withSurface, }: StorySectionProps): ReactNode;
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
export declare const semanticRoles: SemanticRole[];
export {};
//# sourceMappingURL=Story.d.ts.map