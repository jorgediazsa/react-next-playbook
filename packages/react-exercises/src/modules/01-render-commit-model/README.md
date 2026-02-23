# Module 01 — Render & Commit Model (StrictMode + Profiler)

This module teaches **render purity** and the difference between **render** and **commit**.
You will implement a small component and make the tests pass **without changing the tests**.

---

## Core concepts you must know (enough to solve the exercise)

### Render phase vs Commit phase

React updates the UI in (roughly) two stages:

1) **Render phase**
- React calls your function components to compute *what the UI should look like*.
- This phase must be **pure**: given the same inputs (props/state), it should return the same result.
- React may run render multiple times (especially in development and concurrent scenarios).
- **You must not do side-effects here** (e.g., logging, analytics, mutations, subscriptions).

2) **Commit phase**
- React applies the computed changes to the DOM.
- This is when effects are scheduled and DOM mutations are applied.
- A **commit** is the moment the UI changes are actually “committed”.

**Practical rule:**  
If something must happen *because the UI actually updated*, that’s a **commit** concern (effects, instrumentation, etc).  
If something is used to compute UI output, it’s a **render** concern (pure derived values).

---

### Mount vs Update

In the Profiler callback, React reports the phase as:
- **`"mount"`**: first time this tree commits
- **`"update"`**: subsequent commits caused by state/props changes

---

### `<StrictMode>` (development behavior)

`<StrictMode>` is a development-only tool that helps surface unsafe patterns early.

Key behavior relevant here:
- React may **invoke rendering logic more than once** in development to help you detect side-effects.
- If you do side-effects in render, they can run **multiple times** and cause flaky behavior.

**Important:** StrictMode does not change production behavior directly, but it exposes bugs you would otherwise ship.

---

### `<Profiler>` (programmatic performance instrumentation)

`<Profiler>` lets you measure performance and observe commits programmatically.

In this module we use:

```tsx
<Profiler
  id="RenderCommitDemo"
  onRender={(id, phase, actualDuration) => {
    // called on every commit
  }}
>
  {/* subtree */}
</Profiler>
```

- `id`: the string you provide (used to identify the subtree)
- `phase`: `"mount"` or `"update"` for this module
- `actualDuration`: a number representing render work for the committed update

**For this exercise:** the important part is not the number itself, but that you call `onCommit(...)` from this callback.

---

## Exercise objective

Implement `RenderCommitDemo` so that:

1) **The label is state-driven**
- Initially it must show: `Count: 0`
- After one click on “Increment”, it must show: `Count: 1`

2) **No side-effects in render**
- No global/module counters updated during render
- No logging/analytics/mutations during render
- Render output must be derived only from props/state

3) **Profiler reports commits correctly**
- Use `<Profiler id="RenderCommitDemo" ... />`
- On every Profiler `onRender` callback, call the provided prop:
  - `onCommit({ id, phase, actualDuration })`
- The values must be forwarded from the callback arguments (no hard-coded wrong ids)

4) **Must stay correct under `<StrictMode>`**
- StrictMode may render more than once in development, but your UI must still be correct and deterministic.

---

## What you are allowed to change

✅ Only:
- `exercise.tsx`

❌ Do not change:
- `exercise.test.tsx`

---

## Common failure modes (what this module is testing)

- **Side-effect in render** → StrictMode amplifies it → counters/logging run twice → flaky initial UI
- **Derived UI uses non-state inputs** (e.g., a module variable) → UI diverges from state
- **Profiler id mismatch** → tests expect `"RenderCommitDemo"` but you emit something else
- **Not forwarding Profiler callback args** → wrong `id`/`phase` shape

---

## Hints / checklist

- Remove any module/global mutation from render.
- The label should be `Count: ${count}`.
- Profiler id must be `"RenderCommitDemo"`.
- Use functional setState for increments: `setCount(c => c + 1)`.

---

## Deliverable

Run from repo root:

```bash
yarn test:react
```

All tests must pass.
