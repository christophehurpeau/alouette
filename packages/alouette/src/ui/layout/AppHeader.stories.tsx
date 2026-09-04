import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BellRegularIcon } from "alouette-icons/phosphor-icons/BellRegularIcon";
import { BirdRegularIcon } from "alouette-icons/phosphor-icons/BirdRegularIcon";
import { BookmarkSimpleRegularIcon } from "alouette-icons/phosphor-icons/BookmarkSimpleRegularIcon";
import { ChartBarRegularIcon } from "alouette-icons/phosphor-icons/ChartBarRegularIcon";
import { GearRegularIcon } from "alouette-icons/phosphor-icons/GearRegularIcon";
import { HouseRegularIcon } from "alouette-icons/phosphor-icons/HouseRegularIcon";
import { SignOutRegularIcon } from "alouette-icons/phosphor-icons/SignOutRegularIcon";
import { UserCircleRegularIcon } from "alouette-icons/phosphor-icons/UserCircleRegularIcon";
import { type ReactNode, useState } from "react";
import { Button } from "../actions/Button";
import { IconButton } from "../actions/IconButton";
import { MenuItem } from "../actions/MenuItem";
import { QuestionAlertDialog } from "../containers/AlertDialog";
import { Box } from "../containers/Box";
import { NavBar } from "../navigation/NavBar";
import { NavBarItem } from "../navigation/NavBarItem";
import { Text } from "../primitives/Text";
import { Separator } from "../stacks/Separator";
import { VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { AppHeader } from "./AppHeader";
import { AppHeaderAccount } from "./AppHeaderAccount";
import { AppHeaderActions } from "./AppHeaderActions";
import { AppHeaderBrand } from "./AppHeaderBrand";
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
        <Separator role="separator" className="my-xxs" />
        <MenuItem label="Log out" icon={<SignOutRegularIcon />} accent="danger" onPress={confirmLogOut} />
      </AppHeaderAccount>
    </AppHeaderActions>
  }
>
  <NavBar stretch aria-label="Main" value={pathname}>
    <NavBarItem href="/home" label="Home" />
  </NavBar>
</AppHeader>
~~~

- From \`md\` on web the three slots share one line: the two outer ones grow from a zero basis, which centers the navigation between them; the end slot is rendered even when \`actions\` is omitted, so the centering survives
- Below \`md\` — and on native at every width, since React Native has no \`order\` to put the navigation back in the middle — the brand and the actions share the first line and the navigation spans the second; give the \`NavBar\` \`stretch\` so it fills that line
- \`children\` is the navigation slot — omit it for a header without navigation
- \`AppHeaderBrand\` is a pressable when given \`href\`/\`onPress\` (expo Router's \`<Link asChild>\` injects both), a display-only row otherwise; its leading padding is pulled back with a negative margin, so the hover fill bleeds into the header's gutter while the mark stays flush with the content edge in both cases
- Every pressable in the bar uses \`variant="soft"\`: nothing at rest, a background fill on hover/focus/press (as on a listbox row), rather than a border tint too thin to read in a header
- A signed-in session is one \`AppHeaderAccount\` — an avatar trigger opening a \`Menu\` — not a row of buttons: logging out is the rarest thing the bar offers and the only destructive one, so it belongs behind the avatar with a \`danger\` accent, and confirming it is the app's call (the tests story wires it to a \`QuestionAlertDialog\`). A signed-out header keeps its plain \`Button\`s
- \`variant="bar"\` (default) is the application bar: its own background plus \`shadow-bar\`, a downward-only shadow cast on the page below. \`variant="transparent"\` is a header integrated into the page it heads (a landing hero): no background, no border, no shadow
- The frame takes the device's top inset unless an ancestor \`SafeAreaScope\` consumed it; wrap the screen below in \`<SafeAreaScope consumedEdges={["top"]}>\``,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    variant: { control: "inline-radio", options: ["bar", "transparent"] },
    contentWidth: { control: "inline-radio", options: ["boxed", "full"] },
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
    </NavBar>
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

function LoggedOutActions(): ReactNode {
  return (
    <AppHeaderActions>
      <Button size="sm" accent="success" text="Sign up" onPress={fn()} />
      <Button size="sm" text="Log in" onPress={fn()} />
    </AppHeaderActions>
  );
}

interface LoggedInActionsProps {
  onLogOut?: () => void;
}

