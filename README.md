# react-next-playbook

Monorepo (Yarn workspaces) for a Staff-level React + Next.js (App Router) roadmap.

## Install
```bash
yarn
```

## Run tests
```bash
yarn test
# or
yarn test:react
```

## Structure
- `docs/roadmap.md` — full roadmap (phases A–F)
- `packages/react-exercises` — React-focused modules (RTL + Vitest)
- `packages/core-test-utils` — shared test helpers
- `apps/react-lab` — optional sandbox (placeholder)
- `apps/next-lab` — optional sandbox (placeholder; used when modules require Next runtime)
