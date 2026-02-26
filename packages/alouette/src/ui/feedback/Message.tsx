import { View, styled } from "@tamagui/core";
import { CheckRegularIcon } from "alouette-icons/phosphor-icons/CheckRegularIcon";
import { InfoRegularIcon } from "alouette-icons/phosphor-icons/InfoRegularIcon";
import { WarningRegularIcon } from "alouette-icons/phosphor-icons/WarningRegularIcon";
import { XRegularIcon } from "alouette-icons/phosphor-icons/XRegularIcon";
import type { ReactNode } from "react";
import type { Except } from "type-fest";
import { IconButton } from "../actions/IconButton";
import type { SurfaceProps } from "../containers/Surface";
import { Surface } from "../containers/Surface";
import type { IconProps } from "../primitives/Icon";
import { Icon } from "../primitives/Icon";
import { Text } from "../primitives/Text";

export const MessageFrame = styled(Surface, {
  name: "MessageFrame",
  alignItems: "center",
  flexDirection: "row",
  layer: "highlight-accent",

  variants: {
    size: {
      sm: {
        gap: "$0.5",
      },
      md: {
        gap: "$1.0",
      },
      lg: {
        gap: "$1.5",
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
} as const);

export const MessageText = styled(Text, {
  size: "$md",
  flexGrow: 1,
  tint: "accent",
} as const);

const MessageIconContainer = styled(View, {
  alignItems: "center",
});

const MessageDismissButtonContainer = styled(View, {
  position: "relative",
  alignItems: "center",
  justifyContent: "center",

  variants: {
    size: {
      sm: {
        height: 24,
        width: 24,
      },
      md: {
        height: 40,
        width: 40,
      },
      lg: {
        height: 40,
        width: 40,
      },
    },
  } as const,

  defaultVariants: {
    size: "md",
  },
});

interface MessageBaseProps {
  theme: NonNullable<SurfaceProps["theme"]>;
  size?: NonNullable<SurfaceProps["size"]>;
  icon: IconProps["icon"];
  children?: ReactNode;
}
interface MessagePropsWithDismiss extends MessageBaseProps {
  onDismiss: () => void;
  dismissIconAriaLabel: string;
}

interface MessagePropsWithoutDismiss extends MessageBaseProps {
  onDismiss?: undefined;
  dismissIconAriaLabel?: undefined;
}

export type MessageProps = MessagePropsWithDismiss | MessagePropsWithoutDismiss;

export function Message({
  icon,
  size = "md",
  theme,
  children,
  onDismiss,
  dismissIconAriaLabel,
}: MessageProps): ReactNode {
  return (
    <MessageFrame theme={theme} size={size}>
      <MessageIconContainer>
        <Icon size={size === "sm" ? 20 : 24} icon={icon} tint="accent" />
      </MessageIconContainer>
      <MessageText>{children}</MessageText>
      {onDismiss ? (
        <MessageDismissButtonContainer size={size}>
          <IconButton
            icon={<XRegularIcon />}
            iconSize={size === "sm" ? "fill" : undefined}
            size={size === "sm" ? 24 : 40}
            variant="outlined"
            tint="accent"
            aria-label={dismissIconAriaLabel}
          />
        </MessageDismissButtonContainer>
      ) : null}
    </MessageFrame>
  );
}

type SemanticMessageProps = Except<MessageProps, "icon" | "theme">;

export function InfoMessage(props: SemanticMessageProps): ReactNode {
  return <Message {...props} theme="info" icon={<InfoRegularIcon />} />;
}

export function ConfirmationMessage(props: SemanticMessageProps): ReactNode {
  return <Message {...props} theme="success" icon={<CheckRegularIcon />} />;
}

export function WarningMessage(props: SemanticMessageProps): ReactNode {
  return <Message {...props} theme="warning" icon={<WarningRegularIcon />} />;
}
