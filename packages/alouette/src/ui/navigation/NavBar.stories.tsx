import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChartBarDuotoneIcon } from "alouette-icons/phosphor-icons/ChartBarDuotoneIcon";
import { ChartBarRegularIcon } from "alouette-icons/phosphor-icons/ChartBarRegularIcon";
import { GearDuotoneIcon } from "alouette-icons/phosphor-icons/GearDuotoneIcon";
import { GearRegularIcon } from "alouette-icons/phosphor-icons/GearRegularIcon";
import { HouseDuotoneIcon } from "alouette-icons/phosphor-icons/HouseDuotoneIcon";
import { HouseRegularIcon } from "alouette-icons/phosphor-icons/HouseRegularIcon";
import { type ReactNode, useState } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Text } from "../primitives/Text";
import type { SegmentedOrientation } from "../selection/SelectionContext";
import { VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { NavBar } from "./NavBar";
import { NavBarItem, type NavBarItemProps } from "./NavBarItem";

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
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    variant: { control: "inline-radio", options: ["segmented", "icon"] },
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
      <NavBarItem
        href="/home"
        label="Home"
        icon={<HouseRegularIcon />}
        activeIcon={<HouseDuotoneIcon />}
      />
      <NavBarItem
        href="/reports"
        label="Business Reports"
        icon={<ChartBarRegularIcon />}
        activeIcon={<ChartBarDuotoneIcon />}
      />
      <NavBarItem
        href="/settings"
        label="Settings"
        icon={<GearRegularIcon />}
        activeIcon={<GearDuotoneIcon />}
      />
    </NavBar>
  ),
};

function VerticalNavBar({
  accent,
  className,
}: {
  accent?: Accent;
  className?: string;
}): ReactNode {
  return (
    <NavBar
      aria-label="Sidebar"
      accent={accent}
      className={className}
      defaultValue="/home"
      orientation="vertical"
    >
      <NavBarItem
        href="/home"
        label="Home"
        icon={<HouseRegularIcon />}
        activeIcon={<HouseDuotoneIcon />}
      />
      <NavBarItem
        href="/reports"
        label="Business Reports"
        icon={<ChartBarRegularIcon />}
        activeIcon={<ChartBarDuotoneIcon />}
      />
      <NavBarItem
        disabled
        href="/settings"
        label="Settings"
        icon={<GearRegularIcon />}
        activeIcon={<GearDuotoneIcon />}
      />
    </NavBar>
  );
}

interface DestinationsNavBarProps {
  label: string;
  accent?: Accent;
  activeAccent?: NavBarItemProps["activeAccent"];
  /** Renders `icon` alone, so the glyph keeps one weight throughout. */
  withoutActiveIcon?: boolean;
}

function DestinationsNavBar({
  label,
  accent,
  activeAccent,
  withoutActiveIcon,
}: DestinationsNavBarProps): ReactNode {
  return (
    <NavBar aria-label={label} accent={accent} defaultValue="/home">
      <NavBarItem
        href="/home"
        label="Home"
        icon={<HouseRegularIcon />}
        activeIcon={withoutActiveIcon ? undefined : <HouseDuotoneIcon />}
        activeAccent={activeAccent}
      />
      <NavBarItem
        href="/reports"
        label="Business Reports"
        icon={<ChartBarRegularIcon />}
        activeIcon={withoutActiveIcon ? undefined : <ChartBarDuotoneIcon />}
        activeAccent={activeAccent}
      />
      <NavBarItem
        disabled
        href="/settings"
        label="Settings"
        icon={<GearRegularIcon />}
        activeIcon={withoutActiveIcon ? undefined : <GearDuotoneIcon />}
        activeAccent={activeAccent}
      />
    </NavBar>
  );
}

