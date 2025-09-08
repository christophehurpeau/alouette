import type { StoryObj } from "@storybook/react-vite";
import { Icon } from "./Icon";
declare const _default: {
    title: string;
    component: typeof Icon;
    parameters: {
        componentSubtitle: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    argTypes: {
        icon: {
            description: string;
            control: "object";
        };
        size: {
            description: string;
            control: "number";
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
    };
};
export default _default;
export declare const PreviewIconStory: StoryObj<typeof Icon>;
export declare const VariantsIconStory: StoryObj<typeof Icon>;
//# sourceMappingURL=Icon.stories.d.ts.map