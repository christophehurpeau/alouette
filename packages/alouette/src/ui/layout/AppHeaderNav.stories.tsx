import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BirdRegularIcon } from "alouette-icons/phosphor-icons/BirdRegularIcon";
import { ChartBarDuotoneIcon } from "alouette-icons/phosphor-icons/ChartBarDuotoneIcon";
import { ChartBarRegularIcon } from "alouette-icons/phosphor-icons/ChartBarRegularIcon";
import { GearDuotoneIcon } from "alouette-icons/phosphor-icons/GearDuotoneIcon";
import { GearRegularIcon } from "alouette-icons/phosphor-icons/GearRegularIcon";
import { HouseDuotoneIcon } from "alouette-icons/phosphor-icons/HouseDuotoneIcon";
import { HouseRegularIcon } from "alouette-icons/phosphor-icons/HouseRegularIcon";
import { type ReactNode, useState } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Badge } from "../data/Badge";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { AppHeader } from "./AppHeader";
import { AppHeaderBrand } from "./AppHeaderBrand";
import { AppHeaderNav } from "./AppHeaderNav";
import {
  AppHeaderNavItem,
  type AppHeaderNavItemProps,
} from "./AppHeaderNavItem";
import { BrandLogo } from "./BrandLogo";

type ThisStory = StoryObj<typeof AppHeaderNav>;

