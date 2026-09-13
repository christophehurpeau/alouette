import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { View, type ViewProps } from "../primitives/View";

const appHeaderActionsVariants = tv({
  base: "flex-row items-center gap-xs",
});

export interface AppHeaderActionsProps extends ViewProps {
  children: ReactNode;
}

/**
 * End slot of an `AppHeader`: session controls, notifications, a settings
 * button. The header aligns the slot itself, so this only spaces its children.
 */
export function AppHeaderActions({
  className,
  ...props
}: AppHeaderActionsProps): ReactNode {
  return (
    <View className={appHeaderActionsVariants({ className })} {...props} />
  );
}
