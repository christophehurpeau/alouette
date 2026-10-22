import type { ReactNode } from "react";
import { InteractiveBox, type InteractiveBoxProps } from "../containers/Box";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import {
  type LinkTextSizeProps,
  linkTextIconSize,
  linkTextVariants,
} from "./linkTextVariants";

export interface LinkTextFrameProps
  extends
    Omit<InteractiveBoxProps, "children" | "disabled">,
    LinkTextSizeProps {
  // react-native's Pressable types have no `href`, but react-native-web
  // forwards it — and renders an `<a>` for it — while native ignores it.
  href?: string;
  text: ReactNode;
  icon?: SVGIconElement | null;
  disabled: boolean;
}

export function LinkTextBox({
  text,
  icon,
  size,
  disabled,
  className,
  ...pressableProps
}: LinkTextFrameProps): ReactNode {
  const styles = linkTextVariants({ size, disabled });

  return (
    <InteractiveBox
      withFocusVisibleOutline
      role="link"
      aria-disabled={disabled}
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
    </InteractiveBox>
  );
}
