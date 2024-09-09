import type { GetProps } from "@tamagui/core";
import { ScrollView as ScrollViewNative } from "react-native";
export declare const ScrollView: import("@tamagui/core").TamaguiComponent<import("@tamagui/core").TamaDefer, ScrollViewNative, import("@tamagui/core").TamaguiComponentPropsBaseBase & import("react-native").ScrollViewProps, import("@tamagui/core").StackStyleBase & {
    readonly contentContainerStyle?: Partial<import("@tamagui/core").GetFinalProps<import("react-native").ScrollViewProps, import("@tamagui/core").StackStyleBase, {}>> | undefined;
}, {
    fullscreen?: boolean | undefined;
}, {
    readonly accept: {
        readonly contentContainerStyle: "style";
    };
}>;
export type ScrollView = Pick<ScrollViewNative, "scrollTo">;
export type ScrollViewProps = GetProps<typeof ScrollView>;
//# sourceMappingURL=ScrollView.d.ts.map