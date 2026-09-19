import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BellRegularIcon } from "alouette-icons/phosphor-icons/BellRegularIcon";
import { BirdRegularIcon } from "alouette-icons/phosphor-icons/BirdRegularIcon";
import { BookmarkSimpleRegularIcon } from "alouette-icons/phosphor-icons/BookmarkSimpleRegularIcon";
import { ChartBarRegularIcon } from "alouette-icons/phosphor-icons/ChartBarRegularIcon";
import { GearRegularIcon } from "alouette-icons/phosphor-icons/GearRegularIcon";
import { HouseRegularIcon } from "alouette-icons/phosphor-icons/HouseRegularIcon";
import { SignInRegularIcon } from "alouette-icons/phosphor-icons/SignInRegularIcon";
import { SignOutRegularIcon } from "alouette-icons/phosphor-icons/SignOutRegularIcon";
import { UserCircleRegularIcon } from "alouette-icons/phosphor-icons/UserCircleRegularIcon";
import { type ReactNode, useState } from "react";
import {
  type ColorModePreference,
  useResolvedColorMode,
} from "../../core/useColorMode";
import { IconButton } from "../actions/IconButton";
import { MenuItem } from "../actions/MenuItem";
import { QuestionAlertDialog } from "../containers/AlertDialog";
import { Box } from "../containers/Box";
import { ScopedTheme } from "../containers/ScopedTheme";
import { ColorModePicker } from "../inputs/ColorModePicker";
import { NavBar } from "../navigation/NavBar";
import { NavBarItem } from "../navigation/NavBarItem";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Separator } from "../stacks/Separator";
import { Story } from "../story-components/Story";
import { AppHeader, type AppHeaderProps } from "./AppHeader";
import { AppHeaderAccount } from "./AppHeaderAccount";
import { AppHeaderActions } from "./AppHeaderActions";
import { AppHeaderBrand } from "./AppHeaderBrand";
import { AppHeaderNav } from "./AppHeaderNav";
import { AppHeaderNavItem } from "./AppHeaderNavItem";
import { AppHeaderSignIn } from "./AppHeaderSignIn";
import { BrandLogo } from "./BrandLogo";

type ThisStory = StoryObj<typeof AppHeader>;

