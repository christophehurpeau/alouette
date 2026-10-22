import { type ReactNode, use } from "react";
import { Icon } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { TextAncestorContext } from "../primitives/TextAncestorContext";
import { LinkTextBox, type LinkTextFrameProps } from "./LinkTextBox";
import { linkTextIconSize, linkTextVariants } from "./linkTextVariants";

/**
 * A View inside a Text is laid out as one inline block, so its label cannot
 * share the line's baseline: inside a Text, the link is a nested Text.
 */
export function LinkTextFrame(props: LinkTextFrameProps): ReactNode {
  if (!use(TextAncestorContext)) return <LinkTextBox {...props} />;

  const { text, icon, size, disabled, onPress } = props;
  const styles = linkTextVariants({ size, disabled });

  return (
    <Text
      role="link"
      aria-disabled={disabled}
      disabled={disabled}
      className={styles.text()}
      onPress={onPress ?? undefined}
    >
      {icon ? (
        <>
          <Icon
            icon={icon}
            size={linkTextIconSize(size)}
            className={styles.icon()}
          />{" "}
        </>
      ) : null}
      {text}
    </Text>
  );
}
