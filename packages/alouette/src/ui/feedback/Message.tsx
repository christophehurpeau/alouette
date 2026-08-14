import { CheckRegularIcon } from "alouette-icons/phosphor-icons/CheckRegularIcon";
import { InfoRegularIcon } from "alouette-icons/phosphor-icons/InfoRegularIcon";
import { WarningDuotoneIcon } from "alouette-icons/phosphor-icons/WarningDuotoneIcon";
import { WarningRegularIcon } from "alouette-icons/phosphor-icons/WarningRegularIcon";
import { XRegularIcon } from "alouette-icons/phosphor-icons/XRegularIcon";
import type { ReactNode } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import type { Except } from "type-fest";
import type { Accent } from "../../core/AlouetteConfig";
import { IconButton } from "../actions/IconButton";
import { AccentScope } from "../containers/AccentScope";
import { Box } from "../containers/Box";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";

const messageFrameVariants = tv(
  {
    base: "flex-row items-center overflow-hidden bg-highlight-accent",
    variants: {
      size: {
        sm: "gap-xs p-sm rounded-xs",
        md: "gap-m p-m rounded-sm",
        lg: "gap-l p-l rounded-md",
      },
      variant: {
        // Raised: the banner is its own layer above the screen background.
        surface: "shadow-m",
        // Flush: for a banner already inside a raised surface, where a second
        // elevation would read as a card stacked on a card.
        flat: "shadow-none border-border-muted border",
      },
    },
    defaultVariants: { size: "md", variant: "surface" },
  },
  { twMerge: false },
);

type MessageVariantProps = VariantProps<typeof messageFrameVariants>;
type MessageSize = NonNullable<MessageVariantProps["size"]>;
export type MessageVariant = NonNullable<MessageVariantProps["variant"]>;

const ICON_SIZE: Record<MessageSize, number> = { sm: 20, md: 24, lg: 28 };
const DISMISS_BUTTON_SIZE: Record<MessageSize, number> = {
  sm: 24,
  md: 40,
  lg: 40,
};

interface MessageBaseProps {
  accent: Accent;
  size?: MessageSize;
  /**
   * "surface" (default) is a raised banner. Use "flat" only when the message
   * already sits inside a raised surface (a Modal footer, a Surface card).
   */
  variant?: MessageVariant;
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
  variant,
  accent,
  children,
  onDismiss,
  dismissIconAriaLabel,
}: MessageProps): ReactNode {
  const dismissDiameter = DISMISS_BUTTON_SIZE[size];
  return (
    <AccentScope accent={accent}>
      <Box className={messageFrameVariants({ size, variant })}>
        <Icon icon={icon} size={ICON_SIZE[size]} className="text-accent" />
        {/* React Native defaults flexShrink to 0: without `shrink` the text
            keeps its content width and pushes the dismiss button out of the
            frame instead of wrapping. */}
        <Text className="text-sharp shrink grow">{children}</Text>
        {onDismiss ? (
          <Box
            style={{ width: dismissDiameter, height: dismissDiameter }}
            className="shrink-0 flex-center"
          >
            <IconButton
              icon={<XRegularIcon />}
              iconSize={size === "sm" ? "fill" : undefined}
              size={dismissDiameter}
              variant="ghost"
              aria-label={dismissIconAriaLabel}
              onPress={onDismiss}
            />
          </Box>
        ) : null}
      </Box>
    </AccentScope>
  );
}

type AccentMessageProps = Except<MessageProps, "accent" | "icon">;

export function InfoMessage(props: AccentMessageProps): ReactNode {
  return <Message {...props} accent="info" icon={<InfoRegularIcon />} />;
}

export function ConfirmationMessage(props: AccentMessageProps): ReactNode {
  return <Message {...props} accent="success" icon={<CheckRegularIcon />} />;
}

export function WarningMessage(props: AccentMessageProps): ReactNode {
  return <Message {...props} accent="warning" icon={<WarningRegularIcon />} />;
}

export function ErrorMessage(props: AccentMessageProps): ReactNode {
  return <Message {...props} accent="danger" icon={<WarningDuotoneIcon />} />;
}
