import type { ReactNode } from "react";
export interface StoryGridRowProps {
    children: NonNullable<ReactNode>;
    breakpoint?: "medium" | "small";
    flexWrap?: boolean;
}
declare function StoryGridRow({ children, breakpoint, flexWrap, }: StoryGridRowProps): ReactNode;
export interface StoryGridColProps {
    children: NonNullable<ReactNode>;
    title?: string;
    platform?: "all" | "native" | "web";
}
declare function StoryGridCol({ title, children, platform, }: StoryGridColProps): ReactNode;
export declare const StoryGrid: {
    Row: typeof StoryGridRow;
    Col: typeof StoryGridCol;
};
export {};
//# sourceMappingURL=StoryGrid.d.ts.map