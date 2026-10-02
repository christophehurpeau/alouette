import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  BackpackDuotoneIcon,
  BackpackRegularIcon,
} from "alouette-icons/phosphor-icons/Backpack";
import { BellRegularIcon } from "alouette-icons/phosphor-icons/Bell";
import {
  BinocularsDuotoneIcon,
  BinocularsRegularIcon,
} from "alouette-icons/phosphor-icons/Binoculars";
import {
  BirdDuotoneIcon,
  BirdRegularIcon,
} from "alouette-icons/phosphor-icons/Bird";
import {
  CalendarBlankDuotoneIcon,
  CalendarBlankRegularIcon,
} from "alouette-icons/phosphor-icons/CalendarBlank";
import {
  ChartLineDuotoneIcon,
  ChartLineRegularIcon,
} from "alouette-icons/phosphor-icons/ChartLine";
import {
  DownloadSimpleDuotoneIcon,
  DownloadSimpleRegularIcon,
} from "alouette-icons/phosphor-icons/DownloadSimple";
import { FeatherRegularIcon } from "alouette-icons/phosphor-icons/Feather";
import {
  GearDuotoneIcon,
  GearRegularIcon,
} from "alouette-icons/phosphor-icons/Gear";
import { MagnifyingGlassRegularIcon } from "alouette-icons/phosphor-icons/MagnifyingGlass";
import { MapPinRegularIcon } from "alouette-icons/phosphor-icons/MapPin";
import {
  MapTrifoldDuotoneIcon,
  MapTrifoldRegularIcon,
} from "alouette-icons/phosphor-icons/MapTrifold";
import { SignOutRegularIcon } from "alouette-icons/phosphor-icons/SignOut";
import {
  SquaresFourDuotoneIcon,
  SquaresFourRegularIcon,
} from "alouette-icons/phosphor-icons/SquaresFour";
import { UserCircleRegularIcon } from "alouette-icons/phosphor-icons/UserCircle";
import {
  UsersDuotoneIcon,
  UsersRegularIcon,
} from "alouette-icons/phosphor-icons/Users";
import { type ReactNode, useState } from "react";
import { useCurrentMode } from "../../core/ThemeContext";
import {
  type ColorModePreference,
  useResolvedColorMode,
} from "../../core/useColorMode";
import { IconButton } from "../actions/IconButton";
import { MenuItem } from "../actions/MenuItem";
import { PressableListItem } from "../actions/PressableListItem";
import { ScopedTheme } from "../containers/ScopedTheme";
import { ColorModePicker } from "../inputs/ColorModePicker";
import { Select } from "../inputs/Select";
import { NavBar } from "../navigation/NavBar";
import { NavBarItem } from "../navigation/NavBarItem";
import { SidebarNav } from "../navigation/SidebarNav";
import { SidebarNavItem } from "../navigation/SidebarNavItem";
import { SidebarNavSection } from "../navigation/SidebarNavSection";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Separator } from "../stacks/Separator";
import { Story } from "../story-components/Story";
import { AppHeader } from "./AppHeader";
import { AppHeaderAccount } from "./AppHeaderAccount";
import { AppHeaderActions } from "./AppHeaderActions";
import { AppHeaderBrand } from "./AppHeaderBrand";
import { AppSidebar } from "./AppSidebar";
import { AppSidebarAccount } from "./AppSidebarAccount";
import { AppSidebarLayout } from "./AppSidebarLayout";
import { BrandLogo } from "./BrandLogo";

type ThisStory = StoryObj<typeof AppSidebarLayout>;

