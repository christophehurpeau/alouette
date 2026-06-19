import type { ComponentType } from "react";
import { twMerge } from "tailwind-merge";

export function styled<P extends { className?: string }>(
  Component: ComponentType<P>,
  defaultClassName: string,
): ComponentType<P> {
  function StyledComponent({ className, ...props }: P) {
    return (
      <Component
        className={twMerge(defaultClassName, className)}
        {...(props as P)}
      />
    );
  }
  StyledComponent.displayName = `Styled(${Component.displayName ?? Component.name ?? "Component"})`;
  StyledComponent.__isStyledComponent = true;
  return StyledComponent;
}
