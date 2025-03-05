import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TextArea } from "../TextArea";

describe("TextArea component", () => {
  it("renders without crashing", async () => {
    await act(async () => {
      render(<TextArea />);
    });
    const textAreaElement = screen.getByRole("textbox");
    expect(textAreaElement).toBeInTheDocument();
  });

  it("renders with a label", async () => {
    await act(async () => {
      render(<TextArea label="Test Label" />);
    });
    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
  });

  it("renders with an error message and icon", async () => {
    await act(async () => {
      render(<TextArea error="Test Error" />);
    });
    const errorElement = screen.getByText("Test Error");
    expect(errorElement).toBeInTheDocument();
  });

  it("applies the correct intent styles", async () => {
    await act(async () => {
      render(<TextArea intent="normal" />);
    });
    const textAreaElement = screen.getByRole("textbox");
    expect(textAreaElement).toHaveClass(
      "border-gray-200 placeholder:text-gray-400 focus:border-indigo-700 bg-transparent"
    );
  });

  it("applies the correct size styles", async () => {
    await act(async () => {
      render(<TextArea size="lg" />);
    });
    const textAreaElement = screen.getByRole("textbox");
    expect(textAreaElement).toHaveClass("h-48");
  });

  it("applies the correct error styles", async () => {
    await act(async () => {
      render(<TextArea error="Error message" />);
    });
    const textAreaElement = screen.getByRole("textbox");
    expect(textAreaElement).toHaveClass("!border-rose-500");
  });

  it("passes additional props to the textarea element", async () => {
    await act(async () => {
      render(<TextArea aria-label="test-label" />);
    });
    const textAreaElement = screen.getByLabelText("test-label");
    expect(textAreaElement).toBeInTheDocument();
  });
});
