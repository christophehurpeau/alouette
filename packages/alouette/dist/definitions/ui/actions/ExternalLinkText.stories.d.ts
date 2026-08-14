import type { StoryObj } from "@storybook/react-vite";
import type { Accent } from "../../core/AlouetteConfig";
import { ExternalLinkText } from "./ExternalLinkText";
type ThisStory = StoryObj<typeof ExternalLinkText>;
declare const _default: {
    title: string;
    component: typeof ExternalLinkText;
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
            control: "select";
            options: string[];
        };
        accent: {
            control: "select";
            options: (Accent | undefined)[];
        };
        disabled: {
            control: "boolean";
        };
    };
};
export default _default;
export declare const PreviewExternalLinkTextStory: ThisStory;
export declare const VariantsExternalLinkTextStory: ThisStory;
export declare const TestsExternalLinkTextStory: ThisStory;
//# sourceMappingURL=ExternalLinkText.stories.d.ts.map