export default {
  title: "alouette/Layout/AppSidebarLayout",
  component: AppSidebarLayout,
  parameters: {
    componentSubtitle:
      "Application layout: from md a sidebar beside the screen, which sits in a raised panel and scrolls on its own; below md, a header scrolling with the screen as one page.",
    docs: {
      description: {
        component: `### Composition
~~~tsx
<AppSidebarLayout
  sidebar={
    <AppSidebar
      brand={<AppHeaderBrand href="/" title="Alouette" />}
      actions={<IconButton aria-label="Search" icon={…} size="sm" variant="soft" />}
      header={<Select variant="tonal" aria-label="Club" icon={…} options={clubs} value={clubId} onValueChange={…} />}
      footer={
        <AppSidebarAccount
          name={user.name}
          header={
            <View className="flex-row items-center justify-between gap-sm">
              <Text className="text-sm text-muted">Color mode</Text>
              <ColorModePicker value={preference} onValueChange={setPreference} />
            </View>
          }
        >
          …
        </AppSidebarAccount>
      }
    >
      <SidebarNav aria-label="Main" value={pathname}>
        <SidebarNavSection>
          <SidebarNavItem href="/" label="Dashboard" icon={…} />
        </SidebarNavSection>
        <SidebarNavSection title="Team">…</SidebarNavSection>
      </SidebarNav>
    </AppSidebar>
  }
  header={
    <AppHeader
      brand={…}
      actions={
        <AppHeaderActions>
          <ColorModePicker value={preference} onValueChange={setPreference} />
          <AppHeaderAccount name={user.name}>…</AppHeaderAccount>
        </AppHeaderActions>
      }
    >
      <NavBar stretch aria-label="Main" value={pathname}>…</NavBar>
    </AppHeader>
  }
>
  <View className="p-m gap-m">{screen}</View>
</AppSidebarLayout>
~~~

- An application rather than a site: from \`md\` the frame is fixed to the viewport. The sidebar sits on its \`lowered\` ground and the screen in a panel inset in it — \`bg-screen\`, \`rounded-sm\`, \`shadow-s\` — which is the one scroll container, so the sidebar never moves. The panel pads the scroll on web, so the scrollbar sits in a gutter clear of its rounded corners rather than along its edge
- The panel keeps the \`screen\` ground, so a screen written for \`AppLayout\` renders unchanged inside it: its \`surface\` cards are still raised off it
- Below \`md\` the sidebar is hidden and \`header\` takes over, scrolling with the screen exactly as in an \`AppShell\` — phones keep the layout they have. The two are the **same tree**, switched by \`md:\` classes, so crossing the breakpoint (a tablet rotating, a window resized) keeps the screen mounted. Give the header a \`NavBar\` with the primary destinations: the sidebar's are out of reach there
- The light/dark switch is a \`ColorModePicker\` in two places, one per tree: from \`md\` in the \`header\` of the \`AppSidebarAccount\` menu — the brand row has no room beside its actions — and below it in the \`AppHeader\` actions, as in an \`AppLayout\`. Only one is ever exposed (the other is hidden with its column), and both report the same stored preference, which the app applies with \`useResolvedColorMode\` + \`ScopedTheme\` and persists. A press inside the menu's header does not close it, so the panel re-themes under the pointer. The switch is behind a click there, and keyboard users reach it with Shift+Tab from the first item, the menu taking the focus as it opens
- \`children\` is plain content in the \`main\` landmark — no \`ScreenScrollView\` inside, which would nest a second scroll view
- Safe areas: from \`md\` the frame pads every edge, so both columns clear them; below it the header pads its own top inset and the scrolled page pads the rest. The screen needs none of its own
- The frame fills its parent (\`flex-1\`). A web app whose root has no height of its own passes \`className="h-screen"\``,
      },
    },
  },
} satisfies Meta<typeof AppSidebarLayout>;

interface DemoSidebarProps {
  label: string;
  route: string;
  onRouteChange: (route: string) => void;
  colorMode: ColorModePreference;
  onColorModeChange: (preference: ColorModePreference) => void;
}

