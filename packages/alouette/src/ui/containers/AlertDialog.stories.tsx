import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { QuestionRegularIcon } from "alouette-icons/phosphor-icons/QuestionRegularIcon";
import { TrashRegularIcon } from "alouette-icons/phosphor-icons/TrashRegularIcon";
import { type ReactNode, useState } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Button } from "../actions/Button";
import { Story, accents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import {
  AlertDialog,
  type AlertDialogProps,
  type AlertDialogUsageProps,
  InfoAlertDialog,
  QuestionAlertDialog,
  SuccessAlertDialog,
  WarningAlertDialog,
} from "./AlertDialog";

type ThisStory = StoryObj<typeof AlertDialog>;

// Loose superset of every variant's props: a demo helper accepts any
// combination and forwards a cast-back union to the component under test. The
// spread through JSX loses the discriminated correlation the props already
// satisfy at each call site.
interface AlertDialogDemoProps {
  triggerLabel?: string;
  variant?: AlertDialogProps["variant"];
  title: string;
  children?: ReactNode;
  accent?: AlertDialogProps["accent"];
  icon?: AlertDialogProps["icon"];
  size?: AlertDialogProps["size"];
  testID?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  confirmText?: ReactNode;
  cancelText?: ReactNode;
  closeText?: ReactNode;
  confirmDisabled?: boolean;
}

// Stateful demo wrapper: a trigger button that opens the dialog and manages the
// open/close state, closing it whenever any of its actions fire.
function AlertDialogDemo({
  triggerLabel = "Open",
  accent,
  icon = <QuestionRegularIcon />,
  ...props
}: AlertDialogDemoProps): ReactNode {
  const [visible, setVisible] = useState(false);
  const close = () => {
    setVisible(false);
  };
  const wrapped = (handler?: () => void) => () => {
    close();
    handler?.();
  };
  const actions = (() => {
    switch (props.variant) {
      case "alert":
        return { onClose: wrapped(props.onClose) };
      case "required":
        return { onConfirm: wrapped(props.onConfirm) };
      case "confirm":
      case undefined:
      default:
        return {
          onConfirm: wrapped(props.onConfirm),
          onCancel: wrapped(props.onCancel),
        };
    }
  })();
  return (
    <>
      <Button
        accent={accent}
        text={triggerLabel}
        onPress={() => {
          setVisible(true);
        }}
      />
      <AlertDialog
        {...(props as AlertDialogProps)}
        {...actions}
        accent={accent}
        icon={icon}
        visible={visible}
      />
    </>
  );
}

// Opens one of the usage wrappers; the icon is baked into the component, the
// accent is passed independently to show the two are decoupled.
function UsageDemo({
  Dialog,
  triggerLabel,
  accent,
  title,
  children,
}: {
  Dialog: (props: AlertDialogUsageProps) => ReactNode;
  triggerLabel: string;
  accent: Accent;
  title: string;
  children: ReactNode;
}): ReactNode {
  const [visible, setVisible] = useState(false);
  const close = () => {
    setVisible(false);
  };
  return (
    <>
      <Button
        accent={accent}
        text={triggerLabel}
        onPress={() => {
          setVisible(true);
        }}
      />
      <Dialog
        accent={accent}
        title={title}
        visible={visible}
        onConfirm={close}
        onCancel={close}
      >
        {children}
      </Dialog>
    </>
  );
}

export default {
  title: "alouette/Containers/AlertDialog",
  component: AlertDialog,
  parameters: {
    componentSubtitle:
      "Alert dialog requiring an explicit response. Built on Modal with role=alertdialog. Variants: confirm (cancel + confirm), alert (dismissible acknowledge), required (non-dismissible action).",
  },
  argTypes: {
    title: { control: "text" },
    variant: {
      control: "inline-radio",
      options: ["confirm", "alert", "required"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    accent: { control: "select", options: accents },
  },
} satisfies Meta<typeof AlertDialog>;

export const PreviewAlertDialogStory: ThisStory = {
  args: {
    title: "Delete project",
    variant: "confirm",
    confirmText: "Delete",
  },
  render: (args) => (
    <AlertDialogDemo
      {...args}
      triggerLabel="Delete project"
      onConfirm={fn()}
      onCancel={fn()}
    >
      This permanently removes the project and all of its data. This action
      cannot be undone.
    </AlertDialogDemo>
  ),
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Variants">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="confirm">
            <AlertDialogDemo
              variant="confirm"
              title="Delete project"
              triggerLabel="Confirm"
              confirmText="Delete"
              onConfirm={fn()}
              onCancel={fn()}
            >
              This action cannot be undone.
            </AlertDialogDemo>
          </StoryGrid.Col>

          <StoryGrid.Col title="alert">
            <AlertDialogDemo
              variant="alert"
              accent="info"
              title="Session expired"
              triggerLabel="Alert"
              onClose={fn()}
            >
              You were signed out for inactivity. Sign in again to continue.
            </AlertDialogDemo>
          </StoryGrid.Col>

          <StoryGrid.Col title="required">
            <AlertDialogDemo
              variant="required"
              accent="warning"
              title="Terms updated"
              triggerLabel="Required"
              confirmText="Accept"
              onConfirm={fn()}
            >
              You must accept the updated terms to continue. This dialog cannot
              be dismissed.
            </AlertDialogDemo>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section title="Usages">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="QuestionAlertDialog">
            <UsageDemo
              Dialog={QuestionAlertDialog}
              accent="brand"
              title="Leave without saving?"
              triggerLabel="Question"
            >
              Your changes have not been saved yet.
            </UsageDemo>
          </StoryGrid.Col>

          <StoryGrid.Col title="WarningAlertDialog">
            <UsageDemo
              Dialog={WarningAlertDialog}
              accent="danger"
              title="Delete project"
              triggerLabel="Warning"
            >
              This permanently removes the project and all of its data.
            </UsageDemo>
          </StoryGrid.Col>

          <StoryGrid.Col title="InfoAlertDialog">
            <UsageDemo
              Dialog={InfoAlertDialog}
              accent="info"
              title="Maintenance scheduled"
              triggerLabel="Info"
            >
              The service will be briefly unavailable tonight.
            </UsageDemo>
          </StoryGrid.Col>

          <StoryGrid.Col title="SuccessAlertDialog">
            <UsageDemo
              Dialog={SuccessAlertDialog}
              accent="success"
              title="Payment received"
              triggerLabel="Success"
            >
              Your subscription is now active.
            </UsageDemo>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section title="Accents">
        <StoryGrid.Row flexWrap>
          {accents.map((accent) => (
            <StoryGrid.Col key={accent} title={accent}>
              <AlertDialogDemo
                accent={accent}
                title={`${accent} confirmation`}
                triggerLabel={accent}
                onConfirm={fn()}
                onCancel={fn()}
              >
                The accent themes the icon and the confirm button.
              </AlertDialogDemo>
            </StoryGrid.Col>
          ))}
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section title="Sizes">
        <StoryGrid.Row flexWrap>
          {(["sm", "md", "lg"] as const).map((size) => (
            <StoryGrid.Col key={size} title={size}>
              <AlertDialogDemo
                size={size}
                title={`${size} confirmation`}
                triggerLabel={`Open ${size}`}
                onConfirm={fn()}
                onCancel={fn()}
              >
                A {size} alert dialog caps its width and centers over the
                backdrop.
              </AlertDialogDemo>
            </StoryGrid.Col>
          ))}
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section title="Custom labels and icon">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="Custom text">
            <AlertDialogDemo
              title="Discard changes?"
              triggerLabel="Discard"
              accent="warning"
              confirmText="Discard"
              cancelText="Keep editing"
              onConfirm={fn()}
              onCancel={fn()}
            >
              Your unsaved edits will be lost.
            </AlertDialogDemo>
          </StoryGrid.Col>

          <StoryGrid.Col title="Custom icon">
            <AlertDialogDemo
              title="Delete file"
              triggerLabel="Delete file"
              icon={<TrashRegularIcon />}
              confirmText="Delete"
              onConfirm={fn()}
              onCancel={fn()}
            >
              The file will be moved to trash.
            </AlertDialogDemo>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>
    </Story>
  ),
};

export const Tests: StoryObj<typeof AlertDialog> = {
  name: "AlertDialog Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Confirm variant">
        <AlertDialogDemo
          variant="confirm"
          title="Delete project"
          triggerLabel="Open confirm"
          confirmText="Delete"
          testID="test-confirm"
          onConfirm={fn()}
          onCancel={fn()}
        >
          This action cannot be undone.
        </AlertDialogDemo>
      </Story.Section>
      <Story.Section title="Alert variant">
        <AlertDialogDemo
          variant="alert"
          accent="info"
          title="Session expired"
          triggerLabel="Open alert"
          onClose={fn()}
        >
          You were signed out.
        </AlertDialogDemo>
      </Story.Section>
      <Story.Section title="Required variant">
        <AlertDialogDemo
          variant="required"
          accent="warning"
          title="Terms updated"
          triggerLabel="Open required"
          confirmText="Accept"
          onConfirm={fn()}
        >
          You must accept to continue.
        </AlertDialogDemo>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Confirm variant: labelled, described, dismissible via confirm and cancel.
    await userEvent.click(canvas.getByRole("button", { name: "Open confirm" }));
    const dialog = await screen.findByRole("alertdialog");
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(dialog).toHaveAccessibleName("Delete project");
    await expect(dialog).toHaveAccessibleDescription(
      "This action cannot be undone.",
    );
    await userEvent.click(
      within(dialog).getByRole("button", { name: "Delete" }),
    );
    await waitFor(async () => {
      await expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });

    // Alert variant: a single acknowledge action.
    await userEvent.click(canvas.getByRole("button", { name: "Open alert" }));
    const alert = await screen.findByRole("alertdialog");
    await expect(alert).toHaveAccessibleName("Session expired");
    await expect(
      within(alert).queryByRole("button", { name: "Cancel" }),
    ).not.toBeInTheDocument();
    await userEvent.click(within(alert).getByRole("button", { name: "OK" }));
    await waitFor(async () => {
      await expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });

    // Required variant: Escape does not dismiss; only the action closes it.
    await userEvent.click(
      canvas.getByRole("button", { name: "Open required" }),
    );
    const required = await screen.findByRole("alertdialog");
    await expect(required).toHaveAccessibleName("Terms updated");
    await userEvent.keyboard("{Escape}");
    await expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    await userEvent.click(
      within(required).getByRole("button", { name: "Accept" }),
    );
    await waitFor(async () => {
      await expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });
  },
};
