import type { StoryObj } from "@storybook/react-vite";
import type { Accent } from "../../core/AlouetteConfig";
import { LinkText } from "./LinkText";
type ThisStory = StoryObj<typeof LinkText>;
declare const _default: {
    title: string;
    component: typeof LinkText;
    parameters: {
        componentSubtitle: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    argTypes: {
        size: {
            control: "inline-radio";
            options: string[];
        };
        accent: {
            control: "select";
            options: (Accent | undefined)[];
        };
        disabled: {
            control: "boolean";
        };
        text: {
            control: "text";
        };
    };
};
export default _default;
export declare const LinkTextPreviewStory: ThisStory;
export declare const LinkTextVariantsStory: ThisStory;
export declare const LinkTextTestsStory: ThisStory;
//# sourceMappingURL=LinkText.stories.d.ts.map