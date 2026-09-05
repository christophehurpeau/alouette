import { expect, fn, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BellRegularIcon } from "alouette-icons/phosphor-icons/BellRegularIcon";
import { BirdRegularIcon } from "alouette-icons/phosphor-icons/BirdRegularIcon";
import { ChartBarRegularIcon } from "alouette-icons/phosphor-icons/ChartBarRegularIcon";
import { GearRegularIcon } from "alouette-icons/phosphor-icons/GearRegularIcon";
import { HouseRegularIcon } from "alouette-icons/phosphor-icons/HouseRegularIcon";
import type { ReactNode } from "react";
import { IconButton } from "../actions/IconButton";
import { LinkText } from "../actions/LinkText";
import { Box } from "../containers/Box";
import { Surface } from "../containers/Surface";
import { NavBar } from "../navigation/NavBar";
import { NavBarItem } from "../navigation/NavBarItem";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { HStack, VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { AppHeader } from "./AppHeader";
import { AppHeaderActions } from "./AppHeaderActions";
import { AppHeaderBrand } from "./AppHeaderBrand";
import { AppLayout } from "./AppLayout";
import { BrandLogo } from "./BrandLogo";

type ThisStory = StoryObj<typeof AppLayout>;

export default {
  title: "alouette/Layout/AppLayout",
  component: AppLayout,
  parameters: {
    componentSubtitle:
      "Application shell: header, optional left sidebar beside the screen, footer — scrolling together as one page. Every slot is composed by the caller.",
    docs: {
      description: {
        component: `### Composition
~~~tsx
<AppLayout
  header={<AppHeader brand={<AppHeaderBrand href="/" title="Alouette" />} />}
  sidebar={
    <NavBar
      aria-label="Sections"
      className="w-[220px] grow"
      orientation="vertical"
      value={pathname}
    >
      <NavBarItem href="/home" label="Home" icon={<HouseRegularIcon />} />
    </NavBar>
  }
  footer={
    <Box role="contentinfo" className="px-m py-sm">
      <Text className="text-sm text-muted">© Alouette</Text>
    </Box>
  }
>
  <VStack className="p-m gap-m">{screen}</VStack>
</AppLayout>
~~~

- The shell is itself the scroll container, and the header and the footer scroll with the screen: the bar gives its height back to the content and comes back by scrolling up. \`children\` is therefore plain content — no \`ScreenScrollView\` inside, which would nest a second scroll view
- The sidebar is a \`NavBar orientation="vertical"\` composed by the caller, not a prop-driven list: the layout places the rail, the navigation owns its destinations, its current value and its accent. Give the bar a width (\`w-[220px]\`) — it hugs its labels otherwise — and \`grow\`, which fills the height the layout stretches the slot to
- The rail sticks to the top of the scroll (\`position: sticky\`, capped to a viewport), so the destinations stay in sight however far the page has scrolled. React Native has no sticky position, so the class is \`web:\`-only and the rail scrolls with the page on device — where a bottom \`NavBar\` rather than a side rail is the navigation anyway
- The slot carries no landmark of its own; the composed \`NavBar\` is the \`navigation\` landmark, so a sidebar holding something else than navigation stays correctly announced
- From \`md\` the sidebar and the screen share a row; below it the rail stacks above the screen, where a column beside the content would leave nothing for it. Both are at least a viewport tall, since the content container grows
- \`children\` is the screen, wrapped in the \`main\` landmark and sized to whatever the chrome leaves — it keeps to that width and wraps, rather than widening the row to its longest line (the shell scrolls vertically, so anything past the right edge would be clipped)
- An elastic overscroll bares the scroll container itself, never the content that slid away — so under a header the shell carries the ground each end needs: the \`bar\` header's above, the screen's below, split at the middle where no band reaches. A pull past the top goes on showing the header, one past the footer stays on the screen's ground. Without a header the shell keeps a flat \`bg-screen\`. The split is a gradient, which React Native cannot paint on a ScrollView: native keeps the flat bar ground
- The header pads its own safe-area top inset, so its background bleeds under the status bar; every other edge is padded around the whole scrolled page, which puts the bottom inset below the footer. The screen below needs none of its own — the layout declares them all consumed
- The frame grows into the height it is given (\`min-h-full\`). A web app whose root has no height of its own passes \`className="h-screen"\``,
      },
    },
  },
} satisfies Meta<typeof AppLayout>;

function DemoHeader(): ReactNode {
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
          <IconButton
            aria-label="Notifications"
            icon={<BellRegularIcon />}
            size="sm"
            variant="soft"
            onPress={fn()}
          />
        </AppHeaderActions>
      }
      contentWidth="full"
    />
  );
}

interface DemoSidebarProps {
  label: string;
  className?: string;
}

