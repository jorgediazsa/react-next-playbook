import React from "react";
import { describe, it, expect } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithRoot } from "@react-next-playbook/core-test-utils";
import { ReconciliationDemo } from "./exercise";

describe("Module 02 — Reconciliation & Identity", () => {
  it("preserves input state correctly after reordering", () => {
    renderWithRoot(<ReconciliationDemo />);

    const inputA = screen.getByLabelText("input-A");
    const inputB = screen.getByLabelText("input-B");

    fireEvent.change(inputA, { target: { value: "hello" } });
    fireEvent.change(inputB, { target: { value: "world" } });

    fireEvent.click(screen.getByText("Reverse"));

    // After reverse:
    // A should still have "hello"
    // B should still have "world"
    expect(screen.getByLabelText("input-A")).toHaveValue("hello");
    expect(screen.getByLabelText("input-B")).toHaveValue("world");
  });
});
