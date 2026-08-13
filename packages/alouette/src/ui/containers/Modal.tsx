import { XRegularIcon } from "alouette-icons/phosphor-icons/XRegularIcon";
import { type ReactNode, useId } from "react";
import {
  Platform,
  Pressable,
  Modal as RNModal,
  useWindowDimensions,
} from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { useScrollEndState } from "../../core/useScrollEndState";
import { buttonHeight } from "../actions/Button";
import { IconButton } from "../actions/IconButton";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { ScrollView } from "../primitives/ScrollView";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { HStack } from "../stacks/stacks";
import { PortalAccentScope } from "./PortalAccentScope";

// Yoga only knows `relative` and `absolute` — `position: sticky` is a web-only
// feature and the class compiles away on native. A component that pins an
// element to the edge of a scroll box has to lay it out differently there.
const supportsStickyPosition = Platform.OS === "web";

// The panel padding is split in half so the web scrollbar sits in a balanced
// gutter: one half stays on the panel (outside the scroll box, between the panel
// edge and the bar), the other moves into the scroll content container (inside
// it, between the bar and the content). The header is outside the scroll box, so
// it carries the inner half itself to stay aligned with the scrolling content;
// the footer carries the bottom half, which the scroll content drops (pb-0).
const modalVariants = tv({
  slots: {
    // w-full so the panel shrinks on small screens (the backdrop padding keeps a
    // margin); max-w caps it on wide viewports.
    panel: "w-full max-h-full",
    inset: "bg-highlight shadow-l",
    header: "items-center gap-xs",
    scrollContent: "",
    // `sticky` pins it to the bottom of the scroll box on web. The border is
    // transparent at rest so toggling it can't shift the layout.
    footer:
      "items-center justify-end gap-m sticky bottom-0 bg-highlight border-t border-transparent",
  },
  variants: {
    size: {
      sm: {
        panel: "max-w-[360px]",
        inset: "rounded-sm p-xs",
        header: "pl-xs",
        scrollContent: "p-xs",
        footer: "py-xs",
      },
      md: {
        panel: "max-w-[520px]",
        inset: "rounded-sm p-m",
        header: "pl-m",
        scrollContent: "p-m",
        footer: "py-sm",
      },
      lg: {
        panel: "max-w-[720px]",
        inset: "rounded-md p-l",
        header: "pl-l",
        scrollContent: "p-l",
        footer: "py-m",
      },
    },
    withFooter: {
      true: { scrollContent: "pb-0" },
    },
    // Native has no sticky positioning, so the footer sits below the scroll box
    // instead of inside it — outside the scroll content container it has to
    // carry that container's horizontal padding itself to stay aligned with the
    // body.
    detachedFooter: {
      true: {},
    },
    // Only while the footer overlaps scrolled-past content does it need a rule
    // separating it from the body; at the end of the scroll it sits in flow.
    stuck: {
      true: { footer: "border-border-muted" },
    },
  },
  compoundVariants: [
    { size: "sm", detachedFooter: true, class: { footer: "px-xs" } },
    { size: "md", detachedFooter: true, class: { footer: "px-m" } },
    { size: "lg", detachedFooter: true, class: { footer: "px-l" } },
  ],
  defaultVariants: { size: "md" },
});

type ModalVariantProps = VariantProps<typeof modalVariants>;

export interface ModalProps {
  /** Whether the modal is shown. */
  visible: boolean;
  /**
   * Called when the user dismisses the modal — backdrop press, close button, the
   * Android back button, or the Escape key (web).
   */
  onClose: () => void;
  children: ReactNode;
  /**
   * Heading rendered in the fixed header; also labels the dialog for assistive
   * tech.
   */
  title: string;
  /** Accent-tinted icon rendered before the title in the header. */
  icon?: SVGIconElement;
  /** Actions row rendered below the body (e.g. Cancel/Confirm buttons). */
  footer?: ReactNode;
  accent?: Accent;
  size?: ModalVariantProps["size"];
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
}: ModalProps): ReactNode {
  const { height: windowHeight } = useWindowDimensions();
  const titleId = useId();
  const iconSize = size === "lg" ? "md" : size;
  const { isScrolledToEnd, scrollViewProps } = useScrollEndState();
  const styles = modalVariants({
    size,
    withFooter: footer !== undefined,
    stuck: footer !== undefined && !isScrolledToEnd,
    detachedFooter: !supportsStickyPosition,
  });
  const footerElement =
    footer === undefined ? null : (
      <HStack className={styles.footer()}>{footer}</HStack>
    );

  return (
    <RNModal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <PortalAccentScope accent={accent}>
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
            aria-labelledby={titleId}
            aria-describedby={ariaDescribedby}
            testID={testID}
            className={styles.panel()}
          >
            <View className={styles.inset()}>
              {/* Header sits outside the scroll box: the title and the close
                  button stay put while the body scrolls under them. */}
              <HStack
                className={styles.header()}
                style={{ minHeight: buttonHeight[iconSize] }}
              >
                {icon === undefined ? null : (
                  <Icon icon={icon} size={24} className="text-accent" />
                )}
                <Text
                  nativeID={titleId}
                  className="shrink grow font-heading-bold text-xl leading-tight text-sharp"
                >
                  {title}
                </Text>
                {hideCloseButton ? null : (
                  <IconButton
                    icon={<XRegularIcon />}
                    variant="ghost"
                    size={iconSize}
                    aria-label={closeButtonAriaLabel}
                    onPress={onClose}
                  />
                )}
              </HStack>

              {/* Pixel maxHeight (not a %) so the ScrollView sizes to its
                  content and only scrolls once it exceeds ~70% of the screen;
                  `shrink` lets it give way to the header and the detached
                  footer when the panel hits the screen height. */}
              <ScrollView
                className="shrink"
                style={{ maxHeight: windowHeight * 0.7 }}
                contentContainerClassName={styles.scrollContent()}
                {...scrollViewProps}
              >
                {children}

                {/* Web keeps the footer in the scroll content, where `sticky`
                    pins it to the bottom edge and the body scrolls under it. */}
                {supportsStickyPosition ? footerElement : null}
              </ScrollView>

              {/* Native has no sticky positioning: the footer sits after the
                  scroll box instead. Same result — the ScrollView grows with
                  its content up to its maxHeight, so the footer is right below
                  short content and pinned under a full-height body. */}
              {supportsStickyPosition ? null : footerElement}
            </View>
          </View>
        </View>
      </PortalAccentScope>
    </RNModal>
  );
}
