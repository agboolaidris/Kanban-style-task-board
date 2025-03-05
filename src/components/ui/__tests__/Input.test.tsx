import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "@ui/Input";

describe("Input component", () => {
  it("renders without crashing", async () => {
    await act(async () => {
      render(<Input />);
    });

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("renders with a label", async () => {
    await act(async () => {
      render(<Input label="Test Label" />);
    });

    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
  });

  it("renders with an error message", async () => {
    await act(async () => {
      render(<Input error="Test Error" />);
    });

    const errorElement = screen.getByText("Test Error");
    expect(errorElement).toBeInTheDocument();
  });

  it("renders with a left icon", async () => {
    await act(async () => {
      render(<Input leftIcon={<span data-testid="left-icon" />} />);
    });

    const leftIconElement = screen.getByTestId("left-icon");
    expect(leftIconElement).toBeInTheDocument();
  });

  it("renders with a right icon", async () => {
    await act(async () => {
      render(<Input rightIcon={<span data-testid="right-icon" />} />);
    });

    const rightIconElement = screen.getByTestId("right-icon");
    expect(rightIconElement).toBeInTheDocument();
  });

  it("applies the correct intent styles", async () => {
    await act(async () => {
      render(<Input intent="fill" />);
    });

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass(
      "bg-gray-100 border-gray-200 focus:border-brand-textInput"
    );
  });

  it("applies the correct size styles", async () => {
    await act(async () => {
      render(<Input size="lg" />);
    });

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass("h-16");
  });
});
