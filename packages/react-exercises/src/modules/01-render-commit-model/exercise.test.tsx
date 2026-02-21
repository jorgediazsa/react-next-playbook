import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithRoot } from "@react-next-playbook/core-test-utils";
import { RenderCommitDemo } from "./exercise";

describe("Module 01 — Render & Commit Model", () => {
  it("reports commits via Profiler and stays functional", () => {
    const onCommit = vi.fn();

    renderWithRoot(<RenderCommitDemo onCommit={onCommit} />);

    // initial render
    expect(screen.getByLabelText("count-label")).toHaveTextContent("Count: 0");

    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    expect(screen.getByLabelText("count-label")).toHaveTextContent("Count: 1");

    // Profiler should have reported at least one commit (mount + update).
    expect(onCommit.mock.calls.length).toBeGreaterThanOrEqual(1);

    // Validate the shape of reported data
    const first = onCommit.mock.calls[0]?.[0];
    expect(first).toBeDefined();
    expect(first.id).toBe("RenderCommitDemo");
    expect(["mount", "update"]).toContain(first.phase);
    expect(typeof first.actualDuration).toBe("number");
  });

  it("does not require side-effects in render to work (sanity)", () => {
    const onCommit = vi.fn();
    renderWithRoot(<RenderCommitDemo onCommit={onCommit} />);
    // If someone added side-effects in render, StrictMode would typically amplify them.
    // This test is a lightweight guard: app should remain stable and interactive.
    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    expect(screen.getByLabelText("count-label")).toHaveTextContent("Count: 1");
  });
});
