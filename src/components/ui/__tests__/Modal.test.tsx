import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Modal } from "@ui/Modal";

describe("Modal component", () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal when isOpen is true", async () => {
    await act(async () => {
      render(
        <Modal isOpen={true} onClose={onClose}>
          <div>Modal Content</div>
        </Modal>
      );
    });

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", async () => {
    await act(async () => {
      render(
        <Modal isOpen={false} onClose={onClose}>
          <div>Modal Content</div>
        </Modal>
      );
    });

    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose when the backdrop is clicked", async () => {
    await act(async () => {
      render(
        <Modal isOpen={true} onClose={onClose}>
          <div>Modal Content</div>
        </Modal>
      );
    });

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    await userEvent.click(dialog.parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders children correctly", async () => {
    await act(async () => {
      render(
        <Modal isOpen={true} onClose={onClose}>
          <div>Child Content</div>
        </Modal>
      );
    });

    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});