function NavBarVariant({ accent }: { accent?: Accent }): ReactNode {
  return (
    <Story.SubSection withSurface title={accent ?? "Default"}>
      <DestinationsNavBar accent={accent} label="With icons" />
      <NavBar aria-label="Labels only" accent={accent} defaultValue="/home">
        <NavBarItem href="/home" label="Home" />
        <NavBarItem href="/reports" label="Business Reports" />
      </NavBar>
      <NavBar
        disabled
        aria-label="Disabled"
        accent={accent}
        defaultValue="/home"
      >
        <NavBarItem href="/home" label="Home" />
        <NavBarItem href="/reports" label="Business Reports" />
      </NavBar>
      <VerticalNavBar accent={accent} />
      <VerticalNavBar accent={accent} className="w-[220px]" />
      <DestinationsNavBar activeAccent={accent} label="Active accent" />
    </Story.SubSection>
  );
}

function IconNavBar({
  accent,
  orientation,
}: {
  accent?: Accent;
  orientation?: SegmentedOrientation;
}): ReactNode {
  return (
    <NavBar
      variant="icon"
      accent={accent}
      aria-label={orientation === "vertical" ? "Icon rail" : "Icon row"}
      defaultValue="/home"
      orientation={orientation}
    >
      <NavBarItem
        href="/home"
        label="Home"
        icon={<HouseRegularIcon />}
        activeIcon={<HouseDuotoneIcon />}
      />
      <NavBarItem
        href="/reports"
        label="Business Reports"
        icon={<ChartBarRegularIcon />}
        activeIcon={<ChartBarDuotoneIcon />}
      />
      <NavBarItem
        disabled
        href="/settings"
        label="Settings"
        icon={<GearRegularIcon />}
        activeIcon={<GearDuotoneIcon />}
      />
    </NavBar>
  );
}

