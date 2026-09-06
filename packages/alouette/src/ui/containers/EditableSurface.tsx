import { PencilSimpleRegularIcon } from "alouette-icons/phosphor-icons/PencilSimpleRegularIcon";
import { type ReactNode, useId } from "react";
import { IconButton } from "../actions/IconButton";
import type { PressableBoxProps } from "../actions/PressableBox";
import type { SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { HStack, VStack } from "../stacks/stacks";
import { Surface, type SurfaceProps } from "./Surface";

export interface EditableSurfaceProps extends Pick<
  SurfaceProps,
  "accent" | "className" | "shadow" | "size" | "variant"
> {
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
  /** Variant of the edit IconButton — `variant` belongs to the Surface. */
  editIconVariant?: PressableBoxProps["variant"];
  disabled?: boolean;
  onEdit: () => void;
  /** The read-only body: as many blocks as the section needs. */
  children: ReactNode;
}

/**
 * A Surface holding a block of read-only content behind a single edit
 * affordance. Where EditableItem is one label with a summary that fits beside
 * it, this is a titled section whose value spans several lines. Owns no
 * editor: pair it with FormEditableSurface for a react-hook-form modal, or
 * compose your own Modal from `onEdit`.
 */
export function EditableSurface({
  title,
  titleBadge,
  details,
  editAriaLabel,
  editIcon = <PencilSimpleRegularIcon />,
  editIconVariant,
  accent,
  className,
  shadow,
  size,
  variant,
  disabled,
  onEdit,
  children,
}: EditableSurfaceProps): ReactNode {
  const titleId = useId();

  return (
    <Surface
      role="region"
      aria-labelledby={titleId}
      accent={accent}
      shadow={shadow}
      size={size}
      variant={variant}
      className={className}
    >
      <VStack className="gap-sm">
        {/* The title is sized to the edit button's own height, so the row it
            shares with the button adds no dead space above and below it — at
            text-lg it would be 13px shorter than the button, which no amount
            of alignment can absorb. */}
        <HStack className="items-start justify-between gap-sm">
          <VStack className="shrink items-start">
            <HStack className="items-center gap-sm">
              <Text nativeID={titleId} className="font-heading-bold text-xl">
                {title}
              </Text>
              {/* A Badge carries `self-start` so it doesn't stretch in a
                  column; in this row that pins it 3px above the title's
                  center, so it is wrapped in a View the row can align. */}
              {titleBadge ? <View>{titleBadge}</View> : null}
            </HStack>
            {details ? (
              <Text className="text-muted text-sm">{details}</Text>
            ) : null}
          </VStack>
          <IconButton
            size="sm"
            icon={editIcon}
            variant={editIconVariant}
            disabled={disabled}
            aria-label={editAriaLabel}
            onPress={onEdit}
          />
        </HStack>
        {children}
      </VStack>
    </Surface>
  );
}
