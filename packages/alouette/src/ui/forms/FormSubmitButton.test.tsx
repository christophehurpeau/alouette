import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import type { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { afterEach, expect, it, vi } from "vitest";
import type { ButtonProps } from "../actions/Button";
import type { CollapsibleErrorMessageProps } from "../actions/CollapsibleErrorMessage";
import { Form, FormValidationError } from "./Form.tsx";
import { FormSubmitButton } from "./FormSubmitButton.tsx";

const { states } = vi.hoisted(() => ({ states: [] as ButtonProps["state"][] }));

vi.mock("../actions/Button", () => ({
  Button: ({ text, state, onPress }: ButtonProps) => {
    states.push(state);
    return (
      <button
        type="button"
        data-state={state}
        onClick={() => onPress?.({} as never)}
      >
        {text}
      </button>
    );
  },
}));

vi.mock("../actions/CollapsibleErrorMessage", () => ({
  CollapsibleErrorMessage: ({
    error,
    errorToMessage,
  }: CollapsibleErrorMessageProps) =>
    error ? <div role="alert">{errorToMessage(error)}</div> : null,
}));

vi.mock("../primitives/View", () => ({
  View: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
}));

afterEach(() => {
  cleanup();
  states.length = 0;
  vi.restoreAllMocks();
});

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

function Demo({
  onSubmit,
  validate,
}: {
  onSubmit: () => Promise<void>;
  validate?: () => Promise<string | true>;
}): ReactNode {
  return (
    <Form
      defaultValues={{ email: "" }}
      render={({ control, submit }) => (
        <>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email is required.", validate }}
            render={({ field, fieldState }) => (
              <>
                <input {...field} aria-label="Email" />
                {fieldState.error?.message}
              </>
            )}
          />
          <FormSubmitButton
            label="Submit"
            errorToMessage={(error) =>
              error instanceof FormValidationError
                ? "Please fix the errors above."
                : String(error)
            }
            onPress={submit}
          />
        </>
      )}
      onSubmit={onSubmit}
    />
  );
}

it("shows field errors without ever rendering a loader for an empty required field", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const onSubmit = vi.fn(async () => {});
  render(<Demo onSubmit={onSubmit} />);

  fireEvent.click(screen.getByRole("button"));

  await screen.findByText("Email is required.");
  await screen.findByText("Please fix the errors above.");
  expect(onSubmit).not.toHaveBeenCalled();
  expect(states).not.toContain("loading");
});

it("loads during async validation and submission, then retains the success state", async () => {
  const validation = deferred<true>();
  const submission = deferred<undefined>();
  const validate = vi.fn(() => validation.promise);
  const onSubmit = vi.fn(() => submission.promise);
  render(<Demo validate={validate} onSubmit={onSubmit} />);
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "ada@example.com" },
  });
  fireEvent.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(validate).toHaveBeenCalled();
  });
  await waitFor(() => {
    expect(screen.getByRole("button").dataset.state).toBe("loading");
  });
  expect(onSubmit).not.toHaveBeenCalled();

  await act(async () => {
    validation.resolve(true);
    await Promise.resolve();
  });
  expect(screen.getByRole("button").dataset.state).toBe("loading");
  fireEvent.click(screen.getByRole("button"));
  expect(onSubmit).toHaveBeenCalledTimes(1);

  await act(async () => {
    submission.resolve(undefined);
    await Promise.resolve();
  });
  expect(screen.getByRole("button").dataset.state).toBe("success");
});

it("shows a loader for pending async validation even when it fails", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const validation = deferred<string>();
  const validate = vi.fn(() => validation.promise);
  const onSubmit = vi.fn(async () => {});
  render(<Demo validate={validate} onSubmit={onSubmit} />);
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "invalid" },
  });
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    expect(validate).toHaveBeenCalled();
  });
  await waitFor(() => {
    expect(screen.getByRole("button").dataset.state).toBe("loading");
  });
  await act(async () => {
    validation.resolve("Invalid email.");
    await Promise.resolve();
  });

  expect(screen.getByText("Invalid email.")).toBeTruthy();
  expect(onSubmit).not.toHaveBeenCalled();
  expect(screen.getByRole("button").dataset.state).toBe("failed");
});

it("still displays submission failures after loading", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const submission = deferred<undefined>();
  render(<Demo onSubmit={() => submission.promise} />);
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "ada@example.com" },
  });
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    expect(screen.getByRole("button").dataset.state).toBe("loading");
  });
  await act(async () => {
    submission.reject(new Error("Server unavailable."));
    await Promise.resolve();
  });

  expect(screen.getByRole("button").dataset.state).toBe("failed");
  expect(screen.getByRole("alert").textContent).toContain(
    "Server unavailable.",
  );
});
