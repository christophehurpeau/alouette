import { CaretDownRegularIcon } from "alouette-icons/phosphor-icons/CaretDownRegularIcon";
import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { Menu } from "../actions/Menu";
import { PressableBox } from "../actions/PressableBox";
import { Avatar } from "../data/Avatar";
import { Icon, type SVGIconElement } from "../primitives/Icon";

// The disc is shorter than the row it sits in: the pressable keeps the full
// touch target while the visible chip stays as compact as the bar needs.
const appHeaderAccountVariants = tv({
  base: "flex-row items-center gap-xxs rounded-sm px-xxs min-h-[44px]",
});

export interface AppHeaderAccountProps {
  /** Account name: drives the initials and labels the trigger. */
  name: string;
  /** Replaces the initials in the disc. */
  icon?: SVGIconElement;
  /** Accent of the disc. Defaults to `brand`. */
  accent?: Accent;
  /** Rendered above the items — typically the signed-in identity. */
  header?: ReactNode;
  /** `MenuItem`s, and `Separator`s between groups. */
  children: ReactNode;
}

/**
 * End slot of an `AppHeader`: the signed-in account, as one avatar trigger
 * opening a menu. Session actions belong in there rather than in the bar —
 * logging out is the rarest thing a header offers and the only destructive one.
 */
export function AppHeaderAccount({
  name,
  icon,
  accent,
  header,
  children,
}: AppHeaderAccountProps): ReactNode {
  return (
    <Menu
      label={name}
      header={header}
      render={(triggerProps) => (
        <PressableBox
          variant="soft"
          aria-label={name}
          className={appHeaderAccountVariants()}
          {...triggerProps}
        >
          <Avatar name={name} icon={icon} accent={accent} />
          <Icon
            icon={<CaretDownRegularIcon />}
            size={14}
            className="text-muted"
          />
        </PressableBox>
      )}
    >
      {children}
    </Menu>
  );
}
