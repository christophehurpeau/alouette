import { expect, fn, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CaretDoubleRightRegularIcon } from "alouette-icons/phosphor-icons/CaretDoubleRightRegularIcon";
import { FolderRegularIcon } from "alouette-icons/phosphor-icons/FolderRegularIcon";
import { HouseRegularIcon } from "alouette-icons/phosphor-icons/HouseRegularIcon";
import { type ReactNode, useState } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story, accents } from "../story-components/Story";
import { BreadcrumbItem } from "./BreadcrumbItem";
import { Breadcrumbs } from "./Breadcrumbs";

type ThisStory = StoryObj<typeof Breadcrumbs>;

export default {
  title: "alouette/Navigation/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    componentSubtitle:
      "Trail of the path to the current page. Every BreadcrumbItem is a link to an ancestor except the last one, which Breadcrumbs marks as the current page.",
  },
  argTypes: {
    disabled: { control: "boolean" },
    accent: { control: "select", options: [undefined, ...accents] },
    "aria-label": {
      control: "text",
      table: { defaultValue: { summary: "Breadcrumb" } },
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export const BreadcrumbsPreviewStory: ThisStory = {
  name: "Breadcrumbs Preview",
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem href="/" label="Home" icon={<HouseRegularIcon />} />
      <BreadcrumbItem href="/library" label="Library" />
      <BreadcrumbItem href="/library/reports" label="Business Reports" />
    </Breadcrumbs>
  ),
};

function AccentBreadcrumbs({ accent }: { accent?: Accent }): ReactNode {
  return (
    <Story.SubSection withSurface title={accent ?? "Default"}>
      <Breadcrumbs accent={accent} aria-label={`Accent ${accent ?? "default"}`}>
        <BreadcrumbItem href="/" label="Home" icon={<HouseRegularIcon />} />
        <BreadcrumbItem href="/library" label="Library" />
        <BreadcrumbItem href="/library/reports" label="Business Reports" />
      </Breadcrumbs>
    </Story.SubSection>
  );
}

export const BreadcrumbsVariantsStory: ThisStory = {
  name: "Breadcrumbs Variants",
  render: () => (
    <Story>
      <Story.Section title="Trail lengths">
        <Breadcrumbs aria-label="Single">
          <BreadcrumbItem href="/" label="Home" icon={<HouseRegularIcon />} />
        </Breadcrumbs>
        <Breadcrumbs aria-label="Two">
          <BreadcrumbItem href="/" label="Home" icon={<HouseRegularIcon />} />
          <BreadcrumbItem href="/library" label="Library" />
        </Breadcrumbs>
        <Breadcrumbs aria-label="Deep">
          <BreadcrumbItem href="/" label="Home" icon={<HouseRegularIcon />} />
          <BreadcrumbItem href="/library" label="Library" />
          <BreadcrumbItem href="/library/reports" label="Reports" />
          <BreadcrumbItem href="/library/reports/2026" label="2026" />
          <BreadcrumbItem
            href="/library/reports/2026/q3"
            label="Third quarter"
          />
        </Breadcrumbs>
      </Story.Section>

      <Story.Section title="Icons">
        <Breadcrumbs aria-label="Icons">
          <BreadcrumbItem href="/" label="Home" icon={<HouseRegularIcon />} />
          <BreadcrumbItem
            href="/library"
            label="Library"
            icon={<FolderRegularIcon />}
          />
          <BreadcrumbItem
            href="/library/reports"
            label="Reports"
            icon={<FolderRegularIcon />}
          />
        </Breadcrumbs>
      </Story.Section>

      <Story.Section title="Separator">
        <Breadcrumbs
          aria-label="Custom separator"
          separator={<CaretDoubleRightRegularIcon />}
        >
          <BreadcrumbItem href="/" label="Home" icon={<HouseRegularIcon />} />
          <BreadcrumbItem href="/library" label="Library" />
          <BreadcrumbItem href="/library/reports" label="Reports" />
        </Breadcrumbs>
      </Story.Section>

      <Story.Section title="Disabled">
        <Breadcrumbs disabled aria-label="Whole trail disabled">
          <BreadcrumbItem href="/" label="Home" icon={<HouseRegularIcon />} />
          <BreadcrumbItem href="/library" label="Library" />
          <BreadcrumbItem href="/library/reports" label="Reports" />
        </Breadcrumbs>
        <Breadcrumbs aria-label="One crumb disabled">
          <BreadcrumbItem href="/" label="Home" icon={<HouseRegularIcon />} />
          <BreadcrumbItem disabled href="/library" label="Library" />
          <BreadcrumbItem href="/library/reports" label="Reports" />
        </Breadcrumbs>
      </Story.Section>

      <Story.Section title="Wrapping">
        <VStack className="w-[320px]">
          <Breadcrumbs aria-label="Wrapping">
            <BreadcrumbItem href="/" label="Home" icon={<HouseRegularIcon />} />
            <BreadcrumbItem href="/library" label="Library" />
            <BreadcrumbItem href="/library/reports" label="Business Reports" />
            <BreadcrumbItem
              href="/library/reports/2026"
              label="Fiscal year 2026"
            />
          </Breadcrumbs>
        </VStack>
      </Story.Section>

      <Story.Section title="Accents">
        <AccentBreadcrumbs />
        {accents.map((accent) => (
          <AccentBreadcrumbs key={accent} accent={accent} />
        ))}
      </Story.Section>
    </Story>
  ),
};

function BreadcrumbsRouterDemo(): ReactNode {
  const [route, setRoute] = useState("/library/reports");

  return (
    <VStack className="gap-m items-start">
      <Breadcrumbs aria-label="Router" onNavigate={setRoute}>
        <BreadcrumbItem href="/" label="Home" icon={<HouseRegularIcon />} />
        <BreadcrumbItem href="/library" label="Library" />
        <BreadcrumbItem
          href="/library/reports"
          label="Reports"
          onPress={(event) => {
            event.preventDefault();
            setRoute("/library/reports?from=item");
          }}
        />
        <BreadcrumbItem href="/library/reports/2026" label="2026" />
      </Breadcrumbs>
      <Text>{`route: ${route}`}</Text>
    </VStack>
  );
}

export const BreadcrumbsTestsStory: ThisStory = {
  name: "Breadcrumbs Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Trail">
        <Breadcrumbs aria-label="Trail" onNavigate={fn()}>
          <BreadcrumbItem href="/" label="Home" icon={<HouseRegularIcon />} />
          <BreadcrumbItem disabled href="/library" label="Library" />
          <BreadcrumbItem href="/library/reports" label="Reports" />
        </Breadcrumbs>
      </Story.Section>
      <Story.Section title="Routing">
        <BreadcrumbsRouterDemo />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trail = canvas.getByRole("navigation", { name: "Trail" });
    const trailCanvas = within(trail);
    const home = trailCanvas.getByRole("link", { name: "Home" });
    const library = trailCanvas.getByRole("link", { name: "Library" });

    await expect(home.tagName).toBe("A");
    await expect(home).toHaveAttribute("href", "/");
    // A disabled crumb drops its href so the browser cannot follow it.
    await expect(library).toHaveAttribute("aria-disabled", "true");
    await expect(library).not.toHaveAttribute("href");

    // The last crumb is the page being viewed: plain text, not a link.
    await expect(trailCanvas.queryByRole("link", { name: "Reports" })).toBe(
      null,
    );
    await expect(trailCanvas.getByText("Reports")).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(home).not.toHaveAttribute("aria-current");

    for (const crumb of [home, library]) {
      await expect(crumb.getBoundingClientRect().height).toBeGreaterThanOrEqual(
        44,
      );
    }

    const router = within(canvas.getByRole("navigation", { name: "Router" }));

    // onNavigate cancels the anchor's own navigation and routes in JS.
    router.getByRole("link", { name: "Library" }).click();
    await waitFor(() =>
      expect(canvas.getByText("route: /library")).toBeTruthy(),
    );

    // An item's own onPress wins over the trail's onNavigate.
    router.getByRole("link", { name: "Reports" }).click();
    await waitFor(() =>
      expect(
        canvas.getByText("route: /library/reports?from=item"),
      ).toBeTruthy(),
    );
  },
};
