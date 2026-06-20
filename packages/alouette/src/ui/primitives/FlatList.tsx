import { styled } from "nativewind";
import type { ReactNode } from "react";
import {
  FlatList as RNFlatList,
  type FlatListProps as RNFlatListProps,
} from "react-native";

export type FlatListProps<ItemT> = RNFlatListProps<ItemT>;

export const FlatList = styled(RNFlatList, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
  columnWrapperClassName: "columnWrapperStyle",
}) as <ItemT>(props: FlatListProps<ItemT>) => ReactNode;