function DemoSidebar({ label, className }: DemoSidebarProps): ReactNode {
  return (
    <NavBar
      aria-label={label}
      className={`grow ${className ?? ""}`}
      defaultValue="/home"
      orientation="vertical"
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
      />
    </NavBar>
  );
}

function DemoFooter(): ReactNode {
  return (
    <Box role="contentinfo" className="px-m py-sm">
      <HStack className="items-center justify-between gap-m">
        <Text className="text-sm text-muted">© 2026 Alouette</Text>
        <LinkText href="/privacy" size="sm" text="Privacy" />
      </HStack>
    </Box>
  );
}

interface DemoScreenProps {
  rows: number;
}

function DemoScreen({ rows }: DemoScreenProps): ReactNode {
  return (
    <VStack className="gap-xxs p-m">
      <Text className="font-heading-bold text-xl">Reports</Text>
      {Array.from({ length: rows }, (_, index) => (
        <Surface key={index} size="xs">
          <Text className="text-base">{`Row ${index + 1}`}</Text>
        </Surface>
      ))}
    </VStack>
  );
}

interface DemoFrameProps {
  children: ReactNode;
}

/** Stories run in a page that has no height of its own — the shell needs one. */
function DemoFrame({ children }: DemoFrameProps): ReactNode {
  return <View className="h-[420px]">{children}</View>;
}

/**
 * Narrow enough that the screen has to wrap its text instead of widening the row
 * — the shell clips horizontally, so an unwrapped line is lost rather than
 * scrollable.
 */
function NarrowFrame({ children }: DemoFrameProps): ReactNode {
  return <View className="h-[420px] w-[500px]">{children}</View>;
}

/**
 * The sticky rail is capped to a viewport, so it only holds when the shell fills
 * one — which is what an app's shell does.
 */
function ViewportFrame({ children }: DemoFrameProps): ReactNode {
  return <View className="h-screen">{children}</View>;
}

function DemoEmptyScreen(): ReactNode {
  return (
    <VStack className="flex-center grow gap-xs p-m">
      <Text className="font-heading-bold text-xl">Empty state</Text>
      <Text className="text-muted text-base">
        The screen and the rail fill whatever the chrome leaves, and the footer
        stays at the bottom.
      </Text>
    </VStack>
  );
}

export const PreviewAppLayoutStory: ThisStory = {
  name: "AppLayout Preview",
  render: (args) => (
    <AppLayout
      header={<DemoHeader />}
      sidebar={<DemoSidebar label="Sections" className="w-[220px]" />}
      footer={<DemoFooter />}
      {...args}
    >
      <DemoScreen rows={8} />
    </AppLayout>
  ),
};

export const VariantsAppLayoutStory: ThisStory = {
  name: "AppLayout Variants",
  render: () => (
    <Story>
      <Story.Section title="Full shell">
        <DemoFrame>
          <AppLayout
            header={<DemoHeader />}
            sidebar={<DemoSidebar label="Full shell" className="w-[220px]" />}
            footer={<DemoFooter />}
          >
            <DemoScreen rows={8} />
          </AppLayout>
        </DemoFrame>
      </Story.Section>

      <Story.Section title="Without sidebar">
        <DemoFrame>
          <AppLayout header={<DemoHeader />} footer={<DemoFooter />}>
            <DemoScreen rows={8} />
          </AppLayout>
        </DemoFrame>
      </Story.Section>

      <Story.Section title="Without footer">
        <DemoFrame>
          <AppLayout
            header={<DemoHeader />}
            sidebar={<DemoSidebar label="No footer" className="w-[220px]" />}
          >
            <DemoScreen rows={8} />
          </AppLayout>
        </DemoFrame>
      </Story.Section>

      <Story.Section title="Without header">
        <DemoFrame>
          <AppLayout
            sidebar={<DemoSidebar label="No header" className="w-[220px]" />}
            footer={<DemoFooter />}
          >
            <DemoScreen rows={8} />
          </AppLayout>
        </DemoFrame>
      </Story.Section>

      <Story.Section title="Screen only">
        <DemoFrame>
          <AppLayout>
            <DemoScreen rows={8} />
          </AppLayout>
        </DemoFrame>
      </Story.Section>

      <Story.Section title="Sidebar width">
        <Text className="text-sm text-muted">
          Fixed rail — the bar fills the width it is given
        </Text>
        <DemoFrame>
          <AppLayout
            header={<DemoHeader />}
            sidebar={<DemoSidebar label="Fixed rail" className="w-[220px]" />}
          >
            <DemoScreen rows={4} />
          </AppLayout>
        </DemoFrame>
        <Text className="text-sm text-muted">
          Content width — the bar hugs its longest destination
        </Text>
        <DemoFrame>
          <AppLayout
            header={<DemoHeader />}
            sidebar={<DemoSidebar label="Hugging rail" />}
          >
            <DemoScreen rows={4} />
          </AppLayout>
        </DemoFrame>
      </Story.Section>

      <Story.Section title="Sidebar accent">
        <DemoFrame>
          <AppLayout
            header={<DemoHeader />}
            sidebar={
              <NavBar
                accent="brand"
                aria-label="Accented rail"
                className="w-[220px] grow"
                defaultValue="/home"
                orientation="vertical"
              >
                <NavBarItem
                  href="/home"
                  label="Home"
                  icon={<HouseRegularIcon />}
                />
                <NavBarItem
                  href="/reports"
                  label="Reports"
                  icon={<ChartBarRegularIcon />}
                />
              </NavBar>
            }
            footer={<DemoFooter />}
          >
            <DemoScreen rows={4} />
          </AppLayout>
        </DemoFrame>
      </Story.Section>

      <Story.Section title="Screen shorter than the shell">
        <DemoFrame>
          <AppLayout
            header={<DemoHeader />}
            sidebar={<DemoSidebar label="Plain screen" className="w-[220px]" />}
            footer={<DemoFooter />}
          >
            <DemoEmptyScreen />
          </AppLayout>
        </DemoFrame>
      </Story.Section>
    </Story>
  ),
};

