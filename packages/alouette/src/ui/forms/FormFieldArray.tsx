import { PlusRegularIcon } from "alouette-icons/phosphor-icons/PlusRegularIcon";
import { TrashRegularIcon } from "alouette-icons/phosphor-icons/TrashRegularIcon";
import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  type ArrayPath,
  type Control,
  type FieldArray,
  type FieldPath,
  type FieldPathValue,
  type FieldValues,
  useFieldArray,
} from "react-hook-form";
import { Button } from "../actions/Button";
import { IconButton } from "../actions/IconButton";
import { StableAccentScope } from "../containers/StableAccentScope";
import { View } from "../primitives/View";
import { HStack, VStack } from "../stacks/stacks";
import { FormItem } from "./FormItem";

/**
 * Every path in the form whose value is an array. react-hook-form's own
 * ArrayPath deliberately excludes arrays of primitives, which useFieldArray
 * nonetheless drives fine — a `string[]` field would otherwise resolve to
 * `never` and force a cast at the call site.
 */
export type FormArrayPath<TFieldValues extends FieldValues> = {
  [TPath in FieldPath<TFieldValues>]: NonNullable<
    FieldPathValue<TFieldValues, TPath>
  > extends readonly unknown[]
    ? TPath
    : never;
}[FieldPath<TFieldValues>];

/** The item type of the array `TName` points at. */
export type FormArrayItem<
  TFieldValues extends FieldValues,
  TName extends FormArrayPath<TFieldValues>,
> =
  NonNullable<
    FieldPathValue<TFieldValues, TName>
  > extends readonly (infer TItem)[]
    ? TItem
    : never;

export interface FormFieldArrayProps<
  TFieldValues extends FieldValues,
  TName extends FormArrayPath<TFieldValues>,
> {
  /** From <Form>'s render params. Infers the form type for `name`. */
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  /** Muted helper text shown under the label (e.g. a minimum-count hint). */
  details?: ReactNode;
  /** Value appended when a new item is added. */
  emptyValue: FormArrayItem<TFieldValues, TName>;
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
    control: Control<TFieldValues>;
    /** Path prefix for this item, e.g. "guests.0". Build sub-paths as `${name}.value`. */
    name: `${TName}.${number}`;
    index: number;
    /** Per-item base accessible name (`${label} ${index + 1}`), e.g. "Guests 1". */
    label: string;
  }) => ReactNode;
}

interface FormFieldArrayItemProps<
  TFieldValues extends FieldValues,
  TName extends FormArrayPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: `${TName}.${number}`;
  itemLabel: string;
  removeLabel: string;
  index: number;
  removable: boolean;
  onRemove: () => void;
  render: FormFieldArrayProps<TFieldValues, TName>["render"];
}

function FormFieldArrayItem<
  TFieldValues extends FieldValues,
  TName extends FormArrayPath<TFieldValues>,
>({
  control,
  name,
  itemLabel,
  removeLabel,
  index,
  removable,
  onRemove,
  render,
}: FormFieldArrayItemProps<TFieldValues, TName>): ReactNode {
  // Hovering the remove button tints the whole row with the danger accent, as
  // an affordance that pressing it will drop the item. StableAccentScope keeps
  // the scope mounted across the toggle so the inputs don't remount.
  const [pendingRemoval, setPendingRemoval] = useState(false);

  return (
    <StableAccentScope accent={pendingRemoval ? "danger" : undefined}>
      <HStack className="gap-sm items-center p-xxs">
        <View className="grow shrink basis-0">
          {render({ control, name, index, label: itemLabel })}
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
 * A repeatable list of fields backed by react-hook-form's useFieldArray, taking
 * `control` from <Form>'s render params. FormFieldArray owns only the array
 * label and the add/remove buttons — it is agnostic about what an item contains,
 * including any per-item framing (a caller can wrap multi-field items in a
 * Surface). Each item's inputs (their values, labels and error messages) are the
 * caller's job: `render` receives `control` and the item's path prefix, typed as
 * `${name}.${number}` so `${name}.value` / `${name}.firstName` compose into a
 * real field path for an object item, or `name` binds a raw value directly.
 */
export function FormFieldArray<
  TFieldValues extends FieldValues,
  TName extends FormArrayPath<TFieldValues>,
>({
  control,
  name,
  label,
  details,
  emptyValue,
  minSize = 0,
  addLabel = "Add item",
  disableAdd,
  removeLabel = (itemLabel) => `Remove ${itemLabel}`,
  render,
}: FormFieldArrayProps<TFieldValues, TName>): ReactNode {
  // FormArrayPath also admits arrays of primitives, which react-hook-form's own
  // ArrayPath / FieldArray types reject even though useFieldArray drives them
  // fine at runtime — so the widening is cast away here, once, rather than at
  // every call site.
  const { fields, append, remove } = useFieldArray<TFieldValues>({
    control,
    name: name as ArrayPath<TFieldValues>,
  });
  const appendedItem = emptyValue as FieldArray<
    TFieldValues,
    ArrayPath<TFieldValues>
  >;

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
        Array.from({ length: shortfall }, () => appendedItem),
        { shouldFocus: false },
      );
    }
  }, [append, appendedItem, fields.length, minSize]);

  return (
    <FormItem
      label={label}
      details={details}
      render={() => (
        <VStack className="gap-xs">
          {fields.map((field, index) => (
            <FormFieldArrayItem<TFieldValues, TName>
              key={field.id}
              control={control}
              name={`${name}.${index}`}
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
              append(appendedItem);
            }}
          />
        </VStack>
      )}
    />
  );
}
