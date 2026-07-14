import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useState } from "react";
import { type ArrayPath, Controller, useWatch } from "react-hook-form";
import { Surface } from "../containers/Surface";
import { ConfirmationMessage } from "../feedback/Message";
import { InputText } from "../inputs/InputText";
import { View } from "../primitives/View";
import { HStack, VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { Form } from "./Form";
import { FormField } from "./FormField";
import { FormFieldArray } from "./FormFieldArray";
import { FormSubmitButton } from "./FormSubmitButton";

interface GuestListValues {
  guests: { value: string }[];
}

interface GuestListFormProps {
  minSize?: number;
  details?: string;
  defaultGuests?: string[];
}

function GuestListForm({
  minSize,
  details,
  defaultGuests = [],
}: GuestListFormProps): ReactNode {
  const [submitted, setSubmitted] = useState<string[] | null>(null);

  return (
    <>
      <Form<GuestListValues>
        defaultValues={{
          guests: defaultGuests.map((value) => ({ value })),
        }}
        render={({ submit }) => (
          <VStack className="gap-l">
            <FormFieldArray<GuestListValues>
              name="guests"
              label="Guests"
              details={details}
              emptyValue={{ value: "" }}
              minSize={minSize}
              addLabel="Add guest"
              removeLabel={(itemLabel) => `Remove ${itemLabel}`}
              render={({ name, label }) => (
                <FormField<GuestListValues>
                  name={`${name}.value` as `guests.${number}.value`}
                  label={label}
                  required="Guest name is required."
                  render={({ field, labelId }) => (
                    <InputText
                      ref={field.ref}
                      value={field.value as string}
                      aria-labelledby={labelId}
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />
              )}
            />
            <FormSubmitButton
              label="Save"
              errorToMessage={() => "Please fix the errors above."}
              onPress={submit}
            />
          </VStack>
        )}
        onSubmit={(values) => {
          setSubmitted(values.guests.map((guest) => guest.value));
        }}
      />
      {submitted ? (
        <ConfirmationMessage>
          Saved {submitted.length} guest(s): {submitted.join(", ")}
        </ConfirmationMessage>
      ) : null}
    </>
  );
}

interface PeopleValues {
  people: { firstName: string; lastName: string }[];
}

interface PeopleFormProps {
  defaultPeople?: { firstName: string; lastName: string }[];
}

function PeopleForm({ defaultPeople = [] }: PeopleFormProps): ReactNode {
  return (
    <Form<PeopleValues>
      defaultValues={{ people: defaultPeople }}
      render={() => (
        <FormFieldArray<PeopleValues>
          name="people"
          label="People"
          details="Each row is a { firstName, lastName } object."
          emptyValue={{ firstName: "", lastName: "" }}
          addLabel="Add person"
          render={({ name, label }) => (
            <Surface variant="surface" size="xs">
              <HStack className="gap-xs">
                <View className="grow shrink basis-0">
                  <FormField<PeopleValues>
                    name={`${name}.firstName` as `people.${number}.firstName`}
                    label={`${label} first name`}
                    required="First name is required."
                    render={({ field, labelId }) => (
                      <InputText
                        ref={field.ref}
                        value={field.value as string}
                        aria-labelledby={labelId}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                      />
                    )}
                  />
                </View>
                <View className="grow shrink basis-0">
                  <FormField<PeopleValues>
                    name={`${name}.lastName` as `people.${number}.lastName`}
                    label={`${label} last name`}
                    render={({ field, labelId }) => (
                      <InputText
                        ref={field.ref}
                        value={field.value as string}
                        aria-labelledby={labelId}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                      />
                    )}
                  />
                </View>
              </HStack>
            </Surface>
          )}
        />
      )}
      onSubmit={() => {}}
    />
  );
}

interface RawGuestValues {
  guests: string[];
}

interface RawGuestListFormProps {
  defaultGuests?: string[];
}

function RawGuestFields(): ReactNode {
  // Disable adding another row while the last one is still empty, so the list
  // can't grow into a trail of blank inputs.
  const guests = useWatch<RawGuestValues, "guests">({ name: "guests" });
  const lastIsEmpty = guests.at(-1)?.trim().length === 0;

  return (
    <FormFieldArray<RawGuestValues>
      // react-hook-form's ArrayPath type excludes arrays of primitives, so a
      // raw string[] field can't satisfy it — useFieldArray still drives it
      // fine at runtime, so cast the name for this escape-hatch case.
      name={"guests" as unknown as ArrayPath<RawGuestValues>}
      label="Guests"
      details="Each row is a raw string, bound directly to the item path."
      emptyValue=""
      addLabel="Add guest"
      disableAdd={lastIsEmpty}
      render={({ name, label }) => (
        <Controller<RawGuestValues>
          name={name}
          render={({ field }) => (
            <InputText
              ref={field.ref}
              value={field.value as string}
              aria-label={label}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
      )}
    />
  );
}

function RawGuestListForm({
  defaultGuests = [],
}: RawGuestListFormProps): ReactNode {
  return (
    <Form<RawGuestValues>
      defaultValues={{ guests: defaultGuests }}
      render={() => <RawGuestFields />}
      onSubmit={() => {}}
    />
  );
}

type ThisStory = StoryObj<typeof FormFieldArray>;

export default {
  title: "alouette/Forms/FormFieldArray",
  component: FormFieldArray,
  parameters: {
    componentSubtitle:
      "A repeatable list of object fields backed by react-hook-form's useFieldArray. Must be used inside <Form>. Owns only the array label, the indented grouping, and add/remove buttons — `render` composes each item's own FormField(s) from the item path, so it stays agnostic about what an item contains.",
  },
} satisfies Meta<typeof FormFieldArray>;

export const FormFieldArrayPreviewStory: ThisStory = {
  name: "FormFieldArray Preview",
  render: () => (
    <GuestListForm
      minSize={1}
      details="At least one guest is required."
      defaultGuests={["Ada Lovelace"]}
    />
  ),
};

export const FormFieldArrayVariantsStory: ThisStory = {
  name: "FormFieldArray Variants",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="No minimum — the list can be emptied entirely">
        <GuestListForm />
      </Story.Section>

      <Story.Section title="minSize=1 — one seeded item that cannot be removed">
        <GuestListForm
          minSize={1}
          details="At least one guest is required."
          defaultGuests={["Ada Lovelace"]}
        />
      </Story.Section>

      <Story.Section title="minSize=2 — padded to two non-removable items on mount">
        <GuestListForm
          minSize={2}
          details="At least two guests are required."
        />
      </Story.Section>

      <Story.Section title="Multi-field object item — several FormFields per row">
        <PeopleForm
          defaultPeople={[{ firstName: "Ada", lastName: "Lovelace" }]}
        />
      </Story.Section>

      <Story.Section title="Raw string[] item — render binds to the item path directly">
        <RawGuestListForm defaultGuests={["Ada Lovelace"]} />
      </Story.Section>
    </Story>
  ),
};

export const Tests: ThisStory = {
  name: "FormFieldArray Tests",
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Story noDarkMode>
      <GuestListForm minSize={1} defaultGuests={["Ada Lovelace"]} />
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The first item is seeded and cannot be removed (minSize={1}).
    const firstGuest = canvas.getByLabelText("Guests 1");
    await expect(firstGuest).toHaveDisplayValue("Ada Lovelace");
    await expect(
      canvas.queryByRole("button", { name: "Remove Guests 1" }),
    ).toBeNull();

    // Adding a row appends an empty, removable item.
    await userEvent.click(canvas.getByRole("button", { name: "Add guest" }));
    const secondGuest = canvas.getByLabelText("Guests 2");
    await expect(secondGuest).toHaveDisplayValue("");

    // Leaving an item empty reports a per-item error once it is touched.
    await userEvent.click(secondGuest);
    await userEvent.tab();
    await expect(canvas.getByText("Guest name is required.")).toBeVisible();

    // Removing the offending row drops it and clears its error.
    await userEvent.click(
      canvas.getByRole("button", { name: "Remove Guests 2" }),
    );
    await expect(canvas.queryByLabelText("Guests 2")).toBeNull();
    await expect(canvas.queryByText("Guest name is required.")).toBeNull();

    // The remaining valid item submits.
    await userEvent.click(canvas.getByRole("button", { name: "Save" }));
    await waitFor(async () => {
      await expect(
        canvas.getByText("Saved 1 guest(s): Ada Lovelace"),
      ).toBeVisible();
    });
  },
};

export const MinSizeTests: ThisStory = {
  name: "FormFieldArray minSize Tests",
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Story noDarkMode>
      <GuestListForm />
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Add guest" }));
    await expect(canvas.getByLabelText("Guests 1")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Add guest" }));
    await expect(canvas.getByLabelText("Guests 2")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Add guest" }));
    await expect(canvas.getByLabelText("Guests 3")).toBeVisible();
    await expect(canvas.queryByLabelText("Guests 4")).toBeNull();
  },
};

export const MultiFieldTests: ThisStory = {
  name: "FormFieldArray multi-field Tests",
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Story noDarkMode>
      <PeopleForm />
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Add person" }));
    await expect(canvas.getByLabelText("People 1 first name")).toBeVisible();
    await expect(canvas.getByLabelText("People 1 last name")).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Add person" }));
    await expect(canvas.getByLabelText("People 2 first name")).toBeVisible();
    await expect(canvas.getByLabelText("People 2 last name")).toBeVisible();

    // Removing the second person drops both of its fields.
    await userEvent.click(
      canvas.getByRole("button", { name: "Remove People 2" }),
    );
    await expect(canvas.queryByLabelText("People 2 first name")).toBeNull();
    await expect(canvas.queryByLabelText("People 2 last name")).toBeNull();
  },
};

export const RawStringTests: ThisStory = {
  name: "FormFieldArray raw-string Tests",
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Story noDarkMode>
      <RawGuestListForm />
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByRole("button", { name: "Add guest" });

    // Empty list: adding the first row is allowed.
    await userEvent.click(addButton);
    const guest = canvas.getByLabelText("Guests 1");

    // The new row is empty, so adding another is disabled until it's filled.
    await expect(addButton).toBeDisabled();

    await userEvent.type(guest, "Grace Hopper");
    await expect(guest).toHaveDisplayValue("Grace Hopper");
    await expect(addButton).toBeEnabled();

    await userEvent.click(addButton);
    await expect(canvas.getByLabelText("Guests 2")).toHaveDisplayValue("");
    await expect(addButton).toBeDisabled();
  },
};
