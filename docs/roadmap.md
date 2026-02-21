# React + Next.js Staff Roadmap (2026)

This roadmap is designed for **Senior → Staff-level engineers**.

It prioritizes:
- Runtime correctness and failure modes
- Concurrency mental models (as far as React exposes them)
- Next.js App Router internals (RSC, caching, streaming, actions)
- Compiler-era React tradeoffs
- Architecture and production debugging

---

## How modules are implemented in this repo

- **React-only modules** live in: `packages/react-exercises/src/modules/*`
  - Tested with React Testing Library + Vitest
  - No app boilerplate per module

- **Next-specific modules** will live in: `packages/next-exercises/*` (added later)
  - Run inside a real Next runtime (`apps/next-lab`)
  - Verified with integration tests and Playwright E2E where needed

Each module follows:
```
XX-module-name/
  README.md
  exercise.tsx
  exercise.test.tsx
```

---

# PHASE A — React Runtime & Correctness (01–10)

## 01 — Render & Commit Model (StrictMode + Profiler)
**Goals**
- Understand render vs commit
- Keep render pure (no side-effects)
- Understand StrictMode double-invokes in dev
- Measure commits programmatically via `<Profiler>`

**Includes**
- `<StrictMode>`
- `<Profiler>`

**Failure Modes**
- Side-effects inside render (analytics/logging/mutations)
- Non-idempotent effects amplified by StrictMode

---

## 02 — Reconciliation & Identity
**Goals**
- Keys and identity
- State preservation rules
- Reordering correctness

**Failure Modes**
- “State jumps” between list items due to unstable keys

---

## 03 — Scheduling & Batching (practical)
**Goals**
- Batching behavior
- Update ordering assumptions
- Avoid reliance on sync state reflection

**Failure Modes**
- Logic that assumes immediate DOM/state after setState

---

## 04 — Effects Semantics Deep Dive
**Goals**
- Cleanup timing
- Dependencies correctness
- Stale closure recognition and prevention

**Failure Modes**
- Over-subscribing and leaking listeners
- Missing deps and nondeterministic behavior

---

## 05 — `useEffectEvent`
**Goals**
- Extract non-reactive logic from effects
- Prevent unnecessary resubscriptions

**Includes**
- `useEffectEvent`

**Failure Modes**
- Using changing callbacks inside effect deps

---

## 06 — `forwardRef` + Imperative APIs
**Goals**
- Safe imperative escape hatches
- Stable ref behavior

**Includes**
- `forwardRef`
- `useImperativeHandle`

**Failure Modes**
- Leaking internal DOM structure
- Ref misuse that breaks invariants

---

## 07 — `lazy` + Suspense (code splitting)
**Goals**
- Lazy boundaries and fallback correctness
- Retry behavior

**Includes**
- `lazy`
- `Suspense`

**Failure Modes**
- Waterfalls and bad fallback UX

---

## 08 — Measuring Performance with `<Profiler>`
**Goals**
- Use Profiler callback programmatically
- Interpret render vs commit cost at a practical level

**Includes**
- `<Profiler>`

---

## 09 — External Store Correctness
**Goals**
- Snapshot consistency under concurrent rendering
- Subscription correctness

**Includes**
- `useSyncExternalStore`

**Failure Modes**
- Tearing / inconsistent UI

---

## 10 — Suspense for Data (conceptual)
**Goals**
- Throw-promise pattern mental model
- Avoid waterfalls
- Prepare for `use()` usage in server components

**Includes**
- `use()` (conceptual intro)

---

# PHASE B — Next.js App Router Internals (11–20)

## 11 — RSC Boundaries
**Goals**
- Server vs Client component rules
- Serialization boundaries
- Client references model

**Failure Modes**
- Passing functions / non-serializable objects across boundary

---

## 12 — `use()` in Server Components
**Goals**
- Use `use()` for async resources on the server
- Proper boundary usage and error handling

**Includes**
- `use()` (RFC)

---

## 13 — React Cache vs Fetch Cache
**Goals**
- Understand React cache (request memoization)
- Distinguish from Next fetch caching
- Know where incoherence comes from

