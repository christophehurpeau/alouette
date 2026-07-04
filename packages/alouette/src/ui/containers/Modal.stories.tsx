import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useState } from "react";
import { Button } from "../actions/Button";
import { Paragraph } from "../primitives/Text";
import { Story, accents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { Modal, type ModalProps } from "./Modal";

type ThisStory = StoryObj<typeof Modal>;

// Stateful demo wrapper: a trigger button that opens the modal and manages the
// open/close state, forwarding the props under test.
function ModalDemo({
  triggerLabel = "Open modal",
  onClose,
  ...props
}: Omit<ModalProps, "onClose" | "visible"> & {
  triggerLabel?: string;
  onClose?: () => void;
}): ReactNode {
  const [visible, setVisible] = useState(false);
  const merged = {
    ...props,
    visible,
    onClose: () => {
      setVisible(false);
      onClose?.();
    },
  };
  // The discriminated union (title vs aria-label) loses its correlation when
  // spread through JSX; the incoming props are already type-checked.
  const modalProps = merged as ModalProps;
  return (
    <>
      <Button
        accent={props.accent}
        text={triggerLabel}
        onPress={() => {
          setVisible(true);
        }}
      />
      <Modal {...modalProps} />
    </>
  );
}

export default {
  title: "alouette/Containers/Modal",
  component: Modal,
  parameters: {
    componentSubtitle:
      "Accessible dialog overlay. Dismissible via backdrop, close button, Escape, or Android back.",
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

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Sizes">
        <StoryGrid.Row flexWrap>
          {(["sm", "md", "lg"] as const).map((size) => (
            <StoryGrid.Col key={size} title={size}>
              <ModalDemo
                size={size}
                title={`${size} modal`}
                triggerLabel={`Open ${size}`}
              >
                <Paragraph>
                  A {size} modal caps its width on wide viewports and shrinks to
                  fit narrow screens.
                </Paragraph>
              </ModalDemo>
            </StoryGrid.Col>
          ))}
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section title="Composition">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="With footer actions">
            <ModalDemo
              title="Save changes?"
              triggerLabel="Footer"
              footer={
                <>
                  <Button variant="outlined" text="Discard" onPress={fn()} />
                  <Button text="Save" onPress={fn()} />
                </>
              }
            >
              <Paragraph>Your changes will be lost if you discard.</Paragraph>
            </ModalDemo>
          </StoryGrid.Col>

          <StoryGrid.Col title="No title (aria-label)">
            <ModalDemo triggerLabel="No title" aria-label="Quick action">
              <Paragraph>
                Without a title, an aria-label keeps the dialog labelled for
                assistive tech.
              </Paragraph>
            </ModalDemo>
          </StoryGrid.Col>

          <StoryGrid.Col title="Close button hidden">
            <ModalDemo
              hideCloseButton
              title="Confirm"
              triggerLabel="No close button"
              footer={<Button text="Got it" onPress={fn()} />}
            >
              <Paragraph>
                Dismiss via the backdrop, Escape, or an explicit action.
              </Paragraph>
            </ModalDemo>
          </StoryGrid.Col>

          <StoryGrid.Col title="Scrolling body">
            <ModalDemo title="Terms" triggerLabel="Long content">
              {Array.from({ length: 12 }, (_, index) => (
                <Paragraph key={index}>
                  Paragraph {index + 1}. The body scrolls once it exceeds ~70%
                  of the viewport height, keeping the header and footer visible.
                </Paragraph>
              ))}
            </ModalDemo>
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
