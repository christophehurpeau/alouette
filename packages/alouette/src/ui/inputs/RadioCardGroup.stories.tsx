import { expect, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlobeRegularIcon } from "alouette-icons/phosphor-icons/GlobeRegularIcon";
import { LockRegularIcon } from "alouette-icons/phosphor-icons/LockRegularIcon";
import { UsersRegularIcon } from "alouette-icons/phosphor-icons/UsersRegularIcon";
import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { RadioCard } from "./RadioCard";
import { RadioCardGroup } from "./RadioCardGroup";

type ThisStory = StoryObj<typeof RadioCardGroup>;

export default {
  title: "alouette/Inputs/RadioCardGroup",
  component: RadioCardGroup,
  parameters: {
    componentSubtitle:
      "Single-choice card list: each option is a large pressable card with an icon, a title, a description and a radio indicator.",
  },
  argTypes: {
    disabled: { control: "boolean" },
    variant: { control: "inline-radio", options: ["list", "stack"] },
    accent: {
      control: "select",
      options: [undefined, "brand", "danger", "info", "success", "warning"],
    },
  },
} satisfies Meta<typeof RadioCardGroup>;

function VisibilityCards(): ReactNode {
  return (
    <>
      <RadioCard
        value="public"
        icon={<GlobeRegularIcon />}
        label="Public"
        description="Accessible à quiconque a ton lien"
      />
      <RadioCard
        value="shared"
        icon={<UsersRegularIcon />}
        label="Partagé"
        description="Accessible aux personnes invitées"
      />
      <RadioCard
        value="private"
        icon={<LockRegularIcon />}
        label="Privé"
        description="Accessible à toi seul"
      />
    </>
  );
}

export const PreviewRadioCardGroupStory: ThisStory = {
  name: "RadioCardGroup Preview",
  render: (args) => (
    <RadioCardGroup defaultValue="public" {...args}>
      <VisibilityCards />
    </RadioCardGroup>
  ),
};

export const StackRadioCardGroupStory: ThisStory = {
  name: "RadioCardGroup Stack",
  render: (args) => (
    <RadioCardGroup variant="stack" defaultValue="public" {...args}>
      <VisibilityCards />
    </RadioCardGroup>
  ),
};

function RadioCardGroupVariant({ accent }: { accent?: Accent }): ReactNode {
  return (
    <Story.Section withSurface title={accent ?? "Default"}>
      <Story.SubSection title="Demo">
        <RadioCardGroup accent={accent} defaultValue="public">
          <VisibilityCards />
        </RadioCardGroup>
      </Story.SubSection>

      <Story.SubSection title="Edge cases">
        <RadioCardGroup accent={accent} defaultValue="public">
          <RadioCard
            value="public"
            icon={<GlobeRegularIcon />}
            label="Without description"
          />
          <RadioCard value="private" label="Without icon" />
          <RadioCard
            disabled
            value="shared"
            icon={<UsersRegularIcon />}
            label="Disabled option"
            description="Not selectable"
          />
        </RadioCardGroup>
      </Story.SubSection>

      <Story.SubSection title="Stack variant">
        <RadioCardGroup variant="stack" accent={accent} defaultValue="public">
          <RadioCard
            value="public"
            icon={<GlobeRegularIcon />}
            label="Public"
            description="Tout le monde"
          />
          <RadioCard
            value="shared"
            icon={<UsersRegularIcon />}
            label="Partagé"
            description="Sur invitation"
          />
          <RadioCard
            value="private"
            icon={<LockRegularIcon />}
            label="Privé"
            description="Toi seul"
          />
        </RadioCardGroup>
      </Story.SubSection>

      <Story.SubSection title="Disabled group">
        <RadioCardGroup disabled accent={accent} defaultValue="private">
          <RadioCard
            value="public"
            icon={<GlobeRegularIcon />}
            label="Group disabled"
            description="Unselected card"
          />
          <RadioCard
            value="private"
            icon={<LockRegularIcon />}
            label="Group disabled"
            description="Selected card"
          />
        </RadioCardGroup>
      </Story.SubSection>
    </Story.Section>
  );
}

export const VariantsRadioCardGroupStory: ThisStory = {
  name: "RadioCardGroup Variants",
  render: () => (
    <Story>
      <RadioCardGroupVariant />
      <RadioCardGroupVariant accent="brand" />
      <RadioCardGroupVariant accent="danger" />
      <RadioCardGroupVariant accent="success" />
    </Story>
  ),
};

export const TestsRadioCardGroupStory: ThisStory = {
  name: "RadioCardGroup Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Uncontrolled">
        <RadioCardGroup defaultValue="public">
          <VisibilityCards />
        </RadioCardGroup>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const group = canvas.getByRole("radiogroup");
    const publicCard = canvas.getByRole("radio", { name: "Public" });
    const sharedCard = canvas.getByRole("radio", { name: "Partagé" });

    await expect(group).toBeInTheDocument();
    await expect(publicCard).toHaveAttribute("aria-checked", "true");
    await expect(sharedCard).toHaveAttribute("aria-checked", "false");
    await expect(
      publicCard.getBoundingClientRect().height,
    ).toBeGreaterThanOrEqual(44);

    sharedCard.click();

    await waitFor(() =>
      expect(sharedCard).toHaveAttribute("aria-checked", "true"),
    );
    await expect(publicCard).toHaveAttribute("aria-checked", "false");
  },
};

export const TestsStackRadioCardGroupStory: ThisStory = {
  name: "RadioCardGroup Stack Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Stack">
        <View className="w-[560px]">
          <RadioCardGroup variant="stack" defaultValue="public">
            <VisibilityCards />
          </RadioCardGroup>
        </View>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const publicCard = canvas.getByRole("radio", { name: "Public" });
    const sharedCard = canvas.getByRole("radio", { name: "Partagé" });
    const privateCard = canvas.getByRole("radio", { name: "Privé" });

    const publicRect = publicCard.getBoundingClientRect();
    const sharedRect = sharedCard.getBoundingClientRect();
    const privateRect = privateCard.getBoundingClientRect();

    await expect(sharedRect.top).toBe(publicRect.top);
    await expect(sharedRect.left).toBeGreaterThan(publicRect.left);
    await expect(privateRect.top).toBeGreaterThan(publicRect.top);
    await expect(privateRect.left).toBe(publicRect.left);
    await expect(publicRect.height).toBeGreaterThanOrEqual(44);
  },
};

export const TestsDisabledRadioCardGroupStory: ThisStory = {
  name: "RadioCardGroup Disabled Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Disabled option">
        <RadioCardGroup defaultValue="public">
          <RadioCard
            value="public"
            icon={<GlobeRegularIcon />}
            label="Public"
            description="Accessible à quiconque a ton lien"
          />
          <RadioCard
            disabled
            value="private"
            icon={<LockRegularIcon />}
            label="Privé"
            description="Accessible à toi seul"
          />
        </RadioCardGroup>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const publicCard = canvas.getByRole("radio", { name: "Public" });
    const privateCard = canvas.getByRole("radio", { name: "Privé" });

    await expect(privateCard).toHaveAttribute("aria-disabled", "true");

    privateCard.click();

    await expect(privateCard).toHaveAttribute("aria-checked", "false");
    await expect(publicCard).toHaveAttribute("aria-checked", "true");
  },
};
