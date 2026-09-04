import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import { tv } from "tailwind-variants";
import { PressableBox } from "../actions/PressableBox";
import { Text } from "../primitives/Text";
import { HStack, VStack } from "../stacks/stacks";

const appHeaderBrandVariants = tv({
  slots: {
    // The header slot aligns the brand.
    frame: "items-center gap-xs",
    title: "font-heading-bold text-xl",
    subtitle: "text-muted text-sm",
  },
  variants: {
    interactive: {
      // A Pressable is not an HStack, hence the explicit row; it also needs
      // room for its hover fill and focus outline. `-ml-xs` pulls that leading
      // padding back out, so the fill bleeds into the header's gutter and the
      // mark stays flush with the content edge — a linked brand lands exactly
      // where a display-only one does. The trailing padding is kept: it only
      // extends the hit area towards the navigation, where nothing lines up.
      true: { frame: "flex-row rounded-sm px-sm py-xxs -ml-sm" },
      false: {},
    },
  },
  defaultVariants: { interactive: false },
});

export interface AppHeaderBrandProps {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Rendered before the title — typically a `BrandLogo`. */
  brandLogo?: ReactNode;
  /**
   * Home destination. Renders a real `<a href>` on web (native ignores it);
   * expo Router's `<Link asChild>` injects it together with `onPress`.
   *
   * react-native's types have no `href`, but react-native-web forwards it.
   */
  href?: string;
  onPress?: (event: GestureResponderEvent) => void;
  "aria-label"?: string;
}

/**
 * Product identity in the start slot of an `AppHeader`. Given `href` or
 * `onPress` it becomes a pressable with the full interactive state set, instead
 * of a display-only row wrapped in a link.
 */
export function AppHeaderBrand({
  title,
  subtitle,
  brandLogo,
  href,
  onPress,
  ...props
}: AppHeaderBrandProps): ReactNode {
  const interactive = href !== undefined || onPress !== undefined;
  const styles = appHeaderBrandVariants({ interactive });
  const content = (
    <>
      {brandLogo}
      <VStack>
        <Text className={styles.title()}>{title}</Text>
        {subtitle ? (
          <Text className={styles.subtitle()}>{subtitle}</Text>
        ) : null}
      </VStack>
    </>
  );

  if (!interactive) {
    return (
      <HStack className={styles.frame()} {...props}>
        {content}
      </HStack>
    );
  }

  return (
    <PressableBox
      variant="soft"
      className={styles.frame()}
      // Spread, not written as props: react-native's Pressable types have no
      // href, while react-native-web forwards it as a real anchor.
      {...{
        role: href === undefined ? "button" : "link",
        href,
        onPress,
        ...props,
      }}
    >
      {content}
    </PressableBox>
  );
}
