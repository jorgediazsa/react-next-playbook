import React from "react";
import { render } from "@testing-library/react";

/**
 * Minimal shared render helper.
 * Add providers here later (router, query client, etc).
 */
export function renderWithRoot(ui: React.ReactElement) {
  return render(ui);
}
