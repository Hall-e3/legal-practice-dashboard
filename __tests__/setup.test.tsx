import React from "react";
import { render, screen } from "@testing-library/react";

describe("Testing Setup", () => {
  it("verifies test environment is working", () => {
    render(<div data-testid="test-element">Test Component</div>);
    const element = screen.getByTestId("test-element");
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Test Component");
  });
});
