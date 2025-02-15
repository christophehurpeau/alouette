import type { StoryObj } from "@storybook/react";
import { InputText } from "./InputText";
declare const _default: {
    title: string;
    component: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("react-native").TextInput, import("@tamagui/web").TamaguiComponentPropsBaseBase & import("react-native").TextInputProps, import("@tamagui/web").TextStylePropsBase, {
        internalForcedPseudoState?: import("../primitives/createVariants").InternalPseudoState | undefined;
        withBorder?: boolean | import("@tamagui/web").SizeTokens | undefined;
        size?: number | undefined;
        interactive?: boolean | import("csstype").Property.Cursor | undefined;
        withBackground?: boolean | undefined;
        withElevation?: boolean | undefined;
        circular?: boolean | undefined;
        centered?: boolean | undefined;
    }, {
        isInput: true;
    } & import("@tamagui/web").StaticConfigPublic>;
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