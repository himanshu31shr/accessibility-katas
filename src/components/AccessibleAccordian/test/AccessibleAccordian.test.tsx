import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import AccessibleAccordian from "../AccessibleAccordian";
import { render } from '@testing-library/react'

describe("Accessible Accordian", () => {
  it("passed accessibility", async () => {
    const { container } = render(<AccessibleAccordian />);
    const co = await axe(container);
    expect(co.violations.length).toBe(0);
  });

  it("passes this test", () => {
    expect(0).toBe(1);
  });
});
