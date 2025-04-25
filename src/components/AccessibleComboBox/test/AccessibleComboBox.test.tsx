import { describe, expect, it, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { axe } from "vitest-axe";
import '@testing-library/jest-dom/vitest';
import AccessibleComboBox from "../AccessibleComboBox";

describe("AccessibleComboBox", () => {
  afterEach(() => {
    cleanup();
  });

  it("should pass basic accessibility requirements", async () => {
    const { container } = render(<AccessibleComboBox />);
    const results = await axe(container);
    expect(results.violations.length).toBe(0);
  });

  it("should show options when clicked", () => {
    const { container } = render(<AccessibleComboBox />);
    const combobox = container.querySelector('[role="combobox"]') as HTMLElement;
    const button = screen.getByRole("button");
    fireEvent.click(button);
    
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("should update value when option is selected", () => {
    const { container } = render(<AccessibleComboBox />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    
    const option = screen.getByText("Option 1");
    fireEvent.click(option);
    
    expect(button).toHaveTextContent("Option 1");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should have proper ARIA attributes", () => {
    const { container } = render(<AccessibleComboBox />);
    const combobox = container.querySelector('[role="combobox"]') as HTMLElement;
    const button = screen.getByRole("button");
    
    expect(combobox).toHaveAttribute("aria-expanded", "false");
    expect(combobox).toHaveAttribute("aria-haspopup", "listbox");
    
    fireEvent.click(button);
    
    expect(combobox).toHaveAttribute("aria-expanded", "true");
    const listbox = screen.getByRole("listbox");
    expect(listbox).toHaveAttribute("aria-label", "Options");
  });

  it("should handle keyboard navigation", () => {
    const { container } = render(<AccessibleComboBox />);
    const button = screen.getByRole("button");
    
    // Open with Enter key
    fireEvent.keyDown(button, { key: "Enter" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    
    // Navigate options with arrow keys
    fireEvent.keyDown(button, { key: "ArrowDown" });
    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveClass("active");
    
    fireEvent.keyDown(button, { key: "ArrowDown" });
    expect(options[1]).toHaveClass("active");
    
    fireEvent.keyDown(button, { key: "ArrowUp" });
    expect(options[0]).toHaveClass("active");
    
    // Select with Enter key
    fireEvent.keyDown(button, { key: "Enter" });
    expect(button).toHaveTextContent("Option 1");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});