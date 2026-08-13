import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { WarningRegularIcon } from "alouette-icons/phosphor-icons/WarningRegularIcon";
import { type ReactNode, useState } from "react";
import { Button } from "../actions/Button";
import { Paragraph } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story, accents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { Modal, type ModalProps } from "./Modal";

type ThisStory = StoryObj<typeof Modal>;

// Stateful demo wrapper: a trigger button that opens the modal and manages the
// open/close state, forwarding the props under test.
interface ModalDemoProps extends Omit<ModalProps, "onClose" | "visible"> {
  triggerLabel?: string;
  onClose?: () => void;
}

function ModalDemo({
  triggerLabel = "Open modal",
  onClose,
  ...props
}: ModalDemoProps): ReactNode {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button
        accent={props.accent}
        text={triggerLabel}
        onPress={() => {
          setVisible(true);
        }}
      />
      <Modal
        {...props}
        visible={visible}
        onClose={() => {
          setVisible(false);
          onClose?.();
        }}
      />
    </>
  );
}

export default {
  title: "alouette/Containers/Modal",
  component: Modal,
  parameters: {
    componentSubtitle:
      "Accessible dialog overlay with a pinned title header. Dismissible via backdrop, close button, Escape, or Android back.",
  },
  argTypes: {
    title: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    accent: { control: "select", options: accents },
    hideCloseButton: { control: "boolean" },
  },
} satisfies Meta<typeof Modal>;

export const PreviewModalStory: ThisStory = {
  args: {
    title: "Delete project",
    size: "md",
  },
  render: (args) => (
    <ModalDemo
      {...args}
      footer={
        <>
          <Button variant="outlined" text="Cancel" onPress={fn()} />
          <Button accent="danger" text="Delete" onPress={fn()} />
        </>
      }
    >
      <Paragraph>
        This permanently removes the project and all of its data. This action
        cannot be undone.
      </Paragraph>
    </ModalDemo>
  ),
};

type ModalSize = NonNullable<ModalProps["size"]>;

// One trigger per size: the size drives the panel width, the panel/scroll
// padding, and the header close-button size together.
interface SizeTriggersProps {
  render: (size: ModalSize) => ReactNode;
}

function SizeTriggers({ render }: SizeTriggersProps): ReactNode {
  return (
    <VStack className="items-start gap-xs">
      {render("sm")}
      {render("md")}
      {render("lg")}
    </VStack>
  );
}

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Composition">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="Title only">
            <SizeTriggers
              render={(size) => (
                <ModalDemo
                  size={size}
                  title={`${size} modal`}
                  triggerLabel={size}
                >
                  <Paragraph>
                    A {size} modal caps its width on wide viewports and shrinks
                    to fit narrow screens.
                  </Paragraph>
                </ModalDemo>
              )}
            />
          </StoryGrid.Col>

          <StoryGrid.Col title="With footer actions">
            <SizeTriggers
              render={(size) => (
                <ModalDemo
                  size={size}
                  title="Save changes?"
                  triggerLabel={size}
                  footer={
                    <>
                      <Button
                        variant="outlined"
                        text="Discard"
                        onPress={fn()}
                      />
                      <Button text="Save" onPress={fn()} />
                    </>
                  }
                >
                  <Paragraph>
                    Your changes will be lost if you discard.
                  </Paragraph>
                </ModalDemo>
              )}
            />
          </StoryGrid.Col>

          <StoryGrid.Col title="With header icon">
            <SizeTriggers
              render={(size) => (
                <ModalDemo
                  size={size}
                  title="Heads up"
                  triggerLabel={size}
                  icon={<WarningRegularIcon />}
                >
                  <Paragraph>
                    The icon is accent-tinted and sits before the title in the
                    header.
                  </Paragraph>
                </ModalDemo>
              )}
            />
          </StoryGrid.Col>

          <StoryGrid.Col title="Close button hidden">
            <SizeTriggers
              render={(size) => (
                <ModalDemo
                  hideCloseButton
                  size={size}
                  title="Confirm"
                  triggerLabel={size}
                  footer={<Button text="Got it" onPress={fn()} />}
                >
                  <Paragraph>
                    Dismiss via the backdrop, Escape, or an explicit action.
                  </Paragraph>
                </ModalDemo>
              )}
            />
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section title="Accents">
        <StoryGrid.Row flexWrap>
          {accents.map((accent) => (
            <StoryGrid.Col key={accent} title={accent}>
              <ModalDemo
                accent={accent}
                title={`${accent} modal`}
                triggerLabel={accent}
                footer={
                  <>
                    <Button
                      variant="outlined"
                      accent={accent}
                      text="Cancel"
                      onPress={fn()}
                    />
                    <Button accent={accent} text="Confirm" onPress={fn()} />
                  </>
                }
              >
                <Paragraph>
                  The accent themes the trigger, panel, and buttons together.
                </Paragraph>
              </ModalDemo>
            </StoryGrid.Col>
          ))}
        </StoryGrid.Row>
      </Story.Section>
    </Story>
  ),
};

