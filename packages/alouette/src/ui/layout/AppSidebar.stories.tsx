import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BackpackRegularIcon } from "alouette-icons/phosphor-icons/Backpack";
import { BellRegularIcon } from "alouette-icons/phosphor-icons/Bell";
import { BinocularsRegularIcon } from "alouette-icons/phosphor-icons/Binoculars";
import { BirdRegularIcon } from "alouette-icons/phosphor-icons/Bird";
import { CalendarBlankRegularIcon } from "alouette-icons/phosphor-icons/CalendarBlank";
import { ChartBarRegularIcon } from "alouette-icons/phosphor-icons/ChartBar";
import { DownloadSimpleRegularIcon } from "alouette-icons/phosphor-icons/DownloadSimple";
import { FeatherRegularIcon } from "alouette-icons/phosphor-icons/Feather";
import { GearRegularIcon } from "alouette-icons/phosphor-icons/Gear";
import { MagnifyingGlassRegularIcon } from "alouette-icons/phosphor-icons/MagnifyingGlass";
import { MapPinRegularIcon } from "alouette-icons/phosphor-icons/MapPin";
import { MapTrifoldRegularIcon } from "alouette-icons/phosphor-icons/MapTrifold";
import { SignOutRegularIcon } from "alouette-icons/phosphor-icons/SignOut";
import { SquaresFourRegularIcon } from "alouette-icons/phosphor-icons/SquaresFour";
import { UserCircleRegularIcon } from "alouette-icons/phosphor-icons/UserCircle";
import { UsersRegularIcon } from "alouette-icons/phosphor-icons/Users";
import type { ReactNode } from "react";
import { IconButton } from "../actions/IconButton";
import { MenuItem } from "../actions/MenuItem";
import { Select } from "../inputs/Select";
import { SidebarNav } from "../navigation/SidebarNav";
import { SidebarNavItem } from "../navigation/SidebarNavItem";
import { SidebarNavSection } from "../navigation/SidebarNavSection";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Separator } from "../stacks/Separator";
import { Story } from "../story-components/Story";
import { AppHeaderBrand } from "./AppHeaderBrand";
import { AppSidebar } from "./AppSidebar";
import { AppSidebarAccount } from "./AppSidebarAccount";
import { BrandLogo } from "./BrandLogo";

type ThisStory = StoryObj<typeof AppSidebar>;

export default {
  title: "alouette/Layout/AppSidebar",
  component: AppSidebar,
  parameters: {
    componentSubtitle:
      "The column an AppSidebarLayout puts beside the screen: brand and actions, workspace switchers, the navigation and the account. Top and bottom are pinned, the navigation scrolls.",
    docs: {
      description: {
        component: `### Composition
~~~tsx
<AppSidebar
  brand={<AppHeaderBrand href="/" brandLogo={<BrandLogo icon={…} />} title="Alouette" />}
  actions={<IconButton aria-label="Search" icon={…} size="sm" variant="soft" />}
  header={
    <Select variant="tonal" aria-label="Club" icon={…} options={clubs} value={clubId} onValueChange={…} />
  }
  footer={
    <AppSidebarAccount name="Camille Hurel" description="camille@example.com">
      <MenuItem label="Log out" accent="danger" onPress={…} />
    </AppSidebarAccount>
  }
>
  <SidebarNav aria-label="Main" value={pathname}>…</SidebarNav>
</AppSidebar>
~~~

- \`brand\` and \`actions\` share the top row; \`header\` is pinned under it, for the \`Select\`s choosing what the navigation applies to — \`variant="tonal"\`, a pill lifted off the sidebar rather than a form field, with a leading \`icon\`; \`footer\` is pinned at the bottom. Only \`children\` scrolls, so these stay in reach of a long navigation
- \`AppSidebarAccount\` is a \`soft\` row (avatar, name, a second line) whose menu opens **above** it, since it is pinned at the bottom of the viewport
- The column is 280px wide; \`className\` overrides it. It has no ground of its own: it sits on the \`AppSidebarLayout\`'s \`lowered\` frame. The navigation's scrollbar sits in the column's right gutter, so with nothing to scroll (or an overlay scrollbar) its rows are exactly as wide as the selects above them; a rule also appears at the top or the bottom edge while rows are hidden past it. Its rows are \`rounded-sm\`, setting the menu apart from the pill controls`,
      },
    },
  },
} satisfies Meta<typeof AppSidebar>;