function DemoSidebar({
  label,
  route,
  onRouteChange,
  colorMode,
  onColorModeChange,
}: DemoSidebarProps): ReactNode {
  return (
    <AppSidebar
      brand={
        <AppHeaderBrand
          href="/"
          brandLogo={<BrandLogo icon={<BirdRegularIcon />} />}
          title="Alouette"
        />
      }
      actions={
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
      }
      header={
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
            onValueChange={fn()}
          />
        </>
      }
      footer={
        <AppSidebarAccount
          name="Camille Hurel"
          description="camille@example.com"
          header={
            <View className="flex-row items-center justify-between gap-sm">
              <Text className="text-sm text-muted">Color mode</Text>
              <ColorModePicker
                value={colorMode}
                onValueChange={onColorModeChange}
              />
            </View>
          }
        >
          <MenuItem
            label="Profile"
            icon={<UserCircleRegularIcon />}
            href="/me"
          />
          <Separator className="my-xxs" />
          <MenuItem
            label="Log out"
            icon={<SignOutRegularIcon />}
            accent="danger"
            onPress={fn()}
          />
        </AppSidebarAccount>
      }
    >
      <SidebarNav
        aria-label={label}
        value={route}
        onValueChange={onRouteChange}
      >
        <SidebarNavSection>
          <SidebarNavItem
            href="/"
            label="Dashboard"
            icon={<SquaresFourRegularIcon />}
            activeIcon={<SquaresFourDuotoneIcon />}
          />
          <SidebarNavItem
            href="/sightings"
            label="Sightings"
            icon={<BinocularsRegularIcon />}
            activeIcon={<BinocularsDuotoneIcon />}
          />
          <SidebarNavItem
            href="/calendar"
            label="Calendar"
            icon={<CalendarBlankRegularIcon />}
            activeIcon={<CalendarBlankDuotoneIcon />}
          />
        </SidebarNavSection>
        <SidebarNavSection title="Team">
          <SidebarNavItem
            href="/observers"
            label="Observers"
            icon={<UsersRegularIcon />}
            activeIcon={<UsersDuotoneIcon />}
          />
          <SidebarNavItem
            href="/equipment"
            label="Equipment"
            icon={<BackpackRegularIcon />}
            activeIcon={<BackpackDuotoneIcon />}
          />
        </SidebarNavSection>
        <SidebarNavSection title="Data">
          <SidebarNavItem
            href="/reports"
            label="Reports"
            icon={<ChartLineRegularIcon />}
            activeIcon={<ChartLineDuotoneIcon />}
          />
          <SidebarNavItem
            href="/exports"
            label="Exports"
            icon={<DownloadSimpleRegularIcon />}
            activeIcon={<DownloadSimpleDuotoneIcon />}
          />
        </SidebarNavSection>
        <SidebarNavSection title="Field">
          <SidebarNavItem
            href="/sites"
            label="Sites"
            icon={<MapTrifoldRegularIcon />}
            activeIcon={<MapTrifoldDuotoneIcon />}
          />
          <SidebarNavItem
            href="/species"
            label="Species"
            icon={<BirdRegularIcon />}
            activeIcon={<BirdDuotoneIcon />}
          />
        </SidebarNavSection>
        <SidebarNavSection title="Settings">
          <SidebarNavItem
            href="/preferences"
            label="Preferences"
            icon={<GearRegularIcon />}
            activeIcon={<GearDuotoneIcon />}
          />
        </SidebarNavSection>
      </SidebarNav>
    </AppSidebar>
  );
}

interface DemoHeaderProps {
  route: string;
  onRouteChange: (route: string) => void;
  colorMode: ColorModePreference;
  onColorModeChange: (preference: ColorModePreference) => void;
}

/** What a phone keeps: the AppHeader, with the primary destinations. */
function DemoHeader({
  route,
  onRouteChange,
  colorMode,
  onColorModeChange,
}: DemoHeaderProps): ReactNode {
  return (
    <AppHeader
      brand={
        <AppHeaderBrand
          href="/"
          brandLogo={<BrandLogo icon={<BirdRegularIcon />} />}
          title="Alouette"
        />
      }
      actions={
        <AppHeaderActions>
          <ColorModePicker
            value={colorMode}
            onValueChange={onColorModeChange}
          />
          <AppHeaderAccount name="Camille Hurel">
            <MenuItem
              label="Log out"
              icon={<SignOutRegularIcon />}
              accent="danger"
              onPress={fn()}
            />
          </AppHeaderAccount>
        </AppHeaderActions>
      }
    >
      <NavBar
        stretch
        aria-label="Primary"
        value={route}
        onValueChange={onRouteChange}
      >
        <NavBarItem
          href="/"
          label="Dashboard"
          icon={<SquaresFourRegularIcon />}
        />
        <NavBarItem
          href="/sightings"
          label="Sightings"
          icon={<BinocularsRegularIcon />}
        />
        <NavBarItem
          href="/calendar"
          label="Calendar"
          icon={<CalendarBlankRegularIcon />}
        />
      </NavBar>
    </AppHeader>
  );
}

interface DemoStatProps {
  label: string;
  value: string;
}

function DemoStat({ label, value }: DemoStatProps): ReactNode {
  return (
    <View className="surface surface-sm grow basis-[160px] gap-xxs">
      <Text className="text-sm text-muted">{label}</Text>
      <Text className="font-heading-bold text-2xl">{value}</Text>
    </View>
  );
}

interface DemoScreenProps {
  rows: number;
}

