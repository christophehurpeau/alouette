import { styled } from "nativewind";
import type { ReactNode } from "react";
import {
  SectionList as RNSectionList,
  type SectionListProps as RNSectionListProps,
} from "react-native";

type DefaultSectionT = Record<string, unknown>;

export type SectionListProps<
  ItemT,
  SectionT = DefaultSectionT,
> = RNSectionListProps<ItemT, SectionT>;

export const SectionList = styled(RNSectionList, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
}) as <ItemT, SectionT = DefaultSectionT>(
  props: SectionListProps<ItemT, SectionT>,
) => ReactNode;