**Includes**
- React cache (Next docs)

---

## 14 — Revalidation Model
**Goals**
- Static vs Dynamic rendering
- Segment config and `revalidate`
- Correct invalidation strategy

---

## 15 — Cache Incoherence Debugging
**Goals**
- Diagnose stale reads
- Fix double-fetch bugs
- Align cache layers (React cache vs fetch cache vs segment config)

---

## 16 — Server Actions Lifecycle
**Goals**
- Mutation lifecycle
- Idempotency strategies
- Race condition prevention under load

---

## 17 — `useFormStatus` for Correct Pending UX
**Goals**
- Pending UI correctness
- Prevent double submission
- Align UI state with action lifecycle

**Includes**
- `useFormStatus`

---

## 18 — Streaming & Suspense Boundaries
**Goals**
- Progressive rendering with streaming
- Boundary placement strategy

**Failure Modes**
- “Everything blocks” due to missing boundaries

---

## 19 — Hydration Mismatch Debugging
**Goals**
- Identify server/client divergence sources
- Fix nondeterministic rendering

**Failure Modes**
- Date/locale randomness, window usage, data drift

---

## 20 — Runtime Decisions (Node vs Edge)
**Goals**
- Environment constraints
- Tradeoffs in latency vs compatibility
- Impact on libraries (crypto/fs, etc)

---

# PHASE C — UX Systems & Advanced Rendering (21–25)

## 21 — `<ViewTransition>`
**Goals**
- Animate transitions safely
- Coordinate with async UI and Suspense

**Includes**
- `<ViewTransition>`

---

## 22 — Activity (formerly Offscreen)
**Goals**
- Background rendering and reveal
- Memory tradeoffs

**Includes**
- Activity (Offscreen → Activity)

---

## 23 — Motion Systems (motion.dev)
**Goals**
- Layout animations
- Orchestrated transitions across routes/components

**Includes**
- Motion (ex-Framer Motion)

---

## 24 — Asset Loading (React Labs)
**Goals**
- Resource preloading strategies
- Avoiding waterfalls and jank

**Includes**
- Asset Loading

---

## 25 — Coordinated Transitions
**Goals**
- Combine Suspense + streaming + animations without layout shift
- Avoid “loading thrash”

---

# PHASE D — Security & Experimental APIs (26–28)

## 26 — Taint API
**Goals**
- Prevent leaking server-only references to the client
- Understand guardrails and limitations

**Includes**
- `experimental_taintObjectReference`

---

## 27 — Server-only Safety Patterns
**Goals**
- Data containment strategies
- Serialization discipline
- Redaction patterns

---

## 28 — Experimental Hygiene
**Goals**
- Feature flags / fallbacks
- Rollout and monitoring strategy
- “How to adopt experimental safely” checklists

---

# PHASE E — Compiler Era React (29–32)

## 29 — React Compiler Fundamentals
**Goals**
- What the compiler optimizes
- What becomes obsolete
- What remains hard

**Includes**
- React Compiler

---

## 30 — Memoization Tradeoffs in Compiler Era
**Goals**
- When manual memo hurts
- Identity stability patterns

---

## 31 — Effects in Compiler Era
**Goals**
- What patterns remain necessary
- How to avoid “cargo cult” memo/effect patterns

---

## 32 — Design Systems Under RSC + Compiler
**Goals**
- Client island strategy
- Component boundary decisions
- API design with server/client separation

---

# PHASE F — Staff-level Architecture & Debugging (33–36)

## 33 — Feature Architecture Design
**Deliverable**
- Architecture doc
- Code skeleton proposal
- Tradeoff analysis

---

## 34 — Performance Budgeting
**Deliverable**
- Bottleneck identification across CPU/network/bundle
- Refactor plan with measurable outcomes

---

## 35 — Failure Analysis Pack
**Deliverable**
- Debugging report and root cause analysis
- Fix plan and regression tests

---

## 36 — Production Readiness Checklist
**Deliverable**
- Staff-level checklist for React/Next production systems
- Monitoring signals and common regressions
