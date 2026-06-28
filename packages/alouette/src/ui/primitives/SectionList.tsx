import { styled } from "nativewind";
import type { ComponentType, ReactNode } from "react";
import {
  SectionList as RNSectionList,
  type SectionListProps as RNSectionListProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

type DefaultSectionT = Record<string, unknown>;

export type SectionListProps<
  ItemT,
  SectionT = DefaultSectionT,
> = RNSectionListProps<ItemT, SectionT>;

interface StyledSectionListProps {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const SectionList = styled(
  RNSectionList as unknown as ComponentType<StyledSectionListProps>,
  {
    className: "style",
    contentContainerClassName: "contentContainerStyle",
  },
) as <ItemT, SectionT = DefaultSectionT>(
  props: SectionListProps<ItemT, SectionT>,
) => ReactNode;
