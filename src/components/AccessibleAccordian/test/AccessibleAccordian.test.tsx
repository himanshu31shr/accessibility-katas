import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import AccessibleAccordian from "../AccessibleAccordian";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

describe("Accessible Accordian", () => {
  it("should pass basic accessibility requirements", async () => {
    const { container } = render(<AccessibleAccordian />);
    const results = await axe(container);
    expect(results.violations.length).toBe(0);
  });

  it("should toggle content when header is clicked", () => {
    render(<AccessibleAccordian />);
    const firstHeader = screen.getAllByText(/Accordion Header 1/)[0];
    const firstContent = screen.queryAllByText(/Accordion Content 1/)[0];
    
    expect(firstContent).not.toBeVisible();
    
    fireEvent.click(firstHeader);
    const visibleContent = screen.queryAllByText(/Accordion Content 1/)[0];
    expect(visibleContent).toBeVisible();
    
    fireEvent.click(firstHeader);
    const hiddenContent = screen.queryAllByText(/Accordion Content 1/)[0];
    expect(hiddenContent).not.toBeVisible();
  });

  it("should have proper ARIA attributes", () => {
    render(<AccessibleAccordian />);
    const headers = screen.getAllByRole("button");
    
    headers.forEach((header) => {
      expect(header).toHaveAttribute("aria-expanded");
      expect(header).toHaveAttribute("aria-controls");
      const contentId = header.getAttribute("aria-controls");
      const content = document.getElementById(contentId as string);
      expect(content).toHaveAttribute("role", "region");
      expect(content).toHaveAttribute("aria-labelledby", header.id);
    });
  });
});
