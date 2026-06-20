import type { StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
declare const _default: {
    title: string;
    component: <ItemT, SectionT = {
        [x: string]: unknown;
    }>(props: import("./SectionList").SectionListProps<ItemT, SectionT>) => ReactNode;
    parameters: {
        componentSubtitle: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
};
export default _default;
export declare const PreviewStory: StoryObj;
export declare const VariantsStory: StoryObj;
//# sourceMappingURL=SectionList.stories.d.ts.map