import type { StoryObj } from "@storybook/react-vite";
import type { Accent } from "../../core/AlouetteConfig";
import { Breadcrumbs } from "./Breadcrumbs";
type ThisStory = StoryObj<typeof Breadcrumbs>;
declare const _default: {
    title: string;
    component: typeof Breadcrumbs;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        disabled: {
            control: "boolean";
        };
        accent: {
            control: "select";
            options: (Accent | undefined)[];
        };
        "aria-label": {
            control: "text";
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
    };
};
export default _default;
export declare const BreadcrumbsPreviewStory: ThisStory;
export declare const BreadcrumbsVariantsStory: ThisStory;
export declare const BreadcrumbsTestsStory: ThisStory;
//# sourceMappingURL=Breadcrumbs.stories.d.ts.map