function DemoScreen({ rows }: DemoScreenProps): ReactNode {
  return (
    <View className="gap-l p-m md:p-l">
      <Text className="font-heading-bold text-xl">This week</Text>
      <View className="flex-row flex-wrap gap-m">
        <DemoStat label="Sightings" value="42" />
        <DemoStat label="Species" value="18" />
        <DemoStat label="Active observers" value="7" />
      </View>
      <Text className="font-heading-bold text-lg">Latest sightings</Text>
      <View className="gap-xs">
        {Array.from({ length: rows }, (_, index) => (
          <PressableListItem
            key={index}
            href={`/sightings/${index + 1}`}
            onPress={fn()}
          >
            <Text className="text-base">{`Sighting #${index + 1}`}</Text>
          </PressableListItem>
        ))}
      </View>
    </View>
  );
}

interface DemoAppProps {
  label: string;
  rows: number;
  withHeader?: boolean;
}

// One preference for both pickers — the sidebar's account menu from md, the
// header's actions below it — applied by a ScopedTheme as an app would. It
// starts on the mode it is rendered in, so each column of a Story keeps its own.
function DemoApp({ label, rows, withHeader = true }: DemoAppProps): ReactNode {
  const [route, setRoute] = useState("/");
  const [colorMode, setColorMode] =
    useState<ColorModePreference>(useCurrentMode());
  const resolvedColorMode = useResolvedColorMode(colorMode);

  return (
    <ScopedTheme theme={resolvedColorMode}>
      <AppSidebarLayout
        aria-label={label}
        sidebar={
          <DemoSidebar
            label="Main"
            route={route}
            colorMode={colorMode}
            onRouteChange={setRoute}
            onColorModeChange={setColorMode}
          />
        }
        header={
          withHeader ? (
            <DemoHeader
              route={route}
              colorMode={colorMode}
              onRouteChange={setRoute}
              onColorModeChange={setColorMode}
            />
          ) : undefined
        }
      >
        <DemoScreen rows={rows} />
      </AppSidebarLayout>
    </ScopedTheme>
  );
}

interface DemoFrameProps {
  children: ReactNode;
}

/** Stories run in a page that has no height of its own — the layout needs one. */
function DemoFrame({ children }: DemoFrameProps): ReactNode {
  return <View className="h-[640px]">{children}</View>;
}

export const PreviewAppSidebarLayoutStory: ThisStory = {
  name: "AppSidebarLayout Preview",
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <View className="h-screen">
      <DemoApp label="App" rows={12} />
    </View>
  ),
};

export const VariantsAppSidebarLayoutStory: ThisStory = {
  name: "AppSidebarLayout Variants",
  render: () => (
    <Story>
      <Story.Section title="Sidebar and header">
        <Text className="text-sm text-muted">
          From md the sidebar and the panel; below it the header
        </Text>
        <DemoFrame>
          <DemoApp label="Full layout" rows={12} />
        </DemoFrame>
      </Story.Section>

      <Story.Section title="Screen shorter than the panel">
        <DemoFrame>
          <DemoApp label="Short screen" rows={0} />
        </DemoFrame>
      </Story.Section>

      <Story.Section title="Without header">
        <Text className="text-sm text-muted">
          Below md the screen is all there is
        </Text>
        <DemoFrame>
          <DemoApp label="Headerless" rows={4} withHeader={false} />
        </DemoFrame>
      </Story.Section>
    </Story>
  ),
};