interface SidebarFrameProps {
  children: ReactNode;
}

/** The lowered ground the column sits on in an `AppSidebarLayout`. */
function SidebarFrame({ children }: SidebarFrameProps): ReactNode {
  return <View className="h-[560px] self-start bg-lowered">{children}</View>;
}

function DemoBrand(): ReactNode {
  return (
    <AppHeaderBrand
      href="/"
      brandLogo={<BrandLogo icon={<BirdRegularIcon />} />}
      title="Alouette"
    />
  );
}

function DemoActions(): ReactNode {
  return (
    <>
      <IconButton
        aria-label="Notifications"
        icon={<BellRegularIcon />}
        size="sm"
        variant="soft"
        onPress={fn()}
      />
      <IconButton
        aria-label="Search"
        icon={<MagnifyingGlassRegularIcon />}
        size="sm"
        variant="soft"
        onPress={fn()}
      />
    </>
  );
}

interface DemoScopeSelectsProps {
  site?: string;
}

function DemoScopeSelects({ site }: DemoScopeSelectsProps): ReactNode {
  return (
    <>
      <Select
        variant="tonal"
        aria-label="Club"
        icon={<FeatherRegularIcon />}
        options={[
          { label: "Field Ornithology Club", value: "field-ornithology" },
          { label: "Coastal Watchers", value: "coastal-watchers" },
        ]}
        defaultValue="field-ornithology"
        onValueChange={fn()}
      />
      <Select
        variant="tonal"
        aria-label="Site"
        icon={<MapPinRegularIcon />}
        placeholder="Choose a site"
        options={[
          { label: "Camargue wetlands", value: "camargue" },
          { label: "Vosges ridge", value: "vosges" },
        ]}
        defaultValue={site}
        onValueChange={fn()}
      />
    </>
  );
}

interface DemoNavProps {
  label: string;
}

function DemoNav({ label }: DemoNavProps): ReactNode {
  return (
    <SidebarNav aria-label={label} defaultValue="/">
      <SidebarNavSection>
        <SidebarNavItem
          href="/"
          label="Dashboard"
          icon={<SquaresFourRegularIcon />}
        />
        <SidebarNavItem
          href="/sightings"
          label="Sightings"
          icon={<BinocularsRegularIcon />}
        />
      </SidebarNavSection>
      <SidebarNavSection title="Team">
        <SidebarNavItem
          href="/observers"
          label="Observers"
          icon={<UsersRegularIcon />}
        />
      </SidebarNavSection>
      <SidebarNavSection title="Data">
        <SidebarNavItem
          href="/reports"
          label="Reports"
          icon={<ChartBarRegularIcon />}
        />
      </SidebarNavSection>
    </SidebarNav>
  );
}

/** Taller than the column leaves it, so it scrolls. */
function DemoLongNav({ label }: DemoNavProps): ReactNode {
  return (
    <SidebarNav aria-label={label} defaultValue="/">
      <SidebarNavSection>
        <SidebarNavItem
          href="/"
          label="Dashboard"
          icon={<SquaresFourRegularIcon />}
        />
        <SidebarNavItem
          href="/sightings"
          label="Sightings"
          icon={<BinocularsRegularIcon />}
        />
        <SidebarNavItem
          href="/calendar"
          label="Calendar"
          icon={<CalendarBlankRegularIcon />}
        />
      </SidebarNavSection>
      <SidebarNavSection title="Team">
        <SidebarNavItem
          href="/observers"
          label="Observers"
          icon={<UsersRegularIcon />}
        />
        <SidebarNavItem
          href="/equipment"
          label="Equipment"
          icon={<BackpackRegularIcon />}
        />
      </SidebarNavSection>
      <SidebarNavSection title="Data">
        <SidebarNavItem
          href="/reports"
          label="Reports"
          icon={<ChartBarRegularIcon />}
        />
        <SidebarNavItem
          href="/exports"
          label="Exports"
          icon={<DownloadSimpleRegularIcon />}
        />
      </SidebarNavSection>
      <SidebarNavSection title="Field">
        <SidebarNavItem
          href="/sites"
          label="Sites"
          icon={<MapTrifoldRegularIcon />}
        />
        <SidebarNavItem
          href="/species"
          label="Species"
          icon={<BirdRegularIcon />}
        />
      </SidebarNavSection>
      <SidebarNavSection title="Settings">
        <SidebarNavItem
          href="/preferences"
          label="Preferences"
          icon={<GearRegularIcon />}
        />
      </SidebarNavSection>
    </SidebarNav>
  );
}