// The panel padding is split in half: the panel holds the gutter outside the
// scroll box (panel edge to scrollbar) and the scroll content container holds
// the one inside it (scrollbar to content). Equal halves are what makes the
// scrollbar sit balanced, so both are measured here.
interface ModalRegions {
  scrollBox: HTMLElement;
  outsideGutter: string;
  insideGutter: string;
}

function readModalRegions(panel: HTMLElement): ModalRegions {
  const scrollBox = [...panel.querySelectorAll("*")].find((element) => {
    const { overflowY } = getComputedStyle(element);
    return overflowY === "auto" || overflowY === "scroll";
  });
  const contentContainer = scrollBox?.firstElementChild;
  if (
    !(scrollBox instanceof HTMLElement) ||
    !(scrollBox.parentElement instanceof HTMLElement) ||
    !contentContainer
  ) {
    throw new TypeError("Modal has no scrollable region");
  }
  return {
    scrollBox,
    outsideGutter: getComputedStyle(scrollBox.parentElement).paddingRight,
    insideGutter: getComputedStyle(contentContainer).paddingRight,
  };
}

export const ScrollingBodyStory: ThisStory = {
  name: "Scrolling body",
  render: () => (
    <ModalDemo title="Terms" triggerLabel="Long content">
      {Array.from({ length: 24 }, (_, index) => (
        <Paragraph key={index}>
          Paragraph {index + 1}. Only the body scrolls once it exceeds ~70% of
          the viewport height — the header stays put above it.
        </Paragraph>
      ))}
    </ModalDemo>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Long content" }));
    const panel = await screen.findByRole("dialog");

    const { scrollBox, outsideGutter, insideGutter } = readModalRegions(panel);
    await expect(outsideGutter).toBe("16px");
    await expect(insideGutter).toBe(outsideGutter);

    const panelLeft = panel.getBoundingClientRect().left;
    const title = screen.getByText("Terms");
    const paragraph = screen.getByText(/^Paragraph 1\./);
    await expect(
      paragraph.getBoundingClientRect().left - panelLeft,
    ).toBeCloseTo(32, 0);
    // Header carries the same inner inset as the scrolling content.
    await expect(title.getBoundingClientRect().left).toBeCloseTo(
      paragraph.getBoundingClientRect().left,
      0,
    );

    // Header is outside the scroll region: it neither scrolls nor moves.
    await expect(scrollBox.contains(title)).toBe(false);
    const titleTop = title.getBoundingClientRect().top;
    scrollBox.scrollTop = scrollBox.scrollHeight;
    await waitFor(async () => {
      await expect(scrollBox.scrollTop).toBeGreaterThan(0);
    });
    await expect(title.getBoundingClientRect().top).toBeCloseTo(titleTop, 0);
  },
};

function findStickyAncestor(from: HTMLElement): HTMLElement {
  for (
    let element: HTMLElement | null = from;
    element;
    element = element.parentElement
  ) {
    if (getComputedStyle(element).position === "sticky") return element;
  }
  throw new TypeError("Modal footer is not sticky");
}

export const ScrollingBodyWithFooterStory: ThisStory = {
  name: "Scrolling body with footer",
  render: () => (
    <ModalDemo
      title="Terms of service"
      triggerLabel="Long content"
      footer={
        <>
          <Button variant="outlined" text="Decline" onPress={fn()} />
          <Button text="Accept" onPress={fn()} />
        </>
      }
    >
      {Array.from({ length: 24 }, (_, index) => (
        <Paragraph key={index}>
          Paragraph {index + 1}. The footer sticks to the bottom of the scroll
          box, and shows a top border only while it covers scrolled content.
        </Paragraph>
      ))}
    </ModalDemo>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Long content" }));
    const panel = await screen.findByRole("dialog");
    const { scrollBox } = readModalRegions(panel);
    const footer = findStickyAncestor(
      within(panel).getByRole("button", { name: "Decline" }),
    );

    const transparent = "rgba(0, 0, 0, 0)";
    // Stuck over the remaining content: the border separates it from the body.
    await waitFor(async () => {
      await expect(getComputedStyle(footer).borderTopColor).not.toBe(
        transparent,
      );
    });

    scrollBox.scrollTop = scrollBox.scrollHeight;
    // At the end of the scroll the footer rests in flow — no rule needed.
    await waitFor(async () => {
      await expect(getComputedStyle(footer).borderTopColor).toBe(transparent);
    });
  },
};

export const Tests: StoryObj<typeof Modal> = {
  name: "Modal Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Accessibility & dismiss">
        <ModalDemo
          title="Confirm deletion"
          triggerLabel="Open dialog"
          testID="test-modal"
          closeButtonAriaLabel="Close dialog"
        >
          <Paragraph>Body content.</Paragraph>
        </ModalDemo>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Open dialog" }));

    const dialog = await screen.findByRole("dialog");
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    // Labelled by its title.
    await expect(dialog).toHaveAccessibleName("Confirm deletion");
    // The dialog container is not an interactive control: it must not be a tab
    // stop (only the close button and body controls should be focusable).
    await expect(dialog).not.toHaveAttribute("tabindex", "0");

    const closeButton = within(dialog).getByRole("button", {
      name: "Close dialog",
    });
    await userEvent.click(closeButton);

    // The panel fades out before react-native-web's Modal unmounts it.
    await waitFor(async () => {
      await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  },
};
