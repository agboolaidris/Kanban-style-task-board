import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AddTaskForm } from "../AddTaskForm";

describe("AddTaskForm", () => {
  let handleSubmit: jest.Mock;

  beforeEach(() => {
    handleSubmit = jest.fn();
    render(<AddTaskForm onSubmit={handleSubmit} />);
  });

  it("renders Add Task button initially", () => {
    expect(
      screen.getByRole("button", { name: /add task/i })
    ).toBeInTheDocument();
  });

  it("opens the form when Add Task button is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(screen.getByPlaceholderText("Enter task title")).toBeInTheDocument();
  });

  it("calls onSubmit with the task title when Save button is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    fireEvent.change(screen.getByPlaceholderText("Enter task title"), {
      target: { value: "New Task" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(handleSubmit).toHaveBeenCalledWith("New Task");
  });

  it("does not call onSubmit if the task title is empty", () => {
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("closes the form when Cancel button is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(
      screen.queryByPlaceholderText("Enter task title")
    ).not.toBeInTheDocument();
  });

  it("closes the form and clears the title after submitting", () => {
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    fireEvent.change(screen.getByPlaceholderText("Enter task title"), {
      target: { value: "New Task" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    // Ensure form is closed
    expect(
      screen.queryByPlaceholderText("Enter task title")
    ).not.toBeInTheDocument();

    // Reopen the form and check if the input is cleared
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(screen.getByPlaceholderText("Enter task title")).toHaveValue("");
  });
});
