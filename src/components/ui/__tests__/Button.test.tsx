import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "@ui/Button";

describe("Button component", () => {
  it("renders the default button", async () => {
    await act(async () => {
      render(<Button>Default Button</Button>);
    });

    const buttonElement = screen.getByText("Default Button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      "border border-gray-200 hover:opacity-75"
    );
  });

  it("renders the primary button", async () => {
    await act(async () => {
      render(<Button variant="primary">Primary Button</Button>);
    });

    const buttonElement = screen.getByText("Primary Button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      "bg-indigo-800 text-white hover:bg-indigo-600 duration-75"
    );
  });

  it("renders the secondary button", async () => {
    await act(async () => {
      render(<Button variant="secondary">Secondary Button</Button>);
    });

    const buttonElement = screen.getByText("Secondary Button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("bg-transparent hover:bg-gray-200");
  });

  it("renders the small button", async () => {
    await act(async () => {
      render(<Button size="sm">Small Button</Button>);
    });

    const buttonElement = screen.getByText("Small Button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
    );
  });

  it("renders the large button", async () => {
    await act(async () => {
      render(<Button size="lg">Large Button</Button>);
    });

    const buttonElement = screen.getByText("Large Button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("h-10 rounded-md px-6 has-[>svg]:px-4");
  });

  it("renders the icon button", async () => {
    await act(async () => {
      render(<Button size="icon">Icon Button</Button>);
    });

    const buttonElement = screen.getByText("Icon Button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("size-9");
  });

  it("applies additional class names", async () => {
    await act(async () => {
      render(<Button className="extra-class">Button with Extra Class</Button>);
    });

    const buttonElement = screen.getByText("Button with Extra Class");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("extra-class");
  });

  it("passes additional props to the button element", async () => {
    await act(async () => {
      render(<Button aria-label="test-label">Button with Props</Button>);
    });

    const buttonElement = screen.getByLabelText("test-label");
    expect(buttonElement).toBeInTheDocument();
  });
});
