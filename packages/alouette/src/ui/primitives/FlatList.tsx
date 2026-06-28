import { styled } from "nativewind";
import type { ComponentType, ReactNode } from "react";
import {
  FlatList as RNFlatList,
  type FlatListProps as RNFlatListProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

export type FlatListProps<ItemT> = RNFlatListProps<ItemT>;

interface StyledFlatListProps {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  columnWrapperStyle?: StyleProp<ViewStyle>;
}

export const FlatList = styled(
  RNFlatList as unknown as ComponentType<StyledFlatListProps>,
  {
    className: "style",
    contentContainerClassName: "contentContainerStyle",
    columnWrapperClassName: "columnWrapperStyle",
  },
) as <ItemT>(props: FlatListProps<ItemT>) => ReactNode;
