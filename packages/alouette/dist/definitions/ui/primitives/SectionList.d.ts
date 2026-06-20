import type { ReactNode } from "react";
import { type SectionListProps as RNSectionListProps } from "react-native";
type DefaultSectionT = Record<string, unknown>;
export type SectionListProps<ItemT, SectionT = DefaultSectionT> = RNSectionListProps<ItemT, SectionT>;
export declare const SectionList: <ItemT, SectionT = DefaultSectionT>(props: SectionListProps<ItemT, SectionT>) => ReactNode;
export {};
//# sourceMappingURL=SectionList.d.ts.map