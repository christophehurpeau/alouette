import type { FunctionComponent } from "react";
import type { ExternalLinkProps } from "./ExternalLink";

export function ExternalLink<C extends FunctionComponent<any>>({
  as: C,
  href,
  openLinkBehavior,
  onPress,
  ...props
}: ExternalLinkProps<C>) {
  return (
    <C
      {...(props as any)}
      {...(href ? { href } : {})}
      {...(openLinkBehavior?.web === "targetSelf"
        ? {}
        : { hrefAttrs: { target: "_blank", rel: "noopener noreferrer" } })}
      onPress={onPress}
    />
  );
}