export const TestsAppLayoutStory: ThisStory = {
  name: "AppLayout Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Full shell">
        <DemoFrame>
          <AppLayout
            aria-label="Full shell"
            header={<DemoHeader />}
            sidebar={<DemoSidebar label="Sections" className="w-[220px]" />}
            footer={<DemoFooter />}
          >
            <DemoScreen rows={12} />
          </AppLayout>
        </DemoFrame>
      </Story.Section>
      <Story.Section title="Without sidebar">
        <DemoFrame>
          <AppLayout
            aria-label="Sidebarless shell"
            header={<DemoHeader />}
            footer={<DemoFooter />}
          >
            <DemoScreen rows={4} />
          </AppLayout>
        </DemoFrame>
      </Story.Section>
      <Story.Section title="Without header">
        <DemoFrame>
          <AppLayout aria-label="Headerless shell" footer={<DemoFooter />}>
            <DemoScreen rows={4} />
          </AppLayout>
        </DemoFrame>
      </Story.Section>
      <Story.Section title="Screen shorter than the shell">
        <NarrowFrame>
          <AppLayout
            aria-label="Empty shell"
            header={<DemoHeader />}
            sidebar={
              <DemoSidebar label="Empty sections" className="w-[220px]" />
            }
            footer={<DemoFooter />}
          >
            <DemoEmptyScreen />
          </AppLayout>
        </NarrowFrame>
      </Story.Section>
      <Story.Section title="Sticky rail">
        <ViewportFrame>
          <AppLayout
            aria-label="Sticky shell"
            header={<DemoHeader />}
            sidebar={
              <DemoSidebar label="Sticky sections" className="w-[220px]" />
            }
            footer={<DemoFooter />}
          >
            <DemoScreen rows={24} />
          </AppLayout>
        </ViewportFrame>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const shell = canvas.getByLabelText("Full shell");
    const shellCanvas = within(shell);
    const header = shellCanvas.getByRole("banner");
    const sidebar = shellCanvas.getByRole("navigation", { name: "Sections" });
    const main = shellCanvas.getByRole("main");
    const footer = shellCanvas.getByRole("contentinfo");

    const shellBox = shell.getBoundingClientRect();
    const headerBox = header.getBoundingClientRect();
    const sidebarBox = sidebar.getBoundingClientRect();
    const mainBox = main.getBoundingClientRect();
    const footerBox = footer.getBoundingClientRect();

    // The chrome spans the shell, and the page reads top to bottom.
    await expect(headerBox.top).toBeCloseTo(shellBox.top, 0);
    await expect(headerBox.width).toBeCloseTo(shellBox.width, 0);
    await expect(footerBox.width).toBeCloseTo(shellBox.width, 0);
    await expect(mainBox.top).toBeGreaterThanOrEqual(headerBox.bottom);
    await expect(footerBox.top).toBeGreaterThanOrEqual(mainBox.bottom - 1);

    // An overscroll bares the scroll container itself, so under a header the
    // shell's ground is the header's above the split and the screen's below it
    // — the latter also riding with the content, which is opaque and covers the
    // shell.
    const content = header.parentElement;
    if (!content) throw new Error("expected the header inside the content");
    const shellGround = getComputedStyle(shell).backgroundImage;
    await expect(shellGround).toContain(
      getComputedStyle(header).backgroundColor,
    );
    await expect(shellGround).toContain(
      getComputedStyle(content).backgroundColor,
    );
    await expect(getComputedStyle(content).backgroundColor).not.toBe(
      getComputedStyle(header).backgroundColor,
    );
    await expect(content.getBoundingClientRect().height).toBeGreaterThanOrEqual(
      shellBox.height,
    );
    // Without a header there is no bar ground to continue: the shell keeps the
    // screen's, the one the content carries.
    const headerless = canvas.getByLabelText("Headerless shell");
    const headerlessContent =
      within(headerless).getByRole("main").parentElement?.parentElement;
    if (!headerlessContent) {
      throw new Error("expected the body inside the content");
    }
    await expect(getComputedStyle(headerless).backgroundColor).toBe(
      getComputedStyle(headerlessContent).backgroundColor,
    );

    // The shell itself is the scroll container: twelve rows overflow it, and
    // the header and the footer are inside what scrolls — the header leaves at
    // the top and the footer only arrives at the bottom.
    await expect(shell.scrollHeight).toBeGreaterThan(shell.clientHeight);
    await expect(footerBox.bottom).toBeGreaterThan(shellBox.bottom);

    shell.scrollTop = shell.scrollHeight;
    await expect(header.getBoundingClientRect().bottom).toBeLessThan(
      shellBox.top,
    );
    await expect(footer.getBoundingClientRect().bottom).toBeLessThanOrEqual(
      shellBox.bottom + 1,
    );

    shell.scrollTop = 0;

    if (window.innerWidth >= 768) {
      // A row: the rail sits left of the screen, both under the header.
      await expect(sidebarBox.right).toBeLessThanOrEqual(mainBox.left);
      await expect(sidebarBox.top).toBeGreaterThanOrEqual(headerBox.bottom);
      // The rail takes the whole height of the row rather than hugging its
      // three 44px destinations — the slot's md:p-m gutter is all it gives up.
      await expect(sidebarBox.height).toBeGreaterThanOrEqual(
        mainBox.height - 32 - 1,
      );
      await expect(sidebarBox.height).toBeGreaterThan(3 * 44);
    } else {
      // Stacked: the rail takes a line of its own above the screen.
      await expect(sidebarBox.bottom).toBeLessThanOrEqual(mainBox.top);
    }

    // The slot adds no landmark of its own — the composed NavBar is the one.
    await expect(shellCanvas.getAllByRole("navigation")).toHaveLength(1);

    // A screen shorter than the shell fills it instead of leaving it scrollable,
    // and the footer closes the page at the bottom rather than under it. Nothing
    // overflows sideways either: react-native-css keeps React Native's shrink of
    // 0, so without the screen's explicit one the text would widen the row past
    // the shell and run under the clipped right edge.
    const emptyShell = canvas.getByLabelText("Empty shell");
    const emptyShellBox = emptyShell.getBoundingClientRect();
    await expect(emptyShell.scrollWidth).toBeLessThanOrEqual(
      emptyShell.clientWidth + 1,
    );
    await expect(emptyShell.scrollHeight).toBeLessThanOrEqual(
      emptyShell.clientHeight + 1,
    );
    const emptyFooterBox = within(emptyShell)
      .getByRole("contentinfo")
      .getBoundingClientRect();
    await expect(emptyFooterBox.bottom).toBeLessThanOrEqual(
      emptyShellBox.bottom + 1,
    );

    // The rail sticks to the top of the scroll — capped to a viewport, so the
    // destinations stay in sight once the header has scrolled away.
    const stickyShell = canvas.getByLabelText("Sticky shell");
    const stickyCanvas = within(stickyShell);
    const stickyRail = stickyCanvas.getByRole("navigation", {
      name: "Sticky sections",
    });
    const stickySlot = stickyRail.parentElement;
    if (!stickySlot) throw new Error("expected the rail to sit in a slot");
    await expect(getComputedStyle(stickySlot).position).toBe("sticky");

    const stickyShellBox = stickyShell.getBoundingClientRect();
    await expect(stickyShell.scrollHeight).toBeGreaterThan(
      stickyShell.clientHeight,
    );
    stickyShell.scrollTop = 300;

    const pinnedSlotBox = stickySlot.getBoundingClientRect();
    await expect(pinnedSlotBox.top).toBeCloseTo(stickyShellBox.top, 0);
    await expect(pinnedSlotBox.height).toBeLessThanOrEqual(
      stickyShellBox.height + 1,
    );
    await expect(
      stickyCanvas.getByRole("banner").getBoundingClientRect().bottom,
    ).toBeLessThan(stickyShellBox.top);
    stickyShell.scrollTop = 0;

    const sidebarless = within(canvas.getByLabelText("Sidebarless shell"));
    await expect(sidebarless.queryByRole("navigation")).toBe(null);
    // Without a rail the screen spans the whole shell.
    const bareMain = sidebarless.getByRole("main").getBoundingClientRect();
    await expect(bareMain.width).toBeCloseTo(
      canvas.getByLabelText("Sidebarless shell").getBoundingClientRect().width,
      0,
    );
  },
};
