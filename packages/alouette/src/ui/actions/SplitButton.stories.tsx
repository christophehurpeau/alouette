import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useState } from "react";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { SplitButton, type SplitButtonControlledProps } from "./SplitButton";
import { SplitButtonOption } from "./SplitButtonOption";

type ThisStory = StoryObj<typeof SplitButton>;

export default {
  title: "alouette/Actions/SplitButton",
  component: SplitButton,
  parameters: {
    componentSubtitle:
      "A button that runs one of several actions, with a caret opening the menu that picks which.",
    docs: {
      description: {
        component: `### Composition
~~~tsx
<SplitButton menuLabel="Merge method" defaultValue="squash" onPress={merge}>
  <SplitButtonOption
    value="squash"
    label="Squash and merge"
    description="The 3 commits will be combined into one commit in the base branch."
  />
  <SplitButtonOption
    value="rebase"
    label="Rebase and merge"
    description="The 3 commits will be rebased and added to the base branch."
  />
</SplitButton>
~~~

- The main button shows and runs the selected option: \`onPress\` receives its \`value\`
- The caret opens a menu of checkable rows (\`MenuItem\` with \`checked\`); picking one selects it (\`onValueChange\`) and closes the menu, without running it. The menu opens on the checked row
- \`value\` (controlled) or \`defaultValue\` is required and must name one of the options: it is the main button's label
- \`variant\`: tonal | filled | outlined — no \`soft\`, a text button has no ground to split
- \`size\`, \`accent\`, \`disabled\` and \`state\` are the \`Button\` ones; the caret is disabled while \`state\` is set
- Children are \`SplitButtonOption\`s only: they also render as the main button's label`,
      },
    },
  },
} satisfies Meta<typeof SplitButton>;

interface MergeSplitButtonProps extends Omit<
  SplitButtonControlledProps,
  "children" | "defaultValue" | "menuLabel" | "onPress" | "value"
> {
  menuLabel?: string;
  value?: string;
  defaultValue?: string;
  onPress?: SplitButtonControlledProps["onPress"];
  withoutDescriptions?: boolean;
  withDisabledOption?: boolean;
}

function MergeOptions({
  withoutDescriptions,
  withDisabledOption,
}: Pick<
  MergeSplitButtonProps,
  "withDisabledOption" | "withoutDescriptions"
>): ReactNode {
  return (
    <>
      <SplitButtonOption
        value="merge"
        label="Create a merge commit"
        description={
          withoutDescriptions
            ? undefined
            : "All commits from this branch will be added to the base branch via a merge commit."
        }
        disabled={withDisabledOption}
      />
      <SplitButtonOption
        value="squash"
        label="Squash and merge"
        description={
          withoutDescriptions
            ? undefined
            : "The 3 commits from this branch will be combined into one commit in the base branch."
        }
      />
      <SplitButtonOption
        value="rebase"
        label="Rebase and merge"
        description={
          withoutDescriptions
            ? undefined
            : "The 3 commits from this branch will be rebased and added to the base branch."
        }
      />
    </>
  );
}

function MergeSplitButton({
  menuLabel = "Merge method",
  value,
  defaultValue = "squash",
  onPress = fn(),
  withoutDescriptions,
  withDisabledOption,
  ...props
}: MergeSplitButtonProps): ReactNode {
  const options = (
    <MergeOptions
      withoutDescriptions={withoutDescriptions}
      withDisabledOption={withDisabledOption}
    />
  );
  if (value !== undefined) {
    return (
      <SplitButton
        menuLabel={menuLabel}
        value={value}
        onPress={onPress}
        {...props}
      >
        {options}
      </SplitButton>
    );
  }
  return (
    <SplitButton
      menuLabel={menuLabel}
      defaultValue={defaultValue}
      onPress={onPress}
      {...props}
    >
      {options}
    </SplitButton>
  );
}

export const SplitButtonPreviewStory: ThisStory = {
  name: "SplitButton Preview",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  args: {
    menuLabel: "Merge method",
    defaultValue: "squash",
    variant: "tonal",
    size: "md",
    disabled: false,
    onPress: fn(),
    onValueChange: fn(),
  },
  render: (args) => (
    <SplitButton {...args}>
      <MergeOptions />
    </SplitButton>
  ),
};

function ControlledMergeSplitButton(): ReactNode {
  const [value, setValue] = useState("rebase");
  return (
    <View className="gap-xs items-start">
      <MergeSplitButton value={value} onValueChange={setValue} />
      <Text className="text-sm text-muted">{`value: ${value}`}</Text>
    </View>
  );
}