export default {
  title: "alouette/Layout/AppHeaderNav",
  component: AppHeaderNav,
  parameters: {
    componentSubtitle:
      "Text navigation for an AppHeader: destinations sitting directly on the bar, next to the brand, the current one underlined.",
    docs: {
      description: {
        component: `### Composition
~~~tsx
<AppHeader brand={<AppHeaderBrand href="/" title="Alouette" />}>
  <AppHeaderNav aria-label="Main" value={pathname} onValueChange={router.push}>
    <AppHeaderNavItem href="/home" label="Home" />
    <AppHeaderNavItem href="/inbox" label="Inbox" badge={<Badge size="sm">3</Badge>} aria-label="Inbox, 3 unread" />
  </AppHeaderNav>
</AppHeader>
~~~

- Same semantics as \`NavBar\` — \`navigation\` landmark, \`link\` items, \`aria-current="page"\` on the current one — over a lighter material: no lowered track, no chip, so it fits the header's single line beside the brand and the session actions. Reach for \`NavBar\` when the navigation is the screen's main control (a stacked line, a sidebar rail), and for this one when it shares the bar
- The group owns the value (\`value\` + \`onValueChange\`, or \`defaultValue\`); each item matches it against its own \`href\`. There is no \`options\` prop — compose \`AppHeaderNavItem\` children
- The affordance is \`PressableBox\`'s \`soft\` fill, the same one the brand and the actions carry, so the whole bar reacts alike. The underline is the *state* on top of it: it takes the group's accent, marks the current destination only, and never reacts to hover
- Each item is a 44px tap target; the underline is inset by the item's own padding, so it spans the label rather than the hover fill
- \`icon\` / \`activeIcon\` / \`activeAccent\` behave as on \`NavBarItem\`: the duotone twin swaps in on hover, focus, press, and permanently on the current destination
- \`badge\` renders after the label inside the same pressable — a count or a status. It is not part of the accessible name, so give the item an \`aria-label\` when the label alone no longer names it
- Routing stays the app's job: the anchor cancels its own navigation and calls \`onValueChange\`. An item \`onPress\` replaces it for that item — which is what expo Router's \`<Link asChild>\` injects, and it requires a controlled group`,
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
    accent: {
      control: "select",
      options: [undefined, "brand", "danger", "info", "success", "warning"],
    },
  },
} satisfies Meta<typeof AppHeaderNav>;

export const PreviewAppHeaderNavStory: ThisStory = {
  name: "AppHeaderNav Preview",
  render: (args) => (
    <AppHeaderNav aria-label="Main" defaultValue="/home" {...args}>
      <AppHeaderNavItem href="/home" label="Home" />
      <AppHeaderNavItem href="/reports" label="Business Reports" />
      <AppHeaderNavItem href="/settings" label="Settings" />
    </AppHeaderNav>
  ),
};

interface DestinationsNavProps {
  label: string;
  accent?: Accent;
  activeAccent?: AppHeaderNavItemProps["activeAccent"];
  /** Renders `icon` alone, so the glyph keeps one weight throughout. */
  withoutActiveIcon?: boolean;
}

function DestinationsNav({
  label,
  accent,
  activeAccent,
  withoutActiveIcon,
}: DestinationsNavProps): ReactNode {
  return (
    <AppHeaderNav aria-label={label} accent={accent} defaultValue="/home">
      <AppHeaderNavItem
        href="/home"
        label="Home"
        icon={<HouseRegularIcon />}
        activeIcon={withoutActiveIcon ? undefined : <HouseDuotoneIcon />}
        activeAccent={activeAccent}
      />
      <AppHeaderNavItem
        href="/reports"
        label="Business Reports"
        icon={<ChartBarRegularIcon />}
        activeIcon={withoutActiveIcon ? undefined : <ChartBarDuotoneIcon />}
        activeAccent={activeAccent}
      />
      <AppHeaderNavItem
        disabled
        href="/settings"
        label="Settings"
        icon={<GearRegularIcon />}
        activeIcon={withoutActiveIcon ? undefined : <GearDuotoneIcon />}
        activeAccent={activeAccent}
      />
    </AppHeaderNav>
  );
}

function NavVariant({ accent }: { accent?: Accent }): ReactNode {
  return (
    <Story.SubSection withSurface title={accent ?? "Default"}>
      <DestinationsNav accent={accent} label="With icons" />
      <AppHeaderNav
        aria-label="Labels only"
        accent={accent}
        defaultValue="/home"
      >
        <AppHeaderNavItem href="/home" label="Home" />
        <AppHeaderNavItem href="/reports" label="Business Reports" />
      </AppHeaderNav>
      <AppHeaderNav
        disabled
        aria-label="Disabled group"
        accent={accent}
        defaultValue="/home"
      >
        <AppHeaderNavItem href="/home" label="Home" />
        <AppHeaderNavItem href="/reports" label="Business Reports" />
      </AppHeaderNav>
      <DestinationsNav activeAccent={accent} label="Active accent" />
    </Story.SubSection>
  );
}

function BadgedNav({ label }: { label: string }): ReactNode {
  return (
    <AppHeaderNav aria-label={label} defaultValue="/home">
      <AppHeaderNavItem href="/home" label="Home" />
      <AppHeaderNavItem
        aria-label="Inbox, 3 unread"
        href="/inbox"
        label="Inbox"
        badge={
          <Badge accent="brand" size="sm" variant="solid.enabled">
            3
          </Badge>
        }
      />
      <AppHeaderNavItem
        aria-label="Reports, beta"
        href="/reports"
        label="Reports"
        badge={
          <Badge size="sm" variant="outlined">
            Beta
          </Badge>
        }
      />
    </AppHeaderNav>
  );
}

interface HeaderedNavProps {
  label: string;
  /** Renders the badged destinations, the heaviest item a bar has to hold. */
  withBadges?: boolean;
}

function HeaderedNav({ label, withBadges }: HeaderedNavProps): ReactNode {
  return (
    <AppHeader
      aria-label={`${label} header`}
      brand={
        <AppHeaderBrand
          href="/"
          brandLogo={<BrandLogo icon={<BirdRegularIcon />} />}
          title="Alouette"
        />
      }
      contentWidth="full"
    >
      {withBadges ? (
        <BadgedNav label={`${label} navigation`} />
      ) : (
        <AppHeaderNav aria-label={`${label} navigation`} defaultValue="/home">
          <AppHeaderNavItem href="/home" label="Home" />
          <AppHeaderNavItem href="/reports" label="Business Reports" />
          <AppHeaderNavItem href="/settings" label="Settings" />
        </AppHeaderNav>
      )}
    </AppHeader>
  );
}

export const VariantsAppHeaderNavStory: ThisStory = {
  name: "AppHeaderNav Variants",
  render: () => (
    <Story>
      <Story.Section title="Variants">
        <Text className="text-sm text-muted">
          Each accent is shown on the group itself — it tints the underline of
          the current destination — then, in the last row, on the glyph alone:
          no accent on the group, `activeAccent` on the items.
        </Text>
        <NavVariant />
        <NavVariant accent="brand" />
        <NavVariant accent="danger" />
        <NavVariant accent="success" />
      </Story.Section>

      <Story.Section title="Badge">
        <Text className="text-sm text-muted">
          A count or a status after the label. It is not part of the accessible
          name, so the item carries an `aria-label`.
        </Text>
        <BadgedNav label="Badges" />
      </Story.Section>

      <Story.Section title="Without activeIcon">
        <Text className="text-sm text-muted">
          The duotone twin is optional. Drop `activeIcon` and the glyph keeps
          one weight throughout, the underline carrying the whole state.
        </Text>
        <DestinationsNav withoutActiveIcon label="Single weight" />
      </Story.Section>

      <Story.Section title="Wrapping">
        <Text className="text-sm text-muted">
          The row wraps rather than overflowing the bar it sits on.
        </Text>
        <View className="w-[320px]">
          <AppHeaderNav aria-label="Wrapping" defaultValue="/home">
            <AppHeaderNavItem href="/home" label="Home" />
            <AppHeaderNavItem href="/reports" label="Business Reports" />
            <AppHeaderNavItem href="/settings" label="Settings" />
            <AppHeaderNavItem href="/billing" label="Billing" />
          </AppHeaderNav>
        </View>
      </Story.Section>

      <Story.Section title="In a header">
        <Text className="text-sm text-muted">
          What it is for: the navigation next to the brand, on the bar's own
          line.
        </Text>
        <HeaderedNav label="Composed" />
        <Text className="text-sm text-muted">
          With badges — they ride inside the 44px destinations, so the bar keeps
          its height
        </Text>
        <HeaderedNav withBadges label="Badged" />
      </Story.Section>
    </Story>
  ),
};

function RouterDemo(): ReactNode {
  const [route, setRoute] = useState("/home");
  const [lastGroupChange, setLastGroupChange] = useState("none");

  return (
    <View className="gap-m items-start">
      <AppHeaderNav
        aria-label="Router"
        value={route}
        onValueChange={(next) => {
          setLastGroupChange(next);
          setRoute(next);
        }}
      >
        <AppHeaderNavItem
          href="/home"
          label="Home"
          icon={<HouseRegularIcon />}
          activeIcon={<HouseDuotoneIcon />}
        />
        <AppHeaderNavItem href="/reports" label="Business Reports" />
        <AppHeaderNavItem
          href="/settings"
          label="Settings"
          onPress={(event) => {
            event.preventDefault();
            setRoute("/settings");
          }}
        />
      </AppHeaderNav>
      <Text>{`route: ${route}`}</Text>
      <Text>{`group change: ${lastGroupChange}`}</Text>
    </View>
  );
}

export const TestsAppHeaderNavStory: ThisStory = {
  name: "AppHeaderNav Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Uncontrolled">
        <AppHeaderNav aria-label="Uncontrolled" defaultValue="/home">
          <AppHeaderNavItem
            href="/home"
            label="Home"
            icon={<HouseRegularIcon />}
            activeIcon={<HouseDuotoneIcon />}
          />
          <AppHeaderNavItem href="/reports" label="Business Reports" />
          <AppHeaderNavItem disabled href="/settings" label="Settings" />
        </AppHeaderNav>
      </Story.Section>
      <Story.Section title="Controlled">
        <RouterDemo />
      </Story.Section>
      <Story.Section title="Active icon">
        <DestinationsNav label="Active icon" />
        <DestinationsNav activeAccent="danger" label="Active accent" />
        <DestinationsNav withoutActiveIcon label="Single weight" />
      </Story.Section>
      <Story.Section title="In a header">
        <HeaderedNav label="Composed" />
        <HeaderedNav withBadges label="Badged" />
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

    // Every destination is a 44px tap target, and the row keeps the bar's own
    // height: the group has no track of its own to add to it.
    for (const item of [home, reports, settings]) {
      await expect(item.getBoundingClientRect().height).toBeGreaterThanOrEqual(
        44,
      );
    }
    await expect(nav.getBoundingClientRect().height).toBe(44);

    // Nothing at rest: the affordance is the soft fill arriving on hover, the
    // same one the brand and the actions carry. A CSS `:hover` is not triggered
    // by a synthetic pointer event, so the rule is asserted as the class.
    await expect(getComputedStyle(home).backgroundColor).toBe(
      "rgba(0, 0, 0, 0)",
    );
    await expect(home).toHaveClass("hover:bg-interactive-soft-hover");

    // The underline is the current-page marker: painted on the current
    // destination, transparent (but laid out) on the others, and inset by the
    // item's own padding so it spans the label rather than the hover fill.
    const underlineOf = (item: Element): Element => {
      const underline = item.lastElementChild;
      if (!underline) throw new Error("expected an underline in the item");
      return underline;
    };

    const homeUnderline = underlineOf(home);
    const homeUnderlineBox = homeUnderline.getBoundingClientRect();
    const homeBox = home.getBoundingClientRect();

    await expect(getComputedStyle(homeUnderline).opacity).toBe("1");
    await expect(getComputedStyle(underlineOf(reports)).opacity).toBe("0");
    await expect(homeUnderlineBox.height).toBe(2);
    await expect(homeUnderlineBox.width).toBeLessThan(homeBox.width);
    await expect(homeUnderlineBox.left).toBeGreaterThan(homeBox.left);
    await expect(
      Math.abs(homeUnderlineBox.bottom - homeBox.bottom),
    ).toBeLessThan(1);

    reports.click();

    await waitFor(() =>
      expect(reports).toHaveAttribute("aria-current", "page"),
    );
    await expect(home).not.toHaveAttribute("aria-current");
    // The marker cross-fades, so the computed opacity only lands once the
    // transition has run.
    await waitFor(async () => {
      await expect(getComputedStyle(underlineOf(reports)).opacity).toBe("1");
      await expect(getComputedStyle(homeUnderline).opacity).toBe("0");
    });

    settings.click();
    await expect(settings).not.toHaveAttribute("aria-current");
    await expect(reports).toHaveAttribute("aria-current", "page");

    // An item onPress replaces the group's callback for that item, so a
    // controlled group routes itself and never hears about it.
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

    const activeIconNav = canvas.getByRole("navigation", {
      name: "Active icon",
    });
    const activeCanvas = within(activeIconNav);
    const activeHome = activeCanvas.getByRole("link", { name: "Home" });
    const activeReports = activeCanvas.getByRole("link", {
      name: "Business Reports",
    });
    const activeSettings = activeCanvas.getByRole("link", { name: "Settings" });

    const [homeRest, homeActive] = iconLayers(activeHome);
    // The current destination shows the active glyph permanently. Duotone is
    // identifiable by its backing path.
    await expect(getComputedStyle(homeRest).opacity).toBe("0");
    await expect(getComputedStyle(homeActive).opacity).toBe("1");
    await expect(
      homeActive.querySelector('path[opacity="0.2"]'),
    ).not.toBeNull();

    const [reportsRest, reportsActive] = iconLayers(activeReports);
    // Focus is the one of hover/focus/press a test can actually trigger, so it
    // stands for the rule set; the other two are asserted as classes.
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

    // A disabled item gives no affordance: one glyph, no layers to cross-fade.
    await expect(activeSettings.querySelectorAll("svg")).toHaveLength(1);

    // `activeAccent` re-themes the swapped-in glyph only, through `text-accent`:
    // the resting tints are grayscale-only tokens an accent theme never
    // redeclares, so scoping alone would be inert.
    const accentNav = canvas.getByRole("navigation", { name: "Active accent" });
    const accentHome = within(accentNav).getByRole("link", { name: "Home" });
    const [accentRest, accentActive] = glyphs(accentHome);

    await expect(accentActive.getAttribute("class")).toContain("text-accent");
    await expect(getComputedStyle(accentActive).color).not.toBe(
      getComputedStyle(accentRest).color,
    );

    // `activeIcon` is opt-in: an item without one renders a bare Icon.
    const singleWeight = canvas.getByRole("navigation", {
      name: "Single weight",
    });
    await expect(
      within(singleWeight)
        .getByRole("link", { name: "Home" })
        .querySelectorAll("svg"),
    ).toHaveLength(1);

    // The focus ring is drawn on the pressable itself — unlike a SegmentedItem,
    // nothing clips it here.
    home.focus();
    await userEvent.tab({ shift: true });
    await userEvent.tab();
    await expect(document.activeElement).toBe(home);
    await expect(getComputedStyle(home).outlineWidth).toBe("2px");

    // In a header the navigation sits next to the brand, not centered: the
    // free space is all on the other side of it.
    const header = canvas.getByRole("banner", { name: "Composed header" });
    const headerCanvas = within(header);
    const composed = headerCanvas.getByRole("navigation", {
      name: "Composed navigation",
    });
    const brand = headerCanvas.getByRole("link", { name: /Alouette/ });

    if (window.innerWidth >= 768) {
      const headerBox = header.getBoundingClientRect();
      const composedBox = composed.getBoundingClientRect();

      await expect(brand.getBoundingClientRect().right).toBeLessThanOrEqual(
        composedBox.left,
      );
      await expect(composedBox.left - headerBox.left).toBeLessThan(
        headerBox.right - composedBox.right,
      );
    }

    // A badge rides inside its destination rather than beside it, so the badged
    // bar is exactly as tall as the plain one. It is outside the accessible
    // name, which the item's own aria-label supplies.
    const badgedHeader = canvas.getByRole("banner", { name: "Badged header" });
    const badgedNav = within(badgedHeader).getByRole("navigation", {
      name: "Badged navigation",
    });
    const badgedInbox = within(badgedNav).getByRole("link", {
      name: "Inbox, 3 unread",
    });

    await expect(badgedNav.getBoundingClientRect().height).toBe(
      composed.getBoundingClientRect().height,
    );

    const badgeBox = within(badgedInbox).getByText("3").getBoundingClientRect();
    const inboxBox = badgedInbox.getBoundingClientRect();

    await expect(badgeBox.left).toBeGreaterThanOrEqual(
      within(badgedInbox).getByText("Inbox").getBoundingClientRect().right,
    );
    await expect(badgeBox.right).toBeLessThanOrEqual(inboxBox.right);
    // Centered on the row, not hanging from its top: Badge pins itself with
    // `self-start`, which the item's wrapper is there to overrule.
    await expect(
      Math.abs(
        badgeBox.top +
          badgeBox.height / 2 -
          (inboxBox.top + inboxBox.height / 2),
      ),
    ).toBeLessThan(1);
  },
};