function DemoAccount(): ReactNode {
  return (
    <AppSidebarAccount
      name="Camille Hurel"
      description="camille@example.com"
      header={<Text className="text-sm text-muted">Signed in</Text>}
    >
      <MenuItem label="Profile" icon={<UserCircleRegularIcon />} href="/me" />
      <Separator className="my-xxs" />
      <MenuItem
        label="Log out"
        icon={<SignOutRegularIcon />}
        accent="danger"
        onPress={fn()}
      />
    </AppSidebarAccount>
  );
}

export const PreviewAppSidebarStory: ThisStory = {
  name: "AppSidebar Preview",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  render: (args) => (
    <SidebarFrame>
      <AppSidebar
        brand={<DemoBrand />}
        actions={<DemoActions />}
        header={<DemoScopeSelects />}
        footer={<DemoAccount />}
        {...args}
      >
        <DemoNav label="Main" />
      </AppSidebar>
    </SidebarFrame>
  ),
};

export const VariantsAppSidebarStory: ThisStory = {
  name: "AppSidebar Variants",
  render: () => (
    <Story>
      <Story.Section title="Full sidebar">
        <SidebarFrame>
          <AppSidebar
            brand={<DemoBrand />}
            actions={<DemoActions />}
            header={<DemoScopeSelects />}
            footer={<DemoAccount />}
          >
            <DemoNav label="Full" />
          </AppSidebar>
        </SidebarFrame>
      </Story.Section>

      <Story.Section title="Navigation taller than the column">
        <Text className="text-sm text-muted">
          A rule marks the edge rows are hidden past
        </Text>
        <SidebarFrame>
          <AppSidebar
            brand={<DemoBrand />}
            header={<DemoScopeSelects />}
            footer={<DemoAccount />}
          >
            <DemoLongNav label="Long" />
          </AppSidebar>
        </SidebarFrame>
      </Story.Section>

      <Story.Section title="Select holding a choice">
        <SidebarFrame>
          <AppSidebar
            brand={<DemoBrand />}
            header={<DemoScopeSelects site="vosges" />}
          >
            <DemoNav label="Chosen site" />
          </AppSidebar>
        </SidebarFrame>
      </Story.Section>

      <Story.Section title="Without actions">
        <SidebarFrame>
          <AppSidebar brand={<DemoBrand />} footer={<DemoAccount />}>
            <DemoNav label="No actions" />
          </AppSidebar>
        </SidebarFrame>
      </Story.Section>

      <Story.Section title="Navigation only">
        <SidebarFrame>
          <AppSidebar>
            <DemoNav label="Bare" />
          </AppSidebar>
        </SidebarFrame>
      </Story.Section>

      <Story.Section title="Width">
        <Text className="text-sm text-muted">
          A narrower rail through className
        </Text>
        <SidebarFrame>
          <AppSidebar
            className="w-[220px]"
            brand={<DemoBrand />}
            footer={<DemoAccount />}
          >
            <DemoNav label="Narrow" />
          </AppSidebar>
        </SidebarFrame>
      </Story.Section>
    </Story>
  ),
};