export const VariantsNavBarStory: ThisStory = {
  name: "NavBar Variants",
  render: () => (
    <Story>
      <Story.Section title="Variants">
        <Text className="text-sm text-muted">
          Each accent is shown on the bar itself, then — in the last row — on
          the glyph alone: no accent on the group, `activeAccent` on the items.
        </Text>
        <NavBarVariant />
        <NavBarVariant accent="brand" />
        <NavBarVariant accent="danger" />
        <NavBarVariant accent="success" />
      </Story.Section>

      <Story.Section title="Stretch">
        <Text className="text-sm text-muted">
          Fills the width it is given, the destinations sharing it equally —
          what a stacked AppHeader hands its navigation.
        </Text>
        <NavBar stretch aria-label="Stretch" defaultValue="/home">
          <NavBarItem
            href="/home"
            label="Home"
            icon={<HouseRegularIcon />}
            activeIcon={<HouseDuotoneIcon />}
          />
          <NavBarItem
            href="/reports"
            label="Business Reports"
            icon={<ChartBarRegularIcon />}
            activeIcon={<ChartBarDuotoneIcon />}
          />
          <NavBarItem
            href="/settings"
            label="Settings"
            icon={<GearRegularIcon />}
            activeIcon={<GearDuotoneIcon />}
          />
        </NavBar>
      </Story.Section>

      <Story.Section title="Icon">
        <Text className="text-sm text-muted">
          Square icon-only chips in a pill bar; the label stays the accessible
          name.
        </Text>
        <Story.SubSection withSurface title="Default">
          <IconNavBar />
          <IconNavBar orientation="vertical" />
        </Story.SubSection>
        <Story.SubSection withSurface title="brand">
          <IconNavBar accent="brand" />
        </Story.SubSection>
      </Story.Section>

      <Story.Section withSurface title="Without activeIcon">
        <Text className="text-sm text-muted">
          The duotone twin is optional. Drop `activeIcon` and the glyph keeps
          one weight throughout, the chip carrying the whole affordance.
        </Text>
        <DestinationsNavBar withoutActiveIcon label="Single weight" />
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
        <NavBarItem
          href="/home"
          label="Home"
          icon={<HouseRegularIcon />}
          activeIcon={<HouseDuotoneIcon />}
        />
        <NavBarItem
          href="/reports"
          label="Business Reports"
          icon={<ChartBarRegularIcon />}
          activeIcon={<ChartBarDuotoneIcon />}
        />
        <NavBarItem
          href="/settings"
          label="Settings"
          icon={<GearRegularIcon />}
          activeIcon={<GearDuotoneIcon />}
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
          <NavBarItem
            href="/home"
            label="Home"
            icon={<HouseRegularIcon />}
            activeIcon={<HouseDuotoneIcon />}
          />
          <NavBarItem href="/reports" label="Business Reports" />
          <NavBarItem disabled href="/settings" label="Settings" />
        </NavBar>
        <NavBar
          aria-label="Vertical"
          defaultValue="/home"
          orientation="vertical"
        >
          <NavBarItem
            href="/home"
            label="Home"
            icon={<HouseRegularIcon />}
            activeIcon={<HouseDuotoneIcon />}
          />
          <NavBarItem href="/reports" label="Business Reports" />
          <NavBarItem href="/settings" label="A much longer destination" />
        </NavBar>
      </Story.Section>
      <Story.Section title="Controlled">
        <NavBarRouterDemo />
      </Story.Section>
      <Story.Section title="Stretched">
        <VStack className="w-[600px]">
          <NavBar stretch aria-label="Stretched" defaultValue="/home">
            <NavBarItem href="/home" label="Home" />
            <NavBarItem href="/reports" label="Business Reports" />
            <NavBarItem href="/settings" label="Settings" />
          </NavBar>
        </VStack>
      </Story.Section>
      <Story.Section title="Icon">
        <IconNavBar />
        <IconNavBar orientation="vertical" />
      </Story.Section>
      <Story.Section title="Active icon">
        <DestinationsNavBar label="Active icon" />
        <DestinationsNavBar activeAccent="danger" label="Active accent" />
        <DestinationsNavBar withoutActiveIcon label="Single weight" />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nav = canvas.getByRole("navigation", { name: "Uncontrolled" });
    const navCanvas = within(nav);
    const home = navCanvas.getByRole("link", { name: "Home" });
    const reports = navCanvas.getByRole("link", { name: "Business Reports" });
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

    router.getByRole("link", { name: "Business Reports" }).click();

    await waitFor(() =>
      expect(canvas.getByText("group change: /reports")).toBeTruthy(),
    );

    const vertical = canvas.getByRole("navigation", { name: "Vertical" });
    const verticalItems = within(vertical).getAllByRole("link");
    const [first, second, longest] = verticalItems;
    if (!first || !second || !longest) {
      throw new Error("expected three vertical items");
    }

    const verticalBox = vertical.getBoundingClientRect();
    // Stacked: every item keeps the 44px tap target, so the bar is at least as
    // tall as the three of them, and each item starts below the previous one.
    await expect(verticalBox.height).toBeGreaterThanOrEqual(3 * 44);
    for (const item of verticalItems) {
      await expect(item.getBoundingClientRect().height).toBeGreaterThanOrEqual(
        44,
      );
    }
    await expect(second.getBoundingClientRect().top).toBeGreaterThanOrEqual(
      first.getBoundingClientRect().bottom,
    );
    // Items span the bar's width instead of shrinking to their own label, so
    // the shortest and the longest measure the same.
    await expect(first.getBoundingClientRect().width).toBe(
      longest.getBoundingClientRect().width,
    );
    await expect(first.getBoundingClientRect().width).toBeLessThan(
      verticalBox.width,
    );

    const stretched = canvas.getByRole("navigation", { name: "Stretched" });
    const stretchedBox = stretched.getBoundingClientRect();
    // The bar takes the width its container gives it instead of hugging its
    // destinations, and they grow to fill it — the last one ends at the bar's
    // padding rather than leaving the spare width empty.
    await expect(stretchedBox.width).toBe(600);
    await expect(stretchedBox.height).toBe(44);
    const stretchedItems = within(stretched).getAllByRole("link");
    const lastStretched = stretchedItems.at(-1);
    if (!lastStretched) {
      throw new Error("expected stretched items");
    }
    await expect(lastStretched.getBoundingClientRect().right).toBeGreaterThan(
      stretchedBox.right - 16,
    );

    const iconRow = canvas.getByRole("navigation", { name: "Icon row" });
    const iconRowCanvas = within(iconRow);
    const iconHome = iconRowCanvas.getByRole("link", { name: "Home" });
    const iconReports = iconRowCanvas.getByRole("link", {
      name: "Business Reports",
    });
    const iconSettings = iconRowCanvas.getByRole("link", { name: "Settings" });

    // The label names the item without being rendered, and the square chip
    // still sits in a 44x44 tap target.
    await expect(iconRowCanvas.queryByText("Business Reports")).toBeNull();
    await expect(iconRow.getBoundingClientRect().height).toBe(44);
    for (const item of [iconHome, iconReports, iconSettings]) {
      const rect = item.getBoundingClientRect();
      await expect(rect.height).toBeGreaterThanOrEqual(44);
      await expect(rect.width).toBeGreaterThanOrEqual(44);
    }

    await expect(iconHome).toHaveAttribute("aria-current", "page");
    await expect(iconHome).toHaveAttribute("href", "/home");
    await expect(iconSettings).not.toHaveAttribute("href");

    iconReports.click();

    await waitFor(() =>
      expect(iconReports).toHaveAttribute("aria-current", "page"),
    );
    await expect(iconHome).not.toHaveAttribute("aria-current");

    // Stacked icons: the chips stay square, so the rail is as narrow as one
    // item however long the labels behind them are.
    const iconRail = canvas.getByRole("navigation", { name: "Icon rail" });
    const iconRailItems = within(iconRail).getAllByRole("link");
    const [firstRail, secondRail] = iconRailItems;
    if (!firstRail || !secondRail) {
      throw new Error("expected rail items");
    }
    await expect(
      iconRail.getBoundingClientRect().height,
    ).toBeGreaterThanOrEqual(3 * 44);
    for (const item of iconRailItems) {
      const rect = item.getBoundingClientRect();
      await expect(rect.height).toBeGreaterThanOrEqual(44);
      await expect(rect.width).toBeGreaterThanOrEqual(44);
    }
    await expect(secondRail.getBoundingClientRect().top).toBeGreaterThanOrEqual(
      firstRail.getBoundingClientRect().bottom,
    );

    const activeIconBar = canvas.getByRole("navigation", {
      name: "Active icon",
    });
    const activeIconCanvas = within(activeIconBar);
    const activeHome = activeIconCanvas.getByRole("link", { name: "Home" });
    const activeReports = activeIconCanvas.getByRole("link", {
      name: "Business Reports",
    });
    const activeSettings = activeIconCanvas.getByRole("link", {
      name: "Settings",
    });

    const glyphs = (item: Element): [SVGSVGElement, SVGSVGElement] => {
      const [rest, active] = item.querySelectorAll("svg");
      if (!rest || !active) throw new Error("expected two glyphs on the item");
      return [rest, active];
    };

    // Each glyph sits in its own layer, the two cross-fading on opacity.
    const iconLayers = (item: Element): [Element, Element] => {
      const [restLayer, activeLayer] = glyphs(item).map(
        (svg) => svg.parentElement,
      );
      if (!restLayer || !activeLayer) {
        throw new Error("expected a layer around each glyph");
      }
      return [restLayer, activeLayer];
    };

    const [homeRest, homeActive] = iconLayers(activeHome);
    // The current destination shows the active glyph permanently. Duotone is
    // identifiable by its backing path.
    await expect(getComputedStyle(homeRest).opacity).toBe("0");
    await expect(getComputedStyle(homeActive).opacity).toBe("1");
    await expect(homeRest.querySelector('path[opacity="0.2"]')).toBeNull();
    await expect(
      homeActive.querySelector('path[opacity="0.2"]'),
    ).not.toBeNull();

    const [reportsRest, reportsActive] = iconLayers(activeReports);
    await expect(getComputedStyle(reportsRest).opacity).toBe("1");
    await expect(getComputedStyle(reportsActive).opacity).toBe("0");
    // The swap is a CSS `:hover` / `:focus` / `:active` on the item's `group`.
    // Focus is the one of the three a test can actually trigger, so it stands
    // for the rule set; hover and press are asserted as classes, the way
    // AppHeader asserts its soft fill.
    activeReports.focus();
    await waitFor(async () => {
      await expect(getComputedStyle(reportsActive).opacity).toBe("1");
      await expect(getComputedStyle(reportsRest).opacity).toBe("0");
    });
    activeReports.blur();
    await waitFor(() =>
      expect(getComputedStyle(reportsActive).opacity).toBe("0"),
    );

    await expect(reportsActive).toHaveClass("group-hover:opacity-100");
    await expect(reportsActive).toHaveClass("group-active:opacity-100");
    await expect(reportsRest).toHaveClass("group-hover:opacity-0");

    // A disabled item gives no affordance: one glyph, no layers to cross-fade.
    await expect(activeSettings.querySelectorAll("svg")).toHaveLength(1);

    // `activeIcon` is opt-in: an item without one renders a bare Icon, so the
    // wrapper and the second layer are absent rather than merely transparent.
    const singleWeightBar = canvas.getByRole("navigation", {
      name: "Single weight",
    });
    const singleWeightHome = within(singleWeightBar).getByRole("link", {
      name: "Home",
    });
    await expect(singleWeightHome.querySelectorAll("svg")).toHaveLength(1);

    // `activeAccent` re-themes the swapped-in glyph only. It has to reach the
    // icon through `text-accent`: the resting tints are grayscale-only tokens
    // an accent theme never redeclares, so scoping alone would be inert.
    const accentBar = canvas.getByRole("navigation", { name: "Active accent" });
    const accentHome = within(accentBar).getByRole("link", { name: "Home" });
    const [accentRest, accentActive] = glyphs(accentHome);

    await expect(accentActive.getAttribute("class")).toContain("text-accent");
    await expect(
      accentActive.closest<HTMLElement>("[data-theme]")?.dataset.theme,
    ).toMatch(/_danger$/);
    await expect(getComputedStyle(accentActive).color).not.toBe(
      getComputedStyle(accentRest).color,
    );

    // Without it the two layers share the item's own color, so the swap reads
    // as a weight change alone.
    const [plainRest, plainActive] = glyphs(activeHome);
    await expect(getComputedStyle(plainActive).color).toBe(
      getComputedStyle(plainRest).color,
    );

    // The extra layers are absolutely stacked, so the bar keeps its geometry.
    await expect(activeIconBar.getBoundingClientRect().height).toBe(44);

    // The focus ring is drawn on the visible chip, not on the pressable: the
    // pressable fills the bar's content box and the bar clips, so an outline
    // there would be cut away. Ring box (offset + width) stays inside the bar.
    home.focus();
    await userEvent.tab({ shift: true });
    await userEvent.tab();
    await expect(document.activeElement).toBe(home);

    const chip = home.firstElementChild;
    if (!chip) throw new Error("expected a chip inside the item");
    const chipStyle = getComputedStyle(chip);
    await expect(chipStyle.outlineWidth).toBe("2px");
    // Zero-width, not `outline-style: none`: react-native-css drops that style,
    // so the browser's own focus ring is overridden rather than removed.
    await expect(getComputedStyle(home).outlineWidth).toBe("0px");

    const ring =
      Number.parseFloat(chipStyle.outlineOffset) +
      Number.parseFloat(chipStyle.outlineWidth);
    const chipBox = chip.getBoundingClientRect();
    const navBox = nav.getBoundingClientRect();
    await expect(chipBox.top - ring).toBeGreaterThanOrEqual(navBox.top);
    await expect(chipBox.bottom + ring).toBeLessThanOrEqual(navBox.bottom);
    await expect(chipBox.left - ring).toBeGreaterThanOrEqual(navBox.left);
    await expect(chipBox.right + ring).toBeLessThanOrEqual(navBox.right);
  },
};
