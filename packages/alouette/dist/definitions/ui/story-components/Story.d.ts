import type { ReactNode } from "react";
import type { Except } from "type-fest";
import type { VStackProps } from "../stacks/stacks";
export type StorySectionProps = Except<VStackProps, "marginBottom"> & {
    title: ReactNode;
    children: ReactNode;
    level?: 1 | 2;
    withSurface?: boolean;
};
declare function StorySection({ title, children, level, withSurface, ...props }: StorySectionProps): ReactNode;
export interface StoryProps {
    documentation?: NonNullable<ReactNode>;
    children?: NonNullable<ReactNode>;
    noDarkTheme?: boolean;
}
export declare function Story({ documentation, children, noDarkTheme, }: StoryProps): ReactNode;
export declare namespace Story {
    var Section: typeof StorySection;
    var SubSection: ({ title, children, withSurface, ...props }: StorySectionProps) => ReactNode;
}
export {};
//# sourceMappingURL=Story.d.ts.map