export const TestsAppSidebarStory: ThisStory = {
  name: "AppSidebar Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Full sidebar">
        <SidebarFrame>
          <AppSidebar
            brand={<DemoBrand />}
            actions={<DemoActions />}
            header={<DemoScopeSelects />}
            footer={<DemoAccount />}
          >
            <DemoNav label="Tested" />
          </AppSidebar>
        </SidebarFrame>
      </Story.Section>
      <Story.Section title="Navigation taller than the column">
        <SidebarFrame>
          <AppSidebar brand={<DemoBrand />}>
            <DemoLongNav label="Tested long" />
          </AppSidebar>
        </SidebarFrame>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);

    // The selects scoping the navigation are plain Selects, holding the
    // current choice or their placeholder.
    const club = canvas.getByRole("combobox", { name: "Club" });
    await expect(club).toHaveTextContent("Field Ornithology Club");
    await expect(
      canvas.getByRole("combobox", { name: "Site" }),
    ).toHaveTextContent("Choose a site");
    await userEvent.click(club);
    await userEvent.click(
      await body.findByRole("option", { name: "Coastal Watchers" }),
    );
    await expect(club).toHaveTextContent("Coastal Watchers");

    // The navigation's rows are exactly as wide as the selects above them.
    const dashboard = within(
      canvas.getByRole("navigation", { name: "Tested" }),
    ).getByRole("link", { name: "Dashboard" });
    await expect(dashboard.getBoundingClientRect().left).toBeCloseTo(
      club.getBoundingClientRect().left,
      0,
    );
    await expect(dashboard.getBoundingClientRect().right).toBeCloseTo(
      club.getBoundingClientRect().right,
      0,
    );

    // A navigation taller than the column scrolls, and a rule marks each edge
    // rows are hidden past.
    const longNav = canvas.getByRole("navigation", { name: "Tested long" });
    const scroller = longNav.parentElement?.parentElement;
    if (!scroller) throw new Error("expected the navigation in a scroller");
    await expect(scroller.scrollHeight).toBeGreaterThan(scroller.clientHeight);
    const transparent = "rgba(0, 0, 0, 0)";
    await waitFor(async () => {
      await expect(getComputedStyle(scroller).borderBottomColor).not.toBe(
        transparent,
      );
    });
    await expect(getComputedStyle(scroller).borderTopColor).toBe(transparent);
    scroller.scrollTop = scroller.scrollHeight;
    await waitFor(async () => {
      await expect(getComputedStyle(scroller).borderTopColor).not.toBe(
        transparent,
      );
    });
    await waitFor(async () => {
      await expect(getComputedStyle(scroller).borderBottomColor).toBe(
        transparent,
      );
    });

    // The account row is pinned at the bottom: its menu opens above it.
    const account = canvas.getByRole("button", { name: "Camille Hurel" });
    await userEvent.click(account);
    const accountMenu = await body.findByRole("menu", {
      name: "Camille Hurel",
    });
    await expect(accountMenu.getBoundingClientRect().bottom).toBeLessThan(
      account.getBoundingClientRect().top,
    );
    // …and as wide as the row it hangs from.
    const accountPanel = accountMenu.parentElement;
    if (!accountPanel) throw new Error("expected the menu in a panel");
    await expect(accountPanel.getBoundingClientRect().left).toBeCloseTo(
      account.getBoundingClientRect().left,
      0,
    );
    await expect(accountPanel.getBoundingClientRect().right).toBeCloseTo(
      account.getBoundingClientRect().right,
      0,
    );
    await userEvent.keyboard("{Escape}");
    await waitFor(async () => {
      await expect(body.queryByRole("menu")).toBe(null);
    });

    // The top and the footer frame the scrolling navigation.
    const nav = canvas.getByRole("navigation", { name: "Tested" });
    await expect(nav.getBoundingClientRect().top).toBeGreaterThan(
      canvas.getByRole("combobox", { name: "Site" }).getBoundingClientRect()
        .bottom,
    );
    await expect(nav.getBoundingClientRect().bottom).toBeLessThanOrEqual(
      account.getBoundingClientRect().top,
    );
  },
};
