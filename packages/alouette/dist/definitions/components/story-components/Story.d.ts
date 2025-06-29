import type { ReactNode } from "react";
import type { Except } from "type-fest";
import type { VStackProps } from "../primitives/stacks";
export type StorySectionProps = Except<VStackProps, "marginBottom"> & {
    title: ReactNode;
    children: ReactNode;
    level?: 1 | 2;
    withBackground?: boolean;
};
declare function StorySection({ title, children, level, withBackground, ...props }: StorySectionProps): ReactNode;
export interface StoryProps {
    documentation?: NonNullable<ReactNode>;
    children?: NonNullable<ReactNode>;
}
export declare function Story({ documentation, children }: StoryProps): ReactNode;
export declare namespace Story {
    var Section: typeof StorySection;
    var SubSection: ({ title, children, withBackground, ...props }: StorySectionProps) => ReactNode;
}
export {};
//# sourceMappingURL=Story.d.ts.map