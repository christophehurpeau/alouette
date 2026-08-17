import type { FieldPath } from "react-hook-form";
import { expectTypeOf, it } from "vitest";
import type { FormFieldProps } from "./FormField";
import type { FormArrayPath, FormFieldArrayProps } from "./FormFieldArray";

interface Values {
  name: string;
  age: number;
  guests: { value: string }[];
  tags: string[];
}

type FieldValue<TName extends FieldPath<Values>> = Parameters<
  FormFieldProps<Values, TName>["render"]
>[0]["field"]["value"];

type ValidatedValue<TName extends FieldPath<Values>> = Parameters<
  Extract<
    NonNullable<FormFieldProps<Values, TName>["validate"]>,
    (value: never, formValues: never) => unknown
  >
>[0];

type ArrayItemName<TName extends FormArrayPath<Values>> = Parameters<
  FormFieldArrayProps<Values, TName>["render"]
>[0]["name"];

it("resolves a field's value type from its name, not from the whole form", () => {
  expectTypeOf<FieldValue<"name">>().toEqualTypeOf<string>();
  expectTypeOf<FieldValue<"age">>().toEqualTypeOf<number>();
  expectTypeOf<ValidatedValue<"age">>().toEqualTypeOf<number>();
});

it("composes an array item's sub-path into a real field path", () => {
  expectTypeOf<ArrayItemName<"guests">>().toEqualTypeOf<`guests.${number}`>();
  expectTypeOf<FieldValue<`guests.${number}.value`>>().toEqualTypeOf<string>();
});

it("admits arrays of primitives and types their item", () => {
  expectTypeOf<FormArrayPath<Values>>().toEqualTypeOf<"guests" | "tags">();
  expectTypeOf<
    FormFieldArrayProps<Values, "guests">["emptyValue"]
  >().toEqualTypeOf<{ value: string }>();
  expectTypeOf<
    FormFieldArrayProps<Values, "tags">["emptyValue"]
  >().toEqualTypeOf<string>();
  expectTypeOf<ArrayItemName<"tags">>().toEqualTypeOf<`tags.${number}`>();
});
