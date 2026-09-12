import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BirdRegularIcon } from "alouette-icons/phosphor-icons/BirdRegularIcon";
import { ChartBarRegularIcon } from "alouette-icons/phosphor-icons/ChartBarRegularIcon";
import { GearRegularIcon } from "alouette-icons/phosphor-icons/GearRegularIcon";
import { HouseRegularIcon } from "alouette-icons/phosphor-icons/HouseRegularIcon";
import { type ReactNode, useState } from "react";
import { Box } from "../containers/Box";
import { Surface } from "../containers/Surface";
import { NavBar } from "../navigation/NavBar";
import { NavBarItem } from "../navigation/NavBarItem";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { HStack, VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { AppHeader } from "./AppHeader";
import { AppHeaderBrand } from "./AppHeaderBrand";
import { AppShell, AppShellMain, AppShellSidebar } from "./AppShell";
import { BrandLogo } from "./BrandLogo";

type ThisStory = StoryObj<typeof AppShell>;

export default {
  title: "alouette/Layout/AppShell",
  component: AppShell,
  parameters: {
    componentSubtitle:
      "The application shell without its body: scroll container, header, footer and the row the body sits in. A route composes that row with AppShellSidebar and AppShellMain.",
    docs: {
      description: {
        component: `### Composition
~~~tsx
// app/_layout.tsx — the shell, rendered once for the whole app
<AppShell header={<AppHeader … />} footer={<Footer />}>
  <Slot />
</AppShell>

// app/(reports)/_layout.tsx — this section, and only this one, owns a rail
<>
  <AppShellSidebar>
    <NavBar
      aria-label="Sections"
      className="w-[220px] grow"
      orientation="vertical"
      value={pathname}
    >
      <NavBarItem href="/reports/weekly" label="Weekly" />
    </NavBar>
  </AppShellSidebar>
  <AppShellMain>
    <Slot />
  </AppShellMain>
</>

// a route with no rail
<AppShellMain>{screen}</AppShellMain>
~~~

- \`AppLayout\` is the same shell with the body decided at one call site (\`sidebar\` and the screen as props). Reach for \`AppShell\` when the shell is rendered once — in an app's root layout — and the rail belongs to a section of the app rather than to the shell
- \`AppShell\` renders **no landmark of its own**: every route composing the body brings its own \`AppShellMain\`, and there is exactly one per rendered shell
- The rail is a **sibling** of the main, before it — never inside it, which would put the navigation in the \`main\` landmark. From \`md\` the two share a row; below it the rail stacks above the screen
- Everything else is what \`AppLayout\` does, because it is the same component underneath: the shell is the only scroll container (header and footer scroll with the page), it declares every safe-area edge consumed for the body, and the rail slot is \`position: sticky\` on web`,
      },
    },
  },
} satisfies Meta<typeof AppShell>;

interface DemoHeaderProps {
  route: string;
  onRouteChange: (route: string) => void;
}

function DemoHeader({ route, onRouteChange }: DemoHeaderProps): ReactNode {
  return (
    <AppHeader
      brand={
        <AppHeaderBrand
          href="/"
          brandLogo={<BrandLogo icon={<BirdRegularIcon />} />}
          title="Alouette"
        />
      }
      contentWidth="full"
    >
      <NavBar
        stretch
        aria-label="Main"
        value={route}
        onValueChange={onRouteChange}
      >
        <NavBarItem href="/home" label="Home" icon={<HouseRegularIcon />} />
        <NavBarItem
          href="/reports"
          label="Reports"
          icon={<ChartBarRegularIcon />}
        />
      </NavBar>
    </AppHeader>
  );
}

function DemoFooter(): ReactNode {
  return (
    <Box role="contentinfo" className="px-m py-sm">
      <HStack className="items-center justify-between gap-m">
        <Text className="text-sm text-muted">© 2026 Alouette</Text>
      </HStack>
    </Box>
  );
}

interface DemoScreenProps {
  title: string;
  rows: number;
}

function DemoScreen({ title, rows }: DemoScreenProps): ReactNode {
  return (
    <VStack className="gap-xxs p-m">
      <Text className="font-heading-bold text-xl">{title}</Text>
      {Array.from({ length: rows }, (_, index) => (
        <Surface key={index} size="xs">
          <Text className="text-base">{`Row ${index + 1}`}</Text>
        </Surface>
      ))}
    </VStack>
  );
}

/** The rail a section owns, beside its own screen. */
function ReportsRoute(): ReactNode {
  return (
    <>
      <AppShellSidebar>
        <NavBar
          aria-label="Sections"
          className="w-[220px] grow"
          defaultValue="/reports/weekly"
          orientation="vertical"
        >
          <NavBarItem
            href="/reports/weekly"
            label="Weekly"
            icon={<ChartBarRegularIcon />}
          />
          <NavBarItem
            href="/reports/settings"
            label="Report settings"
            icon={<GearRegularIcon />}
          />
        </NavBar>
      </AppShellSidebar>
      <AppShellMain>
        <DemoScreen title="Reports" rows={8} />
      </AppShellMain>
    </>
  );
}

/** A route with no rail of its own — the shell is unchanged, the body is not. */
function HomeRoute(): ReactNode {
  return (
    <AppShellMain>
      <DemoScreen title="Home" rows={4} />
    </AppShellMain>
  );
}

interface DemoAppProps {
  label: string;
  initialRoute: string;
}

function DemoApp({ label, initialRoute }: DemoAppProps): ReactNode {
  const [route, setRoute] = useState(initialRoute);

  return (
    <AppShell
      aria-label={label}
      header={<DemoHeader route={route} onRouteChange={setRoute} />}
      footer={<DemoFooter />}
    >
      {route === "/reports" ? <ReportsRoute /> : <HomeRoute />}
    </AppShell>
  );
}

interface DemoFrameProps {
  children: ReactNode;
}

/** Stories run in a page that has no height of its own — the shell needs one. */
function DemoFrame({ children }: DemoFrameProps): ReactNode {
  return <View className="h-[420px]">{children}</View>;
}

export const PreviewAppShellStory: ThisStory = {
  name: "AppShell Preview",
  render: () => <DemoApp label="App" initialRoute="/reports" />,
};

export const VariantsAppShellStory: ThisStory = {
  name: "AppShell Variants",
  render: () => (
    <Story>
      <Story.Section title="Route owning a rail">
        <DemoFrame>
          <DemoApp label="Reports app" initialRoute="/reports" />
        </DemoFrame>
      </Story.Section>

      <Story.Section title="Route without a rail">
        <DemoFrame>
          <DemoApp label="Home app" initialRoute="/home" />
        </DemoFrame>
      </Story.Section>

      <Story.Section title="Shell without chrome">
        <Text className="text-sm text-muted">
          The body row is all the shell renders — the route still brings its own
          main
        </Text>
        <DemoFrame>
          <AppShell>
            <AppShellMain>
              <DemoScreen title="Bare shell" rows={4} />
            </AppShellMain>
          </AppShell>
        </DemoFrame>
      </Story.Section>
    </Story>
  ),
};

export const TestsAppShellStory: ThisStory = {
  name: "AppShell Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Composed shell">
        <DemoFrame>
          <DemoApp label="Composed shell" initialRoute="/reports" />
        </DemoFrame>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const shell = canvas.getByLabelText("Composed shell");
    const shellCanvas = within(shell);
    const header = shellCanvas.getByRole("banner");
    const rail = shellCanvas.getByRole("navigation", { name: "Sections" });
    const footer = shellCanvas.getByRole("contentinfo");

    // The route brings the one and only landmark, and the rail is the route's
    // navigation beside it — not another one added by the shell.
    await expect(shellCanvas.getAllByRole("main")).toHaveLength(1);
    await expect(shellCanvas.getAllByRole("navigation")).toHaveLength(2);

    const main = shellCanvas.getByRole("main");
    const shellBox = shell.getBoundingClientRect();
    const headerBox = header.getBoundingClientRect();
    const railBox = rail.getBoundingClientRect();
    const mainBox = main.getBoundingClientRect();

    await expect(headerBox.top).toBeCloseTo(shellBox.top, 0);
    await expect(mainBox.top).toBeGreaterThanOrEqual(headerBox.bottom);

    if (window.innerWidth >= 768) {
      // A row: the rail sits left of the screen, both under the header.
      await expect(railBox.right).toBeLessThanOrEqual(mainBox.left);
      await expect(railBox.top).toBeGreaterThanOrEqual(headerBox.bottom);
    } else {
      // Stacked: the rail takes a line of its own above the screen.
      await expect(railBox.bottom).toBeLessThanOrEqual(mainBox.top);
    }

    // The rail's slot sticks to the top of the scroll, composed or not.
    const railSlot = rail.parentElement;
    if (!railSlot) throw new Error("expected the rail to sit in a slot");
    await expect(getComputedStyle(railSlot).position).toBe("sticky");

    // The shell is still the one scroll container: the footer only arrives at
    // the bottom of the scrolled page.
    await expect(shell.scrollHeight).toBeGreaterThan(shell.clientHeight);
    await expect(footer.getBoundingClientRect().bottom).toBeGreaterThan(
      shellBox.bottom,
    );

    // The frame's two-tone ground stops at the gutter: the scrollbar track is
    // opaque, so it reads the same beside the header and beside the screen.
    const { scrollbarColor } = getComputedStyle(shell);
    await expect(scrollbarColor).not.toContain("transparent");
    await expect(scrollbarColor.match(/rgba?\(/g)).toHaveLength(2);

    // The rail belongs to the route, not to the shell: leaving the section
    // takes it away, and the screen then spans the whole shell.
    await userEvent.click(shellCanvas.getByRole("link", { name: "Home" }));
    await waitFor(async () => {
      await expect(
        shellCanvas.queryByRole("navigation", { name: "Sections" }),
      ).toBe(null);
    });
    await expect(shellCanvas.getAllByRole("main")).toHaveLength(1);
    await expect(
      shellCanvas.getByRole("main").getBoundingClientRect().width,
    ).toBeCloseTo(shellBox.width, 0);
  },
};
