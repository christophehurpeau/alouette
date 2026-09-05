import type { ReactNode } from "react";
import { SegmentedBar } from "../selection/SegmentedBar";
import {
  type SegmentedVariant,
  type SelectionGroupProps,
  useSelectionValue,
} from "../selection/SelectionContext";
import { TabsContextProvider } from "./TabsContext";

export interface TabsProps extends SelectionGroupProps {
  "aria-label"?: string;
  /**
   * `icon` renders the tabs as square icon-only chips in a pill-shaped bar;
   * each tab's `label` stays its accessible name, so a tab must carry an
   * `icon`.
   */
  variant?: SegmentedVariant;
}

/** Segmented switch between views rendered on the same screen. */
export function Tabs({
  value,
  defaultValue,
  onValueChange,
  accent,
  disabled,
  variant,
  children,
  ...props
}: TabsProps): ReactNode {
  const context = useSelectionValue({
    value,
    defaultValue,
    onValueChange,
    disabled,
    variant,
  });

  return (
    <TabsContextProvider value={context}>
      <SegmentedBar role="tablist" variant={variant} accent={accent} {...props}>
        {children}
      </SegmentedBar>
    </TabsContextProvider>
  );
}