export const TestsAppSidebarLayoutStory: ThisStory = {
  name: "AppSidebarLayout Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Full layout">
        <DemoFrame>
          <DemoApp label="Tested layout" rows={24} />
        </DemoFrame>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const layout = canvas.getByLabelText("Tested layout");
    const layoutCanvas = within(layout);
    const layoutBox = layout.getBoundingClientRect();

    await expect(layoutCanvas.getAllByRole("main")).toHaveLength(1);
    const main = layoutCanvas.getByRole("main");
    const scroll = main.parentElement?.parentElement;
    if (!scroll) throw new Error("expected the main inside the scroll");

    // The panel is the one scroll container, whatever the width.
    await expect(scroll.scrollHeight).toBeGreaterThan(scroll.clientHeight);

    if (window.innerWidth >= 768) {
      // The sidebar sits left of the panel and the header is gone.
      const sidebarNav = layoutCanvas.getByRole("navigation", { name: "Main" });
      await expect(layoutCanvas.queryByRole("banner")).toBe(null);
      await expect(
        sidebarNav.getBoundingClientRect().right,
      ).toBeLessThanOrEqual(main.getBoundingClientRect().left);

      // The panel is inset in the frame and rounded, and the scroll
      // is inset in the panel, so its scrollbar keeps clear of the corners.
      const panel = scroll.parentElement;
      if (!panel) throw new Error("expected the scroll inside the panel");
      const panelBox = panel.getBoundingClientRect();
      const scrollBox = scroll.getBoundingClientRect();
      await expect(panelBox.top).toBeGreaterThan(layoutBox.top);
      await expect(panelBox.right).toBeLessThan(layoutBox.right);
      await expect(getComputedStyle(panel).borderTopLeftRadius).not.toBe("0px");
      await expect(scrollBox.top).toBeGreaterThan(panelBox.top);
      await expect(scrollBox.left).toBeGreaterThan(panelBox.left);
      await expect(scrollBox.right).toBeLessThan(panelBox.right);
      await expect(scrollBox.bottom).toBeLessThan(panelBox.bottom);

      // Scrolling the screen leaves the sidebar where it is.
      const sidebarTop = sidebarNav.getBoundingClientRect().top;
      scroll.scrollTop = 300;
      await expect(sidebarNav.getBoundingClientRect().top).toBe(sidebarTop);
      scroll.scrollTop = 0;

      // A row press is the router's business: it updates the current page.
      const observers = within(sidebarNav).getByRole("link", {
        name: "Observers",
      });
      await userEvent.click(observers);
      await expect(observers).toHaveAttribute("aria-current", "page");

      // The color mode is in the account menu, and the header's picker is
      // hidden with the header. Switching it re-themes the whole layout and
      // leaves the menu open.
      await userEvent.click(
        layoutCanvas.getByRole("button", { name: "Camille Hurel" }),
      );
      const pickers = within(document.body).getAllByRole("radiogroup", {
        name: "Color mode",
      });
      await expect(pickers).toHaveLength(1);
      const [picker] = pickers;
      if (!picker) throw new Error("expected the color mode picker");
      // The menu takes the focus as it opens; the picker is the step before.
      await waitFor(() =>
        expect(document.activeElement).toHaveAttribute("role", "menuitem"),
      );
      await userEvent.tab({ shift: true });
      await expect(picker.contains(document.activeElement)).toBe(true);
      const dark = within(picker).getByRole("radio", { name: "Dark" });
      const lightFrameBackground = getComputedStyle(layout).backgroundColor;
      await userEvent.click(dark);
      await waitFor(() => expect(dark).toHaveAttribute("aria-checked", "true"));
      await expect(within(document.body).getByRole("menu")).toBeTruthy();
      await expect(getComputedStyle(layout).backgroundColor).not.toBe(
        lightFrameBackground,
      );
      await userEvent.keyboard("{Escape}");
    } else {
      // A phone keeps the header, and the sidebar is out of the tree.
      const header = layoutCanvas.getByRole("banner");
      await expect(
        layoutCanvas.queryByRole("navigation", { name: "Main" }),
      ).toBe(null);
      await expect(header.getBoundingClientRect().top).toBeCloseTo(
        layoutBox.top,
        0,
      );
      await expect(main.getBoundingClientRect().width).toBeCloseTo(
        layoutBox.width,
        0,
      );

      // The header scrolls with the screen, as in an AppShell.
      scroll.scrollTop = scroll.scrollHeight;
      await expect(header.getBoundingClientRect().bottom).toBeLessThan(
        layoutBox.top,
      );
      scroll.scrollTop = 0;

      const sightings = within(
        layoutCanvas.getByRole("navigation", { name: "Primary" }),
      ).getByRole("link", { name: "Sightings" });
      await userEvent.click(sightings);
      await expect(sightings).toHaveAttribute("aria-current", "page");

      // The color mode is in the header's actions, as in an AppLayout.
      const dark = within(
        within(header).getByRole("radiogroup", { name: "Color mode" }),
      ).getByRole("radio", { name: "Dark" });
      const lightHeaderBackground = getComputedStyle(header).backgroundColor;
      await userEvent.click(dark);
      await waitFor(() => expect(dark).toHaveAttribute("aria-checked", "true"));
      await expect(getComputedStyle(header).backgroundColor).not.toBe(
        lightHeaderBackground,
      );
    }

    // Nothing overflows sideways.
    await expect(layout.scrollWidth).toBeLessThanOrEqual(
      layout.clientWidth + 1,
    );
  },
};
