import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ColorPicker } from "@ui/ColorPicker";

describe("ColorPicker", () => {
  const mockSetColor = jest.fn();
  const label = "Pick a color";
  const selectedColor = "#007BFF";

  beforeEach(async () => {
    await act(async () => {
      render(
        <ColorPicker
          label={label}
          color={selectedColor}
          setColor={mockSetColor}
        />
      );
    });
  });

  it("renders the label", () => {
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("renders all color buttons", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(8);
  });

  it("calls setColor with the correct color when a button is clicked", async () => {
    const buttons = screen.getAllByRole("button");

    // Ensure the second button exists before clicking
    expect(buttons[1]).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(buttons[1]);
    });

    expect(mockSetColor).toHaveBeenCalledWith("#28A745");
  });
});
