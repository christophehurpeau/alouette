import type { StoryObj } from "@storybook/react-vite";
import { Link } from "./Link.tsx";
type ThisStory = StoryObj<typeof Link>;
declare const _default: {
    title: string;
    component: import("react").ForwardRefExoticComponent<Omit<import("@tamagui/web").GetFinalProps<import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
        size?: "xl" | "lg" | "md" | "sm" | "xs" | undefined;
        family?: "heading" | "body" | undefined;
        contrast?: boolean | undefined;
        weight?: "regular" | "bold" | "black" | undefined;
    }>, "href"> & {
        href: string;
    } & import("react").RefAttributes<HTMLAnchorElement>>;
    parameters: {
        componentSubtitle: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    argTypes: {
        href: {
            description: string;
            control: "text";
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        target: {
            description: string;
            control: "select";
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
    };
};
export default _default;
export declare const PreviewLinkStory: ThisStory;
export declare const Variants: ThisStory;
//# sourceMappingURL=Link.stories.d.ts.map