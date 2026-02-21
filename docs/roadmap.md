# React + Next.js Staff Roadmap (2026)

This roadmap is designed for **Senior → Staff-level engineers**.

It focuses on:
- Runtime correctness
- Concurrency and failure modes
- Server Components internals
- Caching models
- Compiler-era React
- Architecture tradeoffs

This is **not** a "learn React" guide.
It is a "understand React deeply enough to design systems safely" guide.

---

## PHASE A — React Runtime & Correctness

### 01 — Render & Commit Model
**Goals**
- Understand render vs commit
- Understand purity requirements
- Understand StrictMode double invoke
- Measure commits using `<Profiler>`

**Includes**
- `<StrictMode>`
- `<Profiler>`

**Failure Modes**
- Side-effects inside render
- Non-idempotent effects
- Hidden state mutation

---

(Modules 02–36 are outlined in the chat; add them here as you implement them.)