export const SplitButtonVariantsStory: ThisStory = {
  name: "SplitButton Variants",
  render: () => (
    <Story>
      <Story.Section withSurface title="Variants">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="tonal (default)">
            <MergeSplitButton />
          </StoryGrid.Col>
          <StoryGrid.Col title="filled">
            <MergeSplitButton variant="filled" />
          </StoryGrid.Col>
          <StoryGrid.Col title="outlined">
            <MergeSplitButton variant="outlined" />
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section withSurface title="Sizes">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="sm">
            <MergeSplitButton size="sm" />
          </StoryGrid.Col>
          <StoryGrid.Col title="md (default)">
            <MergeSplitButton size="md" />
          </StoryGrid.Col>
          <StoryGrid.Col title="lg">
            <MergeSplitButton size="lg" />
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section withSurface title="Accents">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="inherited (brand)">
            <MergeSplitButton variant="filled" />
          </StoryGrid.Col>
          <StoryGrid.Col title="success">
            <MergeSplitButton variant="filled" accent="success" />
          </StoryGrid.Col>
          <StoryGrid.Col title="neutral">
            <MergeSplitButton variant="filled" accent="neutral" />
          </StoryGrid.Col>
          <StoryGrid.Col title="neutral tonal">
            <MergeSplitButton accent="neutral" />
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section withSurface title="Disabled">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="tonal">
            <MergeSplitButton disabled />
          </StoryGrid.Col>
          <StoryGrid.Col title="filled">
            <MergeSplitButton disabled variant="filled" />
          </StoryGrid.Col>
          <StoryGrid.Col title="outlined">
            <MergeSplitButton disabled variant="outlined" />
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section withSurface title="State">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="loading">
            <MergeSplitButton variant="filled" state="loading" />
          </StoryGrid.Col>
          <StoryGrid.Col title="success">
            <MergeSplitButton variant="filled" state="success" />
          </StoryGrid.Col>
          <StoryGrid.Col title="failed">
            <MergeSplitButton variant="filled" state="failed" />
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section withSurface title="Controlled">
        <ControlledMergeSplitButton />
      </Story.Section>

      <Story.Section withSurface title="Menu: labels only">
        <MergeSplitButton
          withoutDescriptions
          menuLabel="Merge method, labels only"
        />
      </Story.Section>

      <Story.Section withSurface title="Menu: descriptions, a disabled option">
        <View className="min-h-[360px]">
          <MergeSplitButton
            withDisabledOption
            defaultValue="rebase"
            menuLabel="Merge method, open"
          />
        </View>
      </Story.Section>
    </Story>
  ),
  // The panel only renders open, so the last section opens its menu for the
  // snapshot; the other variants of the rows are in the Menu stories.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [lightCaret] = canvas.getAllByRole("button", {
      name: "Merge method, open",
    });
    if (!lightCaret) throw new Error("expected the open-menu caret");
    await userEvent.click(lightCaret);
    await screen.findByRole("menu", { name: "Merge method, open" });
  },
};

function MergeDemo(): ReactNode {
  const [lastAction, setLastAction] = useState("none");
  const [lastSelection, setLastSelection] = useState("none");
  return (
    <View className="gap-m items-start">
      <MergeSplitButton
        withDisabledOption
        defaultValue="rebase"
        onValueChange={setLastSelection}
        onPress={setLastAction}
      />
      <Text>{`last action: ${lastAction}`}</Text>
      <Text>{`last selection: ${lastSelection}`}</Text>
    </View>
  );
}

export const SplitButtonTestsStory: ThisStory = {
  name: "SplitButton Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Merge">
        <MergeDemo />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("group", { name: "Merge method" });
    const main = within(group).getByRole("button", {
      name: "Rebase and merge",
    });
    const caret = within(group).getByRole("button", { name: "Merge method" });

    await expect(caret).toHaveAttribute("aria-haspopup", "menu");
    await expect(caret).toHaveAttribute("aria-expanded", "false");

    const mainBox = main.getBoundingClientRect();
    const caretBox = caret.getBoundingClientRect();
    await expect(mainBox.height).toBeGreaterThanOrEqual(44);
    await expect(caretBox.width).toBeGreaterThanOrEqual(44);
    await expect(caretBox.height).toBe(mainBox.height);
    await expect(Math.abs(caretBox.left - mainBox.right)).toBeLessThan(0.5);
    await expect(getComputedStyle(caret).borderLeftWidth).toBe("1px");
    await expect(getComputedStyle(group).boxShadow).not.toBe("none");
    await expect(getComputedStyle(main).boxShadow).toBe("none");
    await expect(getComputedStyle(caret).boxShadow).toBe("none");

    await userEvent.click(main);
    await expect(canvas.getByText("last action: rebase")).toBeInTheDocument();

    // The panel is portaled out of the canvas, so it is queried from `screen`.
    await userEvent.click(caret);
    await expect(caret).toHaveAttribute("aria-expanded", "true");
    const menu = await screen.findByRole("menu", { name: "Merge method" });
    const options = within(menu).getAllByRole("menuitemradio");
    await expect(options).toHaveLength(3);
    const [mergeCommit, squash, rebase] = options;
    if (!mergeCommit || !squash || !rebase) {
      throw new Error("expected three options");
    }
    await expect(rebase).toHaveAttribute("aria-checked", "true");
    await expect(squash).toHaveAttribute("aria-checked", "false");
    await expect(mergeCommit).toHaveAttribute("aria-disabled", "true");

    // The checked option takes the focus, not the first enabled one.
    await waitFor(() => expect(rebase).toHaveFocus());
    await userEvent.keyboard("{ArrowUp}");
    await expect(squash).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    await expect(rebase).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(squash).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
    await expect(caret).toHaveFocus();
    await expect(
      canvas.getByText("last selection: squash"),
    ).toBeInTheDocument();
    await expect(canvas.getByText("last action: rebase")).toBeInTheDocument();

    await userEvent.click(
      within(group).getByRole("button", { name: "Squash and merge" }),
    );
    await expect(canvas.getByText("last action: squash")).toBeInTheDocument();

    await userEvent.click(caret);
    const reopened = await screen.findByRole("menu");
    await userEvent.click(
      within(reopened).getByRole("menuitemradio", {
        name: /Create a merge commit/,
      }),
    );
    await expect(reopened).toBeInTheDocument();
    await expect(
      within(reopened).getByRole("menuitemradio", {
        name: /Squash and merge/,
      }),
    ).toHaveAttribute("aria-checked", "true");
    await expect(
      canvas.getByText("last selection: squash"),
    ).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
    await expect(caret).toHaveFocus();
  },
};
