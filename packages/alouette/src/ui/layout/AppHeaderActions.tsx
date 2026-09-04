import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { HStack, type HStackProps } from "../stacks/stacks";

const appHeaderActionsVariants = tv({
  base: "items-center gap-xs",
});

export interface AppHeaderActionsProps extends HStackProps {
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
    <HStack className={appHeaderActionsVariants({ className })} {...props} />
  );
}
