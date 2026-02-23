import React, { Profiler, StrictMode, useMemo, useState } from "react";

export type CommitInfo = {
  id: string;
  phase: "mount" | "update";
  actualDuration: number;
};

type Props = {
  /** Called on each commit. Must be triggered by Profiler. */
  onCommit: (info: CommitInfo) => void;
};

/**
 * EXERCISE:
 * Fix this component so tests pass, WITHOUT changing the tests.
 *
 * The bugs are intentionally documented below as comments.
 */

let renderSideEffectCounter = 0;

export function RenderCommitDemo({ onCommit }: Props) {
  // BUG 1: Side-effect in render (StrictMode may render twice in dev)
  renderSideEffectCounter++;

  const [count, setCount] = useState(0);

  // BUG 2: UI derived from a render-time side effect, not from React state
  const label = useMemo(() => `Count: ${renderSideEffectCounter}`, [count]);

  return (
    <StrictMode>
      <Profiler
        // BUG 3: Wrong id (tests expect "RenderCommitDemo")
        id="BrokenProfilerId"
        onRender={(id, phase, actualDuration) => {
          // BUG 4: Wrong id forwarded to onCommit (tests validate the id)
          onCommit({ id: "WrongId", phase: phase as any, actualDuration });
        }}
      >
        <div>
          <div aria-label="count-label">{label}</div>

          {/* BUG 5: Non-functional update can be okay, but keep it robust */}
          <button type="button" onClick={() => setCount(count + 1)}>
            Increment
          </button>
        </div>
      </Profiler>
    </StrictMode>
  );
}
