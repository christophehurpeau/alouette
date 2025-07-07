import type { StoryObj } from "@storybook/react-vite";
import { InputText } from "./InputText";
declare const _default: {
    title: string;
    component: import("@tamagui/core").TamaguiComponent<import("@tamagui/core").TamaDefer, import("react-native").TextInput, import("@tamagui/core").TamaguiComponentPropsBaseBase & import("react-native").TextInputProps, import("@tamagui/core").TextStylePropsBase, {
        size?: number | undefined;
        interactive?: boolean | import("csstype").Property.Cursor | undefined;
        withBorder?: boolean | import("@tamagui/core").SizeTokens | undefined;
        withBackground?: boolean | undefined;
        withElevation?: boolean | undefined;
        circular?: boolean | undefined;
        centered?: boolean | undefined;
    }, {
        isInput: true;
    } & import("@tamagui/core").StaticConfigPublic>;
    parameters: {
        componentSubtitle: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    argTypes: {
        theme: {
            description: string;
            control: "select";
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        placeholder: {
            description: string;
            control: "text";
        };
        disabled: {
            description: string;
            control: "boolean";
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        value: {
            description: string;
            control: "text";
        };
    };
};
export default _default;
export declare const PreviewInputTextStory: StoryObj<typeof InputText>;
export declare const Variants: StoryObj<typeof InputText>;
//# sourceMappingURL=InputText.stories.d.ts.map