function LoggedInActions({ onLogOut }: LoggedInActionsProps): ReactNode {
  return (
    <AppHeaderActions>
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
        <Separator role="separator" className="my-xxs" />
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

function LandingHero(): ReactNode {
  return (
    <Box accent="brand" className="bg-highlight-accent">
      <AppHeader
        brand={<DemoBrand />}
        actions={<LoggedOutActions />}
        contentWidth="full"
        variant="transparent"
      >
        <DemoNav label="Landing navigation" />
      </AppHeader>
      <VStack className="items-center gap-xs px-l py-xxl">
        <Text className="font-heading-extrabold text-3xl">Sing it once</Text>
        <Text className="text-muted text-base">
          The header has no ground of its own — the hero shows through.
        </Text>
      </VStack>
    </Box>
  );
}

export const PreviewAppHeaderStory: ThisStory = {
  name: "AppHeader Preview",
  render: (args) => (
    <AppHeader brand={<DemoBrand />} actions={<LoggedInActions />} {...args}>
      <DemoNav label="Preview navigation" />
    </AppHeader>
  ),
};

export const VariantsAppHeaderStory: ThisStory = {
  name: "AppHeader Variants",
  render: () => (
    <Story>
      <Story.Section title="Composition">
        <Text className="text-sm text-muted">Brand + navigation + session</Text>
        <AppHeader
          brand={<DemoBrand />}
          actions={<LoggedInActions />}
          contentWidth="full"
        >
          <DemoNav label="Full composition" />
        </AppHeader>
        <Text className="text-sm text-muted">
          Without actions — the empty end slot keeps the navigation centered
        </Text>
        <AppHeader brand={<DemoBrand />} contentWidth="full">
          <DemoNav label="No actions" />
        </AppHeader>
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
          <DemoNav label="Navigation only" />
        </AppHeader>
      </Story.Section>

      <Story.Section title="Session">
        <Text className="text-sm text-muted">Logged out</Text>
        <AppHeader
          brand={<DemoBrand />}
          actions={<LoggedOutActions />}
          contentWidth="full"
        >
          <DemoNav label="Logged out" />
        </AppHeader>
        <Text className="text-sm text-muted">Logged in</Text>
        <AppHeader
          brand={<DemoBrand />}
          actions={<LoggedInActions />}
          contentWidth="full"
        >
          <DemoNav label="Logged in" />
        </AppHeader>
      </Story.Section>

      <Story.Section title="Variant">
        <Text className="text-sm text-muted">
          bar — the application bar, casting a shadow on the page below
        </Text>
        <AppHeader
          brand={<DemoBrand />}
          actions={<LoggedOutActions />}
          contentWidth="full"
        >
          <DemoNav label="Bar variant" />
        </AppHeader>
        <Text className="text-sm text-muted">
          transparent — integrated in the page it heads
        </Text>
        <LandingHero />
      </Story.Section>

      <Story.Section title="Size">
        <AppHeader
          brand={<DemoBrand />}
          actions={<LoggedInActions />}
          contentWidth="full"
          size="sm"
        >
          <DemoNav label="Small" />
        </AppHeader>
        <AppHeader
          brand={<DemoBrand />}
          actions={<LoggedInActions />}
          contentWidth="full"
          size="md"
        >
          <DemoNav label="Medium" />
        </AppHeader>
      </Story.Section>

      <Story.Section title="Content width">
        <AppHeader
          brand={<DemoBrand />}
          actions={<LoggedInActions />}
          contentWidth="boxed"
        >
          <DemoNav label="Boxed" />
        </AppHeader>
        <AppHeader
          brand={<DemoBrand />}
          actions={<LoggedInActions />}
          contentWidth="full"
        >
          <DemoNav label="Full width" />
        </AppHeader>
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
        <Text className="text-sm text-muted">Logo accents</Text>
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
        <AppHeader
          brand={
            <AppHeaderBrand
              href="/"
              brandLogo={
                <BrandLogo accent="success" icon={<BirdRegularIcon />} />
              }
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
      <AppHeader
        aria-label="Full header"
        brand={<DemoBrand />}
        actions={
          loggedIn ? (
            <LoggedInActions
              onLogOut={() => {
                setConfirmingLogOut(true);
              }}
            />
          ) : (
            <AppHeaderActions>
              <Button
                size="sm"
                text="Log in"
                onPress={() => {
                  setLoggedIn(true);
                }}
              />
            </AppHeaderActions>
          )
        }
        contentWidth="full"
      >
        <DemoNav label="Header navigation" />
      </AppHeader>
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
        <AppHeader
          aria-label="Header without actions"
          brand={<DemoBrand />}
          contentWidth="full"
        >
          <DemoNav label="Centered navigation" />
        </AppHeader>
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
      // The empty end slot is what balances the brand slot, so the navigation
      // stays centered in a header carrying no actions.
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
  },
};
