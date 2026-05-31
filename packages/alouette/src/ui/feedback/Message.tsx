import { CheckRegularIcon } from "alouette-icons/phosphor-icons/CheckRegularIcon";
import { InfoRegularIcon } from "alouette-icons/phosphor-icons/InfoRegularIcon";
import { WarningRegularIcon } from "alouette-icons/phosphor-icons/WarningRegularIcon";
import { XRegularIcon } from "alouette-icons/phosphor-icons/XRegularIcon";
import type { ReactNode } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import type { Except } from "type-fest";
import type { SemanticRole } from "../../core/AlouetteConfig";
import { IconButton } from "../actions/IconButton";
import { Box } from "../containers/Box";
import { SemanticScope } from "../containers/SemanticScope";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";

const messageFrameVariants = tv(
  {
    base: "flex-row items-center bg-highlight-accent overflow-hidden",
    variants: {
      size: {
        sm: "gap-xs p-sm rounded-xs",
        md: "gap-m p-m rounded-sm",
        lg: "gap-l p-l rounded-md",
      },
    },
    defaultVariants: { size: "md" },
  },
  { twMerge: false },
);

type MessageVariantProps = VariantProps<typeof messageFrameVariants>;
type MessageSize = NonNullable<MessageVariantProps["size"]>;

const ICON_SIZE: Record<MessageSize, number> = { sm: 20, md: 24, lg: 28 };
const DISMISS_BUTTON_SIZE: Record<MessageSize, number> = {
  sm: 24,
  md: 40,
  lg: 40,
};

interface MessageBaseProps {
  semanticRole: SemanticRole;
  size?: MessageSize;
  icon: SVGIconElement;
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
  semanticRole,
  children,
  onDismiss,
  dismissIconAriaLabel,
}: MessageProps): ReactNode {
  const dismissDiameter = DISMISS_BUTTON_SIZE[size];
  return (
    <SemanticScope semanticRole={semanticRole}>
      <Box shadow="m" className={messageFrameVariants({ size })}>
        <Icon icon={icon} size={ICON_SIZE[size]} tint="accent" />
        <Text className="text-accent grow">{children}</Text>
        {onDismiss ? (
          <Box
            style={{ width: dismissDiameter, height: dismissDiameter }}
            className="items-center justify-center"
          >
            <IconButton
              ghost
              icon={<XRegularIcon />}
              iconSize={size === "sm" ? "fill" : undefined}
              size={dismissDiameter}
              variant="outlined"
              aria-label={dismissIconAriaLabel}
              onPress={onDismiss}
            />
          </Box>
        ) : null}
      </Box>
    </SemanticScope>
  );
}

type SemanticMessageProps = Except<MessageProps, "icon" | "semanticRole">;

export function InfoMessage(props: SemanticMessageProps): ReactNode {
  return <Message {...props} semanticRole="info" icon={<InfoRegularIcon />} />;
}

export function ConfirmationMessage(props: SemanticMessageProps): ReactNode {
  return (
    <Message {...props} semanticRole="success" icon={<CheckRegularIcon />} />
  );
}

export function WarningMessage(props: SemanticMessageProps): ReactNode {
  return (
    <Message {...props} semanticRole="warning" icon={<WarningRegularIcon />} />
  );
}
