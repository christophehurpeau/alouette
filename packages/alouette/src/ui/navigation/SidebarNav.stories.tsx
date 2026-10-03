import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  BackpackDuotoneIcon,
  BackpackRegularIcon,
} from "alouette-icons/phosphor-icons/Backpack";
import {
  BinocularsDuotoneIcon,
  BinocularsRegularIcon,
} from "alouette-icons/phosphor-icons/Binoculars";
import {
  GearDuotoneIcon,
  GearRegularIcon,
} from "alouette-icons/phosphor-icons/Gear";
import {
  SquaresFourDuotoneIcon,
  SquaresFourRegularIcon,
} from "alouette-icons/phosphor-icons/SquaresFour";
import {
  UsersDuotoneIcon,
  UsersRegularIcon,
} from "alouette-icons/phosphor-icons/Users";
import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { SidebarNav } from "./SidebarNav";
import { SidebarNavItem } from "./SidebarNavItem";
import { SidebarNavSection } from "./SidebarNavSection";

type ThisStory = StoryObj<typeof SidebarNav>;

export default {
  title: "alouette/Navigation/SidebarNav",
  component: SidebarNav,
  parameters: {
    componentSubtitle:
      "The destinations of an application sidebar, as rows grouped in titled sections. SidebarNav holds the current value; SidebarNavItem children match it against their href and mark themselves aria-current.",
    docs: {
      description: {
        component: `### Composition
~~~tsx
<SidebarNav aria-label="Main" value={pathname}>
  <SidebarNavSection>
    <SidebarNavItem href="/" label="Dashboard" icon={<SquaresFourRegularIcon />} />
  </SidebarNavSection>
  <SidebarNavSection title="Team">
    <SidebarNavItem href="/observers" label="Observers" icon={<UsersRegularIcon />} />
  </SidebarNavSection>
</SidebarNav>
~~~

- The current row is the \`emphasis\` pill raised out of the sidebar's \`lowered\` ground — the material of a \`SegmentedBar\` chip, stretched into a \`rounded-sm\` row that sets the menu apart from the pill controls around it — and the others are \`soft\`: no ground at rest, a surface tone on hover
- A titled \`SidebarNavSection\` is a \`group\` named by its title; an untitled one (the primary destinations, first) is a plain column
- \`SidebarNavItem\` is a \`link\` with \`aria-current="page"\`, composing with expo Router's \`<Link asChild>\` exactly like \`NavBarItem\`
- Phones get a \`NavBar\` instead: \`AppSidebarLayout\` hides the sidebar below \`md\``,
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
} satisfies Meta<typeof SidebarNav>;

interface SidebarFrameProps {
  children: ReactNode;
}

/** The nav sits on the sidebar's lowered ground in an `AppSidebarLayout`. */
function SidebarFrame({ children }: SidebarFrameProps): ReactNode {
  return <View className="w-[280px] bg-lowered px-sm py-m">{children}</View>;
}

interface DemoSidebarNavProps {
  label: string;
  accent?: Accent;
  disabled?: boolean;
  /** Renders `icon` alone, so the glyph keeps one weight throughout. */
  withoutActiveIcon?: boolean;
  defaultValue?: string;
}

function DemoSidebarNav({
  label,
  accent,
  disabled,
  withoutActiveIcon,
  defaultValue = "/",
}: DemoSidebarNavProps): ReactNode {
  return (
    <SidebarNav
      aria-label={label}
      accent={accent}
      disabled={disabled}
      defaultValue={defaultValue}
    >
      <SidebarNavSection>
        <SidebarNavItem
          href="/"
          label="Dashboard"
          icon={<SquaresFourRegularIcon />}
          activeIcon={
            withoutActiveIcon ? undefined : <SquaresFourDuotoneIcon />
          }
        />
        <SidebarNavItem
          href="/sightings"
          label="Sightings"
          icon={<BinocularsRegularIcon />}
          activeIcon={withoutActiveIcon ? undefined : <BinocularsDuotoneIcon />}
        />
      </SidebarNavSection>
      <SidebarNavSection title="Team">
        <SidebarNavItem
          href="/observers"
          label="Observers"
          icon={<UsersRegularIcon />}
          activeIcon={withoutActiveIcon ? undefined : <UsersDuotoneIcon />}
        />
        <SidebarNavItem
          href="/equipment"
          label="Equipment"
          icon={<BackpackRegularIcon />}
          activeIcon={withoutActiveIcon ? undefined : <BackpackDuotoneIcon />}
        />
      </SidebarNavSection>
      <SidebarNavSection title="Settings">
        <SidebarNavItem
          disabled
          href="/preferences"
          label="Preferences"
          icon={<GearRegularIcon />}
          activeIcon={withoutActiveIcon ? undefined : <GearDuotoneIcon />}
        />
      </SidebarNavSection>
    </SidebarNav>
  );
}

export const PreviewSidebarNavStory: ThisStory = {
  name: "SidebarNav Preview",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  render: (args) => (
    <SidebarFrame>
      <SidebarNav aria-label="Main" defaultValue="/" {...args}>
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
        </SidebarNavSection>
        <SidebarNavSection title="Team">
          <SidebarNavItem
            href="/observers"
            label="Observers"
            icon={<UsersRegularIcon />}
            activeIcon={<UsersDuotoneIcon />}
          />
        </SidebarNavSection>
      </SidebarNav>
    </SidebarFrame>
  ),
};

export const VariantsSidebarNavStory: ThisStory = {
  name: "SidebarNav Variants",
  render: () => (
    <Story>
      <Story.Section title="Sections">
        <SidebarFrame>
          <DemoSidebarNav label="Sections" />
        </SidebarFrame>
      </Story.Section>

      <Story.Section title="Current destination in a titled section">
        <SidebarFrame>
          <DemoSidebarNav label="Titled current" defaultValue="/observers" />
        </SidebarFrame>
      </Story.Section>

      <Story.Section title="No current destination">
        <SidebarFrame>
          <DemoSidebarNav label="No current" defaultValue="/elsewhere" />
        </SidebarFrame>
      </Story.Section>

      <Story.Section title="Without active icon">
        <SidebarFrame>
          <DemoSidebarNav withoutActiveIcon label="Single weight" />
        </SidebarFrame>
      </Story.Section>

      <Story.Section title="Without icons">
        <SidebarFrame>
          <SidebarNav aria-label="Text only" defaultValue="/">
            <SidebarNavSection>
              <SidebarNavItem href="/" label="Dashboard" />
              <SidebarNavItem href="/sightings" label="Sightings" />
            </SidebarNavSection>
            <SidebarNavSection title="Field">
              <SidebarNavItem href="/sites" label="Sites" />
              <SidebarNavItem
                href="/species"
                label="A destination whose label is too long for the rail"
              />
            </SidebarNavSection>
          </SidebarNav>
        </SidebarFrame>
      </Story.Section>

      <Story.Section title="Accent">
        <SidebarFrame>
          <DemoSidebarNav label="Accented" accent="brand" />
        </SidebarFrame>
      </Story.Section>

      <Story.Section title="Disabled">
        <SidebarFrame>
          <DemoSidebarNav disabled label="Disabled" />
        </SidebarFrame>
      </Story.Section>
    </Story>
  ),
};

export const TestsSidebarNavStory: ThisStory = {
  name: "SidebarNav Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Sections">
        <SidebarFrame>
          <DemoSidebarNav label="Tested" />
        </SidebarFrame>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = within(canvas.getByRole("navigation", { name: "Tested" }));

    const dashboard = nav.getByRole("link", { name: "Dashboard" });
    const observers = nav.getByRole("link", { name: "Observers" });
    const preferences = nav.getByRole("link", { name: "Preferences" });

    await expect(dashboard).toHaveAttribute("aria-current", "page");
    await expect(dashboard).toHaveAttribute("href", "/");
    await expect(observers).not.toHaveAttribute("aria-current");

    // A titled section is a group named by its visible title.
    const team = nav.getByRole("group", { name: "Team" });
    await expect(within(team).getByRole("link", { name: "Observers" })).toBe(
      observers,
    );

    // Pressing a row makes it the current destination, and the anchor does
    // not navigate on its own.
    const { href } = window.location;
    await userEvent.click(observers);
    await expect(observers).toHaveAttribute("aria-current", "page");
    await expect(dashboard).not.toHaveAttribute("aria-current");
    await expect(window.location.href).toBe(href);

    // A row takes the focus ring of the library's pressables on keyboard focus.
    await userEvent.tab();
    const focused = document.activeElement as HTMLElement;
    await expect(nav.getAllByRole("link")).toContain(focused);
    await expect(getComputedStyle(focused).outlineWidth).toBe("2px");
    await expect(getComputedStyle(focused).outlineOffset).toBe("2px");

    // Every row is a 44px touch target.
    for (const link of nav.getAllByRole("link")) {
      await expect(link.getBoundingClientRect().height).toBeGreaterThanOrEqual(
        44,
      );
    }

    // A disabled row drops its href and is never selected.
    await expect(preferences).toHaveAttribute("aria-disabled", "true");
    await expect(preferences).not.toHaveAttribute("href");
    await userEvent.click(preferences, { pointerEventsCheck: 0 });
    await expect(preferences).not.toHaveAttribute("aria-current");
    await expect(observers).toHaveAttribute("aria-current", "page");
  },
};
