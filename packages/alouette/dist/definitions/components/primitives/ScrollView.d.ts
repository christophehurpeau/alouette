import type { GetProps } from "@tamagui/core";
import { ScrollView as ScrollViewNative } from "react-native";
export declare const ScrollView: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, ScrollViewNative, import("@tamagui/web").TamaguiComponentPropsBaseBase & import("react-native").ScrollViewProps, import("@tamagui/web").StackStyleBase & {
    readonly contentContainerStyle?: Partial<import("@tamagui/web").GetFinalProps<import("react-native").ScrollViewProps, import("@tamagui/web").StackStyleBase, {}>> | undefined;
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