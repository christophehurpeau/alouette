import { expect, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useState } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import {
  type ColorModePreference,
  useResolvedColorMode,
} from "../../core/useColorMode";
import { ScopedTheme } from "../containers/ScopedTheme";
import { Surface } from "../containers/Surface";
import { Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import {
  ColorModePicker,
  type ColorModePickerVariant,
} from "./ColorModePicker";

type ThisStory = StoryObj<typeof ColorModePicker>;

export default {
  title: "alouette/Inputs/ColorModePicker",
  component: ColorModePicker,
  parameters: {
    componentSubtitle:
      "Light/dark picker over the stored ColorModePreference. It reports the choice only — the app applies it with useResolvedColorMode + ScopedTheme.",
  },
  argTypes: {
    disabled: { control: "boolean" },
    variant: {
      control: "inline-radio",
      options: ["system-lock", "with-system"],
    },
    accent: {
      control: "select",
      options: [undefined, "brand", "danger", "info", "success", "warning"],
    },
  },
} satisfies Meta<typeof ColorModePicker>;

export const PreviewColorModePickerStory: ThisStory = {
  name: "ColorModePicker Preview",
  render: (args) => <ColorModePicker {...args} />,
};

interface ThemedPreviewProps {
  /** Names the group and its preview line, so a story can hold several. */
  name: string;
  variant: ColorModePickerVariant;
}

/**
 * What an app wires: the preference is its own state, `useResolvedColorMode`
 * turns it into a theme, and `ScopedTheme` applies it.
 */
function ThemedPreview({ name, variant }: ThemedPreviewProps): ReactNode {
  const [preference, setPreference] = useState<ColorModePreference>("system");
  const mode = useResolvedColorMode(preference);

  return (
    <VStack className="gap-m items-start">
      <ColorModePicker
        variant={variant}
        aria-label={name}
        value={preference}
        onValueChange={setPreference}
      />
      <ScopedTheme theme={mode}>
        <Surface size="sm" className="w-[240px]">
          <Text className="font-body-bold text-base">Preview</Text>
          <Text className="text-sm text-muted">{`${name}: ${mode}`}</Text>
        </Surface>
      </ScopedTheme>
    </VStack>
  );
}

function ColorModePickerVariants({ accent }: { accent?: Accent }): ReactNode {
  return (
    <Story.SubSection withSurface title={accent ?? "Default"}>
      <ColorModePicker
        variant="with-system"
        accent={accent}
        aria-label="With system"
      />
      <ColorModePicker
        variant="system-lock"
        accent={accent}
        aria-label="System lock"
      />
      <ColorModePicker
        variant="system-lock"
        accent={accent}
        aria-label="Locked to dark"
        defaultValue="dark"
      />
      <ColorModePicker
        disabled
        variant="with-system"
        accent={accent}
        aria-label="Disabled"
      />
      <ColorModePicker
        disabled
        variant="system-lock"
        accent={accent}
        aria-label="Disabled system lock"
      />
    </Story.SubSection>
  );
}

export const VariantsColorModePickerStory: ThisStory = {
  name: "ColorModePicker Variants",
  render: () => (
    <Story>
      <Story.Section title="Variants">
        <ColorModePickerVariants />
        <ColorModePickerVariants accent="brand" />
        <ColorModePickerVariants accent="info" />
      </Story.Section>
      <Story.Section title="Applied">
        <Story.SubSection withSurface title="with-system">
          <ThemedPreview name="with-system" variant="with-system" />
        </Story.SubSection>
        <Story.SubSection withSurface title="system-lock">
          <ThemedPreview name="system-lock" variant="system-lock" />
        </Story.SubSection>
      </Story.Section>
    </Story>
  ),
};

export const TestsColorModePickerStory: ThisStory = {
  name: "ColorModePicker Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="with-system">
        <ThemedPreview name="with-system" variant="with-system" />
      </Story.Section>
      <Story.Section title="system-lock">
        <ThemedPreview name="system-lock" variant="system-lock" />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The picker follows the OS, so the test derives what it should show from
    // the same media query rather than assuming the runner's scheme.
    const systemMode = globalThis.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const systemLabel = systemMode === "dark" ? "Dark" : "Light";
    const otherMode = systemMode === "dark" ? "light" : "dark";
    const otherLabel = systemMode === "dark" ? "Light" : "Dark";

    const withSystem = within(
      canvas.getByRole("radiogroup", { name: "with-system" }),
    );

    // Icon chips: the labels name the options without being rendered.
    await expect(withSystem.queryByText("System")).toBeNull();
    await expect(
      withSystem.getByRole("radio", { name: "System" }),
    ).toHaveAttribute("aria-checked", "true");
    await expect(
      canvas.getByText(`with-system: ${systemMode}`),
    ).toBeInTheDocument();

    withSystem.getByRole("radio", { name: otherLabel }).click();

    await waitFor(() =>
      expect(canvas.getByText(`with-system: ${otherMode}`)).toBeInTheDocument(),
    );
    await expect(
      withSystem.getByRole("radio", { name: "System" }),
    ).toHaveAttribute("aria-checked", "false");

    const lock = within(
      canvas.getByRole("radiogroup", { name: "system-lock" }),
    );

    // `system` has no chip of its own: it shows on the one it resolves to, with
    // a badge added to its own glyph and a name saying so.
    await expect(lock.getAllByRole("radio")).toHaveLength(2);
    const followingChip = lock.getByRole("radio", {
      name: `${systemLabel} (system)`,
    });
    await expect(followingChip).toHaveAttribute("aria-checked", "true");
    await expect(
      canvas.getByText(`system-lock: ${systemMode}`),
    ).toBeInTheDocument();

    // The badge adds to the glyph instead of replacing it: a chip renders the
    // cross-fading icon/activeIcon pair, and the following one a third svg.
    await expect(followingChip.querySelectorAll("svg")).toHaveLength(3);
    await expect(
      lock.getByRole("radio", { name: otherLabel }).querySelectorAll("svg"),
    ).toHaveLength(2);

    // Pressing the chip in effect locks that mode — same mode, plain name.
    lock.getByRole("radio", { name: `${systemLabel} (system)` }).click();

    await waitFor(() =>
      expect(lock.getByRole("radio", { name: systemLabel })).toHaveAttribute(
        "aria-checked",
        "true",
      ),
    );
    await expect(
      canvas.getByText(`system-lock: ${systemMode}`),
    ).toBeInTheDocument();

    // Pressing it again follows the system again.
    lock.getByRole("radio", { name: systemLabel }).click();

    await waitFor(() =>
      expect(
        lock.getByRole("radio", { name: `${systemLabel} (system)` }),
      ).toHaveAttribute("aria-checked", "true"),
    );

    // The chip the system does not supply has nothing to follow: it only locks.
    lock.getByRole("radio", { name: otherLabel }).click();

    await waitFor(() =>
      expect(canvas.getByText(`system-lock: ${otherMode}`)).toBeInTheDocument(),
    );
    await expect(
      lock.queryByRole("radio", { name: `${otherLabel} (system)` }),
    ).toBeNull();

    lock.getByRole("radio", { name: otherLabel }).click();
    await expect(
      canvas.getByText(`system-lock: ${otherMode}`),
    ).toBeInTheDocument();

    // Coming back from it lands on `system`, not on a hand-locked same mode.
    lock.getByRole("radio", { name: systemLabel }).click();

    await waitFor(() =>
      expect(
        lock.getByRole("radio", { name: `${systemLabel} (system)` }),
      ).toHaveAttribute("aria-checked", "true"),
    );
    await expect(
      canvas.getByText(`system-lock: ${systemMode}`),
    ).toBeInTheDocument();
  },
};
