import { render, act } from "@testing-library/react";
import { Navbar } from "@ui/Navbar";

test("renders Navbar component", async () => {
  let container;
  await act(async () => {
    container = render(<Navbar />);
  });
  expect(container).toBeDefined();
});