export default {
  title: "alouette/Layout/AppHeader",
  component: AppHeader,
  parameters: {
    componentSubtitle:
      "Application banner: brand, navigation and session actions on one boxed row that stacks below md.",
    docs: {
      description: {
        component: `### Composition
~~~tsx
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
      <IconButton aria-label="Notifications" icon={<BellRegularIcon />} size="sm" variant="soft" />
      <AppHeaderAccount name="Camille Hurel" header={<Text className="text-sm text-muted">camille@example.com</Text>}>
        <MenuItem label="Profile" icon={<UserCircleRegularIcon />} href="/me" />
        <Separator className="my-xxs" />
        <MenuItem label="Log out" icon={<SignOutRegularIcon />} accent="danger" onPress={confirmLogOut} />
      </AppHeaderAccount>
    </AppHeaderActions>
  }
>
  <AppHeaderNav aria-label="Main" value={pathname}>
    <AppHeaderNavItem href="/home" label="Home" />
  </AppHeaderNav>
</AppHeader>
~~~

- From \`md\` on web the three slots share one line, in reading order: the navigation sits next to the brand and the end slot takes the free space, so the actions stay at the far edge. A grown slot is floored at its content width (\`min-w-fit\`, undoing react-native-web's \`min-width: 0\` reset), so a crowded header wraps instead of letting a slot shrink under its child
- \`navAlign\` follows the navigation's material, it is not a mood: a text \`AppHeaderNav\` continues the brand and keeps the default \`start\`, while a segmented \`NavBar\` reads as a control of its own and takes \`navAlign="center"\`. Centering grows the start slot too, so the free space is split between the two outer slots; the end slot is rendered even when \`actions\` is omitted, so the centering survives a header without actions
- Below \`md\` — and on native at every width, since React Native has no \`order\` to put the navigation back on the line — the brand and the actions share the first line and the navigation spans the second; give a \`NavBar\` \`stretch\` so it fills that line
- \`children\` is the navigation slot — omit it for a header without navigation. \`AppHeaderNav\` is the bar's own material (text destinations, the current one underlined, no track); \`NavBar\` is the segmented alternative, for a navigation that is the screen's main control
- \`AppHeaderBrand\` is a pressable when given \`href\`/\`onPress\` (expo Router's \`<Link asChild>\` injects both), a display-only row otherwise; its leading padding is pulled back with a negative margin, so the hover fill bleeds into the header's gutter while the mark stays flush with the content edge in both cases
- Every pressable in the bar uses \`variant="soft"\`: nothing at rest, a background fill on hover/focus/press (as on a listbox row), rather than a border tint too thin to read in a header. That includes \`AppHeaderNavItem\`, whose accent underline is the current-page state on top of the fill, never the affordance
- A signed-in session is one \`AppHeaderAccount\` — an avatar trigger opening a \`Menu\` — not a row of buttons: logging out is the rarest thing the bar offers and the only destructive one, so it belongs behind the avatar with a \`danger\` accent, and confirming it is the app's call (the tests story wires it to a \`QuestionAlertDialog\`)
- A signed-out session is the mirror image: one action, so it stays in the bar as an \`AppHeaderSignIn\` — never an \`AppHeaderAccount\` named "Guest" wrapping a single "Log in" item, which puts a menu between the visitor and the only thing they came to press. It is a \`Button\` with the bar's sizing: pass it straight as \`actions\`, or beside a secondary \`accent="neutral"\` "Sign up" inside an \`AppHeaderActions\`. \`href\` is the in-app destination — a real \`<a>\` on web, ignored on native, where expo Router's \`<Link asChild>\` supplies the \`onPress\` (a destination outside the app on native takes an \`ExternalLinkButton\` in the slot instead)
- A light/dark switch belongs in the actions slot as a \`ColorModePicker\` — a pill of icon-only chips reading as one control, rather than two loose \`IconButton\`s. \`variant="system-lock"\` is the two-chip one used here: the chip the OS currently supplies keeps its sun or moon and adds the system badge, and pressing it toggles the lock. The app owns the preference — it applies it with \`useResolvedColorMode\` + \`ScopedTheme\` and persists it
- \`variant="bar"\` (default) is the application bar: its own background plus \`shadow-bar\`, a downward-only shadow cast on the page below. \`variant="transparent"\` is a header integrated into the page it heads (a landing hero) — a brand and the way in, no navigation: the destinations are behind the sign-in, not on the hero
- The frame takes the device's top inset unless an ancestor \`SafeAreaScope\` consumed it; wrap the screen below in \`<SafeAreaScope consumedEdges={["top"]}>\``,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["xs", "sm", "md"] },
    variant: { control: "inline-radio", options: ["bar", "transparent"] },
    contentWidth: { control: "inline-radio", options: ["boxed", "full"] },
    navAlign: { control: "inline-radio", options: ["start", "center"] },
    withSafeAreaTop: { control: "boolean" },
  },
} satisfies Meta<typeof AppHeader>;

interface DemoNavProps {
  label: string;
}

function DemoNav({ label }: DemoNavProps): ReactNode {
  return (
    <NavBar stretch aria-label={label} defaultValue="/home">
      <NavBarItem href="/home" label="Home" icon={<HouseRegularIcon />} />
      <NavBarItem
        href="/reports"
        label="Reports"
        icon={<ChartBarRegularIcon />}
      />
      <NavBarItem
        href="/saved"
        label="Saved"
        icon={<BookmarkSimpleRegularIcon />}
      />
      <NavBarItem
        href="/profile"
        label="Profile"
        icon={<UserCircleRegularIcon />}
      />
    </NavBar>
  );
}

function DemoTextNav({ label }: DemoNavProps): ReactNode {
  return (
    <AppHeaderNav aria-label={label} defaultValue="/home">
      <AppHeaderNavItem href="/home" label="Home" icon={<HouseRegularIcon />} />
      <AppHeaderNavItem
        href="/reports"
        label="Reports"
        icon={<ChartBarRegularIcon />}
      />
      <AppHeaderNavItem
        href="/saved"
        label="Saved"
        icon={<BookmarkSimpleRegularIcon />}
      />
      <AppHeaderNavItem
        href="/profile"
        label="Profile"
        icon={<UserCircleRegularIcon />}
      />
    </AppHeaderNav>
  );
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

interface DemoHeaderProps extends Omit<AppHeaderProps, "children"> {
  navLabel: string;
}

// A segmented NavBar is a control of its own, so a header carrying one centers
// it — `navAlign` comes after the spread because the pairing is the rule here,
// not a caller's choice.
function SegmentedNavHeader({
  navLabel,
  brand = <DemoBrand />,
  ...props
}: DemoHeaderProps): ReactNode {
  return (
    <AppHeader brand={brand} contentWidth="full" {...props} navAlign="center">
      <DemoNav label={navLabel} />
    </AppHeader>
  );
}

// Text destinations continue the brand, which is what the default alignment is
// for.
function TextNavHeader({
  navLabel,
  brand = <DemoBrand />,
  ...props
}: DemoHeaderProps): ReactNode {
  return (
    <AppHeader brand={brand} contentWidth="full" {...props}>
      <DemoTextNav label={navLabel} />
    </AppHeader>
  );
}

// The mode picker is bar furniture, like the notifications button and the
// account menu: it belongs in the actions slot of a signed-out header too.
function LoggedOutActions(): ReactNode {
  return (
    <AppHeaderActions>
      <ColorModePicker />
      <AppHeaderSignIn accent="neutral" label="Sign up" onPress={fn()} />
      <AppHeaderSignIn label="Log in" onPress={fn()} />
    </AppHeaderActions>
  );
}

interface LoggedInActionsProps {
  onLogOut?: () => void;
}

function LoggedInActions({ onLogOut }: LoggedInActionsProps): ReactNode {
  return (
    <AppHeaderActions>
      <ColorModePicker />
      <IconButton
        aria-label="Notifications"
        icon={<BellRegularIcon />}
        size="sm"
        variant="soft"
        onPress={fn()}
      />
      <AppHeaderAccount
        name="Camille Hurel"
        header={<Text className="text-sm text-muted">camille@example.com</Text>}
      >
        <MenuItem label="Profile" icon={<UserCircleRegularIcon />} href="/me" />
        <MenuItem
          label="Settings"
          icon={<GearRegularIcon />}
          href="/settings"
        />
        <Separator className="my-xxs" />
        <MenuItem
          label="Log out"
          icon={<SignOutRegularIcon />}
          accent="danger"
          onPress={onLogOut ?? fn()}
        />
      </AppHeaderAccount>
    </AppHeaderActions>
  );
}

// The picker reports the stored preference, useResolvedColorMode turns it into
// a mode and a ScopedTheme applies it, so choosing an option re-themes the
// header and the page under it — what an app wires to its own stored value. The
// `system-lock` variant is the two-chip one: it starts on `system`, where the chip the
// system supplies keeps its sun or moon and carries the system badge.
function ThemedAppHeader(): ReactNode {
  const [preference, setPreference] = useState<ColorModePreference>("system");
  const mode = useResolvedColorMode(preference);

  return (
    <ScopedTheme theme={mode}>
      <View className="bg-screen">
        <SegmentedNavHeader
          aria-label="Themed header"
          navLabel="Themed navigation"
          actions={
            <AppHeaderActions>
              <ColorModePicker
                variant="system-lock"
                aria-label="Color mode"
                value={preference}
                onValueChange={setPreference}
              />
              <IconButton
                aria-label="Notifications"
                icon={<BellRegularIcon />}
                size="sm"
                variant="soft"
                onPress={fn()}
              />
            </AppHeaderActions>
          }
        />
        <View className="gap-xs px-l py-xl">
          <Text className="font-heading-bold text-xl">Page content</Text>
          <Text className="text-muted text-base">{`Rendered in ${mode} mode.`}</Text>
        </View>
      </View>
    </ScopedTheme>
  );
}

// The hero's header is the brand and the way in: the app's destinations live
// behind the sign-in, not on the landing page.
function LandingHero(): ReactNode {
  return (
    <Box accent="brand" className="bg-highlight-accent">
      <AppHeader
        brand={<DemoBrand />}
        actions={<LoggedOutActions />}
        contentWidth="full"
        variant="transparent"
      />
      <View className="items-center gap-xs px-l py-xxl">
        <Text className="font-heading-extrabold text-3xl">Sing it once</Text>
        <Text className="text-muted text-base">
          The header has no ground of its own — the hero shows through.
        </Text>
      </View>
    </Box>
  );
}

export const PreviewAppHeaderStory: ThisStory = {
  name: "AppHeader Preview",
  render: (args) => (
    <AppHeader brand={<DemoBrand />} actions={<LoggedInActions />} {...args}>
      <DemoTextNav label="Preview navigation" />
    </AppHeader>
  ),
};

export const VariantsAppHeaderStory: ThisStory = {
  name: "AppHeader Variants",
  render: () => (
    <Story>
      <Story.Section title="Composition">
        <Text className="text-sm text-muted">Brand + navigation + session</Text>
        <TextNavHeader
          navLabel="Full composition"
          actions={<LoggedInActions />}
        />
        <Text className="text-sm text-muted">Without actions</Text>
        <TextNavHeader navLabel="No actions" />
        <Text className="text-sm text-muted">Without navigation</Text>
        <AppHeader
          brand={<DemoBrand />}
          actions={<LoggedInActions />}
          contentWidth="full"
        />
        <Text className="text-sm text-muted">Brand only</Text>
        <AppHeader brand={<DemoBrand />} contentWidth="full" />
        <Text className="text-sm text-muted">Navigation only</Text>
        <AppHeader contentWidth="full">
          <DemoTextNav label="Navigation only" />
        </AppHeader>
      </Story.Section>

      <Story.Section title="Navigation">
        <Text className="text-sm text-muted">
          AppHeaderNav — text destinations on the bar itself, the current one
          underlined, packed against the brand (the default navAlign="start")
        </Text>
        <TextNavHeader
          navLabel="Text navigation"
          actions={<LoggedInActions />}
        />
        <Text className="text-sm text-muted">
          NavBar — the segmented bar, a control of its own, so it takes
          navAlign="center" and the free space is split
        </Text>
        <SegmentedNavHeader
          navLabel="Segmented navigation"
          actions={<LoggedInActions />}
        />
        <Text className="text-sm text-muted">
          Centered without actions — the empty end slot keeps the navigation in
          the middle
        </Text>
        <SegmentedNavHeader navLabel="Centered, no actions" />
      </Story.Section>

      <Story.Section title="Session">
        <Text className="text-sm text-muted">Logged out</Text>
        <TextNavHeader navLabel="Logged out" actions={<LoggedOutActions />} />
        <Text className="text-sm text-muted">
          Logged out, one action — passed straight as actions, linking to the
          sign-in screen
        </Text>
        <TextNavHeader
          navLabel="Logged out, single action"
          actions={
            <AppHeaderSignIn
              label="Log in"
              icon={<SignInRegularIcon />}
              href="/login"
            />
          }
        />
        <Text className="text-sm text-muted">Logged in</Text>
        <TextNavHeader navLabel="Logged in" actions={<LoggedInActions />} />
      </Story.Section>

      <Story.Section title="Variant">
        <Text className="text-sm text-muted">
          bar — the application bar, casting a shadow on the page below
        </Text>
        <AppHeader
          brand={<DemoBrand />}
          actions={<LoggedOutActions />}
          contentWidth="full"
        />
        <Text className="text-sm text-muted">
          transparent — integrated in the page it heads
        </Text>
        <LandingHero />
      </Story.Section>

      <Story.Section title="Size">
        <SegmentedNavHeader
          navLabel="Extra small"
          actions={<LoggedInActions />}
          size="xs"
        />
        <SegmentedNavHeader
          navLabel="Small"
          actions={<LoggedInActions />}
          size="sm"
        />
        <SegmentedNavHeader
          navLabel="Medium"
          actions={<LoggedInActions />}
          size="md"
        />
      </Story.Section>

      <Story.Section title="Content width">
        <SegmentedNavHeader
          navLabel="Boxed"
          actions={<LoggedInActions />}
          contentWidth="boxed"
        />
        <SegmentedNavHeader
          navLabel="Full width"
          actions={<LoggedInActions />}
          contentWidth="full"
        />
      </Story.Section>

      <Story.Section title="Brand">
        <Text className="text-sm text-muted">Link (href)</Text>
        <AppHeader brand={<DemoBrand />} contentWidth="full" />
        <Text className="text-sm text-muted">Button (onPress only)</Text>
        <AppHeader
          brand={
            <AppHeaderBrand
              brandLogo={<BrandLogo icon={<BirdRegularIcon />} />}
              title="Alouette"
              onPress={fn()}
            />
          }
          contentWidth="full"
        />
        <Text className="text-sm text-muted">Display-only</Text>
        <AppHeader
          brand={
            <AppHeaderBrand
              brandLogo={<BrandLogo icon={<BirdRegularIcon />} />}
              title="Alouette"
            />
          }
          contentWidth="full"
        />
        <Text className="text-sm text-muted">Without logo</Text>
        <AppHeader
          brand={<AppHeaderBrand href="/" title="Alouette" />}
          contentWidth="full"
        />
        <Text className="text-sm text-muted">With subtitle</Text>
        <AppHeader
          brand={
            <AppHeaderBrand
              href="/"
              brandLogo={<BrandLogo icon={<BirdRegularIcon />} />}
              title="Alouette"
              subtitle="Design system"
            />
          }
          contentWidth="full"
        />
        <Text className="text-sm text-muted">Accented logo</Text>
        <AppHeader
          brand={
            <AppHeaderBrand
              href="/"
              brandLogo={<BrandLogo accent="info" icon={<BirdRegularIcon />} />}
              title="Alouette"
            />
          }
          contentWidth="full"
        />
      </Story.Section>

      <Story.Section title="Safe area">
        <Text className="text-sm text-muted">
          withSafeAreaTop — native-only, insets are zeros on web
        </Text>
        <AppHeader brand={<DemoBrand />} contentWidth="full" />
        <AppHeader
          brand={<DemoBrand />}
          contentWidth="full"
          withSafeAreaTop={false}
        />
      </Story.Section>
    </Story>
  ),
};

// Confirming a log out is the app's call, not the library's — the menu item
// runs whatever `onPress` it is given, and here that opens a danger dialog.
function SessionHeader(): ReactNode {
  const [loggedIn, setLoggedIn] = useState(true);
  const [confirmingLogOut, setConfirmingLogOut] = useState(false);

  return (
    <>
      <SegmentedNavHeader
        aria-label="Full header"
        navLabel="Header navigation"
        actions={
          loggedIn ? (
            <LoggedInActions
              onLogOut={() => {
                setConfirmingLogOut(true);
              }}
            />
          ) : (
            <AppHeaderSignIn
              label="Log in"
              onPress={() => {
                setLoggedIn(true);
              }}
            />
          )
        }
      />
      <QuestionAlertDialog
        visible={confirmingLogOut}
        title="Log out?"
        confirmText="Log out"
        onCancel={() => {
          setConfirmingLogOut(false);
        }}
        onConfirm={() => {
          setConfirmingLogOut(false);
          setLoggedIn(false);
        }}
      >
        You will have to sign in again to come back.
      </QuestionAlertDialog>
    </>
  );
}

export const TestsAppHeaderStory: ThisStory = {
  name: "AppHeader Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Full header">
        <SessionHeader />
      </Story.Section>
      <Story.Section title="Without actions">
        <SegmentedNavHeader
          aria-label="Header without actions"
          navLabel="Centered navigation"
        />
      </Story.Section>
      <Story.Section title="Navigation alignment">
        <TextNavHeader
          aria-label="Start aligned header"
          navLabel="Start aligned navigation"
          actions={<LoggedInActions />}
        />
      </Story.Section>
      <Story.Section title="Brand alignment">
        <AppHeader
          aria-label="Interactive brand header"
          brand={<DemoBrand />}
          contentWidth="full"
        />
        <AppHeader
          aria-label="Display-only brand header"
          brand={
            <AppHeaderBrand
              brandLogo={<BrandLogo icon={<BirdRegularIcon />} />}
              title="Alouette"
            />
          }
          contentWidth="full"
        />
      </Story.Section>
      <Story.Section title="Signed out">
        <AppHeader
          aria-label="Signed out header"
          brand={<DemoBrand />}
          actions={<AppHeaderSignIn label="Log in" href="/login" />}
          contentWidth="full"
        />
      </Story.Section>
      <Story.Section title="Crowded">
        <View className="w-[1200px]">
          <SegmentedNavHeader
            aria-label="Crowded header"
            navLabel="Crowded navigation"
            brand={
              <AppHeaderBrand
                href="/"
                brandLogo={<BrandLogo icon={<BirdRegularIcon />} />}
                title="Alouette Design System"
              />
            }
            actions={<LoggedInActions />}
          />
        </View>
      </Story.Section>
      <Story.Section title="Color mode">
        <ThemedAppHeader />
      </Story.Section>
      <Story.Section title="Variant">
        <AppHeader
          aria-label="Bar header"
          brand={<DemoBrand />}
          contentWidth="full"
        />
        <AppHeader
          aria-label="Transparent header"
          brand={<DemoBrand />}
          contentWidth="full"
          variant="transparent"
        />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const header = canvas.getByRole("banner", { name: "Full header" });
    const headerCanvas = within(header);

    const brand = headerCanvas.getByRole("link", { name: /Alouette/ });
    await expect(brand.tagName).toBe("A");
    await expect(brand).toHaveAttribute("href", "/");

    // The bar's pressables carry no ground until they are hovered, and then
    // fill — the soft variant. The fill itself is a CSS `:hover`, which no
    // synthetic pointer event triggers, so the rule is asserted as the class.
    await expect(getComputedStyle(brand).backgroundColor).toBe(
      "rgba(0, 0, 0, 0)",
    );
    await expect(brand).toHaveClass("hover:bg-interactive-soft-hover");

    const nav = headerCanvas.getByRole("navigation", {
      name: "Header navigation",
    });
    await expect(
      within(nav).getByRole("link", { name: "Home" }),
    ).toHaveAttribute("aria-current", "page");

    // The account menu and the confirmation dialog are portaled out of the
    // header, so both are queried from `screen`.
    await userEvent.click(
      headerCanvas.getByRole("button", { name: "Camille Hurel" }),
    );
    await userEvent.click(
      within(await screen.findByRole("menu")).getByRole("menuitem", {
        name: "Log out",
      }),
    );
    await userEvent.click(
      within(await screen.findByRole("alertdialog")).getByRole("button", {
        name: "Log out",
      }),
    );

    await waitFor(() =>
      expect(headerCanvas.getByRole("button", { name: "Log in" })).toBeTruthy(),
    );

    const brandBox = brand.getBoundingClientRect();
    const navBox = nav.getBoundingClientRect();
    const actionsBox = headerCanvas
      .getByRole("button", { name: "Log in" })
      .getBoundingClientRect();

    if (window.innerWidth >= 768) {
      // One line, in reading order — the order utilities put the navigation
      // back between the two slots the DOM has next to each other.
      await expect(brandBox.right).toBeLessThanOrEqual(navBox.left);
      await expect(navBox.right).toBeLessThanOrEqual(actionsBox.left);
    } else {
      // Stacked: brand and actions share the first line, the navigation takes
      // the second one and stretches across it.
      await expect(actionsBox.left).toBeGreaterThanOrEqual(brandBox.right);
      await expect(navBox.top).toBeGreaterThanOrEqual(brandBox.bottom);
      await expect(navBox.top).toBeGreaterThanOrEqual(actionsBox.bottom);
      await expect(navBox.width).toBeGreaterThan(
        header.getBoundingClientRect().width * 0.8,
      );
    }

    const bare = canvas.getByRole("banner", { name: "Header without actions" });
    await expect(within(bare).queryByRole("button", { name: "Log out" })).toBe(
      null,
    );

    const bareNav = within(bare).getByRole("navigation", {
      name: "Centered navigation",
    });
    const bareBrand = within(bare).getByRole("link", { name: /Alouette/ });
    const headerBox = bare.getBoundingClientRect();
    const bareNavBox = bareNav.getBoundingClientRect();

    if (window.innerWidth >= 768) {
      // `navAlign="center"`: the empty end slot is what balances the brand slot,
      // so the navigation stays centered in a header carrying no actions.
      const offset =
        bareNavBox.left +
        bareNavBox.width / 2 -
        (headerBox.left + headerBox.width / 2);
      await expect(Math.abs(offset)).toBeLessThan(2);
    } else {
      // Below md the row stacks: navigation sits under the brand.
      await expect(bareNavBox.top).toBeGreaterThanOrEqual(
        bareBrand.getBoundingClientRect().bottom,
      );
    }

    // The default alignment is the opposite: only the end slot grows, so the
    // navigation is packed against the brand and all the free space is on the
    // actions side. It is the text navigation's alignment, so the header here
    // carries an AppHeaderNav.
    const startAligned = canvas.getByRole("banner", {
      name: "Start aligned header",
    });
    const startAlignedCanvas = within(startAligned);
    const startNav = startAlignedCanvas.getByRole("navigation", {
      name: "Start aligned navigation",
    });
    const startBrand = startAlignedCanvas.getByRole("link", {
      name: /Alouette/,
    });

    if (window.innerWidth >= 768) {
      const startHeaderBox = startAligned.getBoundingClientRect();
      const startNavBox = startNav.getBoundingClientRect();
      const startBrandBox = startBrand.getBoundingClientRect();

      await expect(startBrandBox.right).toBeLessThanOrEqual(startNavBox.left);
      // The gap to the brand is the row's own gap, not a share of the free
      // space — which is what a centered navigation would take instead.
      await expect(startNavBox.left - startBrandBox.right).toBeLessThan(32);
      await expect(startNavBox.left - startHeaderBox.left).toBeLessThan(
        startHeaderBox.right - startNavBox.right,
      );
      await expect(
        startAlignedCanvas
          .getByRole("button", { name: "Camille Hurel" })
          .getBoundingClientRect().left,
      ).toBeGreaterThanOrEqual(startNavBox.right);
    }

    // A slot grown from a zero basis has no content floor — react-native-web's
    // reset sets `min-width: 0` — so on a crowded single line it is handed half
    // the free space whatever its child measures, and the child (which never
    // shrinks in RNW) spills over the navigation. The `min-w-fit` floor is what
    // keeps each slot at least as wide as what it holds.
    const crowded = canvas.getByRole("banner", { name: "Crowded header" });
    const crowdedCanvas = within(crowded);
    const crowdedBrand = crowdedCanvas.getByRole("link", { name: /Alouette/ });
    const crowdedNav = crowdedCanvas.getByRole("navigation", {
      name: "Crowded navigation",
    });
    const crowdedActions = crowdedCanvas.getByRole("button", {
      name: "Camille Hurel",
    });

    if (window.innerWidth >= 768) {
      const crowdedNavBox = crowdedNav.getBoundingClientRect();

      // The title is what spills first: the slot clips the brand's own box, but
      // the text keeps its intrinsic width and runs under the navigation.
      await expect(
        crowdedCanvas
          .getByText("Alouette Design System")
          .getBoundingClientRect().right,
      ).toBeLessThanOrEqual(crowdedNavBox.left);
      await expect(
        crowdedBrand.getBoundingClientRect().right,
      ).toBeLessThanOrEqual(crowdedNavBox.left);
      await expect(crowdedNavBox.right).toBeLessThanOrEqual(
        crowdedActions.getBoundingClientRect().left,
      );
    }

    // The brand button's own padding must not move the mark: the negative
    // margin cancels it, so a linked brand starts exactly where a display-only
    // one does. Both brands carry the same logo and gap, so the title's x is a
    // proxy for the mark's.
    const interactiveTitle = within(
      canvas.getByRole("banner", { name: "Interactive brand header" }),
    ).getByText("Alouette");
    const displayTitle = within(
      canvas.getByRole("banner", { name: "Display-only brand header" }),
    ).getByText("Alouette");

    await expect(
      Math.abs(
        interactiveTitle.getBoundingClientRect().left -
          displayTitle.getBoundingClientRect().left,
      ),
    ).toBeLessThan(1);

    // The bar owns a background and casts a shadow on the page; the transparent
    // variant has neither, so the page it heads shows through.
    const barStyle = getComputedStyle(
      canvas.getByRole("banner", { name: "Bar header" }),
    );
    await expect(barStyle.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
    await expect(barStyle.boxShadow).not.toBe("none");

    const transparentStyle = getComputedStyle(
      canvas.getByRole("banner", { name: "Transparent header" }),
    );
    await expect(transparentStyle.backgroundColor).toBe("rgba(0, 0, 0, 0)");
    await expect(transparentStyle.boxShadow).toBe("none");

    // The ColorModePicker is an icon group in the actions slot: its labels name
    // the options without being rendered, and choosing one re-themes the header
    // it sits in. It starts on `system`, so the expected names come from the
    // runner's own scheme rather than from an assumed one.
    const systemMode = globalThis.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const otherMode = systemMode === "dark" ? "light" : "dark";
    const systemLabel = systemMode === "dark" ? "Dark" : "Light";
    const otherLabel = systemMode === "dark" ? "Light" : "Dark";

    const themedHeader = canvas.getByRole("banner", { name: "Themed header" });
    const themedCanvas = within(themedHeader);
    const modeSwitch = themedCanvas.getByRole("radiogroup", {
      name: "Color mode",
    });
    const followingMode = within(modeSwitch).getByRole("radio", {
      name: `${systemLabel} (system)`,
    });
    const lockedMode = within(modeSwitch).getByRole("radio", {
      name: otherLabel,
    });

    await expect(within(modeSwitch).getAllByRole("radio")).toHaveLength(2);
    await expect(within(modeSwitch).queryByText(systemLabel)).toBeNull();
    await expect(followingMode).toHaveAttribute("aria-checked", "true");

    const systemBackground = getComputedStyle(themedHeader).backgroundColor;

    lockedMode.click();

    await waitFor(() =>
      expect(lockedMode).toHaveAttribute("aria-checked", "true"),
    );
    // The page copy is the header's sibling under the same ScopedTheme, so it is
    // outside `themedCanvas`.
    await expect(
      canvas.getByText(`Rendered in ${otherMode} mode.`),
    ).toBeTruthy();
    await expect(getComputedStyle(themedHeader).backgroundColor).not.toBe(
      systemBackground,
    );

    // Signed out, the action is in the bar itself: reachable without opening
    // anything, and a real anchor when given an `href`.
    const signedOut = canvas.getByRole("banner", { name: "Signed out header" });
    const signIn = within(signedOut).getByRole("link", { name: "Log in" });

    await expect(signIn.tagName).toBe("A");
    await expect(signIn).toHaveAttribute("href", "/login");
    await expect(within(signedOut).queryByRole("menu")).toBeNull();
  },
};
