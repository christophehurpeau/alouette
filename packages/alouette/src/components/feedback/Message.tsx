import { View, styled } from "@tamagui/core";
import { XRegularIcon } from "alouette-icons/phosphor-icons/XRegularIcon";
import type { ComponentProps, ReactNode } from "react";
import { IconButton } from "../actions/IconButton";
import { Box } from "../containers/Box";
import { Typography } from "../typography/Typography";
import { FeedbackIcon } from "./FeedbackIcon";

export const MessageFrame = styled(Box, {
  name: "MessageFrame",
  alignItems: "center",
  withBackground: true,
  borderRadius: "$md",
  paddingHorizontal: "$4",
  flexDirection: "row",
  gap: "$4",
} as const);

export const MessageText = styled(Typography, {
  name: "MessageText",
  // contrast: true,
  size: "$md",
  flexGrow: 1,
  paddingVertical: "$4",
  variants: {
    centered: {
      true: {
        textAlign: "center",
        paddingHorizontal: "$4",
      },
    },
  },
} as const);

const MessageIconContainer = styled(View, {
  alignItems: "center",
});

const MessageDismissButtonContainer = styled(View, {
  marginRight: "$2",
});

export interface MessageProps {
  theme: NonNullable<ComponentProps<typeof MessageFrame>["theme"]>;
  children?: ReactNode;
  textCentered?: boolean;
  onDismiss?: () => void;
}

export function Message({
  theme,
  textCentered,
  children,
  onDismiss,
}: MessageProps): ReactNode {
  return (
    <MessageFrame theme={theme}>
      {textCentered ? null : (
        <MessageIconContainer>
          <FeedbackIcon type={theme} />
        </MessageIconContainer>
      )}
      <MessageText centered={textCentered}>{children}</MessageText>
      {onDismiss ? (
        <MessageDismissButtonContainer>
          <IconButton
            icon={<XRegularIcon />}
            size={40}
            variant="ghost-contained"
          />
        </MessageDismissButtonContainer>
      ) : null}
    </MessageFrame>
  );
}
