import { XRegularIcon } from "alouette-icons/phosphor-icons/XRegularIcon";
import { type ReactNode, useId } from "react";
import { Pressable, Modal as RNModal, useWindowDimensions } from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { IconButton } from "../actions/IconButton";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { ScrollView } from "../primitives/ScrollView";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { HStack, VStack } from "../stacks/stacks";
import { AccentScope } from "./AccentScope";
import { Surface } from "./Surface";

const panelVariants = tv(
  {
    // w-full so the panel shrinks on small screens (the backdrop padding keeps a
    // margin); max-w caps it on wide viewports.
    base: "w-full",
    variants: {
      size: {
        sm: "max-w-[360px]",
        md: "max-w-[520px]",
        lg: "max-w-[720px]",
      },
    },
    defaultVariants: { size: "md" },
  },
  { twMerge: false },
);

type PanelVariantProps = VariantProps<typeof panelVariants>;

// The close button is absolutely positioned at a fixed corner inset, so its
// height no longer dictates the header row height and it hugs the corner
// regardless of the Surface's size-scaled padding. The title reserves right
// padding so its text can't run under the button — larger sizes need less
// because the Surface padding already pushes the text inward.
const titleReserveVariants = tv(
  {
    variants: {
      size: {
        sm: "pr-xxl",
        md: "pr-xl",
        lg: "pr-xl",
      },
    },
    defaultVariants: { size: "md" },
  },
  { twMerge: false },
);

interface ModalBaseProps {
  /** Whether the modal is shown. */
  visible: boolean;
  /**
   * Called when the user dismisses the modal — backdrop press, close button, the
   * Android back button, or the Escape key (web).
   */
  onClose: () => void;
  children: ReactNode;
  /** Accent-tinted icon rendered before the title in the header. */
  icon?: SVGIconElement;
  /** Actions row rendered below the body (e.g. Cancel/Confirm buttons). */
  footer?: ReactNode;
  accent?: Accent;
  size?: PanelVariantProps["size"];
  /** Hide the header close button (the modal stays dismissible otherwise). */
  hideCloseButton?: boolean;
  /** Accessible label for the close button. */
  closeButtonAriaLabel?: string;
  /**
   * `alertdialog` for interruptions that require an explicit response
   * (destructive confirmation, errors). Defaults to `dialog`.
   */
  role?: "alertdialog" | "dialog";
  /** ID of the element describing the dialog (announced by assistive tech). */
  "aria-describedby"?: string;
  testID?: string;
}

interface ModalWithTitleProps extends ModalBaseProps {
  /** Heading rendered in the header; also labels the dialog for assistive tech. */
  title: string;
  "aria-label"?: string;
}

interface ModalWithoutTitleProps extends ModalBaseProps {
  title?: undefined;
  /** Required when there is no `title`, so the dialog is still labelled. */
  "aria-label": string;
}

export type ModalProps = ModalWithoutTitleProps | ModalWithTitleProps;

export function Modal({
  visible,
  onClose,
  children,
  icon,
  footer,
  accent,
  size = "md",
  title,
  hideCloseButton = false,
  closeButtonAriaLabel = "Close",
  role = "dialog",
  "aria-describedby": ariaDescribedby,
  testID,
  "aria-label": ariaLabel,
}: ModalProps): ReactNode {
  const { height: windowHeight } = useWindowDimensions();
  const titleId = useId();

  return (
    <AccentScope accent={accent}>
      <RNModal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}
      >
        <View className="flex-1 flex-center p-l">
          {/* Backdrop is an absolutely-filled sibling behind the panel, so it
              catches outside clicks without wrapping the panel — clicks inside
              the panel never reach it. aria-hidden + focusable={false} keep this
              dismiss target out of the accessibility tree and the tab order. */}
          <Pressable
            aria-hidden
            focusable={false}
            className="absolute inset-0 bg-translucent"
            onPress={onClose}
          />
          <View
            aria-modal
            role={role}
            aria-label={title === undefined ? ariaLabel : undefined}
            aria-labelledby={title === undefined ? undefined : titleId}
            aria-describedby={ariaDescribedby}
            testID={testID}
            className={`relative ${panelVariants({ size })}`}
          >
            <Surface
              variant="highlight"
              size={size}
              shadow="l"
              className="relative gap-m"
            >
              {title === undefined && icon === undefined ? null : (
                <HStack
                  className={`items-center gap-xs ${
                    hideCloseButton ? "" : titleReserveVariants({ size })
                  }`}
                >
                  {icon === undefined ? null : (
                    <Icon icon={icon} size={24} className="text-accent" />
                  )}
                  {title === undefined ? null : (
                    <Text
                      nativeID={titleId}
                      className="shrink font-heading-bold text-xl leading-tight text-sharp"
                    >
                      {title}
                    </Text>
                  )}
                </HStack>
              )}

              {hideCloseButton ? null : (
                <IconButton
                  icon={<XRegularIcon />}
                  variant="ghost"
                  size={size === "lg" ? "md" : size}
                  aria-label={closeButtonAriaLabel}
                  className="absolute right-sm top-sm"
                  onPress={onClose}
                />
              )}

              {/* Pixel maxHeight (not a %) so the ScrollView sizes to its
                  content and only scrolls once it exceeds ~70% of the screen. */}
              <ScrollView style={{ maxHeight: windowHeight * 0.7 }}>
                <VStack className="gap-m">{children}</VStack>
              </ScrollView>

              {footer === undefined ? null : (
                <HStack className="items-center justify-end gap-m">
                  {footer}
                </HStack>
              )}
            </Surface>
          </View>
        </View>
      </RNModal>
    </AccentScope>
  );
}
