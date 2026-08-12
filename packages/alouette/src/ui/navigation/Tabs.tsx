import type { ReactNode } from "react";
import { SegmentedBar } from "../selection/SegmentedBar";
import {
  type SelectionGroupProps,
  useSelectionValue,
} from "../selection/SelectionContext";
import { TabsContextProvider } from "./TabsContext";

export interface TabsProps extends SelectionGroupProps {
  "aria-label"?: string;
}

/** Segmented switch between views rendered on the same screen. */
export function Tabs({
  value,
  defaultValue,
  onValueChange,
  accent,
  disabled,
  children,
  ...props
}: TabsProps): ReactNode {
  const context = useSelectionValue({
    value,
    defaultValue,
    onValueChange,
    disabled,
  });

  return (
    <TabsContextProvider value={context}>
      <SegmentedBar role="tablist" accent={accent} {...props}>
        {children}
      </SegmentedBar>
    </TabsContextProvider>
  );
}
