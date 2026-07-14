import { PlusRegularIcon } from "alouette-icons/phosphor-icons/PlusRegularIcon";
import { TrashRegularIcon } from "alouette-icons/phosphor-icons/TrashRegularIcon";
import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  type ArrayPath,
  type FieldArray,
  type FieldPath,
  type FieldValues,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { Button } from "../actions/Button";
import { IconButton } from "../actions/IconButton";
import { StableAccentScope } from "../containers/StableAccentScope";
import { View } from "../primitives/View";
import { HStack, VStack } from "../stacks/stacks";
import { FormItem } from "./FormItem";

export interface FormFieldArrayProps<TFieldValues extends FieldValues> {
  name: ArrayPath<TFieldValues>;
  label: string;
  /** Muted helper text shown under the label (e.g. a minimum-count hint). */
  details?: ReactNode;
  /** Value appended when a new item is added. */
  emptyValue: FieldArray<TFieldValues, ArrayPath<TFieldValues>>;
  /**
   * Minimum number of items. The array is padded to this length on mount and
   * the leading `minSize` items cannot be removed.
   */
  minSize?: number;
  /** aria-label for the add button. */
  addLabel?: string;
  /** Disables the add button, e.g. while the last item is still empty. */
  disableAdd?: boolean;
  /** aria-label for each remove button, given the item's own label. */
  removeLabel?: (itemLabel: string) => string;
  render: (params: {
    /** Path prefix for this item, e.g. "guests.0". Build sub-paths as `${name}.value`. */
    name: FieldPath<TFieldValues>;
    index: number;
    /** Per-item base accessible name (`${label} ${index + 1}`), e.g. "Guests 1". */
    label: string;
  }) => ReactNode;
}

interface FormFieldArrayItemProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  itemLabel: string;
  removeLabel: string;
  index: number;
  removable: boolean;
  onRemove: () => void;
  render: FormFieldArrayProps<TFieldValues>["render"];
}

function FormFieldArrayItem<TFieldValues extends FieldValues>({
  name,
  itemLabel,
  removeLabel,
  index,
  removable,
  onRemove,
  render,
}: FormFieldArrayItemProps<TFieldValues>): ReactNode {
  // Hovering the remove button tints the whole row with the danger accent, as
  // an affordance that pressing it will drop the item. StableAccentScope keeps
  // the scope mounted across the toggle so the inputs don't remount.
  const [pendingRemoval, setPendingRemoval] = useState(false);

  return (
    <StableAccentScope accent={pendingRemoval ? "danger" : undefined}>
      <HStack className="gap-sm items-center p-xxs">
        <View className="grow shrink basis-0">
          {render({ name, index, label: itemLabel })}
        </View>
        {removable ? (
          <IconButton
            variant="ghost"
            icon={<TrashRegularIcon />}
            aria-label={removeLabel}
            onHoverIn={() => {
              setPendingRemoval(true);
            }}
            onHoverOut={() => {
              setPendingRemoval(false);
            }}
            onPress={onRemove}
          />
        ) : null}
      </HStack>
    </StableAccentScope>
  );
}

/**
 * A repeatable list of object fields backed by react-hook-form's useFieldArray.
 * Must be used inside <Form>. FormFieldArray owns only the array label and the
 * add/remove buttons — it is agnostic about what an item contains, including
 * any per-item framing (a caller can wrap multi-field items in a Surface). Each item's inputs (their values, labels and error
 * messages) are the caller's job: `render` receives the item's path prefix
 * (e.g. "guests.0") and composes its own FormField(s), bound to `name` for a
 * raw value or `${name}.value` / `${name}.firstName` for an object item.
 */
export function FormFieldArray<TFieldValues extends FieldValues>({
  name,
  label,
  details,
  emptyValue,
  minSize = 0,
  addLabel = "Add item",
  disableAdd,
  removeLabel = (itemLabel) => `Remove ${itemLabel}`,
  render,
}: FormFieldArrayProps<TFieldValues>): ReactNode {
  const { control } = useFormContext<TFieldValues>();
  const { fields, append, remove } = useFieldArray<TFieldValues>({
    control,
    name,
  });

  // Pad up to the minimum once on mount, appending the whole shortfall in a
  // single call. The ref keeps StrictMode's double-invoked effect from
  // appending twice.
  const paddedRef = useRef(false);
  useEffect(() => {
    if (paddedRef.current) return;
    paddedRef.current = true;
    const shortfall = minSize - fields.length;
    if (shortfall > 0) {
      append(
        Array.from({ length: shortfall }, () => emptyValue),
        { shouldFocus: false },
      );
    }
  }, [append, emptyValue, fields.length, minSize]);

  return (
    <FormItem
      label={label}
      details={details}
      render={() => (
        <VStack className="gap-xs">
          {fields.map((field, index) => (
            <FormFieldArrayItem<TFieldValues>
              key={field.id}
              name={`${name}.${index}` as FieldPath<TFieldValues>}
              itemLabel={`${label} ${index + 1}`}
              removeLabel={removeLabel(`${label} ${index + 1}`)}
              index={index}
              removable={index >= minSize}
              render={render}
              onRemove={() => {
                remove(index);
              }}
            />
          ))}
          <Button
            size="sm"
            variant="outlined"
            icon={<PlusRegularIcon />}
            text={addLabel}
            className="self-start"
            disabled={disableAdd}
            onPress={() => {
              append(emptyValue);
            }}
          />
        </VStack>
      )}
    />
  );
}
