# Module 02 — Reconciliation & Identity

This module teaches how React preserves (or breaks) state based on **keys and identity**.

---

## Core Concepts

### Reconciliation

React does not diff DOM nodes directly.
It compares elements between renders and decides whether to:
- Update an existing component instance
- Unmount it
- Mount a new one

### Identity Rule

Component identity is determined by:
- Element type
- Position in the tree
- `key` (if inside a list)

If keys are unstable or incorrect, React may reuse the wrong component instance.

---

## The Classic Bug: "State Jumping"

If you use array index as key:

```tsx
items.map((item, index) => (
  <Item key={index} />
))
```

When the list is reordered, React keeps state attached to positions,
not logical items.

Result:
- Input values jump to the wrong rows
- UI becomes inconsistent

---

## Exercise Objective

Fix the component so that:

1) Each item keeps its own state
2) Reordering the list does NOT cause state to jump
3) Tests pass without modifying them

You may only edit:
- `exercise.tsx`
