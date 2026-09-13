import { PencilSimpleRegularIcon } from "alouette-icons/phosphor-icons/PencilSimpleRegularIcon";
import { type ReactNode, useId } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { twMerge } from "../../core/twMerge";
import { IconButton } from "../actions/IconButton";
import type { PressableBoxProps } from "../actions/PressableBox";
import type { SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Box, type BoxProps } from "./Box";

export interface EditableSectionProps extends Pick<BoxProps, "className"> {
  accent?: Accent;
  /** Heading of the section, and the label of the region for assistive tech. */
  title: string;
  /**
   * Rendered beside the title — a Badge, or anything short. It stays out of
   * the region's accessible name, which is the title alone.
   */
  titleBadge?: ReactNode;
  /** Muted helper text under the title. */
  details?: ReactNode;
  /** Names the edit button for assistive tech — it has no visible text. */
  editAriaLabel: string;
  editIcon?: SVGIconElement;
  /** Variant of the edit IconButton. */
  editIconVariant?: PressableBoxProps["variant"];
  disabled?: boolean;
  onEdit: () => void;
  /** The read-only body: as many blocks as the section needs. */
  children: ReactNode;
}

/**
 * A titled section holding a block of read-only content behind a single edit
 * affordance. Where EditableItem is one label with a summary that fits beside
 * it, this is a section whose value spans several lines. Owns no editor: pair
 * it with FormEditableSection for a react-hook-form modal, or compose your own
 * Modal from `onEdit`.
 *
 * It brings no material of its own — the caller picks it through `className`:
 * `surface` for a card, `surface lowered`, an outline, or nothing inside a
 * container that already has one.
 */
export function EditableSection({
  title,
  titleBadge,
  details,
  editAriaLabel,
  editIcon = <PencilSimpleRegularIcon />,
  editIconVariant,
  accent,
  className,
  disabled,
  onEdit,
  children,
}: EditableSectionProps): ReactNode {
  const titleId = useId();

  return (
    <Box
      role="region"
      aria-labelledby={titleId}
      accent={accent}
      className={className}
    >
      <View className="gap-sm">
        {/* The title is sized to the edit button's own height, so the row it
            shares with the button adds no dead space above and below it — at
            text-lg it would be 13px shorter than the button, which no amount
            of alignment can absorb. */}
        <View className="flex-row items-start justify-between gap-sm">
          <View className="shrink items-start">
            <View className="flex-row items-center gap-sm">
              <Text nativeID={titleId} className="font-heading-bold text-xl">
                {title}
              </Text>
              {/* A Badge carries `self-start` so it doesn't stretch in a
                  column; in this row that pins it 3px above the title's
                  center, so it is wrapped in a View the row can align. */}
              {titleBadge ? <View>{titleBadge}</View> : null}
            </View>
            {details ? (
              <Text className="text-muted text-sm">{details}</Text>
            ) : null}
          </View>
          <IconButton
            size="sm"
            icon={editIcon}
            variant={editIconVariant}
            disabled={disabled}
            aria-label={editAriaLabel}
            onPress={onEdit}
          />
        </View>
        {children}
      </View>
    </Box>
  );
}

/**
 * @deprecated Renamed `EditableSection`, which applies no material itself:
 * write `<EditableSection className="surface">`.
 */
export function EditableSurface({
  className,
  ...props
}: EditableSectionProps): ReactNode {
  return (
    <EditableSection className={twMerge("surface", className)} {...props} />
  );
}

/** @deprecated Renamed `EditableSectionProps`. */
export type EditableSurfaceProps = EditableSectionProps;
