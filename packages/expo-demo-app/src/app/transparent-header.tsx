import { useHeaderHeight } from "expo-router/react-navigation";
import type { ReactNode } from "react";
import { InsetsDemo } from "../InsetsDemo";

export default function TransparentHeaderScreen(): ReactNode {
  return (
    <InsetsDemo
      headerHeight={useHeaderHeight()}
      href="/transparent-header"
      title="Transparent header"
    />
  );
}
