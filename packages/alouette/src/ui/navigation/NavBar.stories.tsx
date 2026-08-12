import { expect, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChartBarRegularIcon } from "alouette-icons/phosphor-icons/ChartBarRegularIcon";
import { GearRegularIcon } from "alouette-icons/phosphor-icons/GearRegularIcon";
import { HouseRegularIcon } from "alouette-icons/phosphor-icons/HouseRegularIcon";
import { type ReactNode, useState } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { NavBar } from "./NavBar";
import { NavBarItem } from "./NavBarItem";

type ThisStory = StoryObj<typeof NavBar>;

export default {
  title: "alouette/Navigation/NavBar",
  component: NavBar,
  parameters: {
    componentSubtitle:
      "Segmented navigation between destinations. NavBar holds the current value; NavBarItem children match it against their href and mark themselves aria-current.",
  },
  argTypes: {
    disabled: { control: "boolean" },
    accent: {
      control: "select",
      options: [undefined, "brand", "danger", "info", "success", "warning"],
    },
  },
} satisfies Meta<typeof NavBar>;

export const PreviewNavBarStory: ThisStory = {
  name: "NavBar Preview",
  render: (args) => (
    <NavBar aria-label="Main" defaultValue="/home" {...args}>
      <NavBarItem href="/home" label="Home" icon={<HouseRegularIcon />} />
      <NavBarItem
        href="/reports"
        label="Reports"
        icon={<ChartBarRegularIcon />}
      />
      <NavBarItem
        href="/settings"
        label="Settings"
        icon={<GearRegularIcon />}
      />
    </NavBar>
  ),
};

function NavBarVariant({ accent }: { accent?: Accent }): ReactNode {
  return (
    <Story.SubSection withSurface title={accent ?? "Default"}>
      <NavBar aria-label="With icons" accent={accent} defaultValue="/home">
        <NavBarItem href="/home" label="Home" icon={<HouseRegularIcon />} />
        <NavBarItem
          href="/reports"
          label="Reports"
          icon={<ChartBarRegularIcon />}
        />
        <NavBarItem
          disabled
          href="/settings"
          label="Settings"
          icon={<GearRegularIcon />}
        />
      </NavBar>
      <NavBar aria-label="Labels only" accent={accent} defaultValue="/home">
        <NavBarItem href="/home" label="Home" />
        <NavBarItem href="/reports" label="Reports" />
      </NavBar>
      <NavBar
        disabled
        aria-label="Disabled"
        accent={accent}
        defaultValue="/home"
      >
        <NavBarItem href="/home" label="Home" />
        <NavBarItem href="/reports" label="Reports" />
      </NavBar>
    </Story.SubSection>
  );
}

export const VariantsNavBarStory: ThisStory = {
  name: "NavBar Variants",
  render: () => (
    <Story>
      <Story.Section title="Variants">
        <NavBarVariant />
        <NavBarVariant accent="brand" />
        <NavBarVariant accent="danger" />
        <NavBarVariant accent="success" />
      </Story.Section>
    </Story>
  ),
};

function NavBarRouterDemo(): ReactNode {
  const [route, setRoute] = useState("/home");
  const [lastGroupChange, setLastGroupChange] = useState("none");

  return (
    <VStack className="gap-m items-start">
      <NavBar
        aria-label="Router"
        value={route}
        onValueChange={(next) => {
          setLastGroupChange(next);
          setRoute(next);
        }}
      >
        <NavBarItem href="/home" label="Home" icon={<HouseRegularIcon />} />
        <NavBarItem
          href="/reports"
          label="Reports"
          icon={<ChartBarRegularIcon />}
        />
        <NavBarItem
          href="/settings"
          label="Settings"
          icon={<GearRegularIcon />}
          onPress={(event) => {
            event.preventDefault();
            setRoute("/settings");
          }}
        />
      </NavBar>
      <Text>{`route: ${route}`}</Text>
      <Text>{`group change: ${lastGroupChange}`}</Text>
    </VStack>
  );
}

export const TestsNavBarStory: ThisStory = {
  name: "NavBar Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Uncontrolled">
        <NavBar aria-label="Uncontrolled" defaultValue="/home">
          <NavBarItem href="/home" label="Home" icon={<HouseRegularIcon />} />
          <NavBarItem href="/reports" label="Reports" />
          <NavBarItem disabled href="/settings" label="Settings" />
        </NavBar>
      </Story.Section>
      <Story.Section title="Controlled">
        <NavBarRouterDemo />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nav = canvas.getByRole("navigation", { name: "Uncontrolled" });
    const navCanvas = within(nav);
    const home = navCanvas.getByRole("link", { name: "Home" });
    const reports = navCanvas.getByRole("link", { name: "Reports" });
    const settings = navCanvas.getByRole("link", { name: "Settings" });

    await expect(home).toHaveAttribute("aria-current", "page");
    await expect(reports).not.toHaveAttribute("aria-current");
    await expect(settings).toHaveAttribute("aria-disabled", "true");

    await expect(home.tagName).toBe("A");
    await expect(home).toHaveAttribute("href", "/home");
    // A disabled item drops its href so the browser cannot follow it.
    await expect(settings).not.toHaveAttribute("href");

    await expect(nav.getBoundingClientRect().height).toBe(44);
    for (const item of [home, reports, settings]) {
      await expect(item.getBoundingClientRect().height).toBeGreaterThanOrEqual(
        44,
      );
    }

    reports.click();

    await waitFor(() =>
      expect(reports).toHaveAttribute("aria-current", "page"),
    );
    await expect(home).not.toHaveAttribute("aria-current");

    settings.click();
    await expect(settings).not.toHaveAttribute("aria-current");
    await expect(reports).toHaveAttribute("aria-current", "page");

    const router = within(canvas.getByRole("navigation", { name: "Router" }));

    router.getByRole("link", { name: "Settings" }).click();

    await waitFor(() =>
      expect(canvas.getByText("route: /settings")).toBeTruthy(),
    );
    await expect(canvas.getByText("group change: none")).toBeTruthy();

    router.getByRole("link", { name: "Reports" }).click();

    await waitFor(() =>
      expect(canvas.getByText("group change: /reports")).toBeTruthy(),
    );
  },
};
