import type { ReactNode } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";
import { InteractiveBox, type InteractiveBoxProps } from "../containers/Box";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";

// The link treatment of the whole system, shared with ExternalLinkText: an
// underlined label drawn from the `interactive-*` foreground tokens, tinted on
// hover and press. Native resolves the icon tint through useColorToken, which
// reads the base `text-*` only, so the group-driven hover/active tint is
// web-only.
export const linkTextVariants = tv(
  {
    slots: {
      frame:
        "group flex-row items-center gap-xxs self-start focus-visible:outline-interactive-outlined-outline-focus",
      text: "shrink font-body-bold underline transition-[color] duration-fast ease-in",
      icon: "",
    },
    variants: {
      size: {
        sm: { text: "text-sm" },
        md: { text: "text-base" },
      },
      disabled: {
        true: {
          text: "text-disabled-muted",
          icon: "text-disabled-muted",
        },
        false: {
          text: "text-interactive-pressable group-hover:text-interactive-hover group-active:text-interactive-active",
          icon: "text-interactive-pressable group-hover:text-interactive-hover group-active:text-interactive-active",
        },
      },
    },
    defaultVariants: { size: "md", disabled: false },
  },
  { twMerge: false },
);

export type LinkTextSizeProps = Pick<
  VariantProps<typeof linkTextVariants>,
  "size"
>;

/** Icon size matching a link's text size. */
export function linkTextIconSize(size: LinkTextSizeProps["size"]): number {
  return size === "sm" ? 16 : 20;
}

// react-native's Pressable types have no `href`, but react-native-web forwards
// it — and renders an `<a>` for it — while native ignores it.
interface LinkPressableProps extends InteractiveBoxProps {
  href?: string;
}

function LinkPressable(props: LinkPressableProps): ReactNode {
  return <InteractiveBox {...props} />;
}

export interface LinkTextProps
  extends Omit<InteractiveBoxProps, "children">, LinkTextSizeProps {
  /**
   * In-app destination. react-native-web renders a real `<a href>`, which
   * navigates on its own; native ignores it, so a native app routes from
   * `onPress` — expo Router's `<Link asChild>` injects both, and a handler that
   * navigates on web must call `event.preventDefault()`, as routers do.
   */
  href?: string;
  text: ReactNode;
  /** Leading icon, tinted with the label. */
  icon?: SVGIconElement;
  accent?: Accent;
}

/**
 * Text link to an in-app destination — the lightweight alternative to a Button
 * when the link is part of a text flow rather than a call to action. Use
 * `ExternalLinkText` for a destination outside the app, and a `NavBar` for the
 * primary navigation between screens.
 */
export function LinkText({
  href,
  text,
  icon,
  accent,
  size = "md",
  disabled,
  className,
  ...pressableProps
}: LinkTextProps): ReactNode {
  const isDisabled = disabled === true;
  const styles = linkTextVariants({ size, disabled: isDisabled });

  return (
    <AccentScope accent={accent}>
      <LinkPressable
        withFocusVisibleOutline
        role="link"
        // A disabled Pressable never sees the press that would cancel the
        // navigation, so the href has to go with it.
        href={isDisabled ? undefined : href}
        aria-disabled={isDisabled}
        disabled={disabled}
        className={styles.frame({ className })}
        {...pressableProps}
      >
        {icon ? (
          <Icon
            icon={icon}
            size={linkTextIconSize(size)}
            className={styles.icon()}
          />
        ) : null}
        <Text className={styles.text()}>{text}</Text>
      </LinkPressable>
    </AccentScope>
  );
}
