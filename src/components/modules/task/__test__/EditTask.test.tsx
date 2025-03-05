import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EditTask } from "../EditTask";
import { Task } from "src/types/task";

const mockTask: Task = {
  id: "2",
  title: "Research design patterns for the new app",
  columnId: "122",
  created_at: "2025-03-04T10:25:15.601Z",
};

describe("EditTask component", () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(async () => {
    await act(async () => {
      render(
        <EditTask task={mockTask} onSave={mockOnSave} onCancel={mockOnCancel} />
      );
    });
  });

  it("renders the TextArea with the task title", () => {
    const textArea = screen.getByRole("textbox");
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveValue("Research design patterns for the new app");
  });

  it("updates the title on user input", () => {
    const textArea = screen.getByRole("textbox");
    fireEvent.change(textArea, { target: { value: "Updated Task" } });
    expect(textArea).toHaveValue("Updated Task");
  });

  it("calls onSave when form is submitted with a valid title", () => {
    const textArea = screen.getByRole("textbox");
    fireEvent.change(textArea, { target: { value: "Updated Task" } });

    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith("Updated Task");
  });

  it("disables save button when input is empty", () => {
    const textArea = screen.getByRole("textbox");
    fireEvent.change(textArea, { target: { value: " " } });

    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).toBeDisabled();
  });

  it("calls onCancel when cancel button is clicked", () => {
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("submits the form when Enter is pressed (without Shift)", () => {
    const textArea = screen.getByRole("textbox");
    fireEvent.change(textArea, { target: { value: "Updated Task" } });

    fireEvent.keyDown(textArea, { key: "Enter", shiftKey: false });

    expect(mockOnSave).toHaveBeenCalledWith("Updated Task");
  });
});
