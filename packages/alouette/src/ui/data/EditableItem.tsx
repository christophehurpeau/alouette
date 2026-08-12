import { PencilSimpleRegularIcon } from "alouette-icons/phosphor-icons/PencilSimpleRegularIcon";
import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { IconButton } from "../actions/IconButton";
import type { PressableBoxProps } from "../actions/PressableBox";
import type { SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { HStack, VStack } from "../stacks/stacks";

export interface EditableItemProps {
  label: string;
  /** Current value shown next to the label — a Badge, a Text, anything short. */
  summary?: ReactNode;
  /** Muted helper text under the label. */
  details?: ReactNode;
  /** Names the edit button for assistive tech — it has no visible text. */
  editAriaLabel: string;
  editIcon?: SVGIconElement;
  variant?: PressableBoxProps["variant"];
  accent?: Accent;
  disabled?: boolean;
  onEdit: () => void;
  /** Rendered under the row, when the value is too large for `summary`. */
  children?: ReactNode;
}

/**
 * A labelled value with an edit affordance. Owns no editor: pair it with
 * FormEditableItem for a react-hook-form modal, or compose your own Modal
 * from `onEdit`.
 */
export function EditableItem({
  label,
  summary,
  details,
  editAriaLabel,
  editIcon = <PencilSimpleRegularIcon />,
  variant,
  accent,
  disabled,
  onEdit,
  children,
}: EditableItemProps): ReactNode {
  return (
    <VStack className="gap-xs">
      <HStack className="items-center justify-between gap-sm">
        <VStack className="shrink">
          <HStack className="items-center gap-sm">
            <Text className="font-body-bold text-md">{label}</Text>
            {summary}
          </HStack>
          {details ? (
            <Text className="text-muted text-sm">{details}</Text>
          ) : null}
        </VStack>
        <IconButton
          size="sm"
          icon={editIcon}
          variant={variant}
          accent={accent}
          disabled={disabled}
          aria-label={editAriaLabel}
          onPress={onEdit}
        />
      </HStack>
      {children}
    </VStack>
  );
}
