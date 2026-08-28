import type { StoryObj } from "@storybook/react-vite";
import { InputTextAutocomplete } from "./InputTextAutocomplete";
type ThisStory = StoryObj<typeof InputTextAutocomplete>;
declare const _default: {
    title: string;
    component: typeof InputTextAutocomplete;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        placeholder: {
            control: "text";
        };
        disabled: {
            control: "boolean";
        };
        emptyLabel: {
            control: "text";
        };
    };
};
export default _default;
export declare const PreviewInputTextAutocompleteStory: ThisStory;
export declare const Variants: ThisStory;
export declare const Tests: StoryObj<typeof InputTextAutocomplete>;
//# sourceMappingURL=InputTextAutocomplete.stories.d.ts.map