# Module 01 — Render & Commit Model (StrictMode + Profiler)

## Objective
Build a component that:
1) stays **pure during render** (no side effects in render)
2) exposes **commit timing** via `<Profiler>` callback
3) remains correct under `<StrictMode>` in development

## Context
React may render components more than once in development (e.g. StrictMode).
If you trigger side-effects in render, you'll get duplicate effects and hard-to-debug behavior.

## Requirements
- Implement `RenderCommitDemo`.
- Do not perform side-effects in render.
- Use `<Profiler>` to collect commit timings.
- `onCommit` must be called on each commit.

## Anti-Patterns To Avoid
- Mutating module/global state in render
- Calling analytics/logging in render
- Using `Date.now()` in render to drive UI (nondeterminism)

## Deliverable
All tests must pass.
